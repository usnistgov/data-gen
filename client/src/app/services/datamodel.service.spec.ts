import { TestBed, inject } from '@angular/core/testing';

import { DatamodelService } from './datamodel.service';

describe('DatamodelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatamodelService]
    });
  });

  it('should be created', inject([DatamodelService], (service: DatamodelService) => {
    expect(service).toBeTruthy();
  }));
});
