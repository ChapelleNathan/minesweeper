import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MineSweeperComponent } from './minesweeper.component';



@NgModule({
  declarations: [MineSweeperComponent],
  imports: [
    CommonModule
  ],
  exports:[
    MineSweeperComponent
  ]
})
export class MineSweeperModule { }
