import "dotenv/config";
import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { Static, Type } from "@sinclair/typebox";

export enum NodeEnv {
  development = "development",
  test = "test",
  production = "production",
}

const ConfigSchema = Type.Strict(
  Type.Object({
    NODE_ENV: Type.Enum(NodeEnv),
    LOG_LEVEL: Type.String(),
    API_HOST: Type.String(),
    API_PORT: Type.String(),
    API_NAME: Type.String(),
    JWT_SECRET: Type.String()
  })
);

export type Config = Static<typeof ConfigSchema>;

const configPlugin: FastifyPluginAsync = async (server) => {

  server.decorate("config", process.env);
};

declare module "fastify" {
  interface FastifyInstance {
    config: Config;
  }
}

export default fp(configPlugin);
