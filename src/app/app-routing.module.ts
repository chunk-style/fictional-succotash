import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { WelcomeComponent } from "./home/welcome/welcome.component";

const routes: Routes = [
  {
    path: "notifications",
    loadChildren: () =>
      import("./notify/notify.module").then((m) => m.NotifyModule),
  },
  { path: "**", component: WelcomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
