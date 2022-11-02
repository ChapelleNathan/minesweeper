import { Component, OnInit } from '@angular/core';
import { Tiles_States } from '../../Enums/tiles_states.enum';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss']
})
export class TilesComponent implements OnInit {

  states = Tiles_States;
  tileState: Tiles_States = Tiles_States.hidden;

  constructor() { }

  ngOnInit(): void {
  }

}
