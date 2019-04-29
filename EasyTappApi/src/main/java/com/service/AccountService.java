package com.service;

import java.time.LocalDateTime;

import com.constant.CommonConstant;
import com.dao.User;

public class AccountService {

	public static String generatevCode() {
		int value = (int) Math.round(Double.valueOf(Math.random() * 100000));
		return String.valueOf(value);
	}

	public static Boolean verifyAccount(final User user, final String vCode) {
		System.out.println("in verifyAccount:" + user.getUserName() + "," + vCode);

		System.out.println("Db vCode:" + user.getvCode());
		if (user.getvCode().equals(vCode)) {
			if (validatevCodeTs(user.getvCodeValidTs())) {
				user.setAccountVerified(Boolean.TRUE);
				return Boolean.TRUE;
			}
		}
		return Boolean.FALSE;
	}

	private static Boolean validatevCodeTs(final LocalDateTime inputvCodeTs) {
		LocalDateTime newvCodeTs = inputvCodeTs.plusMinutes(CommonConstant.VCODE_VALID_TS);
		System.out.println("newvCodeTs:" + newvCodeTs.toString());
		System.out.println("currentTs:" + LocalDateTime.now().toString());
		return newvCodeTs.isAfter(LocalDateTime.now());

	}
}
