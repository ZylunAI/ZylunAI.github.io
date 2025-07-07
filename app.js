import initTurbo from "https://huggingface.co/stabilityai/stable-diffusion-turbo/resolve/main/web/turbo.js";

const promptInput = document.getElementById("prompt");
const generateBtn = document.getElementById("generate");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const status = document.getElementById("status");

let generate;

status.textContent = "🔄 Loading model, please wait...";

(async () => {
  const turbo = await initTurbo();
  generate = turbo.generate;
  status.textContent = "✅ Model ready. Enter a prompt!";
})();

generateBtn.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();
  if (!prompt) {
    status.textContent = "⚠️ Please enter a prompt.";
    return;
  }
  if (!generate) {
    status.textContent = "⏳ Model is still loading...";
    return;
  }

  status.textContent = `🎨 Generating image for: "${prompt}"...`;

  try {
    const image = await generate(prompt);
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.putImageData(image, 0, 0);
    status.textContent = "✅ Image generated successfully!";
  } catch (e) {
    status.textContent = "❌ Error generating image.";
    console.error(e);
  }
});
