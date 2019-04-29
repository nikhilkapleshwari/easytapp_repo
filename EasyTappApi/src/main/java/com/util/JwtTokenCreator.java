package com.util;

import java.security.Key;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;

public class JwtTokenCreator {

	public static final String SECRET = "SecretKeyToGenJWTs";
	public static final long EXPIRATION_TIME = 1800000; // 30 mins
	public static final String HEADER_STRING = "\"{  \\\"alg\\\": \\\"HS512\\\"}\"";
	public static final String SIGN_UP_URL = "/users/sign-up";

	private static final Key secret;
	private static final Key signingKey;
	static {
		secret = MacProvider.generateKey();
		SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
		byte[] apiKeySecretBytes = secret.getEncoded();
		signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());
		System.out.println(DatatypeConverter.printHexBinary(signingKey.getEncoded()));
	}

	private JwtTokenCreator() {

	}

	public static String generateToken(final String subject) {

		JwtBuilder jwtBuilder = Jwts.builder().setSubject(subject).signWith(SignatureAlgorithm.HS256, signingKey);

		jwtBuilder.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME));

		return jwtBuilder.compact();
	}

	public static String validateToken(final String token) {

		Claims claims = null;
		try {
			claims = Jwts.parser().setSigningKey(signingKey).parseClaimsJws(token).getBody();
			return claims.getSubject();
		} catch (Exception e) {

			e.printStackTrace();
			return null;
		}
	}
}
