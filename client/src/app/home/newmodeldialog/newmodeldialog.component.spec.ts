import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewmodeldialogComponent } from './newmodeldialog.component';

describe('NewmodeldialogComponent', () => {
  let component: NewmodeldialogComponent;
  let fixture: ComponentFixture<NewmodeldialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewmodeldialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewmodeldialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
