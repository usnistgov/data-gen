package com.datagen.server.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.datagen.server.model.Configuration;
import com.datagen.server.repository.ConfigurationRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController()
public class ConfigurationController {
		
	@Autowired
	ConfigurationRepository repository;
	
	@PostMapping(value="/templates/{id}")
	public ResponseEntity<Configuration> createConfiguration(@PathVariable String id, @RequestBody Configuration configuration) {
		System.out.println("Post Configuration: " + configuration);
		repository.save(configuration);
		return ResponseEntity.ok(configuration);
	}
	
	@GetMapping("/templates")
	public List<Configuration> getAllConfigurations() {
		System.out.println("Get all Configurations...");
		List<Configuration> configurations = new ArrayList<>();
		repository.findAll().forEach(configurations::add);
		return configurations;
	}
	
	@GetMapping("/templates/{id}")
	public Configuration getConfById(@PathVariable String id) {
		 Configuration conf = repository.findById(id);
		 return conf;
	}
	
	@DeleteMapping(value="/templates/{id}")
	public ResponseEntity<String> deleteConfiguration(@PathVariable("id") String id) {
		System.out.println("Delete Configuration with ID = " + id + "...");
		repository.deleteById(id);
		return new ResponseEntity<>("Configuration has been deleted!", HttpStatus.OK);
	}


	@PutMapping("/templates/{id}")
	public ResponseEntity<Configuration> updateConfiguration(@PathVariable("id") String id, @RequestBody Configuration configuration) {
		System.out.println("Update Configuration with ID = " + id + "...");
		Configuration configurationData = repository.findById(id);
		if (configurationData != null) {
			Configuration _configuration = configurationData;
			_configuration.setName(configuration.getName());
			_configuration.setDatamodels(configuration.getDatamodels());
			return new ResponseEntity<>(repository.save(_configuration), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}


}
