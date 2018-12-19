import { Injectable } from '@angular/core';
import {DataModel, Field, Dependency , Constraint, ConditionalConstraint} from '../data.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatamodelService {
  private idCounter;
  private dataModels: {[id: string]: DataModel};
  private currentDataModelId: string;
  private currentFieldNumber: number;

  constructor(private http: HttpClient) {
    this.dataModels = {};
    this.idCounter = 0;
   }

  public newSession(datamodelId: string) {
    this.currentDataModelId = datamodelId;
    this.currentFieldNumber = 0;
  }

  public createDataModel(name: string, fields: Field[], dependencies: Dependency[]) {
    const newDataModel: DataModel = {
      id: name.replace(/\s+/g, '-').toLowerCase(),
      name,
      fields: fields.map(f => this.createField(f.name, f.fieldtype, f.constraint)),
      dependencies: dependencies.map(d => this.createDependency(d.field1, d.dependentfields, d.cond)),
    };
    this.dataModels[newDataModel.id] = newDataModel;
    return newDataModel;
  }

  public createDependency(field1: Field, dependentfields: Field[], cond: ConditionalConstraint) {
  this.idCounter++;
    return {
      id: this.idCounter,
      field1,
      dependentfields: dependentfields.map(f => this.createField(f.name, f.fieldtype, f.constraint)),
      cond,
    };
  }

  public createField(name: string, fieldtype: string, constraint: Constraint): Field {
    this.idCounter++;
    return {
      id: this.idCounter,
      name,
      fieldtype,
      constraint: this.createConstraint(constraint.id, constraint.name, constraint.variables),
    };
  }
  public createConstraint(id: string, name: string, variables: string[]): Constraint {
    return {
      id,
      name,
      variables,
    };
  }

  public createConditionalConstraint(value1: Field, operator: string, value2: string, action: Constraint): ConditionalConstraint {
    return {
      value1,
      operator,
      value2,
      action,
    };
  }

  public saveDataModel(dataModel: DataModel) {
    for (const fId of Object.keys(this.dataModels)) {
      if (fId === dataModel.id) {
        this.dataModels[fId].name = dataModel.name;
        this.dataModels[fId].fields = dataModel.fields;
        this.dataModels[fId].dependencies = dataModel.dependencies;
      }
    }
  }

    public getDataModels(): DataModel[] {
    return Object.keys(this.dataModels).map(id => this.getDataModelById(id));
    }

  public getDataModelById(id: string): DataModel {
    return this.dataModels[id];
  }

  public deleteField(confId: string, modelId: string, fieldId: string) {
   // return this.http.delete(`/templates/${confId}/${modelId}/${fieldId}`, { responseType: 'text' });
  }


}
