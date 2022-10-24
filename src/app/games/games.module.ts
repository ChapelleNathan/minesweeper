import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeminerComponent } from './deminer/deminer.component';



@NgModule({
  declarations: [
    DeminerComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    DeminerComponent
  ],
})
export class GamesModule { }
