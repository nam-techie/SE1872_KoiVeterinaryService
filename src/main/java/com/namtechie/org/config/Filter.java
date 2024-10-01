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
    HandlerExceptionResolver resolver;

    //cấu hình các đường dẫn, api được phép truy câp mà không yêu cầu xác
    private final List<String> AUTH_PERMISSION = List.of(
            "/swagger-ui/**",
            "/v3/api-docs/**",
            "/swagger-resources/**",
            "/api/login",
            "/api/register"
    );

    public boolean checkIsPublicAPI(String uri) {
        // uri: /api/register...
        //nếu gặp những api trong líst ở trên => cho phép truy cập luôn => true
        AntPathMatcher pathMatcher = new AntPathMatcher();
        //check Token => false
        return AUTH_PERMISSION.stream().anyMatch(pattern -> pathMatcher.match(pattern, uri));
    }

    public String getToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if(authHeader == null) return null;
        return authHeader.substring(7);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServerException, IOException, ServletException {
        //check xem cái api mà user gửi request có phải là 1 api hay không

        boolean isPublicAPI = checkIsPublicAPI(request.getRequestURI());
        if (isPublicAPI) {
            filterChain.doFilter(request, response);
        } else {
            String token = getToken(request);
            if(token == null){
                //can not access
                resolver.resolveException(request, response, null, new AuthException("Empty token!!!"));
                return;
            }

            // => has token
            //check the token is right? => get information account by token
            Account account;
            try{
                account = tokenService.getAccountByToken(token);
            } catch (ExpiredJwtException e){
                //response token hết hạn
                resolver.resolveException(request, response, null, new AuthException("Expired token!!!"));
                return;
            } catch(MalformedJwtException malformedJwtException){
                //response token is wrong
                resolver.resolveException(request, response, null, new AuthException("Invalid token!!!"));
                return;
            }

            // => token right
            // => can access web
            // => save information account
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    account, token, account.getAuthorities()
            );
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            //token ok, can access
            filterChain.doFilter(request, response);
        }
    }

}
