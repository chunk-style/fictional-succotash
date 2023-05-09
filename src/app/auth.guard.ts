import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { UserService } from "@ii-services/user.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _router: Router,
    private readonly _userService: UserService
  ) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this._userService.isAuthenticated.getValue()) {
      return true;
    } else {
      this._router.navigate(["login"]);
    }
    return false;
  }
}
