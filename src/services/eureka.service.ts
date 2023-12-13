import { Eureka } from 'eureka-js-client';
import { env, eureka } from 'src/config/config';

export class EurekaService {
  private eureka: Eureka;

  constructor() {
    this.eureka = new Eureka({
      instance: {
        app: env.name,
        hostName: env.host,
        ipAddr: env.host,
        port: {
          '$': env.port,
          '@enabled': true,
        },
        homePageUrl: `http://${env.host}:${env.port}`,
        vipAddress: env.name,
        dataCenterInfo: {
          '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
          name: 'MyOwn',
        },
      },
      eureka: {
        host: eureka.host,
        port: eureka.port,
        servicePath: '/eureka/apps/',
      },
    });

    this.eureka.start();
  }
}