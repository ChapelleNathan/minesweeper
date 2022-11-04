import { Component, EventEmitter, Inject, Injectable, Input, OnInit, Output } from '@angular/core';
import { first, Observable } from 'rxjs';
import { DifficultiesEnum } from '../Enums/difficulties.enum';
import { Tiles_States } from '../Enums/tiles_states.enum';
import { DifficultyOption } from '../interfaces/difficulties_options.interface';
import { TilesComponent } from './tiles/tiles.component';
@Component({
  selector: 'minesweeper-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
@Injectable()
export class BoardComponent {

  @Input() userDifficulty: DifficultiesEnum = DifficultiesEnum.easy;
  @Output() winEvent: EventEmitter<string> = new EventEmitter();

  difficulties = DifficultiesEnum;
  board: TilesComponent[][] = [];
  minedTiles: TilesComponent[] = [];
  notMinedTiles: TilesComponent[] = [];
  emptyTiles: TilesComponent[] = [];
  selectedDifficulty: DifficultyOption;
  DifficultiesOptions: DifficultyOption[] = [
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

  constructor(difficulty: DifficultyOption) {
    this.selectedDifficulty = difficulty;
    this.initBoard()
  }



  initBoard(): void {
    this.minedTiles = [];
    this.notMinedTiles = [];
    this.emptyTiles = [];
    this.board = this.buildBoard();    
  }

  buildBoard(): TilesComponent[][] {
    let board: TilesComponent[][] = [];
    for(let x = 0; x < this.selectedDifficulty.rows; x++){
      board[x] = [];
      for(let y = 0; y < this.selectedDifficulty.columns; y++){
        board[x][y] = new TilesComponent([x,y]);
      }
    }
    this.board = this.generateMine(board, this.selectedDifficulty.mineCount); 
    for(let x = 0; x < this.selectedDifficulty.rows; x ++){
      for(let y = 0; y < this.selectedDifficulty.columns; y++){        
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
      if(tileX + 1 < this.selectedDifficulty.rows){
        this.digRecurs(this.board[tileX +1][tileY], minesNear);
      }
      if(tileY - 1 >= 0){
        this.digRecurs(this.board[tileX][tileY - 1], minesNear);
      }
      if(tileY + 1 < this.selectedDifficulty.columns){
        this.digRecurs(this.board[tileX][tileY + 1], minesNear);
      }
    }
  } 


  detectMines(tile: TilesComponent): void {
    let tileX = tile.coordonate[0];
    let tileY = tile.coordonate[1];
    
    if (tileX - 1 >= 0 && this.board[tileX - 1][tileY].mined){
      tile.minesAround++;
    }

    if (tileX + 1 < this.selectedDifficulty.rows && this.board[tileX + 1][tileY].mined){
      tile.minesAround++;
    }

    if (tileY - 1 >= 0 && this.board[tileX][tileY - 1].mined){
      tile.minesAround++;
    }

    if (tileY + 1 < this.selectedDifficulty.columns && this.board[tileX][tileY + 1].mined){
      tile.minesAround++;
    }

    if ((tileX - 1 >= 0 && tileY - 1 >= 0) && this.board[tileX - 1][tileY - 1].mined){
      tile.minesAround++;
    }

    if ((tileX + 1 < this.selectedDifficulty.rows && tileY + 1 < this.selectedDifficulty.columns) && this.board[tileX + 1][tileY + 1].mined){
      tile.minesAround++;
    }

    if ((tileX - 1 >= 0 && tileY + 1 < this.selectedDifficulty.columns) && this.board[tileX - 1][tileY + 1].mined){
      tile.minesAround++;
    }

    if ((tileX + 1 < this.selectedDifficulty.rows && tileY - 1 >= 0) && this.board[tileX + 1][tileY - 1].mined){
      tile.minesAround++;
    }
  }
}
