import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Difficulties } from '../Enums/difficulties.enum';

@Component({
  selector: 'minesweeper-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  difficulties = Difficulties;
  @Input() userDifficulty: Difficulties = Difficulties.easy;
  huit = 8;
  constructor() {
  }

  ngOnInit(): void {
  }

}
