import { generateImage } from "./generate.ts";
import { encode } from "https://deno.land/std@0.166.0/encoding/base64.ts";

const trash = async (req: Request) => {
  const url = new URL(req.url);
  const thing = url.searchParams.get("thing");

  let trash = Deno.readTextFileSync("./trash.txt");

  if (url.pathname === "/text") {
    if (!thing) trash = trash.replace(" <- this is", "").replace("trash", "");
    else trash = trash.replace("trash", thing);

    return new Response(trash);
  }

  const image = await generateImage(thing);

  const html = `<html>
  <body style="margin: 0">
    <img style="width: 100%;height: 100%;" src="data:image/png;base64,${
    encode(image)
  }" />
  </body>
</html>`;

  if (req.headers.get("user-agent")?.includes("Discord")) {
    return new Response(image, { headers: { "content-type": "image/png" } });
  }

  return new Response(html, { headers: { "content-type": "text/html" } });
};

Deno.serve(trash);
