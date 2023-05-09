import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "../../services/user.service";

@Component({
  selector: "ii-login-card",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  user: string = "1";
  constructor(
    private readonly _router: Router,
    private readonly _userService: UserService
  ) {}

  public login() {
    this._userService.login(this.user);
    this._router.navigate(["home"]);
  }
}
