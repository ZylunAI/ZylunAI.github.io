import initTurbo from "https://huggingface.co/stabilityai/stable-diffusion-turbo/resolve/main/web/turbo.js";

const form = document.getElementById("form");
const promptInput = document.getElementById("prompt");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const status = document.getElementById("status");

let generate;

status.textContent = "🔄 Loading model...";

(async () => {
  const turbo = await initTurbo();
  generate = turbo.generate;
  status.textContent = "✅ Model loaded! Ready to generate.";
})();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const prompt = promptInput.value.trim();
  if (!prompt) return;

  status.textContent = `🎨 Generating image for: "${prompt}"...`;
  const image = await generate(prompt);

  canvas.width = image.width;
  canvas.height = image.height;
  ctx.putImageData(image, 0, 0);
  status.textContent = "✅ Image generated successfully!";
});
