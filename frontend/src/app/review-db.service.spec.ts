import { TestBed } from '@angular/core/testing';

import { ReviewDbService } from './review-db.service';

describe('ReviewDbService', () => {
  let service: ReviewDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
