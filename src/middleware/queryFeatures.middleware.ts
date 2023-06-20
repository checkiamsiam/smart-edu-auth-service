import { RequestHandler } from "express";
import { IQueryFeatures } from "../interfaces/queryFeatures.interface";

const queryFeatures: RequestHandler = (req, res, next) => {
  // set limit and skip to the request
  const page: number = parseInt(req.query.page as string) || 1;
  const limit: number = parseInt(req.query.limit as string) || 5;
  const skip: number = (page - 1) * limit;
  const searchKey: string = req.query.searchKey
    ? String(req.query.searchKey)
    : "";

  let sort = String(req.query.sort);
  sort = sort.split(",").join(" ");

  // create sort object
  const sortObj: {
    [key: string]: 1 | -1;
  } = {};

  sort.split(" ").forEach((el) => {
    if (el.startsWith("-")) {
      sortObj[el.slice(1)] = -1;
    } else {
      sortObj[el] = 1;
    }
  });

  const fieldsObj: { [key: string]: number } = {};

  // select fields
  if (req.query.fields) {
    let fields = String(req.query.fields);
    fields = fields.split(",").join(" ");

    // create fields object
    fields.split(" ").forEach((el) => {
      fieldsObj[el] = 1;
    });
  }

  // get filters
  const query = req.query;
  const filters = { ...query };

  const excludedFields = ["page", "sort", "limit", "fields", "searchKey"];

  excludedFields.forEach((el) => delete filters[el]);

  const queryFeaturesObj: IQueryFeatures = {
    page,
    limit,
    skip,
    fields: fieldsObj,
    filters,
    sort: sortObj,
    searchKey,
  };

  req.queryFeatures = queryFeaturesObj;

  next();
};

export default queryFeatures;
