import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { User, UserRecord, UserService } from "@services/user.service";
import { switchMap, map, tap } from "rxjs";
import {
  NotificationService,
  Notification,
} from "src/app/services/notification.service";

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

  viewNotificationDetails(): void {
    // const path: string[] = ['notifications'];
    // if (notification) {
    //   path.push(notification.notificationId);
    // }
    // tslint:disable-next-line:no-floating-promises
    // this._router.navigate(path);
  }
}
