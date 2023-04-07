import type { Ref, ComponentPublicInstance } from "vue"
import { gsap } from "gsap"
export type TemplateRef = Element | ComponentPublicInstance | null | HTMLElement


export interface UseTitleEnterAnimation {
  setLineRef: (el: TemplateRef) => void
  setTextRef: (el: TemplateRef) => void
  textTween: Ref<GSAPTweenTarget>
  lineTween: Ref<GSAPTweenTarget>
  titleEnterAnimation: Ref<GSAPTimeline>
}

export function useTitleEnterAnimation() {
  let textTween = ref<GSAPTween>()
  let lineTween = ref<GSAPTween>()
  let line = ref<GSAPTweenTarget>()
  let text = ref<GSAPTweenTarget>()
  function setLineRef(el: TemplateRef) {
    line.value = el
  }
  function setTextRef(el: TemplateRef) {
    text.value = el
  }

  onMounted(() => {
    lineTween.value = gsap.from(line.value!, {
      translateX: "-100%",
      duration: .4,
    })
    textTween.value = gsap.from(text.value!, {
      delay: .2,
      duration: .4,
      translateY: "150%"
    })

  })

  onBeforeUpdate(() => {
    text.value = null
    line.value = null
  })

  return {
    setLineRef,
    setTextRef,
    textTween,
    lineTween,
  }
}
