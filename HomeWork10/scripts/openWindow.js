let isActive = true;
export const openWindow = (elem) => {
  if (isActive === true) {
    elem.classList.add("active");
    isActive = false;
  } else {
    elem.classList.remove("active");
    isActive = true;
  }
};
