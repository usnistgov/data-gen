package com.datagen.server.model;

public class DataModel {
	public String id;
	public String name;
	public Field[] fields;
	public Dependency[] dependencies;
	
	public DataModel() {}
	
	public DataModel(String id, String name , Field[] fields, Dependency[] dependencies) {
		this.name=name;
		this.fields=fields;
		this.dependencies=dependencies;
	}
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id= id;
	}
 
	public void setName(String name) {
		this.name = name;
	}
 
	public String getName() {
		return this.name;
	}
 
	public void setFields(Field[] fields) {
		this.fields = fields;
	}
	
	public Field[] setFields() {
		return this.fields;
	}
 
	public Dependency[] getDependencies() {
		return this.dependencies;
	}
	
	public void setDependencies(Dependency[] dependencies) {
	 this.dependencies=dependencies;
	}
 

}
