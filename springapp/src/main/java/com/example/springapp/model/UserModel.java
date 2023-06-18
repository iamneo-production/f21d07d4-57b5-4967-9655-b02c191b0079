package com.example.springapp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="users")
public class UserModel {
    
    @Id
    private String username;
    @Column(nullable = false,unique = true)
    private String email;
    private String password;
    private String mobileNumber;
    private String userRole;

    public UserModel() {
    }

    public UserModel(String userRole, String email, String username, String mobileNumber, String password) {
        this.userRole = userRole;
        this.email = email;
        this.username = username;
        this.mobileNumber = mobileNumber;
        this.password = password;
    }

    public String getUserRole() {
        return userRole;
    }
    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getMobileNumber() {
        return mobileNumber;
    }
    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "sample [userRole=" + userRole + ", email=" + email + ", username=" + username + ", mobileNumber="
                + mobileNumber + ", password=" + password + "]";
    }
}
