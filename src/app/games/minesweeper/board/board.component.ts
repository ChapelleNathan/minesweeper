import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DifficultiesEnum } from '../Enums/difficulties.enum';
import { Difficulties_Options } from '../interfaces/difficulties_options.interface';
import { TilesComponent } from './tiles/tiles.component';

@Component({
  selector: 'minesweeper-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  difficulties = DifficultiesEnum;
  @Input() userDifficulty: DifficultiesEnum = DifficultiesEnum.easy;
  board: TilesComponent[][] = [];

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
    
  }

  ngOnInit(): void {
    this.initBoard(this.userDifficulty)
  }

  initBoard(difficulty: DifficultiesEnum): void {
    let difficultyOptions = this.detectDifficulty(difficulty);
    
    this.board = this.buildBoard(difficultyOptions.rows, difficultyOptions.columns, difficultyOptions.mineCount);
    
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
        board[x][y] = new TilesComponent;
      }
    }
    return this.generateMines(board, mineCount);
  }

  generateMines(board: TilesComponent[][], mineCount: number): TilesComponent[][] {
    for(let i = 0; i < mineCount; i++) {
      let x = Math.floor(Math.random() * board.length);
      let y = Math.floor(Math.random() * board[0].length);
      board[x][y].setMine();
    }
    return board;
  }
}
