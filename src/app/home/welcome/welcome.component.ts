import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { User, UserService } from "@ii-services/user.service";
@Component({
  selector: "ii-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent implements OnInit {
  uri = "http://localhost:3000/users/";
  users!: User[];
  gUsers!: User[];

  constructor(
    private readonly _http: HttpClient,
    private readonly _userService: UserService
  ) {}

  ngOnInit(): void {
    this._http.get<User[]>(this.uri).subscribe((resp) => {
      this.users = resp.slice(0, 3);
    });

    this._userService.getUsers().subscribe((resp) => {
      this.gUsers = resp.data?.list.slice(3, 6);
    });
  }
}
