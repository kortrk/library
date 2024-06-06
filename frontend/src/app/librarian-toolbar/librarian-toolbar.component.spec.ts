import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianToolbarComponent } from './librarian-toolbar.component';

describe('LibrarianToolbarComponent', () => {
  let component: LibrarianToolbarComponent;
  let fixture: ComponentFixture<LibrarianToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrarianToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibrarianToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
