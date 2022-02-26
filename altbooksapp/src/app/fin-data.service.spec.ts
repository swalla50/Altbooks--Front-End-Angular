import { TestBed } from '@angular/core/testing';

import { FinDataService } from './fin-data.service';

describe('FinDataService', () => {
  let service: FinDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
