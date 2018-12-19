package com.datagen.server.model;

public class Dependency {
	Field field1;
	Field[] dependentfields;
	ConditionalConstraint cond;
	
	public Dependency() {}
	
	public Dependency(Field field1, Field[] dependentfields, ConditionalConstraint cond) {
		this.field1=field1;
		this.dependentfields= dependentfields;
		this.cond=cond;
	}
	
	public void setField1(Field field1) {
		this.field1 = field1;
	}
 
	public Field getField1() {
		return this.field1;
	}
	
	public void setDependentfields(Field[] dependentfields) {
		this.dependentfields = dependentfields;
	}
 
	public Field[] getDependentfields() {
		return this.dependentfields;
	}
	
	public void setCond(ConditionalConstraint cond) {
		this.cond = cond;
	}
 
	public ConditionalConstraint getCond() {
		return this.cond;
	}
	
}
