import { Component, OnInit } from '@angular/core';
import { Tiles_States } from '../../Enums/tiles_states.enum';

@Component({
  selector: 'minesweeper-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss']
})
export class TilesComponent implements OnInit {

  states = Tiles_States;
  tileState: Tiles_States = Tiles_States.hidden;
  mined: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  generateMines():void {
    this.mined =true;
  }

  setMine(): void{
    this.tileState = Tiles_States.mined;
  }

  setEmpty(): void{
    this.tileState = Tiles_States.empty;
  }

  setFlag(): void{
    this.tileState = Tiles_States.flagged;
  }

  setHidden(): void{
    this.tileState = Tiles_States.hidden;
  }
}
