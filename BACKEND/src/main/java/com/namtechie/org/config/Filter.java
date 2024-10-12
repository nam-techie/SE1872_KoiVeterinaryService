package com.namtechie.org.config;

import com.namtechie.org.entity.Account;
import com.namtechie.org.service.TokenService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.security.auth.message.AuthException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
import java.rmi.ServerException;
import java.rmi.server.ServerCloneException;
import java.util.List;

@Component
public class Filter extends OncePerRequestFilter {

    @Autowired
    TokenService tokenService;

    @Autowired
    @Qualifier("handlerExceptionResolver")
    HandlerExceptionResolver handlerExceptionResolver;

    private final List<String> AUTH_PERMISSION = List.of(
            "/swagger-ui/**",
            "/v3/api-docs/**",
            "/swagger-resources/**",
            "/api/login",
            "/api/register",
            "/api/loginByGoogle",
            "/oauth2/authorization/**",
            "/login/oauth2/code/**",
            "/api//forgot-password",
            "/api/reset-password",
            "/api/validate-otp"
    );

    public boolean checkIsPublicAPI(String uri) {
        // uri: /api/register
        // nếu gặp những api trong list ở trên => cho phép truy cập luôn => true
        AntPathMatcher pathMatch = new AntPathMatcher();
        // check token => false
        return AUTH_PERMISSION.stream().anyMatch(pattern -> pathMatch.match(pattern, uri));
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // check xem cái api mà người dùng yêu cầu có phải là 1 public api hay k

        boolean isPublicAPI = checkIsPublicAPI(request.getRequestURI());
        if (isPublicAPI) {
            filterChain.doFilter(request, response);
        } else {
            String token = getToken(request);
            if (token == null) {
                //ko được phép truy cập
                handlerExceptionResolver.resolveException(request, response, null, new AuthException("Empty token!"));
                return;
            }

            // => có token
            // check xem token có đúng hay ko => lấy thông tin account từ token
            Account account;
            try {
                // Kiểm tra token trong danh sách đen
                if (tokenService.isTokenBlacklisted(token)) {
                    handlerExceptionResolver.resolveException(request, response, null, new AuthException("Token này đã bị hủy!"));
                    return;
                }

                account = tokenService.getAccountByToken(token);
            } catch (ExpiredJwtException e) {
                // response token hết hạn
                handlerExceptionResolver.resolveException(request, response, null, new AuthException("Expired token!"));
                return;
            } catch (MalformedJwtException malformedJwtException) {
                // response token sai
                handlerExceptionResolver.resolveException(request, response, null, new AuthException("Invalid token!"));
                return;
            }

            // => token chuẩn
            // => cho phép truy cập
            // => lưu lại thông tin account
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    account, token, account.getAuthorities());
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            // token ok, cho vào
            filterChain.doFilter(request, response);
        }
    }

    public String getToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        return authHeader.substring(7); // Bỏ qua "Bearer "
    }


    // Bearer asdasdasdsadasdasd => lấy từ index 7 bỏ qua thằng bearer
}
