import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgrxBasicModule } from './ngrx-basic/ngrx-basic.module';
import { NgrxComponent } from './ngrx.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { MormalizrComponent } from './mormalizr/mormalizr.component';
import { NgrxNormalizrMineComponent } from './ngrx-nomalizr-mine/ngrx-normalizr-mine.component';
import { NgrxNormalizrMineModule } from './ngrx-nomalizr-mine/ngrx-normalizr-mine.module';
import { NgrxEntityModule } from './ngrx-entity/ngrx-entity.module';
import { NgrxV16Component } from './ngrx-v16/ngrx-v16.component';
 

@NgModule({
  declarations: [NgrxComponent, MormalizrComponent, NgrxNormalizrMineComponent, NgrxV16Component],
  imports: [
    CommonModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgrxBasicModule,
    NgrxNormalizrMineModule,
    NgrxEntityModule
  ],
  exports: [

    NgrxBasicModule,
    NgrxComponent,
    MormalizrComponent,
    NgrxNormalizrMineComponent
  ]
})
export class NgrxModule { }
