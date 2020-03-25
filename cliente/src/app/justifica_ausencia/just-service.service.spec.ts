import { TestBed } from '@angular/core/testing';

import { JustServiceService } from './just-service.service';

describe('JustServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JustServiceService = TestBed.get(JustServiceService);
    expect(service).toBeTruthy();
  });
});
