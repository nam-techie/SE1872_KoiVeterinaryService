package com.namtechie.org.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        final Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "dxxrlgi21");
        config.put("api_key", "816468662669557");
        config.put("api_secret", "a_z6VzYFfc61PXar9c3RuFJd9Vw");
        return new Cloudinary(config);
    }
}
