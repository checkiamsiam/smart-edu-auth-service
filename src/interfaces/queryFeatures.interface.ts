interface IQueryFeatures {
  page: number;
  limit: number;
  skip: number;
  fields: { [key: string]: number };
  filters: object;
  sort: { [key: string]: number };
}

export default IQueryFeatures;
