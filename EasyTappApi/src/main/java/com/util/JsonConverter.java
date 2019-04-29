package com.util;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonConverter {
	
	private JsonConverter() {
		
	}
	
	static {
		JsonConverter.objMapper = new ObjectMapper();
	}
	private static ObjectMapper objMapper;
	
	public static JsonNode getJsonNode(final String json) {
		JsonNode actualObj = null;
		ObjectMapper mapper = new ObjectMapper();
		try {
			actualObj = mapper.readTree(json);
			return actualObj;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return actualObj;
	}
	
	public static String objToJsonConverter(final Object obj) {
		try {
			System.out.println(objMapper.writeValueAsString(obj));
			return objMapper.writeValueAsString(obj);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static Object jsonToObjConverter(final String json, final Class classType) {
		
		try {
			return objMapper.readValue(json, classType);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
}
