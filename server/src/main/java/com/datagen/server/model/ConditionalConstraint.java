package com.datagen.server.model;

public class ConditionalConstraint {
	Field value1;
	String operator;
    String value2;
    Constraint action;
    
    public ConditionalConstraint() {}
    
    public ConditionalConstraint(Field value1, String operator,String value2 ,Constraint action) {
		this.value1=value1;
		this.operator= operator;
		this.value2=value2;
		this.action=action;
	}
    
    public void setValue1(Field value1) {
		this.value1 = value1;
	}
 
	public Field getValue1() {
		return this.value1;
	}
	
	public void setOperator(String operator) {
		this.operator = operator;
	}
 
	public String getOperator() {
		return this.operator;
	}
	
	public void setValue2(String value2) {
		this.value2 = value2;
	}
 
	public String getValue2() {
		return this.value2;
	}
	
	public void setAction(Constraint action) {
		this.action = action;
	}
 
	public Constraint getAction() {
		return this.action;
	}
}
