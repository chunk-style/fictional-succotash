import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotificationPollerService } from "@ii-services/notification-poller.service";
import { Notification } from "@ii-services/notification.service";
import { UserService } from "@ii-services/user.service";
import { Subscription } from "rxjs/";

@Component({
  selector: "ii-tray-icon",
  templateUrl: "./tray-icon.component.html",
  styleUrls: ["./tray-icon.component.scss"],
})
export class TrayIconComponent implements OnInit, OnDestroy {
  notificationsCount: number = 0;
  hideBadge = true;
  notifications: Notification[] = [];
  private subscription!: Subscription;

  constructor(
    private readonly _pollerService: NotificationPollerService,
    private readonly _userService: UserService,
    private readonly _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscription = this._pollerService.newNotifications.subscribe(
      (result) => {
        if (result.length) {
          this.notificationsCount = result.length;
          this.hideBadge = false;
          this.notifications = result.slice(0, 5);

          this._snackBar.open("You have new notifications", "🤘", {
            duration: 3000,
          });
        } else {
          this.notificationsCount = 0;
          this.hideBadge = true;
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this._pollerService.stopPolling();
      this.subscription.unsubscribe();
    }
  }
}
