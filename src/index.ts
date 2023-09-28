import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import {
  convertInstagramReelsToDdInstagram,
  convertTwitterUrl,
  getElementFromHTML,
} from "./libs/utils";
import { generateRequestId } from "./libs/requestId";

const app = new Elysia()
  .use(
    swagger({
      path: "/v1/use",
      autoDarkMode: true,
      version: "1.0-ts",
      // documentation: {},
    })
  )
  .group("/v1", (app) => {
    return app
      .get("/reels/*", async (context) => {
        try {
          console.log(context);
          const urlParam = context.params["*"];
          const convertedUrl = convertInstagramReelsToDdInstagram(urlParam);

          const response = await fetch(convertedUrl, {
            redirect: "follow",
            headers: {
              "user-agent":
                "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
            },
          });
          if (response.ok) {
            const htmlRaw = await response.text();
            const finalres = getElementFromHTML(htmlRaw, response.url);
            // The response.url property will contain the final redirected URL
            // const newRes = await fetch(finalres!.url, { redirect: "follow" });
            const id = generateRequestId();
            return new Response(
              JSON.stringify({
                id: id,
                message: finalres!.url,
                error: null,
                type: finalres!.type,
                service: "instagram",
              }),
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
          } else {
            throw new Error("Request failed with status " + response.status);
          }
        } catch (err: any) {
          console.log(err);
          return new Response(
            JSON.stringify({
              message: "Can't fetch reels. Server Error",
              error: err.message,
            }),
            {
              headers: {
                "Content-Type": "application/json",
              },
              status: 501,
            }
          );
        }
      })
      .get("/tweets/*", async (context) => {
        try {
          const urlParam = context.params["*"];
          console.log(urlParam);

          const convertedUrl = convertTwitterUrl(urlParam);

          const id = generateRequestId();
          return new Response(
            JSON.stringify({
              id: id,
              message: convertedUrl,
              error: null,
              type: "custom",
              service: "twitter",
              code: "P200",
            })
          ); // Respond with success

          // console.log(convertedUrl);

          // console.log(response);

          // if (response.status == 200) {
          //   const cleanUrl = response.config.url!.split("?")[0];
          //   const type = cleanUrl.endsWith(".mp4")
          //     ? "video"
          //     : "image"
          //     ? cleanUrl.endsWith(".jpg")
          //     : "";

          //   return new Response(
          //     JSON.stringify({
          //       id: id,
          //       message: "response.url",
          //       error: null,
          //       type: type,
          //       service: "twitter",
          //       code: "P200",
          //     })
          // ); // Respond with success
          // } else {
          // throw new Error("Request failed with status " + response.status);
          // }
        } catch (err: any) {
          console.log(err);
          return new Response(
            JSON.stringify({
              message: "Can't fetch tweet. Server Error",
              error: err.message,
            }),
            {
              headers: {
                "Content-Type": "application/json",
              },
              status: 501,
            }
          );
        }
      });
  })
  .get("/", () => "Running Nicely!!")

  .listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
