import { Component, Input, OnInit } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { Difficulties } from './Enums/difficulties.enum';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss']
})
export class MineSweeperComponent implements OnInit {

  
  difficulties = Difficulties;
  userDifficulty$ :Observable<Difficulties> = new Observable;
  userDifficulty : Difficulties = Difficulties.easy;

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
