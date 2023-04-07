import type { ComponentPublicInstance, Ref } from 'vue';
import { gsap } from 'gsap';

export type TemplateRef = Element | ComponentPublicInstance | null | HTMLElement

export interface LoopConfig {
  repeat?: number
  paused?: boolean
  speed?: number
  snap?: number | number[] | false
  paddingRight?: number
  reversed?: boolean
  ease?: string
}
export const defaultHorizontalLoop = {
  repeat: -1,
  paused: true,
  speed: 1,
  snap: 1,
  paddingRight: 0,
  reversed: false,
  ease: 'none',
}

export function useHorizontalLoop1(items: TemplateRef[], config?: Ref<LoopConfig>) {
  items = gsap.utils.toArray<HTMLElement>(items) as HTMLElement[];

  const _config: LoopConfig = { ...defaultHorizontalLoop, ...config }
  let tl = gsap.timeline({
    repeat: _config.repeat,
    paused: _config.paused,
    defaults: { ease: _config.ease },
    // @ts-ignore
    onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
  });
  let length = items.length
  let startX = (items[0] as HTMLElement).offsetLeft
  let times: number[] = []
  let widths: number[] = []
  let xPercents: number[] = []
  let currentIndex = 0
  let pixelsPerSecond = _config.speed ?? 1 * 100
  let snapFn = _config.snap === false ? (v: any) => v : gsap.utils.snap(_config.snap ?? 1)
  let totalWidth
  let curX
  let distanceToStart
  let distanceToLoop
  let item
  let i

  gsap.set(items, {
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(
        gsap.getProperty(el, 'width', 'px') as string
      ))
      xPercents[i] = snapFn(
        (parseFloat(gsap.getProperty(el, 'x', 'px') as string) / w) * 100 +
        (gsap.getProperty(el, 'xPercent') as number)
      )
      return xPercents[i]
    },
  })

  gsap.set(items, { x: 0 });
  totalWidth =
    (items[length - 1] as HTMLElement).offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    (items[length - 1] as HTMLElement).offsetLeft *
    (gsap.getProperty(items[length - 1], 'scaleX') as number) +
    (_config.paddingRight ?? 0)

  for (i = 0; i < length; i++) {
    item = items[i]
    curX = (xPercents[i] / 100) * widths[i]
    distanceToStart = (item as HTMLElement).offsetLeft + curX - startX
    distanceToLoop =
      distanceToStart + widths[i] * (gsap.getProperty(item, 'scaleX') as number)
    tl.to(
      item,
      {
        xPercent: snapFn(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snapFn(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add('label' + i, distanceToStart / pixelsPerSecond)
    times[i] = distanceToStart / pixelsPerSecond
  }

  function toIndex(index: number, vars: GSAPTweenVars = {}) {
    Math.abs(index - currentIndex) > length / 2 &&
      (index += index > currentIndex ? -length : length) // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex]
    const p1 = time > tl.time()
    const p2 = index > currentIndex
    if (p1 !== p2) {
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) }
      time += tl.duration() * (index > currentIndex ? 1 : -1)
    }
    currentIndex = newIndex
    vars.overwrite = true
    return tl.tweenTo(time, vars)
  }

  tl.next = (vars: GSAPTweenVars) => toIndex(currentIndex + 1, vars)
  tl.previous = (vars: GSAPTweenVars) => toIndex(currentIndex - 1, vars)
  tl.current = () => currentIndex
  tl.toIndex = (index: number, vars: GSAPTweenVars) => toIndex(index, vars)
  tl.times = times
  tl.progress(1, true).progress(0, true) // pre-render for performance

  if (_config.reversed) {
    // @ts-ignore
    tl.vars.onReverseComplete()
    tl.reverse()
  }

  return tl
}
