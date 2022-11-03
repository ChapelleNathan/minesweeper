import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first, Observable } from 'rxjs';
import { DifficultiesEnum } from '../Enums/difficulties.enum';
import { Tiles_States } from '../Enums/tiles_states.enum';
import { Difficulties_Options } from '../interfaces/difficulties_options.interface';
import { TilesComponent } from './tiles/tiles.component';

@Component({
  selector: 'minesweeper-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() userDifficulty: DifficultiesEnum = DifficultiesEnum.easy;
  @Output()flagCountdown: EventEmitter<number> = new EventEmitter;
  @Output() winEvent: EventEmitter<string> = new EventEmitter();

  flagCount = 0;
  difficulties = DifficultiesEnum;
  board: TilesComponent[][] = [];
  minedTiles: TilesComponent[] = [];
  notMinedTiles: TilesComponent[] = [];
  emptyTiles: TilesComponent[] = [];
  selectedDifficulty:string = '';
  difficultyConfig: Difficulties_Options;
  DifficultiesOptions: Difficulties_Options[] = [
    {
      difficulty: DifficultiesEnum.easy,
      rows: 8,
      columns: 10,
      mineCount: 10,
    },
    {
      difficulty: DifficultiesEnum.medium,
      rows: 14,
      columns: 18,
      mineCount: 40
    },
    {
      difficulty: DifficultiesEnum.hard,
      rows: 20,
      columns: 26,
      mineCount: 99,
    },
  ]

  constructor() {
    this.difficultyConfig = this.DifficultiesOptions[DifficultiesEnum.easy];
  }

  ngOnInit(): void {
    this.initBoard(this.userDifficulty)
    this.getSelectedDifficulty();
  }

  initBoard(difficulty: DifficultiesEnum): void {
    this.difficultyConfig = this.detectDifficulty(difficulty);
    this.flagCount = this.difficultyConfig.mineCount  
    this.flagCountdown.emit(this.flagCount);
    this.board = this.buildBoard(this.difficultyConfig.rows, this.difficultyConfig.columns, this.difficultyConfig.mineCount);
  }

  detectDifficulty(difficulty: DifficultiesEnum): Difficulties_Options {
    for (let i = 0; i < this.DifficultiesOptions.length; i++) {
      if (difficulty == this.DifficultiesOptions[i].difficulty) {
        return this.DifficultiesOptions[i];
      }
    }
    return this.DifficultiesOptions[0];
  }

  buildBoard(rows: number, columns: number, mineCount: number): TilesComponent[][] {
    let board: TilesComponent[][] = [];
    for(let x = 0; x < rows; x++){
      board[x] = [];
      for(let y = 0; y < columns; y++){
        board[x][y] = new TilesComponent([x,y]);
      }
    }
    this.board = this.generateMine(board, mineCount); 
    for(let x = 0; x < rows; x ++){
      for(let y = 0; y < columns; y++){        
        this.detectMines(board[x][y])
        if(!board[x][y].mined){
          this.notMinedTiles.push(board[x][y]);
        }
      }
    }
    return board;
  }

  generateMine(board: TilesComponent[][], mineCount: number): TilesComponent[][] {
    for(let i = 0; i < mineCount; i++) {
      let x = Math.floor(Math.random() * board.length);
      let y = Math.floor(Math.random() * board[0].length);
      let minedTile = board[x][y];
      if(this.minedTiles.includes(minedTile)) {
        this.generateMine(board, 1);
      } else {
        minedTile.newMine();
        this.minedTiles.push(minedTile);
      }
    }
    return board;
  }

  onLeftClick(tile: TilesComponent) {
    switch (tile.tileState) {
      case tile.states.hidden:
          if(tile.mined){
            this.gameOver();
            return;
          }
          this.digRecurs(tile);
          this.checkWinCondition();
        break;
      case tile.states.flagged:
        console.log("there is a flag");
        break;
    }
  }

  onRightClick(tile: TilesComponent){
    if(tile.tileState === tile.states.hidden){
      if(this.flagCount > 0){
        tile.setFlag();
        this.flagCountdown.emit(--this.flagCount);
      } else {
        console.log('vous n\'avez plus de drapeau');
      }
    } else {
      if(this.flagCount <= 10){
        tile.setFlag();
        this.flagCountdown.emit(++this.flagCount);
      }
      tile.setHidden();
    }
  }

  digRecurs(tile: TilesComponent, minesNear: boolean = false):void {
    let tileX = tile.coordonate[0];
    let tileY = tile.coordonate[1];
    if(minesNear || tile.tileState === Tiles_States.empty){
      return;
    } else {
      tile.setEmpty()
      this.emptyTiles.push(tile);
      if (tile.minesAround > 0){
        minesNear = true;
      }
      if (tileX - 1 >= 0) {
        this.digRecurs(this.board[tileX -1][tileY], minesNear);
      }
      if(tileX + 1 < this.difficultyConfig.rows){
        this.digRecurs(this.board[tileX +1][tileY], minesNear);
      }
      if(tileY - 1 >= 0){
        this.digRecurs(this.board[tileX][tileY - 1], minesNear);
      }
      if(tileY + 1 < this.difficultyConfig.columns){
        this.digRecurs(this.board[tileX][tileY + 1], minesNear);
      }
    }
  } 

  checkWinCondition(): void{
    let missing = this.notMinedTiles.filter(tile => this.emptyTiles.indexOf(tile) < 0);
    if(missing.length === 0){
      this.winEvent.emit('win');
    }
  }

  contextMenu(e:any){
    e.preventDefault();
  }

  getSelectedDifficulty(): void {
    this.selectedDifficulty = DifficultiesEnum[this.userDifficulty];
  }

  gameOver(): void {
    this.minedTiles.forEach(minedTile => {
      minedTile.setMine();
      this.winEvent.emit('loose');
    })
  }

  detectMines(tile: TilesComponent): void {
    let tileX = tile.coordonate[0];
    let tileY = tile.coordonate[1];
    
    if (tileX - 1 >= 0 && this.board[tileX - 1][tileY].mined){
      tile.minesAround++;
    }

    if (tileX + 1 < this.difficultyConfig.rows && this.board[tileX + 1][tileY].mined){
      tile.minesAround++;
    }

    if (tileY - 1 >= 0 && this.board[tileX][tileY - 1].mined){
      tile.minesAround++;
    }

    if (tileY + 1 < this.difficultyConfig.columns && this.board[tileX][tileY + 1].mined){
      tile.minesAround++;
    }

    if ((tileX - 1 >= 0 && tileY - 1 >= 0) && this.board[tileX - 1][tileY - 1].mined){
      tile.minesAround++;
    }

    if ((tileX + 1 < this.difficultyConfig.rows && tileY + 1 < this.difficultyConfig.columns) && this.board[tileX + 1][tileY + 1].mined){
      tile.minesAround++;
    }

    if ((tileX - 1 >= 0 && tileY + 1 < this.difficultyConfig.columns) && this.board[tileX - 1][tileY + 1].mined){
      tile.minesAround++;
    }

    if ((tileX + 1 < this.difficultyConfig.rows && tileY - 1 >= 0) && this.board[tileX + 1][tileY - 1].mined){
      tile.minesAround++;
    }
  }
}
