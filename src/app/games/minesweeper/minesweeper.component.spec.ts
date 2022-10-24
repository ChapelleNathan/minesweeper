import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MineSweeperComponent } from './minesweeper.component';

describe('MineSweeper', () => {
  let component: MineSweeperComponent;
  let fixture: ComponentFixture<MineSweeperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MineSweeperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MineSweeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
