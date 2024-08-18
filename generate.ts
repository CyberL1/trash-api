import { Image } from "https://deno.land/x/imagescript@1.2.17/mod.ts";
import { Color } from "https://deno.land/x/imagescript@1.2.17/v2/framebuffer.mjs";

export const generateImage = (thing: string | null) => {
  const image = new Image(771, 412);

  image.fill(new Color("#000").value);

  const font = Deno.readFileSync("./DejaVuSansMono.ttf");
  const trashCmd = thing ? `trash ${thing}` : "trash";

  const hostname = Image.renderText(
    font,
    20,
    "shell@tra.sh",
    new Color("#14900c").value,
  );

  const comma = Image.renderText(font, 20, ":");
  const dir = Image.renderText(font, 20, "~", new Color("#419eee").value);
  const dollar = Image.renderText(font, 20, "$");
  const command = Image.renderText(font, 20, trashCmd);

  image.composite(hostname, 1, 2);
  image.composite(comma, 157, 2);
  image.composite(dir, 170, 2);
  image.composite(dollar, 183, 2);
  image.composite(command, 210, 2);

  let trash = Deno.readTextFileSync("./trash.txt").replaceAll("\n", "\r");

  if (!thing) trash = trash.replace(" <- this is", "").replace("trash", "");
  else trash = trash.replace("trash", thing);

  const result = Image.renderText(font, 20, trash);

  image.composite(result, 1, 25);

  return image.encode();
};
