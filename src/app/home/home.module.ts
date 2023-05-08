import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { CoreMaterialModule } from "../core-material.module";

import { LoginComponent } from "./login/login.component";
import { TrayIconComponent } from "./tray-icon/tray-icon.component";
import { WelcomeComponent } from "./welcome/welcome.component";

@NgModule({
  declarations: [WelcomeComponent, TrayIconComponent, LoginComponent],
  imports: [CommonModule, RouterModule, CoreMaterialModule],
  exports: [WelcomeComponent, TrayIconComponent, LoginComponent],
})
export class HomeModule {}
