import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DersekleComponent } from './dersekle/dersekle.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DersekleComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class DersekleModule { }
