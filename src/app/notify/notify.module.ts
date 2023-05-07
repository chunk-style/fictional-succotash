import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NotificationCardComponent } from "./notification-card/notification-card.component";
import { NotifyRoutingModule } from "./notify-routing.module";

@NgModule({
  declarations: [NotificationCardComponent],
  imports: [CommonModule, NotifyRoutingModule],
})
export class NotifyModule {}
