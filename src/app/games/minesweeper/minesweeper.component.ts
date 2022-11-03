import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { BoardComponent } from './board/board.component';
import { TilesComponent } from './board/tiles/tiles.component';
import { DifficultiesEnum } from './Enums/difficulties.enum';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss']
})
export class MineSweeperComponent{
  
  board = new BoardComponent();
  difficulties = DifficultiesEnum;
  userDifficulty$ :Observable<DifficultiesEnum> = new Observable;
  userDifficulty : DifficultiesEnum = DifficultiesEnum.easy;
  winState: string = '';
  flagCount: number = 10;
  constructor() {
    this.init();
  }

  init(): void{
    this.userDifficulty$.subscribe((difficulty) => {
      difficulty = this.difficulties.easy;      
      this.userDifficulty = this.difficulties.easy;
    });    
  }

  flagCountdown(e: any):void {
    this.flagCount = e;
  }

  onLeftClick(tile: TilesComponent) {
    switch (tile.tileState) {
      case tile.states.hidden:
          if(tile.mined){
            this.gameOver();
            return;
          }
          this.board.digRecurs(tile);
          this.checkWinCondition();
        break;
      case tile.states.flagged:
        console.log("there is a flag");
        break;
    }
  }

  resetGame(): void{
    this.board.initBoard(this.userDifficulty);
    this.winState = '';
  }

  onRightClick(tile: TilesComponent){
    if(tile.tileState === tile.states.hidden){
      if(this.flagCount > 0){
        tile.setFlag();
        --this.flagCount;
      } else {
        console.log('vous n\'avez plus de drapeau');
      }
    } else {
      if(this.flagCount <= 10){
        tile.setFlag();
        ++this.flagCount;
      }
      tile.setHidden();
    }
  }

  checkWinCondition(): void{
    let missing = this.board.notMinedTiles.filter(tile => this.board.emptyTiles.indexOf(tile) < 0);
    if(missing.length === 0){
      this.winState = 'win';
    }
  }

  gameOver(): void {
    this.board.minedTiles.forEach(minedTile => {
      minedTile.setMine();
      this.winState = 'loose';
    })
  }
  
  contextMenu(e:any){
    e.preventDefault();
  }
}
