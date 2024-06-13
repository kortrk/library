import { TestBed } from '@angular/core/testing';

import { BookInitHelperService } from './book-init-helper.service';

describe('BookInitHelperService', () => {
  let service: BookInitHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookInitHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
