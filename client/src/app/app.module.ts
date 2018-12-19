import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatCardModule, MatIconModule, MatCheckboxModule, MatToolbarModule, MatDialogModule,
   MatFormFieldModule, MatInputModule} from '@angular/material';
import {MatNativeDateModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MDBBootstrapModule, DropdownModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewmodeldialogComponent } from './home/newmodeldialog/newmodeldialog.component';
import { FieldsListComponent } from './fields-list/fields-list.component';
import { DatamodelManagerComponent } from './datamodel-manager/datamodel-manager.component';
import { AddFieldComponent } from './add-field/add-field.component';
import { EditFieldComponent } from './edit-field/edit-field.component';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { AddDependencyComponent } from './add-dependency/add-dependency.component';
import { HttpClientModule} from '@angular/common/http';
import { GenerationComponent } from './generation/generation.component';

const routes: Routes = [ { path: '', pathMatch: 'full', redirectTo: '/home' },
                        { path: 'home', component: HomeComponent },
                        { path: 'manage/:id', component: FieldsListComponent },
                        { path: 'generate/:id', component: GenerationComponent },
                        { path: 'manage', component: DatamodelManagerComponent },
                        { path: 'add-field/:id/:model', component: AddFieldComponent },
                        { path: 'edit-field/:id/:model/:field', component: EditFieldComponent },
                        { path: 'add-dependency/:id/:model', component: AddDependencyComponent },
                      ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewmodeldialogComponent,
    FieldsListComponent,
    DatamodelManagerComponent,
    AddFieldComponent,
    EditFieldComponent,
    AddDependencyComponent,
    GenerationComponent,
  ],
 entryComponents: [NewmodeldialogComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    DropdownModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    ButtonsModule,
    WavesModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  exports: [RouterModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);

export const routingComponents = [
    HomeComponent,
    NewmodeldialogComponent,
    FieldsListComponent,
    DatamodelManagerComponent,
    EditFieldComponent,
    AddFieldComponent,
    AddDependencyComponent,
    GenerationComponent
];
