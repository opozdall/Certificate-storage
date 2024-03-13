import { TestBed } from '@angular/core/testing';

import { CertServiceService } from './cert-service.service';

describe('CertServiceService', () => {
  let service: CertServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
