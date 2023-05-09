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
  private lastTimestamp: string = "";

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

  public stopPolling() {
    this.ackTimestamp = "";
    this.lastTimestamp = "";
    this._newNotifications.next([]);
    this.subscription.unsubscribe();
  }

  public setActivityDate() {
    if (this.lastTimestamp === "") return;

    this._userService
      .getUserId()
      .pipe(
        switchMap((id) =>
          this._userService.setLastActivity(id, this.lastTimestamp)
        ),
        take(1)
      )
      .subscribe((res) => {
        console.log(res.data?.record);
      });
    this._newNotifications.next([]);
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
          this.ackTimestamp = user.data?.record?.lastActivity;
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
        const newNotifications = response.data.notifications.filter(
          (n) => n.timestamp > this.ackTimestamp
        );

        // should be sorted, but in case they are not
        const latestTimestamp = newNotifications.reduce(
          (acc, val) => (acc > val.timestamp ? acc : val.timestamp),
          ""
        );

        if (this.lastTimestamp < latestTimestamp) {
          this.lastTimestamp = latestTimestamp;
          this._newNotifications.next(newNotifications);
        }
      }
    );
  }
}
