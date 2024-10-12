package com.namtechie.org.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.namtechie.org.model.response.AccountResponse;
import com.namtechie.org.service.AuthenticationService;
import com.namtechie.org.service.TokenService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;


@Configuration
@EnableMethodSecurity
public class SecurityConfig {
    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    Filter filter;

    @Autowired
    TokenService tokenService;

    @Autowired
    ModelMapper modelMapper;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())  // Vô hiệu hóa CSRF
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("http://localhost:5741"));  // Cho phép frontend truy cập
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
                    config.setAllowedHeaders(List.of("*"));
                    config.setAllowCredentials(true);
                    return config;
                }))  // Cấu hình CORS trực tiếp
                .authorizeHttpRequests(
                        req -> req
                                .requestMatchers("/**")
                                .permitAll()
                                .anyRequest()
                                .authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("http://localhost:5741/login")  // Trang login trên frontend
                        .userInfoEndpoint(userInfo -> userInfo.userService(oauth2UserService()))  // Lấy thông tin người dùng từ Google
                        .successHandler(authenticationSuccessHandler())  // Sử dụng successHandler để trả về token
                )
                .userDetailsService(authenticationService)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))  // Stateless session, JWT used for authentication
                .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class)  // Add the custom filter for JWT
                .build();
    }

    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        return (request, response, authentication) -> {
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
            String email = oAuth2User.getAttribute("email");

            // Gọi service để xử lý logic đăng nhập và tạo token
            AccountResponse accountResponse = authenticationService.loginByGoogle(email, oAuth2User.getAttribute("name"));

            // Chuyển hướng về frontend với token qua query string
            String redirectUrl = "http://localhost:5741/login/success?token=" + accountResponse.getToken();
            response.sendRedirect(redirectUrl);  // Chuyển hướng người dùng về frontend với token
        };
    }


    @Bean
    public OAuth2UserService<OAuth2UserRequest, OAuth2User> oauth2UserService() {
        return new DefaultOAuth2UserService();
    }
}
