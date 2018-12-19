import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatamodelManagerComponent } from './datamodel-manager.component';

describe('DatamodelManagerComponent', () => {
  let component: DatamodelManagerComponent;
  let fixture: ComponentFixture<DatamodelManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatamodelManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatamodelManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
