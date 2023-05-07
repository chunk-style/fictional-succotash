import { Component, OnInit } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
@Component({
  selector: "ii-root",
  template: `
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="error">Error :(</div>
    <div *ngIf="rates">
      <div *ngFor="let rate of rates">
        <p>{{ rate.currency }}: {{ rate.rate }}</p>
      </div>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  title = "ii-notify";

  rates: any[] = [];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}
  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            rates(currency: "USD") {
              currency
              rate
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.rates = result.data?.rates;
        this.loading = result.loading;
        this.error = result.error;
      });
  }
}
