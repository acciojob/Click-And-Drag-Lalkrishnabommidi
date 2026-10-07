const container = document.querySelector(".container");
const cubes = document.querySelectorAll(".cube");

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach((cube) => {
  cube.addEventListener("mousedown", (e) => {
    activeCube = cube;

    const cubeRect = cube.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    offsetX = e.clientX - cubeRect.left;
    offsetY = e.clientY - cubeRect.top;

    const left = cubeRect.left - containerRect.left;
    const top = cubeRect.top - containerRect.top;

    cube.style.position = "absolute";
    cube.style.left = `${left}px`;
    cube.style.top = `${top}px`;
    cube.style.zIndex = "10";
  });
});

document.addEventListener("mousemove", (e) => {
  if (!activeCube) {
    return;
  }

  const containerRect = container.getBoundingClientRect();
  const cubeWidth = activeCube.offsetWidth;
  const cubeHeight = activeCube.offsetHeight;

  let left = e.clientX - containerRect.left - offsetX;
  let top = e.clientY - containerRect.top - offsetY;

  const maxLeft = container.clientWidth - cubeWidth;
  const maxTop = container.clientHeight - cubeHeight;

  left = Math.max(0, Math.min(left, maxLeft));
  top = Math.max(0, Math.min(top, maxTop));

  activeCube.style.left = `${left}px`;
  activeCube.style.top = `${top}px`;
});

document.addEventListener("mouseup", () => {
  if (!activeCube) {
    return;
  }

  const containerRect = container.getBoundingClientRect();
  const cubeRect = activeCube.getBoundingClientRect();

  let left = cubeRect.left - containerRect.left;
  let top = cubeRect.top - containerRect.top;

  const maxLeft = container.clientWidth - activeCube.offsetWidth;
  const maxTop = container.clientHeight - activeCube.offsetHeight;

  left = Math.max(0, Math.min(left, maxLeft));
  top = Math.max(0, Math.min(top, maxTop));

  activeCube.style.left = `${left}px`;
  activeCube.style.top = `${top}px`;
  activeCube.style.zIndex = "1";

  activeCube = null;
});