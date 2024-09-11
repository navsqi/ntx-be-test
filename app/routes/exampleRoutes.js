const { exampleMiddleware } = require("../middleware");
const exampleController = require("../controllers/exampleController");
const authMiddleware = require("../middleware/authMiddleware");

module.exports = (app, server) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  const router = require("express").Router();

  exampleController.callmeWebSocket(server);

  router.post("/login", exampleController.login);

  router.get(
    "/refactorme1",
    // authMiddleware.protect,
    // authMiddleware.allowTo("SUPERADMIN"),
    exampleController.refactoreMe1
  );

  router.post(
    "/refactorme2",
    // authMiddleware.protect,
    // authMiddleware.allowTo("SUPERADMIN"),
    exampleController.refactoreMe2
  );

  router.get(
    "/threat/map/attack",
    authMiddleware.protect,
    authMiddleware.allowTo("MARKETINGOFFICER"),
    exampleController.getData
  );

  app.use("/api", router);
};
