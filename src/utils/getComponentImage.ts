import connect from "connect";
import finalhandler from "finalhandler";
import http from "http";
import { AddressInfo } from "net";
import puppeteer from "puppeteer";

const createServer = async (html: string) => {
  const app = connect();
  app.use(
    (request: any, response: any, next: connect.NextFunction) =>
      request.url === "/" ? response.end(html) : next()
  );
  app.use(finalhandler);

  const server = http.createServer(app);

  await new Promise((resolve, reject) => {
    const startServer = () => {
      server.once("error", (e: NodeJS.ErrnoException) => {
        if (e.code === "EADDRINUSE") {
          server.close(startServer);
        }
      });
      server.listen(0, (err?) => (err ? reject(err) : resolve()));
    };
    startServer();
  });

  return server;
};

const takeScreenshot = async (url: string) => {
  const browser = await puppeteer
    .launch(
      {
        args: ["--disable-lcd-text"],
        defaultViewport: { width: 1920, height: 1080 },
      },
    );
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "load" });

  const image = await page.screenshot();
  browser.close();

  return image;
};

const generateImage = async () => {
  // get HTML from JSDOM
  const html = document.documentElement.outerHTML;

  const server = await createServer(html);
  // We created intermediary variables to make necessary Typescript assertions
  const address = server.address()! as AddressInfo;
  const port = address.port;
  const url = `http://localhost:${port}`;
  const screenshot = await takeScreenshot(url);
  await new Promise((resolve) => server.close(resolve));
  return screenshot;
};

export default generateImage;
