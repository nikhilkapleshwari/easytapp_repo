package com.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;

public class RestService {

	static List<BasicNameValuePair> nameValuePairs;

	static {
		nameValuePairs = new ArrayList<>();
	}

	@SuppressWarnings("resource")
	public static int hitRestUrlForvCode(final String userName, final String vCode, final String endpoint) {

		try {

			HttpClient client = new DefaultHttpClient();
			HttpPost post = new HttpPost(endpoint);

			RestService.nameValuePairs.add(new BasicNameValuePair("userName", userName));
			nameValuePairs.add(new BasicNameValuePair("vCode", vCode));
			post.setEntity(new UrlEncodedFormEntity(nameValuePairs));
			HttpResponse response = client.execute(post);
			BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
			String line = "";
			while ((line = rd.readLine()) != null) {
				System.out.println(line);
			}
		} catch (IOException e) {
			e.printStackTrace();
			return 0;
		} finally {
			RestService.nameValuePairs.clear();
		}
		return 0;
	}

	public static int hitRestUrlForToken(final String userName, final String token, final String endpoint) {

		try {

			HttpClient client = new DefaultHttpClient();
			HttpPost post = new HttpPost(endpoint);

			RestService.nameValuePairs.add(new BasicNameValuePair("userName", userName));
			nameValuePairs.add(new BasicNameValuePair("token", token));
			post.setEntity(new UrlEncodedFormEntity(nameValuePairs));
			HttpResponse response = client.execute(post);
			BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
			String line = "";
			while ((line = rd.readLine()) != null) {
				System.out.println(line);
			}
		} catch (IOException e) {
			e.printStackTrace();
			return 0;
		} finally {
			RestService.nameValuePairs.clear();
		}
		return 0;
	}
}
