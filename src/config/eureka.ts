import { EurekaModuleOptions } from "nestjs-eureka";
import { env, eurekaClient } from "./config";

export const eurekaConfig: EurekaModuleOptions = {
  eureka: eurekaClient,
  service: {
    name: env.name,
    port: env.port
  },
}