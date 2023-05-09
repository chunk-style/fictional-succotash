import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { User, UserService } from "@ii-services/user.service";
import { Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "ii-root",
  templateUrl: "./app.component.html",
  styles: [],
})
export class AppComponent implements OnInit, OnDestroy {
  title = "Fictional Succotash";
  currentYear = new Date().getFullYear();
  user: User | null = null;

  private userSub!: Subscription;

  constructor(
    private readonly _router: Router,
    private readonly _userService: UserService
  ) {}

  ngOnInit(): void {
    this.userSub = this._userService
      .getUserId()
      .pipe(switchMap((id) => this._userService.getUser(id)))
      .subscribe((result) => {
        this.user = result.data.record;
      });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  logout() {
    this.user = null;
    this._userService.logout();
    this._router.navigate(["login"]);
  }
}
