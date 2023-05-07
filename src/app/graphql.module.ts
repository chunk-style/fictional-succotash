import { NgModule } from "@angular/core";
import { ApolloClientOptions, InMemoryCache } from "@apollo/client/core";
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { RestLink } from "apollo-link-rest";

const uri = "http://localhost:3000/"; // <-- add the URL of the GraphQL server here
export function createApollo(): ApolloClientOptions<any> {
  const restLink = new RestLink({ uri });

  return {
    link: restLink,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [],
    },
  ],
})
export class GraphQLModule {}
