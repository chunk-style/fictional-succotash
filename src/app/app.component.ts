import { Component } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "ii-root",
  templateUrl: "./app.component.html",
  styles: [],
})
export class AppComponent {
  title = "Fictional Succotash";
  currentYear = new Date().getFullYear();

  public isAuthenticated!: Observable<boolean>;

  public logout(): void {}
}
