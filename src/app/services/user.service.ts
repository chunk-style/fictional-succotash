import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { BehaviorSubject, Subject, ReplaySubject } from "rxjs";

export interface User {
  id: string;
  name: string;
  email: string;
  lastActivity: string;
}

export interface UserRecord {
  record: User;
}
export interface UserList {
  list: User[];
}

@Injectable({
  providedIn: "root",
})
export class UserService {
  public isAuthenticated: BehaviorSubject<boolean>;
  public userId: Subject<string> = new ReplaySubject(1);

  constructor(private apollo: Apollo) {
    let user = localStorage.getItem("userId");

    this.isAuthenticated = new BehaviorSubject(user ? true : false);
    if (user) {
      this.userId.next(user);
    }
  }

  public getUser(userId: string) {
    const query = gql`
      {
        record(id: ${userId})
          @rest(type: "User", path: "users/{args.id}") {
          id
          name
          email
          lastActivity
        }
      }
    `;

    const queryInput = {
      query,
    };

    return this.apollo.query<UserRecord>(queryInput);
  }

  public setLastActivity(userId: string, activityDate: string) {
    const mutation = gql`
      mutation UpdateLastSeen($time: any!){
        record(id: ${userId}, input: $userUpdate)
          @rest(type: "User", method:"PATCH", path: "users/{args.id}") {
          id
          name
          email
          lastActivity
        }
      }
    `;

    const variables = {
      userUpdate: {
        lastActivity: activityDate,
      },
    };

    return this.apollo.mutate<UserRecord>({ mutation, variables });
  }

  public getUserId() {
    return this.userId.asObservable();
  }

  public logout(): void {
    localStorage.clear();
    this.isAuthenticated.next(false);
  }

  public login(userId: string): void {
    localStorage.setItem("userId", userId);
    this.userId.next(userId);
    // this._userService.setLogin("1").subscribe();
    this.isAuthenticated.next(true);
  }
}
