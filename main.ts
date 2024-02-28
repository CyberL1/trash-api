const trash = (req: Request) => {
  const url = new URL(req.url);
  const thing = url.searchParams.get("thing");

  let trash = Deno.readTextFileSync("./trash.txt");

  if (!thing) trash = trash.replace(" <- this is", "").replace("trash", "");
  else trash = trash.replace("trash", thing);

  return new Response(trash);
};

Deno.serve(trash);
