import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material';
import { Router } from '@angular/router';
import { DatamodelService } from '../services/datamodel.service';
import { Configuration, DataModel } from '../data.model';
import { NewmodeldialogComponent } from '../home/newmodeldialog/newmodeldialog.component';
import { ConfigurationService } from '../services/configuration.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-datamodel-manager',
  templateUrl: './datamodel-manager.component.html',
  styleUrls: ['./datamodel-manager.component.css']
})

export class DatamodelManagerComponent implements OnInit {
  public configurations: any;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private configurationService: ConfigurationService, private router: Router, private http: HttpClient) { }

    ngOnInit() {
      this.reloadData();
    }

    public reloadData() {
      this.http.get(`/templates/`, { headers: this.headers }).subscribe(data => {this.configurations = data; });
    }

    public goToConfiguration(confId: string) {
      this.router.navigate([`/manage/${confId}`]);
    }

  public deleteConfiguration(confId: string) {
    this.configurationService.deleteConfiguration(confId).subscribe(
              value => {
                console.log('[DELETE] template successfully', value);
              }, error => {
               console.log('FAIL to delete Template!');
              },
              () => {
                console.log('DELETE template - now completed.');
              });
    this.reloadData();
  }

}
