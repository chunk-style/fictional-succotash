import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { map, tap } from "rxjs";
import {
  NotificationService,
  Notification,
} from "src/app/notify/services/notification.service";

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
    private readonly _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._notificationService
      .getNotifications()
      .pipe(
        tap((result) => {
          if (result.data?.notifications?.length) {
            this.notificationsCount = result.data.notifications.length;
            this.hideBadge = false;
            this.notifications = result.data.notifications;

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
