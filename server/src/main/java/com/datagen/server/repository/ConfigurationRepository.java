package com.datagen.server.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import com.datagen.server.model.Configuration;
import com.datagen.server.model.DataModel;


public interface ConfigurationRepository extends MongoRepository<Configuration, DataModel>{
	Configuration findById(String id);

	void deleteById(String id);
}
