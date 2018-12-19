export interface Configuration {
  id: string;
  name: string;
  datamodels: DataModel[];
}
export interface DataModel {
    id: string;
    name: string;
    fields: Field[];
    dependencies: Dependency[];
}

export interface Field {
    id: string;
    name: string;
    fieldtype: string;
    constraint: Constraint;
}

export interface Dependency {
  field1: Field;
  dependentfields: Field[];
  cond: ConditionalConstraint;
}

export interface Constraint {
  id: string;
  name: string;
  variables?: string[];
}

export interface ConditionalConstraint {
  value1: Field;
  operator: string;
  value2: string;
  action: Constraint;
}
export interface ConstraintGroup {
  disabled?: boolean;
  name: string;
  constraints: Constraint[];
}
