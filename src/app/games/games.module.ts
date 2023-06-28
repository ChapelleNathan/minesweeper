import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MineSweeperModule } from './minesweeper/minesweeper.module';
import { MineSweeperComponent } from './minesweeper/minesweeper.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MineSweeperModule
  ],
  exports:[
    MineSweeperComponent
  ],
})
export class GamesModule { }
