import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
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

  constructor(
    private readonly _notificationService: NotificationService,
    private readonly _userService: UserService
  ) {}

  ngOnInit(): void {
    this.notifications = this._userService.getUserId().pipe(
      switchMap((id) => this._notificationService.getNotificationsForUser(id)),
      map((result) => {
        return result.data?.notifications;
      })
    );
  }
}
