import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Configuration, DataModel, Field, Constraint, ConditionalConstraint, ConstraintGroup } from '../data.model';
import {Router, ActivatedRoute} from '@angular/router';
import {NgOption} from '@ng-select/ng-select';
import { DatamodelService } from '../services/datamodel.service';
import { ConfigurationService } from '../services/configuration.service';
import { Subscription } from 'rxjs';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-dependency',
  templateUrl: './add-dependency.component.html',
  styleUrls: ['./add-dependency.component.css']
})

export class AddDependencyComponent implements OnInit {
  addForm: FormGroup;
  config: Configuration;
  patientModel: DataModel;
  vaccineModel: DataModel;
  selectedConstraint = { id: 'constraintId', name: 'constraintName', variables: []};
  variables = [];
  variable = '';
  prob = '';
  constr: Constraint;
  id: string;
  name: string;
  sub: Subscription;
  value1: string;
  operator: string;
  value2: string;
  i: number;

  constructor(private formBuilder: FormBuilder, private router: Router, private datamodelService: DatamodelService,
    private configurationService: ConfigurationService, private route: ActivatedRoute) {
          this.config = this.configurationService.createConfiguration('', []);
          this.createForm();
  }
 // field1 = this.datamodelService.createField('', '', { id: 'constraintId', name: 'constraintName', variables: []});
  Operators = ['After', 'Before', 'Equal to', 'Not Equal to', 'Less than', 'More than'];
  selectedField =  this.datamodelService.createField('', '', { id: 'constraintId', name: 'constraintName', variables: []});
  condconstr = this.datamodelService.createConditionalConstraint( this.selectedField , '', '', this.selectedConstraint);

  dependentfields: Field[];

  constraintControl = new FormControl();

  constraintGroups: ConstraintGroup[] = [
    {
      name: 'Names',
      constraints: [
        { id: 'MaleNameFirst', name: 'Male First Name', variables: null},
        { id: 'FemaleNameFirst', name: 'Female First Name', variables: null},
      ]
    },
    {
      name: 'Custom values',
      constraints: [
        {id: 'SingleValue', name: 'Single value - Use the same value for every entry', variables: [] },
        {id: 'FromListRand', name: 'List of values - Select data element randomly from a list of values', variables: [] },
        {id: 'FromListProb', name: 'List of values - Select data element from a list of values given probablities', variables: []},
        {id: 'SameValField', name: 'Use same value as other data element', variables: []}
      ]
    },

  ];

    createForm() {
    this.addForm = this.formBuilder.group(
    {
      id: [],
    });
  }

  ngOnInit() {
    let ctrl = this;

    this.sub = this.route.params.subscribe(params => {
        ctrl.id = params['id'];
        ctrl.name = params['model'];
    });
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
  }

  createCondConstraint(selectedField: Field, operator: string, variable: string , selectedConstraint: Constraint): ConditionalConstraint {
      return this.condconstr = this.datamodelService.createConditionalConstraint(selectedField, operator, variable , selectedConstraint);
  }


  addDependency( field1: Field, dependentfields: Field[], condconstr: ConditionalConstraint) {
    let newDep = this.datamodelService.createDependency(field1, dependentfields, condconstr);
   // for (const dependentfield of dependentfields) {
   //     console.log('on est dans le for' + dependentfield.name);
   //     newDep.dependentfields.push(dependentfield);
   //     console.log(newDep.dependentfields.indexOf(dependentfield));
   // }
    console.log(this.name + '   on est dans addDependency');
    if (this.name === 'patient-model') {
      console.log(this.name + '   on est dans le if ===');
      this.config.datamodels[0].dependencies.push(newDep);
    }
    if (this.name === 'vaccine-model') {
      this.config.datamodels[1].dependencies.push(newDep);
    }
    this.configurationService.postConfiguration( this.config).subscribe(
              value => {
                console.log('[update post] get Configuration successfully', value);
              }, error => {
               console.log('FAIL to send Configuration!');
              },
              () => {
                console.log('update post Configuration - now completed.');
              });
    this.router.navigate(['manage', this.id]);
    }

  cancel() {
    this.router.navigate(['manage', this.id]);
  }


}







