import express from "express";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("welcome to edu-bd server from routes");
});

export default routes;
