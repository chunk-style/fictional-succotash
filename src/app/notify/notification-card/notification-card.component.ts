import { Component, OnInit } from "@angular/core";
import { Observable, Observer, map } from "rxjs";

import {
  NotificationService,
  Notification,
} from "../services/notification.service";

@Component({
  selector: "ii-notification-card",
  templateUrl: "./notification-card.component.html",
  styles: [],
})
export class NotificationCardComponent implements OnInit {
  notification!: Observable<Notification>;

  constructor(private readonly _notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notification = this._notificationService.getNotification("1").pipe(
      map((result) => {
        console.log(result);

        return result.data?.message;
      })
    );
  }
}
