import Lenis from '@studio-freight/lenis'

const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - 2 ** (-10 * t)), // https://www.desmos.com/calculator/brs54l4xou
  smoothWheel: true,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})
// // @ts-expect-error-next-line
// lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
//   console.log({ scroll, limit, velocity, direction, progress })
// })
function raf(time: unknown) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)


export default defineNuxtPlugin(() => {
  return {
    provide: {
      $lenis: lenis,
    },
  }
})
