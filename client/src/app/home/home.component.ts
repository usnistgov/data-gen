import { Component, OnInit, Inject } from '@angular/core';
import {Router} from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DatamodelService} from '../services/datamodel.service';
import {ConfigurationService } from '../services/configuration.service';
import {Configuration, DataModel} from '../data.model';
import {NewmodeldialogComponent} from './newmodeldialog/newmodeldialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private datamodelservice: DatamodelService, private configurationservice: ConfigurationService, private router: Router,
     public dialog: MatDialog) { }

  ngOnInit() {
  }

  manageConfiguration(confId: string) {
    this.router.navigate([`/manage/${confId}`]);
  }

  openNewConfigurationDialog() {
    const dialogRef = this.dialog.open(NewmodeldialogComponent, {
        width: '250px',
      });

      dialogRef.afterClosed().subscribe(result => {
          if (!result) {
              return;
          }
          const configuration = this.configurationservice.createConfiguration(result, []);

          configuration.datamodels.push(this.datamodelservice.createDataModel('Patient Model', [], []));
          configuration.datamodels.push(this.datamodelservice.createDataModel('Vaccine Model', [], []));

          this.manageConfiguration(configuration.id);
    });

  }
}
