import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionChipsComponent } from './suggestion-chips.component';

describe('SuggestionChipsComponent', () => {
  let component: SuggestionChipsComponent;
  let fixture: ComponentFixture<SuggestionChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
