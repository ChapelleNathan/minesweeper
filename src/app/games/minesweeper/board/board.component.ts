import { Component } from '@angular/core';
import { Tiles_States } from '../Enums/tiles_states.enum';
import { DifficultyOption } from '../interfaces/difficulties_options.interface';
import { TilesComponent } from './tiles/tiles.component';
@Component({
  selector: 'minesweeper-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  private board: TilesComponent[][] = [];
  private tiles: TilesComponent[] = [];
  private minedTiles: TilesComponent[] = [];
  private notMinedTiles: TilesComponent[] = [];
  private emptyTiles: TilesComponent[] = [];
  private selectedDifficulty: DifficultyOption;
 
  constructor(difficulty: DifficultyOption) {
    this.selectedDifficulty = difficulty;
    this.initBoard();
  }

  initBoard(): void {
    this.minedTiles = [];
    this.notMinedTiles = [];
    this.emptyTiles = [];
    this.tiles = [];
    this.board = this.buildBoard();
  }

  buildBoard(): TilesComponent[][] {
    let newBoard: TilesComponent[][] = [];
    for (let x = 0; x < this.selectedDifficulty.rows; x++) {
      newBoard[x] = [];
      for (let y = 0; y < this.selectedDifficulty.columns; y++) {
        let newTile = new TilesComponent([x, y]);
        newBoard[x][y] = newTile;
        this.tiles.push(newTile);
      }
    }
    return newBoard;
  }

  startGame(startTile: TilesComponent): void {
    this.board = this.generateMine(
      this.board,
      this.selectedDifficulty.mineCount,
      startTile
    );
    this.notMinedTiles = this.tiles.filter(
      (tile) => !this.minedTiles.includes(tile)
    );
  }

  generateMine(
    board: TilesComponent[][],
    mineCount: number,
    originTile: TilesComponent,
  ): TilesComponent[][] {
    for (let i = 0; i < mineCount; i++) {
      let x = Math.floor(Math.random() * board.length);
      let y = Math.floor(Math.random() * board[0].length);
      let minedTile = board[x][y];
      if (this.minedTiles.includes(minedTile) ||  minedTile === originTile || this.detectTiles(originTile).includes(minedTile)) {
        this.generateMine(board, 1, originTile);
        console.log('toto');
        
      } else {
        minedTile.newMine();
        this.minedTiles.push(minedTile);
        let verifiedTiles = this.detectTiles(minedTile);
        verifiedTiles.forEach(tile => tile.minesAround++);
      }
    }

    return board;
  }

  digRecurs(tile: TilesComponent, minesNear: boolean = false): void {
    let x = tile.coordonate[0];
    let y = tile.coordonate[1];
    const peers = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    if (minesNear || tile.tileState === Tiles_States.empty) {
      return;
    } else {
      tile.setEmpty();
      this.emptyTiles.push(tile);
      if (tile.minesAround > 0) {
        minesNear = true;
      }
      for (let peer of peers) {
        let checkedTile;
        try {
          checkedTile = this.board[x + peer[0]][y + peer[1]];
        } catch (e) {
          checkedTile = null;
        }
        if (checkedTile) {
          this.digRecurs(checkedTile, minesNear);
        }
      }
    }
  }

  detectTiles(mine: TilesComponent): TilesComponent[] {
    const x = mine.coordonate[0];
    const y = mine.coordonate[1];
    let verifiedTiles: TilesComponent[] = [];
    const peers = [
      [1, 1],
      [1, 0],
      [0, 1],
      [-1, -1],
      [-1, 0],
      [0, -1],
      [-1, 1],
      [1, -1],
    ];
    for (let peer of peers) {
      let checkedTile;
      try {
        checkedTile = this.board[x + peer[0]][y + peer[1]];
      } catch (e) {
        checkedTile = null;
      }
      if (checkedTile && checkedTile !== null && !checkedTile.mined) {
        verifiedTiles.push(checkedTile);
      }
    }
    return verifiedTiles;
  }

  getMinedTiles(): TilesComponent[] {
    return this.minedTiles;
  }

  getNotMinedTiles(): TilesComponent[] {
    return this.notMinedTiles;
  }

  getEmptyTiles(): TilesComponent[] {
    return this.emptyTiles;
  }

  getBoard(): TilesComponent[][] {
    return this.board;
  }

  getTiles(): TilesComponent[] {
    return this.tiles;
  }
}
