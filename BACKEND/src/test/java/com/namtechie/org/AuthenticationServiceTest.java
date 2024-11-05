package com.namtechie.org;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.namtechie.org.entity.Account;
import com.namtechie.org.entity.Customers;
import com.namtechie.org.model.request.LoginRequest;
import com.namtechie.org.model.request.RegisterRequest;
import com.namtechie.org.model.response.AccountResponse;
import com.namtechie.org.repository.AccountRepository;
import com.namtechie.org.repository.CustomerRepository;
import com.namtechie.org.service.AuthenticationService;
import com.namtechie.org.service.EmailService;
import com.namtechie.org.service.TokenService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
public class AuthenticationServiceTest {

    @Mock
    private AccountRepository accountRepository;

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private EmailService emailService;
    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private TokenService tokenService;

    @InjectMocks
    private AuthenticationService authenticationService;


    private RegisterRequest registerRequest;
    private AccountResponse accountResponse;
    private Account account;
    private Customers customer;
    private LoginRequest loginRequest;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        registerRequest = new RegisterRequest();
        registerRequest.setUsername("testUser");
        registerRequest.setEmail("test@example.com");
        registerRequest.setPassword("password123");
        registerRequest.setConfirmPassword("password123");

        account = new Account();
        account.setUsername(registerRequest.getUsername());
        account.setEmail(registerRequest.getEmail());

        accountResponse = new AccountResponse();
        accountResponse.setUsername(registerRequest.getUsername());
        accountResponse.setEmail(registerRequest.getEmail());
    }



//    // Happy Case - Đăng ký thành công
//    @Test
//    public void register_Successful() {
//        // Mock hành vi của modelMapper để trả về một đối tượng Account hợp lệ và accountResponse
//        when(modelMapper.map(registerRequest, Account.class)).thenReturn(account);
//        when(modelMapper.map(account, AccountResponse.class)).thenReturn(accountResponse);
//
//        when(accountRepository.existsByEmail(registerRequest.getEmail())).thenReturn(false);
//        when(accountRepository.existsByUsername(registerRequest.getUsername())).thenReturn(false);
//        when(passwordEncoder.encode(registerRequest.getPassword())).thenReturn("encodedPassword");
//        when(accountRepository.save(any(Account.class))).thenReturn(account);
//
//        AccountResponse response = authenticationService.register(registerRequest);
//
//        assertNotNull(response);
//        assertEquals(registerRequest.getUsername(), response.getUsername());
//        assertEquals(registerRequest.getEmail(), response.getEmail());
//    }



    // Unhappy Case - Mật khẩu và confirmPassword không khớp
    @Test
    public void register_PasswordMismatch_ThrowsException() {
        registerRequest.setConfirmPassword("differentPassword");

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> authenticationService.register(registerRequest));

        assertEquals("Mật khẩu và xác nhận mật khẩu không khớp!", exception.getMessage());
    }



    @BeforeEach
    public void setUpData() {
        MockitoAnnotations.initMocks(this);
        loginRequest = new LoginRequest();
        loginRequest.setUsername("testUser");
        loginRequest.setPassword("password123");

        account = new Account();
        account.setUsername(loginRequest.getUsername());
        account.setPassword(loginRequest.getPassword());
        account.setDeleted(false);

        accountResponse = new AccountResponse();
        accountResponse.setUsername(loginRequest.getUsername());
    }

    // Happy Case - Đăng nhập thành công
    @Test
    public void login_Successful() {
        Authentication authentication = mock(Authentication.class);

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(account);
        when(modelMapper.map(account, AccountResponse.class)).thenReturn(accountResponse);
        when(tokenService.generateToken(account)).thenReturn("sampleToken");

        AccountResponse response = authenticationService.login(loginRequest);

        assertNotNull(response);
        assertEquals(loginRequest.getUsername(), response.getUsername());
        assertEquals("sampleToken", response.getToken());
    }

    // Unhappy Case - Thông tin tài khoản hoặc mật khẩu sai
    @Test
    public void login_InvalidCredentials_ThrowsException() {
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Invalid credentials"));

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class,
                () -> authenticationService.login(loginRequest));

        assertEquals("Tài khoản hoặc mật khẩu sai!", exception.getMessage());
    }
}
