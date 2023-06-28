import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MineSweeperComponent } from './minesweeper.component';
import { BoardComponent } from './board/board.component';
import { TilesComponent } from './board/tiles/tiles.component';



@NgModule({
  declarations: [MineSweeperComponent, BoardComponent, TilesComponent],
  imports: [
    CommonModule
  ],
  exports:[
    MineSweeperComponent
  ]
})
export class MineSweeperModule { }
