import { Component, Input, OnInit } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { DifficultiesEnum } from './Enums/difficulties.enum';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss']
})
export class MineSweeperComponent implements OnInit {

  
  difficulties = DifficultiesEnum;
  userDifficulty$ :Observable<DifficultiesEnum> = new Observable;
  userDifficulty : DifficultiesEnum = DifficultiesEnum.easy;

  constructor() {}

  ngOnInit(): void {
    this.init();
  }

  init(): void{    
    this.userDifficulty$.subscribe((difficulty) => {
      difficulty = this.difficulties.easy;      
      this.userDifficulty = this.difficulties.easy;
    });    
  }

}
