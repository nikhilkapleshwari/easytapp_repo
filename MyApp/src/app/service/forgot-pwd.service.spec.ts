import { TestBed } from '@angular/core/testing';

import { ForgotPwdService } from './forgot-pwd.service';

describe('ForgotPwdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForgotPwdService = TestBed.get(ForgotPwdService);
    expect(service).toBeTruthy();
  });
});
