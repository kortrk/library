import { TestBed } from '@angular/core/testing';

import { ReviewHelperService } from './review-helper.service';

describe('ReviewHelperService', () => {
  let service: ReviewHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
