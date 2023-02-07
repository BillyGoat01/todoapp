import { StackContext, Api, StaticSite } from "@serverless-stack/resources";

export function MyStack({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    cors: true,
    routes: {
      "GET /todo/{proxy+}": "functions/lambda.handler",
    },
  });

  const site = new StaticSite(stack, "frontend", {
    path: "frontend",
    buildCommand: "npm run build", // or "yarn build"
    environment: {
      REACT_APP_API_URL: api.url,
    },
  });


  stack.addOutputs({
    SiteUrl: site.url,
    ApiEndpoint: api.url
  });
}
