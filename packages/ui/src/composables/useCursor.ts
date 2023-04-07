import type { Ref } from 'vue'
import gsap from 'gsap'

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b

function cursorRefIsGSAPTweenTarget(cursor: GSAPTweenTarget | null): cursor is Ref<GSAPTweenTarget> {
  return cursor !== null
}
interface TCursor {
  cursorRef: (el: GSAPTweenTarget) => void
  updateCursor: (newX: number, newY: number) => void,
  x: Ref<number>
  y: Ref<number>
}


export const useCursor = (containerEl?: Ref<HTMLElement | undefined>): TCursor => {
  const { x, y, elementX, elementY, elementHeight, elementWidth } = useMouseInElement(containerEl, { touch: false, })

  let cursor = ref<GSAPTweenTarget | null>(null)
  const cursorRef = (el: GSAPTweenTarget): void => {
    cursor.value = el
  }

  const isOutside = computed(() => {
    return elementWidth.value === 0 || elementHeight.value === 0
      || elementX.value < 100 || elementY.value < 100
      || elementX.value > elementWidth.value - 100 || elementY.value > elementHeight.value - 100

  })

  watch([x, y], ([nX, nY]) => {
    updateCursor(nX - 200, nY - 200)
  })

  onMounted(() => {
    if (cursorRefIsGSAPTweenTarget(cursor.value))

      updateCursor(x.value, y.value)

  })

  const updateCursor = (newX: number, newY: number): void => {
    if (!isOutside.value) {
      gsap.set(cursor.value, {
        transformOrigin: "center"
      })
      gsap.to(cursor.value, {
        translateX: lerp(x.value, newX, 0.5),
        translateY: lerp(y.value, newY, 0.5),
        opacity: 1,
        scale: 1,
      })
    } else {
      gsap.to(cursor.value, {
        opacity: 0,
        scale: 0,
        duration: .7
      })
    }
  }

  return {
    cursorRef,
    updateCursor,
    x,
    y,
  }
}
