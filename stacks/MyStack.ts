import { StackContext, Api, StaticSite, use } from "@serverless-stack/resources";
import { Database } from "./Database";



export function MyStack({ stack }: StackContext) {
  const rds = use(Database)
  const api = new Api(stack, "api", {
    // binding rds database to api
    defaults: {
      function: {
        bind: [rds],
      },
    },
    cors: true,
    routes: {
      // Any post and get calls are to directed to lamda.handler routes
      "GET /todo/{proxy+}": "functions/lambda.handler",
      "POST /todo/{proxy+}": "functions/lambda.handler",
    },
  });

  const site = new StaticSite(stack, "frontend", {
    path: "frontend",
    buildCommand: "npm run build", // or "yarn build"
    environment: {
      // url that will let you call api on the back end
      REACT_APP_API_URL: api.url,
    },
  });


  stack.addOutputs({
    SiteUrl: site.url,
    ApiEndpoint: api.url
  });
}
