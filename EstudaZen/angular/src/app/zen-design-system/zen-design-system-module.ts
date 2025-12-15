import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZenDesignSystemRoutingModule } from './zen-design-system-routing-module';
import { ShowcaseComponent } from './showcase/showcase';

@NgModule({
  imports: [
    CommonModule,
    ZenDesignSystemRoutingModule
  ]
})
export class ZenDesignSystemModule { }
