package com.namtechie.org.service;

import com.namtechie.org.entity.Account;
import com.namtechie.org.entity.Role;
import com.namtechie.org.exception.DuplicateEntity;
import com.namtechie.org.model.AccountResponse;
import com.namtechie.org.model.RegisterRequest;
import com.namtechie.org.repository.AccountRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService  implements UserDetailsService {
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

    public AccountResponse register(RegisterRequest registerRequest) {
        Account account = modelMapper.map(registerRequest, Account.class);
        try{
            // Auto set role to CUSTOMER
            account.setRole(Role.CUSTOMER.name());

            // Mã hóa mật khẩu
            String originPassword = account.getPassword();
            account.setPassword(passwordEncoder.encode(originPassword));

            // Lưu tài khoản vào database
            Account newAccount = accountRepository.save(account);

            // Chuyển Account thành AccountResponse và trả về
            return modelMapper.map(newAccount, AccountResponse.class);
        } catch (Exception e){
            if(e.getMessage().contains(account.getEmail())){
                throw new DuplicateEntity("Email này đã được sử dụng!");
            } else if(e.getMessage().contains(account.getUsername())){
                throw new DuplicateEntity("USername này đã tồn tại!");
            }
            e.printStackTrace();
            // Log lỗi hoặc xử lý các exception khác nếu cần
            throw new RuntimeException("Đã xảy ra lỗi trong quá trình đăng ký, vui lòng thử lại sau.");
        }
    }




    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return accountRepository.findAccountByUsername(username);
    }
}
