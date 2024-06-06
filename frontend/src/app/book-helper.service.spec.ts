import { TestBed } from '@angular/core/testing';

import { BookHelperService } from './book-helper.service';

describe('BookHelperService', () => {
  let service: BookHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
