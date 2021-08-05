export const createCircle = (
  root,
  size,
  bgColor,
  shapeClass,
  border = 1,
  borderColor
) => {
  const shape = document.createElement("div");
  shape.style.borderRadius = "50%";
  shape.style.width = `${size}px`;
  shape.style.height = `${size}px`;
  shape.style.backgroundColor = `${bgColor}`;
  shape.style.border = `${border}px solid ${borderColor}`;
  root.appendChild(shape);
  shape.classList.add(`"${shapeClass}"`);
};
