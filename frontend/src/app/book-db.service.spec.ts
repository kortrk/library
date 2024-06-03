import { TestBed } from '@angular/core/testing';

import { BookDbService } from './book-db.service';

describe('BookDbService', () => {
  let service: BookDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
