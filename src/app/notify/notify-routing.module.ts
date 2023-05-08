import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NotificationCardComponent } from "./notification-card/notification-card.component";

const routes: Routes = [
  {
    path: "",
    component: NotificationCardComponent,
  },
  {
    path: ":id",
    component: NotificationCardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotifyRoutingModule {}
