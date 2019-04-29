package com.dao;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Document(collection = "User")
public class User {

	public User(String userId, String userName, String password, String role, boolean isAccountVerified, String vCode,
			LocalDateTime vCodeValidTs) {
		this.userId = userId;
		this.userName = userName;
		this.password = password;
		this.role = role;
		this.isAccountVerified = isAccountVerified;
		this.vCode = vCode;
		this.vCodeValidTs = vCodeValidTs;
	}

	public User(String name, String password, String role, boolean isAccountVerified, String vCode,
			LocalDateTime vCodeValidTs) {
		this.userName = name;
		this.password = password;
		this.role = role;
		this.isAccountVerified = isAccountVerified;
		this.vCode = vCode;
		this.vCodeValidTs = vCodeValidTs;
	}

	public User(String userId, String userName, String password, String role, boolean isAccountVerified, String vCode) {
		this.userId = userId;
		this.userName = userName;
		this.password = password;
		this.role = role;
		this.isAccountVerified = isAccountVerified;
		this.vCode = vCode;
	}

	public User() {
	}

	@Id
	private String userId;
	private String userName;
	private String password;
	private String role;
	private boolean isAccountVerified;
	private String vCode;

	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	private LocalDateTime vCodeValidTs;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String id) {
		this.userId = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public boolean isAccountVerified() {
		return isAccountVerified;
	}

	public void setAccountVerified(boolean isAccountVerified) {
		this.isAccountVerified = isAccountVerified;
	}

	public String getvCode() {
		return vCode;
	}

	public void setvCode(String vCode) {
		this.vCode = vCode;
	}

	public LocalDateTime getvCodeValidTs() {
		return vCodeValidTs;
	}

	public void setvCodeValidTs(LocalDateTime vCodeValidTs) {
		this.vCodeValidTs = vCodeValidTs;
	}
}
