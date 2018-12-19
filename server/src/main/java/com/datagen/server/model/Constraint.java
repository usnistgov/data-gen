package com.datagen.server.model;

public class Constraint {
	public String id;
	public String name;
	public String[] variables;
	
	public Constraint() {}
	
	public Constraint(String id, String name, String[] variables) {
		this.name=name;
		this.variables=variables;
	}
	public void setName(String name) {
		this.name = name;
	}
 
	public String getName() {
		return this.name;
	}
	public void setId(String id) {
		this.id = id;
	}
 
	public String getId() {
		return this.id;
	}
	
	public void setVariables(String[] variables) {
		this.variables = variables;
	}
 
	public String[] getVariables() {
		return this.variables;
	}

}
