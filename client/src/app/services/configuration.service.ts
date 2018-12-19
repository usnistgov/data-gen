import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Configuration, DataModel, Field, Dependency , Constraint, ConditionalConstraint} from '../data.model';
import { DatamodelService} from '../services/datamodel.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private url = '/templates';

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private idCounter;
  private configurations: {[id: string]: Configuration};
  private currentConfId: string;

  constructor(private http: HttpClient, private datamodelservice: DatamodelService) {
    this.configurations = {};
    this.idCounter = 0;
   }

  public newSession(confId: string) {
    this.currentConfId = confId;
  }

  public createConfiguration(name: string, datamodels: DataModel[])  {
    const newConf: Configuration = {
      id: name.replace(/\s+/g, '-').toLowerCase(),
      name,
      datamodels: datamodels.map(m => this.datamodelservice.createDataModel(m.name, m.fields, m.dependencies)),
    };
    this.configurations[newConf.id] = newConf;
     return newConf;
  }

  public getConfById(id: string): Configuration {
    return this.configurations[id];
  }

  public saveConfiguration(conf: Configuration) {
    for (const confId of Object.keys(this.configurations)) {
        if (confId === conf.id) {
          this.configurations[confId].name = conf.name;
          this.configurations[confId].datamodels = conf.datamodels;
        }
      }
  }

  public getConfigurationsList(): Observable<any> {
    return this.http.get(`/templates/`, { headers: this.headers });
  }

  public getConfigurationById(id: string): Observable<Configuration> {
    return this.http.get<Configuration>(`/templates/${id}`, { headers: this.headers });
  }

  public postConfiguration(config: Configuration): Observable<Object> {
    return this.http.post(`/templates/${config.id}`, config, { headers: this.headers });
  }

  public updateConfiguration(config: Configuration): Observable<Object> {
    return this.http.put(`/templates/${config.id}`, config, { headers: this.headers });
  }

  public deleteConfiguration(id: string): Observable<any> {
    return this.http.delete(`/templates/${id}`, { responseType: 'text' });
  }


}
