import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceTextComponent } from './translate.component';

describe('SourceTextComponent', () => {
  let component: SourceTextComponent;
  let fixture: ComponentFixture<SourceTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
