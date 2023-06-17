interface IQueryFeatures {
  page: number;
  limit: number;
  skip: number;
  fields: { [key: string]: number };
  filters: object;
  sort: { [key: string]: -1 | 1 };
}

export default IQueryFeatures;
