import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Configuration, DataModel, Field, Constraint, Dependency } from '../data.model';
import { DatamodelService } from '../services/datamodel.service';
import { ConfigurationService } from '../services/configuration.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-fields-list',
  templateUrl: './fields-list.component.html',
  styleUrls: ['./fields-list.component.css']
})

export class FieldsListComponent implements OnInit {
  configuration: Configuration;
  patientModel: DataModel;
  vaccineModel: DataModel;
  id: string;
  sub: Subscription;
  showDebug = true;

  constructor(private configurationService: ConfigurationService, private datamodelService: DatamodelService,
    private router: Router, private route: ActivatedRoute) {
          this.patientModel = this.datamodelService.createDataModel( '', [], []);
          this.vaccineModel = this.datamodelService.createDataModel( '', [], []);
          this.configuration = this.configurationService.createConfiguration('', []);
          this.configuration.datamodels.push(this.patientModel);
          this.configuration.datamodels.push(this.vaccineModel);

  }

  ngOnInit() {
      const ctrl = this;
      let id = '';
      this.sub = this.route.params.subscribe(params => {
        id = params['id'];
      });

      this.configurationService.getConfigurationById(id).subscribe(
              value => {
                ctrl.configuration = value;
                console.log('[GET] get Configuration successfully', value);
              }, error => {
               console.log('FAIL to send Configuration!');
              },
              () => {
                console.log('GET Configuration - now completed.');
              });

  }

  OnDestroy() {
    this.sub.unsubscribe();
  }

  addField(model: DataModel) {
   this.router.navigate(['add-field', this.configuration.id, model.id ]);
  }

  addDependency(model: DataModel) {
   this.router.navigate(['add-dependency', this.configuration.id, model.id ]);
  }

  deleteField(model: DataModel, field: Field) {
    console.log('on est dans le delete field');
    const i = this.configuration.datamodels.findIndex((datamodel: DataModel) => {
      return datamodel.id === model.id;
    });
    this.configuration.datamodels[i].fields = this.configuration.datamodels[i].fields.filter(f => f !== field);
    this.configurationService.updateConfiguration(this.configuration).subscribe(
      value => {
        console.log('[Update] delete fieldsend Configuration successfully', value);
      }, error => {
       console.log('FAIL to send Configuration!');
      },
      () => {
        console.log('POST Configuration - now completed.');
      });
  }

  deleteDependency(model: DataModel, dep: Dependency) {
    console.log('on est dans le delete dependency');
    const i = this.configuration.datamodels.findIndex((datamodel: DataModel) => {
      return datamodel.id === model.id;
    });
    this.configuration.datamodels[i].dependencies = this.configuration.datamodels[i].dependencies.filter(d => d !== dep);
    this.configurationService.postConfiguration(this.configuration).subscribe(
      value => {
        console.log('[POST] send Configuration successfully', value);
      }, error => {
       console.log('FAIL to send Configuration!');
      },
      () => {
        console.log('POST Configuration - now completed.');
      });
  }

  editField(field: Field, model: DataModel): void {
    localStorage.removeItem('editFieldId');
    localStorage.setItem('editFieldId', field.id.toString());
    this.router.navigate(['edit-field', this.configuration.id, model.id, field.name]);
  }

  saveConfiguration(config: Configuration) {
    this.configurationService.saveConfiguration(config);
     this.configurationService.postConfiguration(config).subscribe(
      value => {
        console.log('[POST] send Configuration successfully', value);
      }, error => {
       console.log('FAIL to send Configuration!');
      },
      () => {
        console.log('POST Configuration - now completed.');
      });

    this.router.navigate([`/manage`]);
  }

  saveAndGo(config: Configuration) {
    this.configurationService.saveConfiguration(config);
    this.router.navigate(['generate', config.id]);
  }

}
