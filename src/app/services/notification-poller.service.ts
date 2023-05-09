import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  ReplaySubject,
  Observable,
  Subscription,
  timer,
} from "rxjs";
import { map, filter, switchMap, take, tap } from "rxjs/operators";

import { NotificationService, Notification } from "./notification.service";
import { User, UserService } from "./user.service";

export interface NotificationsAlert {
  ackTimestamp: string | null;
  fetchedTeimstamp: string | null;
  notifications: Notification[];
}

@Injectable({
  providedIn: "root",
})
export class NotificationPollerService {
  private readonly _newNotifications: ReplaySubject<Notification[]> =
    new ReplaySubject(1);
  private subscription!: Subscription;
  private ackTimestamp!: string;
  private lastTimestamp: string = "1999-12-31";

  constructor(
    private readonly _notificationService: NotificationService,
    private readonly _userService: UserService
  ) {}

  get newNotifications() {
    if (!this.subscription || this.subscription.closed) {
      this.startPolling(6000);
    }
    return this._newNotifications.asObservable();
  }

  public stopPolling(): void {
    this.ackTimestamp = "";
    this.lastTimestamp = "1999-12-31";
    this.subscription.unsubscribe();
  }
  /**
   * Gets unread notifications for the logged in user.
   */
  private pollNotifications(interval: number) {
    let userId = "";
    return this._userService
      .getUserId()
      .pipe(
        switchMap((id) => this._userService.getUser(id)),
        tap((user) => {
          userId = user.data?.record?.id;
          this.ackTimestamp = user.data?.record?.lastLogin;
        }),
        switchMap(() => timer(0, interval))
      )
      .pipe(
        switchMap(() =>
          this._notificationService.getNotificationsForUser(userId)
        )
      );
  }

  private startPolling(interval: number): void {
    this.subscription = this.pollNotifications(interval).subscribe(
      (response) => {
        console.log("processing notifications...");
        const newNotifications = response.data.notifications.filter(
          (n) => n.timestamp > this.ackTimestamp
        );

        // should be sorted, but in case the are not
        const latestTimestamp = newNotifications.reduce(
          (acc, val) => (acc > val.timestamp ? acc : val.timestamp),
          "2000-01-01"
        );

        if (this.lastTimestamp < latestTimestamp) {
          this.lastTimestamp = latestTimestamp;
          this._newNotifications.next(newNotifications);
          console.log(newNotifications);
          console.log(latestTimestamp);
        }
      }
    );
  }
}
