interface IConfig {
  isDevelopment: boolean;
  port: number | string;
  dbUriDev: string | undefined;
  dbUriProd: string | undefined;
  studentDefaultPassword: string;
  facultyDefaultPassword: string;
  adminDefaultPassword: string;
}

export default IConfig;
