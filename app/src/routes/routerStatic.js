const express = require('express');
const path = require('path');
const CONTENT_DIR = path.join(__dirname, '../../../', 'public');

const staticRouter = (app) => {
  app.use(express.static(CONTENT_DIR));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(CONTENT_DIR, "index.html"));
  });
  return app;
};

module.exports = staticRouter;
