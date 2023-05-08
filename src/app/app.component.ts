import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, BehaviorSubject, map } from "rxjs";

import { User, UserService } from "./services/user.service";

@Component({
  selector: "ii-root",
  templateUrl: "./app.component.html",
  styles: [],
})
export class AppComponent {
  title = "Fictional Succotash";
  currentYear = new Date().getFullYear();
  user!: Observable<User | null>;

  private readonly authSubject$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  isAuthenticated = false;

  constructor(
    private readonly _userService: UserService,
    private readonly _router: Router
  ) {}

  public logout(): void {
    this.authSubject$.next(false);
    this.isAuthenticated = this.authSubject$.getValue();
    this.user = new Observable((sub) => {
      sub.next(null);
      sub.complete();
    });
    this._router.navigate(["/"]);
  }

  public login(): void {
    this.user = this._userService.getUser("1").pipe(
      map((result) => {
        return result.data?.record;
      })
    );
    this._userService.setLogin("1").subscribe();
    this.authSubject$.next(true);
    this.isAuthenticated = this.authSubject$.getValue();
  }
}
