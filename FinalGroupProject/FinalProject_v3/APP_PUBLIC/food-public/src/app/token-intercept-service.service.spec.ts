import { TestBed } from '@angular/core/testing';

import { TokenInterceptServiceService } from './token-intercept-service.service';

describe('TokenInterceptServiceService', () => {
  let service: TokenInterceptServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenInterceptServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
