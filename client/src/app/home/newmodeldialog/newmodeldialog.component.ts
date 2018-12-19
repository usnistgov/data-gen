import { Configuration, DataModel } from '../../data.model';
import { ConfigurationService } from '../../services/configuration.service';
import { DatamodelService } from '../../services/datamodel.service';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-newmodeldialog',
  templateUrl: './newmodeldialog.component.html',
  styleUrls: ['./newmodeldialog.component.css']
})
export class NewmodeldialogComponent {
  name: string;
  config: Configuration;
  patientModel: DataModel;
  vaccineModel: DataModel;
  constructor(private configurationService: ConfigurationService, private datamodelService: DatamodelService,
    public dialogRef: MatDialogRef<NewmodeldialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
        this.dialogRef.close();
    }

    ok() {
        if (!!this.name) {
           this.dialogRef.close(this.name);
          // this.patientModel = this.datamodelService.createDataModel('Patient Model', [], []);
          // this.vaccineModel = this.datamodelService.createDataModel('Vaccine Model', [], []);
           this.config = this.configurationService.createConfiguration(this.name, []);
           this.config.datamodels.push(this.datamodelService.createDataModel('Patient Model', [], []));
           this.config.datamodels.push(this.datamodelService.createDataModel('Vaccine Model', [], []));

           console.log('created configuration' + this.config.name);
           this.configurationService.postConfiguration(this.config).subscribe(
              value => {
                console.log('[POST] send Configuration successfully', value);
              }, error => {
               console.log('FAIL to send Configuration!');
              },
              () => {
                console.log('POST Configuration - now completed.');
              });
                }
            }

    cancel() {
        this.dialogRef.close();
    }


}
