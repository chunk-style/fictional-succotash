import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";
import { NotificationPollerService } from "@ii-services/notification-poller.service";
import {
  NotificationService,
  Notification,
} from "@ii-services/notification.service";
import { UserService } from "@ii-services/user.service";
import { Observable, switchMap, map } from "rxjs";

@Component({
  selector: "ii-notification-list",
  templateUrl: "./notification-list.component.html",
  styleUrls: ["./notification-list.component.scss"],
})
export class NotificationListComponent implements OnInit {
  notifications!: Observable<Notification[]>;
  notificationDetail!: Observable<Notification>;
  @ViewChild("sidesheet") public sidesheet!: MatDrawer;

  constructor(
    private readonly _notificationService: NotificationService,
    private readonly _pollerService: NotificationPollerService,
    private readonly _userService: UserService
  ) {}

  ngOnInit(): void {
    this.notifications = this._userService.getUserId().pipe(
      switchMap((id) => this._notificationService.getNotificationsForUser(id)),
      map((result) => {
        return result.data?.notifications;
      })
    );
    this._pollerService.setActivityDate();
  }

  showDetails(ev: any): void {
    const el: Element = ev.target as Element;
    const notificationId = el.getAttribute("data-id");

    this.notificationDetail = this._notificationService
      .getNotification(notificationId)
      .pipe(
        map((result) => {
          return result.data?.message;
        })
      );

    this.sidesheet.open();
  }
}
