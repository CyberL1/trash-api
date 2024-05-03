import { generateImage } from "./generate.ts";

const trash = async (req: Request) => {
  const url = new URL(req.url);
  const thing = url.searchParams.get("thing");

  let trash = Deno.readTextFileSync("./trash.txt");

  if (req.headers.get("User-Agent")?.includes("curl")) {
    if (!thing) trash = trash.replace(" <- this is", "").replace("trash", "");
    else trash = trash.replace("trash", thing);

    return new Response(trash);
  }

  const image = await generateImage(thing);

  return new Response(image, { headers: { "content-type": "image/png" } });
};

Deno.serve(trash);
