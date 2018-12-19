import { Configuration, DataModel, Field } from '../data.model';
import { ConfigurationService } from '../services/configuration.service';
import { DatamodelService } from '../services/datamodel.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

 export interface GenerationMethod {
      datamodelName: string;
      methodName: string;
    }

@Component({
  selector: 'app-generation',
  templateUrl: './generation.component.html',
  styleUrls: ['./generation.component.css']
})


export class GenerationComponent implements OnInit {
  sub: Subscription;
  config: Configuration;
  id: string;
  currentMethod: string;
  generationSettings: {
    [index: string]: string
  };
  selectedfield: Field;
  nb: number;
  methods = ['input a fixed number', 'number varies depending on other model', 'number varies depending on other data element value'];
  Operators = ['After', 'Before', 'Equal to', 'Not Equal to', 'Less than', 'More than'];
  fixNumber: string;
  date = new FormControl(new Date());
  i: number;
  opControl = new FormControl();


  constructor( private datamodelService: DatamodelService, private configurationService: ConfigurationService,
    private route: ActivatedRoute, private router: Router) {  }

  ngOnInit() {
    this.selectedfield = this.datamodelService.createField('', '', this.datamodelService.createConstraint('', '', []));
    this.generationSettings = {};
    this.selectedfield = this.datamodelService.createField('', '', this.datamodelService.createConstraint('', '', []));
    const ctrl = this;
      this.sub = this.route.params.subscribe(params => {
        ctrl.id = params['id'];
        console.log(ctrl.id);
        this.configurationService.getConfigurationById(ctrl.id).subscribe(
              value => {
                ctrl.config = value;
                console.log('[GET] get Configuration successfully', value);
              }, error => {
               console.log('FAIL to send Configuration!');
              },
              () => {
                console.log('GET Configuration - now completed.');
              });
        this.nb = ctrl.config.datamodels.length;
          console.log(this.nb);
         for (const model of this.config.datamodels) {
              this.generationSettings[model.name] = '';
        }

    });

 }

  setGenerationMethod( model: DataModel, method: string) {
    this.generationSettings[model.name] = method;
  }

  cancel() {
    this.router.navigate(['manage', this.id]);
  }



}
