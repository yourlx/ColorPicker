const cols = document.querySelectorAll(".col");

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;
  if (type == "lock") {
    const node =
      event.target.tagName.toLowerCase() == "i"
        ? event.target
        : event.target.children[0];
    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type == "copy") {
    copyToClipboard(event.target.textContent);
  } else {
    setRandomColors();
  }
});

function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

function setRandomColors() {
  const colors = [];
  cols.forEach((col) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    if (isLocked) {
      colors.push(text.textContent);
      return;
    }
    const button = col.querySelector("button");
    const color = chroma.random();
    colors.push(color);
    text.textContent = color;
    col.style.background = color;
    setTextColor(text, color);
    setTextColor(button, color);
  });
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}

setRandomColors();
