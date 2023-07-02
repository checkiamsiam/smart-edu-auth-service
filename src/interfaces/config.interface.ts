interface IConfig {
  isDevelopment: boolean;
  port: number | string;
  dbUriDev: string | undefined;
  dbUriProd: string | undefined;
  studentDefaultPassword: string;
}

export default IConfig;
