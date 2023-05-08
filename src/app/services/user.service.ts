import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";

export interface User {
  id: string;
  name: string;
  email: string;
  lastLogin: Date;
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
  constructor(private apollo: Apollo) {}

  public getUser(userId: string | null) {
    const query = gql`
      {
        record(id: ${userId})
          @rest(type: "User", path: "users/{args.id}") {
          id
          name
          email
          lastLogin
        }
      }
    `;

    const queryInput = {
      query,
    };

    return this.apollo.query<UserRecord>(queryInput);
  }

  public setLogin(userId: string | null) {
    const mutation = gql`
      mutation UpdateLastSeen($time: any!){
        record(id: ${userId}, input: $userUpdate)
          @rest(type: "User", method:"PATCH", path: "users/{args.id}") {
          id
          name
          email
          lastLogin
        }
      }
    `;

    const variables = {
      userUpdate: {
        lastLogin: new Date(Date.now()).toISOString(),
      },
    };

    return this.apollo.mutate<UserRecord>({ mutation, variables });
  }
}
