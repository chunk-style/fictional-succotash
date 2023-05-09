import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NotificationCardComponent } from "./notification-card/notification-card.component";
import { NotificationListComponent } from "./notification-list/notification-list.component";

const routes: Routes = [
  {
    path: "",
    component: NotificationListComponent,
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
