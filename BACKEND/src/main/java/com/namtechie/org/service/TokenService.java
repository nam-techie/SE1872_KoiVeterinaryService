package com.namtechie.org.service;

import com.namtechie.org.entity.Account;
import com.namtechie.org.exception.ExpiredJwtException;
import com.namtechie.org.repository.AccountRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

@Service
public class TokenService {

    // Danh sách lưu token bị hủy cùng thời gian hết hạn
    private Map<String, Date> blacklistedTokens = new HashMap<>();

    @Autowired
    AccountRepository accountRepository;

    public final String SECRET_KEY = "4bb6d1dfbafb64a681139d1586b6f1160d18159afd57c8c79136d7490630407d";

    private SecretKey getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Tạo token mới
    public String generateToken(Account account) {
        return Jwts.builder()
                .subject(account.getId() + "")
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // Token sống trong 30 phút
                .signWith(getSignKey())
                .compact();
    }

    public String generateTokenByEmail(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // Token sống trong 30 phút
                .signWith(getSignKey())
                .compact();
    }

    // Đưa token vào danh sách đen với thời gian hết hạn
    public void invalidateToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        // Lưu token vào danh sách đen với thời gian hết hạn
        blacklistedTokens.put(token, claims.getExpiration());
    }

    // Kiểm tra và lấy thông tin Account từ token
    public Account getAccountByToken(String token) {
        cleanUpBlacklistedTokens(); // Xóa các token đã hết hạn trước khi kiểm tra

        if (blacklistedTokens.containsKey(token)) {
            throw new RuntimeException("Token này đã bị hủy.");
        }

        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(getSignKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            String idString = claims.getSubject();
            long id = Long.parseLong(idString);

            return accountRepository.findAccountById(id);
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("Token đã hết hạn. Vui lòng đăng nhập lại.");
        } catch (Exception e) {
            throw new RuntimeException("Token không hợp lệ.");
        }
    }

    // Xóa các token đã hết hạn khỏi danh sách đen
    private void cleanUpBlacklistedTokens() {
        Iterator<Map.Entry<String, Date>> iterator = blacklistedTokens.entrySet().iterator();
        Date now = new Date();

        while (iterator.hasNext()) {
            Map.Entry<String, Date> entry = iterator.next();
            // Nếu token đã hết hạn, loại bỏ nó khỏi danh sách đen
            if (entry.getValue().before(now)) {
                iterator.remove();
            }
        }
    }

    public boolean isTokenBlacklisted(String token) {
        cleanUpBlacklistedTokens(); // Xóa các token đã hết hạn trước khi kiểm tra
        return blacklistedTokens.containsKey(token);
    }

    public String getToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        return authHeader.substring(7); // Bỏ qua "Bearer "
    }

}