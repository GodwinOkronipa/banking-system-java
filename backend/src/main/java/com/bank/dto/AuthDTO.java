package com.bank.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDTO {

    public static class RegisterRequest {
        @NotBlank(message = "Full name is required")
        private String fullName;

        @NotBlank(message = "Email is required")
        @Email(message = "Email should be valid")
        private String email;

        @NotBlank(message = "Password is required")
        @Size(min = 8, message = "Password must be at least 8 characters")
        private String password;

        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class LoginRequest {
        @NotBlank(message = "Email is required")
        @Email(message = "Email should be valid")
        private String email;

        @NotBlank(message = "Password is required")
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class AuthResponse {
        private String token;
        private String type = "Bearer";
        private Long id;
        private String fullName;
        private String email;
        private String role;

        public AuthResponse(String token, Long id, String fullName, String email, String role) {
            this.token = token;
            this.id = id;
            this.fullName = fullName;
            this.email = email;
            this.role = role;
        }

        public String getToken() { return token; }
        public String getType() { return type; }
        public Long getId() { return id; }
        public String getFullName() { return fullName; }
        public String getEmail() { return email; }
        public String getRole() { return role; }
    }
}
