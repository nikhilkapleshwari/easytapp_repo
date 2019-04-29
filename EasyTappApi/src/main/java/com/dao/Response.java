package com.dao;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Setter
@Getter
public class Response {

	private String message;
	private String token;
	private String vCode;
	private Boolean isAccountVerified;
	
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getvCode() {
		return vCode;
	}
	public void setvCode(String vCode) {
		this.vCode = vCode;
	}
	public Boolean getIsAccountVerified() {
		return isAccountVerified;
	}
	public void setIsAccountVerified(Boolean isAccountVerified) {
		this.isAccountVerified = isAccountVerified;
	}

}
