export function throttle(fn, delay = 300) {
  let timer;
  function core(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  }
  return core;
}

export function debounce(fn, delay = 300) {
  let flag = false;
  function core(...args) {
    if (flag) return;
    flag = true;
    const timer = setTimeout(() => {
      clearTimeout(timer);
      flag = false;
      fn(...args);
    }, delay);
  }
  return core;
}

export default {};