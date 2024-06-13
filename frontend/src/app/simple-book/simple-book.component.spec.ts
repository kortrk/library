import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleBookComponent } from './simple-book.component';

describe('SimpleBookComponent', () => {
  let component: SimpleBookComponent;
  let fixture: ComponentFixture<SimpleBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimpleBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
