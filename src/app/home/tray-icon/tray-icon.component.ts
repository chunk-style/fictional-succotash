import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  NotificationService,
  Notification,
} from "@ii-services/notification.service";
import { UserService } from "@ii-services/user.service";
import { switchMap, tap } from "rxjs";

@Component({
  selector: "ii-tray-icon",
  templateUrl: "./tray-icon.component.html",
  styleUrls: ["./tray-icon.component.scss"],
})
export class TrayIconComponent implements OnInit {
  notificationsCount: number = 0;
  hideBadge = true;
  notifications: Notification[] = [];

  constructor(
    private readonly _notificationService: NotificationService,
    private readonly _userService: UserService,
    private readonly _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._userService
      .getUserId()
      .pipe(
        switchMap((id) =>
          this._notificationService.getNotificationsForUser(id)
        ),
        tap((result) => {
          if (result.data?.notifications?.length) {
            this.notificationsCount = result.data.notifications.length;
            this.hideBadge = false;
            this.notifications = result.data.notifications.slice(0, 5);

            this._snackBar.open("You have new notifications", "🤘", {
              duration: 3000,
            });
          } else {
            this.notificationsCount = 0;
            this.hideBadge = false;
          }
        })
      )
      .subscribe();
  }
}
