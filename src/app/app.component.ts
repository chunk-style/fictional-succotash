import { Component, OnInit } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
@Component({
  selector: "ii-root",
  template: `
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="error">Error :(</div>
    <div *ngIf="notifications">
      <div *ngFor="let n of notifications">
        <p>{{ n.subject }}: {{ n.message }}</p>
      </div>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  title = "ii-notify";

  notifications: any[] = [];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}
  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          query Notification {
            notification @rest(type: "Notification", path: "notifications") {
              id
              userId
              subject
              message
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.notifications = result.data?.notification;
        this.loading = result.loading;
        this.error = result.error;
      });
  }
}
