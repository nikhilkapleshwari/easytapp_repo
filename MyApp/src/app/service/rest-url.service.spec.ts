import { TestBed } from '@angular/core/testing';

import { RestUrlService } from './rest-url.service';

describe('RestUrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestUrlService = TestBed.get(RestUrlService);
    expect(service).toBeTruthy();
  });
});
