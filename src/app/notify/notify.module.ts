import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CoreMaterialModule } from "../core-material.module";

import { NotificationCardComponent } from "./notification-card/notification-card.component";
import { NotifyRoutingModule } from "./notify-routing.module";

@NgModule({
  declarations: [NotificationCardComponent],
  imports: [CommonModule, CoreMaterialModule, NotifyRoutingModule],
})
export class NotifyModule {}
