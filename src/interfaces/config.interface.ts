interface IConfig {
  isDevelopment: boolean;
  port: number | string;
  dbUriDev: string | undefined;
  dbUriProd: string | undefined;
  studentDefaultPassword: string;
  facultyDefaultPassword: string;
  adminDefaultPassword: string;
  jwt: {
    secret: string;
    refreshSecret: string;
    expiresIn: string;
    refreshExpiresIn: string;
  };
  redis: {
    url: string;
    expires_in: string;
  };
}

export default IConfig;
