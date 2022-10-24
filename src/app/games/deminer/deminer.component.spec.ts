import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeminerComponent } from './deminer.component';

describe('DeminerComponent', () => {
  let component: DeminerComponent;
  let fixture: ComponentFixture<DeminerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeminerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeminerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
