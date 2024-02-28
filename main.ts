const trash = () => {
  const trash = Deno.readTextFileSync("./trash.txt");

  return new Response(trash);
};

Deno.serve(trash);
