package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.dao.Counter;
import com.repository.CounterRepository;

@Component
public class CounterService {

	@Autowired
	CounterRepository counterRepository;

	public int getCounter() {

		List<Counter> counterList = counterRepository.findAll();
		if (counterList.size()==0) {
			Counter counter = new Counter("1", 1);
			counterRepository.insert(counter);
			return 1;
		} else {
			Counter counter = counterRepository.findById("1").get();
			int nextValue=counter.getSeq()+1;
			counter.setSeq(nextValue);
			counterRepository.save(counter);
			counterList.forEach(c -> System.out.println(c.toString()));
			return nextValue;
		}
	}
}
