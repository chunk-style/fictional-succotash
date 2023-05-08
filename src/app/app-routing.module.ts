import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./auth.guard";
import { LoginComponent } from "./home/login/login.component";
import { WelcomeComponent } from "./home/welcome/welcome.component";

const routes: Routes = [
  {
    path: "notifications",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./notify/notify.module").then((m) => m.NotifyModule),
  },
  { path: "login", component: LoginComponent },
  { path: "**", canActivate: [AuthGuard], component: WelcomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
