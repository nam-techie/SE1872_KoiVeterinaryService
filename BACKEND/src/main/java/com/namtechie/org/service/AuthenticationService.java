package com.namtechie.org.service;

import com.namtechie.org.entity.Account;
import com.namtechie.org.entity.Customers;
import com.namtechie.org.entity.Role;
import com.namtechie.org.exception.DuplicateEntity;
import com.namtechie.org.exception.NotFoundException;
import com.namtechie.org.model.*;
import com.namtechie.org.model.request.*;
import com.namtechie.org.model.response.AccountResponse;
import com.namtechie.org.model.response.AdminAccountResponse;
import com.namtechie.org.repository.AccountRepository;
import com.namtechie.org.repository.CustomerRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service // đánh dấu cho thằng spring boot biết đây là lớp Service
public class AuthenticationService implements UserDetailsService {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    TokenService tokenService;

    @Autowired
    EmailService emailService;

    @Autowired
    private CustomerRepository customerRepository;

    public void changePassword(ChangePasswordRequest changePasswordRequest) {
        Account account = (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // Kiểm tra mật khẩu cũ nhập vào có khớp với mật khẩu đã mã hóa
        boolean isPasswordMatch = passwordEncoder.matches(changePasswordRequest.getOldPassword(), account.getPassword());
        if (!isPasswordMatch) {
            throw new BadCredentialsException("Mật khẩu xác nhận sai!!!");
        }

        // Kiểm tra mật khẩu mới và mật khẩu xác nhận có khớp nhau không
        if (!changePasswordRequest.getNewPassword().equals(changePasswordRequest.getConfirmPassword())) {
            throw new DuplicateEntity("Mật khẩu mới và xác nhận mật khẩu không trùng!!!");
        }

        // In ra thông tin để kiểm tra
        System.out.println("Mật khẩu cũ: " + account.getPassword());
        System.out.println("Mật khẩu mới: " + changePasswordRequest.getNewPassword());
        System.out.println("Mã hóa mật khẩu mới: " + passwordEncoder.encode(changePasswordRequest.getNewPassword()));

        // Kiểm tra mật khẩu mới không trùng với mật khẩu cũ
        if (passwordEncoder.matches(changePasswordRequest.getNewPassword(), account.getPassword())) {
            throw new IllegalArgumentException("Mật khẩu mới không được trùng với mật khẩu cũ!!!");
        }

        // Cập nhật và mã hóa mật khẩu mới
        account.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));

        // Lưu thay đổi vào cơ sở dữ liệu
        accountRepository.save(account);  // Đảm bảo `accountRepository` được inject vào service của bạn
    }

    // xử lí logic, nghiệp vụ
    public AccountResponse register(RegisterRequest registerRequest) {
        // Kiểm tra confirmPassword trước khi tiếp tục
        if (!registerRequest.getPassword().equals(registerRequest.getConfirmPassword())) {
            throw new IllegalArgumentException("Mật khẩu và xác nhận mật khẩu không khớp!");
        }

        // Kiểm tra trùng lặp email và username trước khi lưu vào cơ sở dữ liệu
        if (accountRepository.existsByEmail(registerRequest.getEmail())) {
            throw new DuplicateEntity("Email này đã được sử dụng!");
        }

        if (accountRepository.existsByUsername(registerRequest.getUsername())) {
            throw new DuplicateEntity("Username này đã tồn tại!");
        }

        Account account = modelMapper.map(registerRequest, Account.class);

        try {
            // Auto set role to CUSTOMER
            account.setRole(Role.CUSTOMER.name());
            account.setDeleted(false);

            // Mã hóa mật khẩu
            String originPassword = account.getPassword();
            account.setPassword(passwordEncoder.encode(originPassword));

            // Lưu tài khoản vào database
            Account newAccount = accountRepository.save(account);
            // Gửi email thông báo đăng kí thành công
            EmailDetail emailDetail = new EmailDetail();
            emailDetail.setReceiver(newAccount);
            emailDetail.setSubject("Welcome to KoiKung Center!");
            emailDetail.setLink("https://se-1872-koi-veterinary-service.vercel.app");
            emailService.sendEmail(emailDetail);

            //Sau khi lưu xong thì tạo luôn bảng Customers tương ứng!
            Customers customer = new Customers();
            customer.setFullName(registerRequest.getUsername());
            customer.setAccount(newAccount);

            customerRepository.save(customer);

            return modelMapper.map(newAccount, AccountResponse.class);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Đã xảy ra lỗi trong quá trình đăng ký, vui lòng thử lại sau.");
        }
    }

    public AccountResponse login(LoginRequest loginRequest) {
        try {
            // Xác thực tài khoản
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            // Kiểm tra tài khoản
            Account account = (Account) authentication.getPrincipal();
            if (account.isDeleted()) {
                throw new NotFoundException("Tài khoản đã bị vô hiệu hóa!");
            }

            // Tạo token cho tài khoản
            AccountResponse accountResponse = modelMapper.map(account, AccountResponse.class);
            accountResponse.setToken(tokenService.generateToken(account));

            return accountResponse;
        } catch (NotFoundException e) {
            // Nếu tài khoản bị vô hiệu hóa
            throw new NotFoundException("Tài khoản đã bị vô hiệu hóa!");
        } catch (BadCredentialsException e) {
            // Nếu thông tin tài khoản hoặc mật khẩu sai
            throw new EntityNotFoundException("Tài khoản hoặc mật khẩu sai!");
        } catch (Exception e) {
            // Xử lý các lỗi khác
            e.printStackTrace();
            throw new RuntimeException("Đã xảy ra lỗi trong quá trình đăng nhập, vui lòng thử lại sau.");
        }
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account =  accountRepository.findAccountByUsername(username);
        if (account == null) {
            throw new UsernameNotFoundException("Tài khoản không tồn tại: " + username);
        }
        return account;
    }

    public Account getCurrentAccount() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.getPrincipal() instanceof Account) {
                Account account = (Account) authentication.getPrincipal();
                return accountRepository.findAccountByEmail(account.getEmail());
            }
            throw new RuntimeException("Không thể lấy thông tin tài khoản hiện tại");
        } catch (Exception e) {
            e.printStackTrace(); // Log lỗi
            throw new RuntimeException("Lỗi khi lấy thông tin tài khoản hiện tại", e);
        }
    }

    public Account getUserById() {
        Account account = (Account) SecurityContextHolder.getContext().getAuthentication();

        return account;
    }

    private String generateUsername() {
        // Tìm kiếm số lượng bác sĩ hiện có để tạo username tiếp theo
        List<Account> veterinaryAccounts = accountRepository.findByRoleIgnoreCase(Role.VETERINARY.name());
        int nextNumber = veterinaryAccounts.size() + 1;
        String generatedUsername = "veterinary" + String.format("%02d", nextNumber);

        // Kiểm tra xem username có tồn tại không để tránh trùng lặp
        while (accountRepository.existsByUsername(generatedUsername)) {
            nextNumber++;
            generatedUsername = "veterinary" + String.format("%02d", nextNumber);
        }
        return generatedUsername;
    }


    public AccountResponse registerVeterinary(VeterinaryRequest veterinaryRequest) {
        Account account = new Account();
        modelMapper.map(veterinaryRequest, Account.class);
        try {
            // Kiểm tra nếu email null trước khi thực hiện logic liên quan đến email
            if (veterinaryRequest.getEmail() == null || veterinaryRequest.getEmail().isEmpty()) {
                throw new IllegalArgumentException("Email không được để trống");
            }

            // Các bước logic khác như trước
            String generatedUsername = generateUsername();
            account.setEmail(veterinaryRequest.getEmail());
            account.setUsername(generatedUsername);
            account.setPassword(passwordEncoder.encode("123456"));
            account.setRole(Role.VETERINARY.name());

            // Lưu account mới
            Account newAccount = accountRepository.save(account);


            Customers customer = new Customers();
            customer.setAccount(account);
            customer.setFullName(generatedUsername);
            customerRepository.save(customer);

            return modelMapper.map(newAccount, AccountResponse.class);
        } catch (Exception e) {
            if (e.getMessage().contains(account.getEmail())) {
                throw new DuplicateEntity("Email này đã được sử dụng!");
            } else {
                throw new RuntimeException("Đã xảy ra lỗi trong quá trình đăng ký, vui lòng thử lại sau.");
            }
        }
    }


    public AccountResponse createAccountForAdmin(AdminAccountRequest adminAccountRequest) {
        Account account = new Account();
        modelMapper.map(adminAccountRequest, Account.class);

        if (accountRepository.existsByEmail(adminAccountRequest.getEmail())) {
            throw new DuplicateEntity("Email này đã được sử dụng!");
        }

        if (accountRepository.existsByUsername(adminAccountRequest.getUsername())) {
            throw new DuplicateEntity("Username này đã tồn tại!");
        }

        try {
            String role = adminAccountRequest.getRole();
            account.setEmail(adminAccountRequest.getEmail());
            account.setUsername(adminAccountRequest.getUsername());
            account.setPassword(passwordEncoder.encode("123456"));
            account.setRole(Role.valueOf(role).name());



            // Lưu tài khoản bác sĩ vào database
            accountRepository.save(account);

            if(Role.valueOf(role).name().equals("CUSTOMER")){
                Customers customer = new Customers();
                customer.setAccount(account);
                customer.setFullName(adminAccountRequest.getUsername());
                customerRepository.save(customer);
            }


            // Gửi email thông báo đăng kí thành công
//            EmailDetail emailDetail = new EmailDetail();
//            emailDetail.setReceiver(account);
//            emailDetail.setSubject("Welcome to KoiKung Center!");
//            emailDetail.setLink("https://www.google.com/");
//            emailService.sendEmail(emailDetail);

            // Chuyển đổi thành AccountResponse và trả về
            return modelMapper.map(account, AccountResponse.class);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Đã xảy ra lỗi trong quá trình đăng ký, vui lòng thử lại sau.");

        }

    }

    public AccountResponse setVeterinaryAccount(String email) {
        // Tìm tài khoản của bác sĩ thú y dựa trên email
        Account veterinaryAccount = accountRepository.findAccountByEmail(email);

        // Kiểm tra nếu tài khoản không tồn tại
        if (veterinaryAccount == null) {
            throw new EntityNotFoundException("Không tìm thấy tài khoản với email: " + email);
        }

        // Đặt role VETERINARY
        veterinaryAccount.setRole(Role.VETERINARY.name());

        // Lưu vào cơ sở dữ liệu
        Account updatedAccount = accountRepository.save(veterinaryAccount);

        // Chuyển đổi từ Account sang AccountResponse
        AccountResponse accountResponse = modelMapper.map(updatedAccount, AccountResponse.class);
        return accountResponse;
    }

    public List<Account> getAllAccount() {
        List<Account> accounts = accountRepository.findAll();
        return accounts;
    }


    public void deleteAccount(String email) {
        // Kiểm tra xem tài khoản có tồn tại hay không trước khi xóa
        if (accountRepository.existsByEmail(email)) {
            accountRepository.updateIsDeletedByEmail(true, email);
        } else {
            throw new EntityNotFoundException("Tài khoản với email: " + email + " không tồn tại.");
        }
    }

    public void restoreAccount(String email) {
        // Kiểm tra xem tài khoản có tồn tại hay không trước khi xóa
        if (accountRepository.existsByEmail(email)) {
            accountRepository.updateIsDeletedByEmail(false, email);
        } else {
            throw new EntityNotFoundException("Tài khoản với email: " + email + " không tồn tại.");
        }
    }

    public void updateRole(String email, String role) {
        if (accountRepository.existsByEmail(email)) {
            Account newUpdate = accountRepository.findAccountByEmail(email);

            try {
                // Kiểm tra xem role có hợp lệ không
                newUpdate.setRole(Role.valueOf(role).name());
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Role không hợp lệ: " + role);
            }

            accountRepository.save(newUpdate);
        } else {
            throw new EntityNotFoundException("Tài khoản với email: " + email + " không tồn tại.");
        }
    }

    private final Map<String, OTPDetails> otpMap = new ConcurrentHashMap<>();

    private final int OTP_EXPIRATION_MINUTES = 5; // Thời gian sống của OTP

    public void sendResetPasswordEmail(ForgotPasswordRequest forgotPasswordRequest) {
        Account account = accountRepository.findAccountByEmail(forgotPasswordRequest.getEmail());

        if (account == null) {
            throw new NotFoundException("Email không tồn tại!");
        }

        // Tạo OTP và thời gian hết hạn
        String otp = generateOTP();
        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(OTP_EXPIRATION_MINUTES);
        otpMap.put(forgotPasswordRequest.getEmail(), new OTPDetails(otp, expirationTime));

        // Gửi email chứa OTP
        EmailResetPass emailResetPass = new EmailResetPass();
        emailResetPass.setReceiver(account);
        emailResetPass.setSubject("Thay đổi mật khẩu");
        emailResetPass.setLink("https://se-1872-koi-veterinary-service.vercel.app/verify-otp?email=" + forgotPasswordRequest.getEmail());
        emailResetPass.setOtp(otp);
        emailService.resetPassword(emailResetPass);

    }

    private String generateOTP() {
        return String.format("%06d", new Random().nextInt(999999)); // OTP 6 chữ số
    }

    public boolean validateOtp(String email, String otp) {
        OTPDetails otpDetails = otpMap.get(email);

        if (otpDetails == null || otpDetails.getExpirationTime().isBefore(LocalDateTime.now())) {
            throw new NotFoundException("OTP không hợp lệ hoặc đã hết hạn!");
        }

        if (!otpDetails.getOtp().equals(otp)) {
            throw new IllegalArgumentException("OTP không đúng!");
        }

        return true; // OTP hợp lệ
    }

    public void resetPassword(OTPRequest otpRequest) {
        // Kiểm tra mật khẩu mới và confirm password
        if (!otpRequest.getPassword().equals(otpRequest.getConfirmPassword())) {
            throw new IllegalArgumentException("Mật khẩu mới và xác nhận mật khẩu không khớp!");
        }


        // Cập nhật mật khẩu mới
        Account account = accountRepository.findAccountByEmail(otpRequest.getEmail());
        if (account != null) {
            account.setPassword(passwordEncoder.encode(otpRequest.getPassword()));
            accountRepository.save(account);

            // Xóa OTP sau khi cập nhật mật khẩu thành công
        } else {
            throw new NotFoundException("Email không tồn tại!");
        }
    }

    private String getEmailByOtp(String otp) {
        for (Map.Entry<String, OTPDetails> entry : otpMap.entrySet()) {
            if (entry.getValue().getOtp().equals(otp)) {
                return entry.getKey(); // Trả về email tương ứng với OTP
            }
        }
        return null; // Không tìm thấy
    }


//    public void generateAndSendOTP(String email) {
//        String otp = generateOTP();
//        otpMap.put(email, otp);
//    }
//
//    public boolean verifyOTP(String email, String otp) {
//        String storedOtp = otpMap.get(email);
//        if (storedOtp != null && storedOtp.equals(otp)) {
//            otpMap.remove(email);
//            return true;
//        }
//        return false;
//    }

    public void logout(String token) {
        tokenService.invalidateToken(token);
    }

//    public AccountResponse loginByGoogle() {
//        // Lấy thông tin từ SecurityContextHolder
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication == null || !authentication.isAuthenticated()) {
//            throw new RuntimeException("Người dùng chưa được xác thực");
//        }
//
//        // Lấy OAuth2User từ Authentication
//        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
//
//        // Lấy email và tên từ OAuth2User
//        String email = oauth2User.getAttribute("email");
//        String name = oauth2User.getAttribute("name");
//
//        // Kiểm tra xem email đã tồn tại trong cơ sở dữ liu hay chưa
//        Account account = accountRepository.findAccountByEmail(email);
//
//        if (account == null) {
//            // Nếu chưa tồn tại, tạo tài khoản mới
//            Account newAccount = new Account();
//            newAccount.setEmail(email);
//            newAccount.setUsername(email); // Sử dụng email làm username
//            newAccount.setPassword(null); // Đặt mật khẩu là null vì đăng nhập qua Google
//            newAccount.setRole(Role.CUSTOMER.name()); // Gán vai trò là CUSTOMER
//
//            // Lưu vào database
//            account = accountRepository.save(newAccount);
//        } else if (account.isDeleted()) {
//            throw new RuntimeException("Tài khoản đã bị xóa và không thể đăng nhập lại.");
//        }
//
//        // Tạo token cho người dùng
//        String token = tokenService.generateToken(account);
//
//        // Tạo AccountResponse để trả về thông tin người dùng và token
//        AccountResponse accountResponse = modelMapper.map(account, AccountResponse.class);
//        accountResponse.setToken(token);
//
//        return accountResponse;
//    }

    public void updateAccount(UpdateDoctorLogin updateInfo) {
        try {
            Account currentAccount = getCurrentAccount();
            if (!updateInfo.getPassword().equals(updateInfo.getConfirmPassword())) {
                throw new IllegalArgumentException("Mật khẩu mới và xác nhận mật khẩu không khớp!");
            }
            currentAccount.setUsername(updateInfo.getUsername());
            currentAccount.setPassword(passwordEncoder.encode(updateInfo.getPassword()));
            accountRepository.save(currentAccount);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Đã xảy ra lỗi trong quá trình cập nhật tài khoản. Vui lòng thử lại sau.");
        }
    }

    public AccountResponse loginByGoogle(String email, String name) {
        // Kiểm tra xem người dùng có tồn tại không
        Account account = accountRepository.findAccountByEmail(email);

        if (account == null) {
            // Nếu người dùng chưa tồn tại, tạo mới
            account = new Account();
            account.setEmail(email);
            account.setUsername(name);  // Sử dụng tên từ Google làm username
            account.setPassword(passwordEncoder.encode(email));  // Mã hóa email thành mật khẩu
            account.setRole(Role.CUSTOMER.name());  // Đặt role mặc định là CUSTOMER
            accountRepository.save(account);

            Customers customers = new Customers();
            customers.setAccount(account);
            customers.setFullName(name);
            customerRepository.save(customers);

        }

        // Nếu tài khoản đã tồn tại thì bỏ qua việc cập nhật và tạo mới

        // Tạo JWT cho người dùng
        String token = tokenService.generateToken(account);

        // Trả về thông tin người dùng, role và token
        AccountResponse response = new AccountResponse();
        if(!account.isDeleted()){
            response.setUsername(account.getUsername());
            response.setEmail(account.getEmail());
            response.setRole(account.getRole());  // Trả về role của người dùng
            response.setToken(token);// Trả về token
            return  response;
        }


        return null;
    }

    public AdminInfoRequest updateAdminInfo(AdminInfoRequest adminInfoRequest) {
        try {
            // Lấy tài khoản hiện tại của người dùng đã xác thực
            Account currentAccount = getCurrentAccount();

            // Kiểm tra trùng lặp username, nếu username mới đã tồn tại và không phải của tài khoản hiện tại
            if (!Objects.equals(currentAccount.getUsername(), adminInfoRequest.getUsername()) &&
                    accountRepository.existsByUsername(adminInfoRequest.getUsername())) {
                throw new DuplicateEntity("Username đã tồn tại, vui lòng chọn username khác!");
            }

            // Kiểm tra trùng lặp email, n���u email mới đã tồn tại và không phải của tài khoản hiện tại
            if (!Objects.equals(currentAccount.getEmail(), adminInfoRequest.getEmail()) &&
                    accountRepository.existsByEmail(adminInfoRequest.getEmail())) {
                throw new DuplicateEntity("Email đã tồn tại, vui lòng chọn email khác!");
            }

            // So sánh và cập nhật username
            if (!Objects.equals(currentAccount.getUsername(), adminInfoRequest.getUsername())) {
                currentAccount.setUsername(adminInfoRequest.getUsername());
            }

            // So sánh và cập nhật email
            if (!Objects.equals(currentAccount.getEmail(), adminInfoRequest.getEmail())) {
                currentAccount.setEmail(adminInfoRequest.getEmail());
            }

            // So sánh và mã hóa mật khẩu nếu có sự thay đổi
            if (adminInfoRequest.getPassword() != null && !adminInfoRequest.getPassword().isEmpty()) {
                // Kiểm tra xem mật khẩu mới có khác với mật khẩu cũ không (so sánh mật khẩu chưa mã hóa)
                if (!passwordEncoder.matches(adminInfoRequest.getPassword(), currentAccount.getPassword())) {
                    // Nếu khác, mã hóa lại mật khẩu mới
                    currentAccount.setPassword(passwordEncoder.encode(adminInfoRequest.getPassword()));
                }
            }

            // Lưu thông tin cập nhật vào database
            accountRepository.save(currentAccount);

            // Trả về đối tượng adminInfoRequest đã cập nhật
            return modelMapper.map(currentAccount, AdminInfoRequest.class);

        } catch (DuplicateEntity e) {
            // Bắt lỗi trùng lặp username hoặc email
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Đã xảy ra lỗi trong quá trình cập nhật thông tin admin.");
        }
    }

    public void updateAccountInfo(AdminAccountResponse adminAccountResponse) {
        try {
            Account currentAccount = accountRepository.findAccountByUsername(adminAccountResponse.getOriginalUsername());
            if (currentAccount == null) {
                throw new NotFoundException("Tài khoản không tồn tại.");
            }

            Account accountByUsername = accountRepository.findAccountByUsername(adminAccountResponse.getUsername());
            if (accountByUsername != null && !accountByUsername.getId().equals(currentAccount.getId())) {
                throw new DuplicateEntity("Username đã được sử dụng bởi tài khoản khác.");
            }

            Account accountByEmail = accountRepository.findAccountByEmail(adminAccountResponse.getEmail());
            if (accountByEmail != null && !accountByEmail.getId().equals(currentAccount.getId())) {
                throw new DuplicateEntity("Email đã được sử dụng bởi tài khoản khác.");
            }

            // Cập nhật thông tin
            currentAccount.setUsername(adminAccountResponse.getUsername());
            currentAccount.setEmail(adminAccountResponse.getEmail());
            currentAccount.setRole(adminAccountResponse.getRole());

            accountRepository.save(currentAccount);

        } catch (NotFoundException | DuplicateEntity e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Đã xảy ra lỗi trong quá trình cập nhật thông tin admin.");
        }
    }
}
