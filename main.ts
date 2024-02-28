const trash = () => {
  return new Response("trash API");
};

Deno.serve(trash);
