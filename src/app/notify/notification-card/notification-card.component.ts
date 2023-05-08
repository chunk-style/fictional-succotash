import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Observable, map } from "rxjs";
import { switchMap } from "rxjs/operators";

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

  constructor(
    private readonly _notificationService: NotificationService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.notification = this.route.paramMap.pipe(
      map((params: ParamMap) => {
        return params.get("id");
      }),
      switchMap((id) => this._notificationService.getNotification(id)),
      map((result) => {
        return result.data?.message;
      })
    );
  }
}
