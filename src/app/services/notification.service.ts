import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";

export interface Notification {
  id: string;
  userId: string;
  timestamp: string;
  subject: string;
  message: string;
}
export interface NotificationMesssage {
  message: Notification;
}
export interface NotificationList {
  notifications: Notification[];
}

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private apollo: Apollo) {}

  public getNotification(notificationId: string | null) {
    const notificationQuery = gql`
      {
        message(id: ${notificationId})
          @rest(type: "Notification", path: "notifications/{args.id}") {
          id
          userId
          subject
          message
          timestamp
        }
      }
    `;

    const queryInput = {
      query: notificationQuery,
    };

    return this.apollo.query<NotificationMesssage>(queryInput);
  }

  public getNotifications() {
    const notificationQuery = gql`
      {
        notifications @rest(type: "Notification", path: "notifications") {
          id
          userId
          subject
          message
          timestamp
        }
      }
    `;

    const queryInput = {
      query: notificationQuery,
    };

    return this.apollo.query<NotificationList>(queryInput);
  }

  public getNotificationsForUser(userId: string) {
    const notificationQuery = gql`
      {
        notifications(id: ${userId}) 
        @rest(type: "Notification", path: "notifications/?userId={args.id}&_sort=timestamp&_order=desc") {
          id
          userId
          subject
          message
          timestamp
        }
      }
    `;

    const queryInput = {
      query: notificationQuery,
    };

    return this.apollo.query<NotificationList>(queryInput);
  }
}
