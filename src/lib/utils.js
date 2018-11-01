export const delayToExec = function(fn, delay = 1000) {
  let timer = setTimeout(() => {
    fn.apply(this, Array.from(arguments))
    clearTimeout(timer)
  }, delay)
}