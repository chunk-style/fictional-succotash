import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CoreMaterialModule } from "../core-material.module";

import { WelcomeComponent } from "./welcome/welcome.component";

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, CoreMaterialModule],
  exports: [WelcomeComponent],
})
export class HomeModule {}
