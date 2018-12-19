import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Configuration, DataModel, Field, Constraint , ConstraintGroup} from '../data.model';
import {Router, ActivatedRoute} from '@angular/router';
import {NgOption} from '@ng-select/ng-select';
import { DatamodelService } from '../services/datamodel.service';
import { ConfigurationService } from '../services/configuration.service';
import { Subscription } from 'rxjs';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-field',
  templateUrl: './edit-field.component.html',
  styleUrls: ['./edit-field.component.css']
})
export class EditFieldComponent implements OnInit {
  config: Configuration;
  patientModel: DataModel;
  vaccineModel: DataModel;
  constr: Constraint;
  id: string;
  model: string;
  field: string;
  sub: Subscription;

  constructor(private formBuilder: FormBuilder, private router: Router, private datamodelService: DatamodelService,
     private configurationService: ConfigurationService, private route: ActivatedRoute) {
          this.patientModel = this.datamodelService.createDataModel( '', [], []);
          this.vaccineModel = this.datamodelService.createDataModel( '', [], []);
          this.config = this.configurationService.createConfiguration('', []);
          this.config.datamodels.push(this.patientModel);
          this.config.datamodels.push(this.vaccineModel);
        this.createForm();
  }

  editForm: FormGroup;
  RangeForm: FormGroup;

  selectedfieldType = 'Type';
  selectedConstraint = { id: 'constraintId', name: 'constraintName', variables: []};
  fieldtypes = ['String', 'Date', 'Numeric'];
  variables = [];
  variable = '';
  prob = '';
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;


  constraintControl = new FormControl();

  constraintGroups: ConstraintGroup[] = [
    {
      name: 'Names',
      constraints: [
        { id: 'NameFirst', name: 'First Name', variables: null},
        { id: 'NameLast', name: 'Last Name', variables: null},
      ]
    },
  {
      name: 'Adresses',
      constraints: [
        { id: 'Street', name: 'Street', variables: null},
        { id: 'City', name: 'City', variables: null},
        { id: 'ZipCode', name: 'Zip Code', variables: null},
        { id: 'State', name: 'State', variables: null},
        { id: 'Country', name: 'Country', variables: null}
      ]
    },
    {
      name: 'Date',
      constraints: [
        { id: 'Range1', name: 'Random date between two specified dates', variables: []},
        { id: 'Range2', name: 'Random date between a specified date and another data element', variables: []},
        { id: 'Range3', name: 'Random date between another data element of type Date and a specified date', variables: []},
        { id: 'Range4', name: 'Random date between two other data elements of type Date', variables: []},
      ]
    },
    {
      name: 'Numeric',
      disabled: false,
      constraints: [
        {id: 'UniqueID', name: 'Unique identifier value', variables: null},
        {id: 'PhoneNumber', name: 'Phone Number ', variables: null},
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
    {
      name: 'Vaccines',
      constraints: [
        { id: 'CVX', name: 'CVX code', variables: null},
        { id: 'Manufacturer', name: 'Random Vaccine manufacturer', variables: null},
      ]
    }
  ];


  createForm() {
    this.editForm = this.formBuilder.group(
    {
      id: [],
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
      const ctrl = this;
      this.sub = this.route.params.subscribe(params => {
        ctrl.id = params['id'];
        ctrl.model = params['model'];
        ctrl.field = params['field'];
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

  update() {
    console.log('selected constraint ' + this.selectedConstraint.name);
 }

  cancel() {
    this.router.navigate(['manage', this.id]);
  }


  updateField( name: string, fieldtype: string, constraint: Constraint) {
    const i = this.config.datamodels.findIndex((datamodel: DataModel) => {
      return datamodel.id === this.model;
    });
    const j = this.config.datamodels[i].fields.findIndex((field: Field) => {
      return field.name === this.field;
    });
    this.config.datamodels[i].fields[j].name = name;
    this.config.datamodels[i].fields[j].fieldtype = fieldtype;
    this.config.datamodels[i].fields[j].constraint = constraint;
  }

 addVariable( variable: string ) {
   if (this.selectedConstraint.id !== 'Range' && variable) {
    console.log('on est dans le addVariable() ' + variable);
    this.selectedConstraint.variables.push(variable);
    } else {
   console.log('on ne push pas de variable ' + variable);
   }
 }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.selectedConstraint.variables.push(this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day);
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.selectedConstraint.variables.push(this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day);
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }



}
