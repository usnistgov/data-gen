package com.datagen.server.model;

public class Field {
	public String id;
	public String name;
	public String fieldtype;
	public Constraint constraint;
	public String value;
	
	public Field() {}
	
	public Field(String id, String name, String fieldtype, Constraint constraint, String value) {
		this.name=name;
		this.fieldtype=fieldtype;
		this.constraint=constraint;
		this.value=value;
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
 
	public void setfieldtype(String fieldtype) {
		this.fieldtype = fieldtype;
	}
 
	public String getfieldtype() {
		return this.fieldtype;
	}
	
	public void setConstraint(Constraint constraint) {
		this.constraint = constraint;
	}
 
	public Constraint getConstraint() {
		return this.constraint;
	}
	
	public void setValue(String value) {
		this.value = value;
	}
 
	public String getValue() {
		return this.value;
	}
 
 

}
