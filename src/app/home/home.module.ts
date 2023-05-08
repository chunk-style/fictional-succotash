import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { WelcomeComponent } from "./welcome/welcome.component";

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule],
})
export class HomeModule {}
