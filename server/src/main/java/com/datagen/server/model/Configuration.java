package com.datagen.server.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "templates")
public class Configuration {
		
	public String id;
	public String name;
	public DataModel[] datamodels;
	
	public Configuration() {}
	
	public Configuration(String id,String name, DataModel[] datamodels) {
		this.id=id;
		this.name = name;
		this.datamodels = datamodels;
	}
	
	public void setId(String id) {
		this.id = id;
	}
 
	public String getId() {
		return this.id;
	}
 
	public void setName(String name) {
		this.name = name;
	}
 
	public String getName() {
		return this.name;
	}
 
	public void setDatamodels(DataModel[] datamodels) {
		this.datamodels = datamodels;
	}
 
	public DataModel[] getDatamodels() {
		return this.datamodels;
	}
 
}
