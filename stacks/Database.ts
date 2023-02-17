import { RDS, StackContext } from "@serverless-stack/resources";


//initalizes rds DB
export function Database({stack}: StackContext){
    const rds = new RDS (stack, "db", {
        engine: "postgresql11.13",
        defaultDatabaseName: "main",
        migrations:  "services/migrations",
        // types: "services/core/tables.ts",
    })
    return rds
}  