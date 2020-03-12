import { TestBed } from '@angular/core/testing';

import { FlashMessageService } from '../services/flashMessage.service'

describe('ErrorMessageService', () => {
  let service: FlashMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
