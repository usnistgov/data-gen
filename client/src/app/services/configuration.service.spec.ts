import { TestBed } from '@angular/core/testing';

import { ExtractionmodelService } from './extractionmodel.service';

describe('ExtractionmodelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExtractionmodelService = TestBed.get(ExtractionmodelService);
    expect(service).toBeTruthy();
  });
});
