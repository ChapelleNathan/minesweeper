import { Component, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
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
  @Output()flagCount: number = 0;

  difficulties = DifficultiesEnum;
  board: TilesComponent[][] = [];
  minedTiles: TilesComponent[] = [];
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
    this.flagCount = this.difficultyConfig.mineCount;
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
    this.generateMines(board, mineCount);
    for(let x = 0; x < rows; x ++){
      for(let y = 0; y < columns; y++){        
        this.detectMines(board[x][y], board)
      }
    }
    return board;
  }

  generateMines(board: TilesComponent[][], mineCount: number): TilesComponent[][] {
    for(let i = 0; i < mineCount; i++) {
      let x = Math.floor(Math.random() * board.length);
      let y = Math.floor(Math.random() * board[0].length);
      let minedTile = board[x][y];
      minedTile.generateMines();
      this.minedTiles.push(minedTile);
    }
    return board;
  }

  onLeftClick(tile: TilesComponent) {
    switch (tile.tileState) {
      case tile.states.hidden:
          if(tile.mined){
            tile.setMine();
            this.gameOver();
            return;
          }
          tile.setEmpty();
        break;
      case tile.states.flagged:
        console.log("there is a flag");
        break;
    }
  }

  onRightClick(tile: TilesComponent){
    if(tile.tileState === tile.states.hidden){
      tile.setFlag();
    } else {
      tile.setHidden();
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
    })
  }

  detectMines(tile: TilesComponent, board: TilesComponent[][]): void {
    let tileX = tile.coordonate[0];
    let tileY = tile.coordonate[1];
    
    if (tileX - 1 >= 0 && board[tileX - 1][tileY].mined){
      tile.minesAround++;
    }

    if (tileX + 1 < this.difficultyConfig.rows && board[tileX + 1][tileY].mined){
      tile.minesAround++;
    }

    if (tileY - 1 >= 0 && board[tileX][tileY - 1].mined){
      tile.minesAround++;
    }

    if (tileY + 1 < this.difficultyConfig.columns && board[tileX][tileY + 1].mined){
      tile.minesAround++;
    }

    if ((tileX - 1 >= 0 && tileY - 1 >= 0) && board[tileX - 1][tileY - 1].mined){
      tile.minesAround++;
    }

    if ((tileX + 1 < this.difficultyConfig.rows && tileY + 1 < this.difficultyConfig.columns) && board[tileX + 1][tileY + 1].mined){
      tile.minesAround++;
    }

    if ((tileX - 1 >= 0 && tileY + 1 < this.difficultyConfig.columns) && board[tileX - 1][tileY + 1].mined){
      tile.minesAround++;
    }

    if ((tileX + 1 < this.difficultyConfig.rows && tileY - 1 >= 0) && board[tileX + 1][tileY - 1].mined){
      tile.minesAround++;
    }
  }
}
