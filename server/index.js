const next = require("next");
const cacheableResponse = require("cacheable-response");
const express = require("express");
const routes = require("../common/routes");
require("dotenv").config();

const port = parseInt(process.env.PORT) || 3016;
const app = next({ dev: true });
const handler = routes.getRequestHandler(app);

const ssrCache = cacheableResponse({
  ttl: 0, // no cache
  get: async ({ req, res, pagePath, queryParams }) => ({
    data: await app.renderToHTML(req, res, pagePath, queryParams),
  }),
  send: ({ data, res }) => res.send(data),
});

app
  .prepare()
  .then(() => {
    const server = express();
    if (process.env.REACT_NEED_DEBUG !== "true") {
      server.get("/_next/*", (req, res) => {
        /* serving _next static content using next.js handler */
        handler(req, res);
      });
      server.get("/", (req, res) => ssrCache({ req, res, pagePath: "/" }));

      server.get("*", (req, res) => {
        handler(req, res);
      });
      /* starting server */
      server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
      });
    } else {
      server.use(handler).listen(port);
    }
  })
  .catch((ex) => {
    console.log("ex :>> ", ex);

    console.error(ex.stack);
    process.exit(1);
  });
