import initTurbo from "https://huggingface.co/stabilityai/stable-diffusion-turbo/resolve/main/web/turbo.js";

const canvas = document.getElementById("canvas");
const form = document.getElementById("promptForm");
const promptInput = document.getElementById("prompt");

let generate;

(async () => {
  const turbo = await initTurbo();
  generate = turbo.generate;
})();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const prompt = promptInput.value;
  if (!generate) return alert("Model still loading, please wait...");
  const image = await generate(prompt);
  const ctx = canvas.getContext("2d");
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.putImageData(image, 0, 0);
});
