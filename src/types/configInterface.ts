interface IConfig {
  isDevelopment: boolean;
  port: number | string;
  dbUri: string | undefined;
}

export default IConfig;
