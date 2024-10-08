package com.namtechie.org.service;

import com.namtechie.org.entity.Account;
import com.namtechie.org.entity.Customer;
import com.namtechie.org.repository.AccountRepository;
import com.namtechie.org.repository.CustomerRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service

public class TokenService {
        @Autowired
        AccountRepository accountRepository;

        public final String SECRET_KEY = "4bb6d1dfbafb64a681139d1586b6f1160d18159afd57c8c79136d7490630407d";


    private SecretKey getSignKey() {
            byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
            return Keys.hmacShaKeyFor(keyBytes);
        }

        //generate Token
        public String generateToken(Customer customer) {
            String token = Jwts.builder()
                    .subject(customer.getCustomerID() + "")
                    .issuedAt(new Date((System.currentTimeMillis())))
                    .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30))// dieTime is 30 minutes
                    .signWith(getSignKey())
                    .compact();
            return token;
        }

//    //verify Token
//    public Account getAccountByToken(String token) {
//        Claims claims = Jwts.parser()
//                .verifyWith(getSignKey())
//                .build()
//                .parseSignedClaims(token)
//                .getPayload();
//
//        String idString = claims.getSubject();
//        long id = Long.parseLong(idString);
//
//        return accountRepository.findAccountById(id);
//    }

        // Kiểm tra và lấy thông tin Account từ token
        public Account getAccountByToken(String token) {
            try {
                Claims claims = Jwts.parser()
                        .verifyWith(getSignKey())
                        .build()
                        .parseSignedClaims(token)
                        .getPayload();

                String idString = claims.getSubject();
                long id = Long.parseLong(idString);

                return accountRepository.findAccountById(id);

            } catch (ExpiredJwtException e) {
                throw new RuntimeException("Token đã hết hạn. Vui lòng đăng nhập lại.");
            } catch (Exception e) {
                throw new RuntimeException("Invalid token");
            }
        }
    }

