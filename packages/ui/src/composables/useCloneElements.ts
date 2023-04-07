
import type { Ref } from "vue"
interface UseCloneElements {
  containerElement: Ref<HTMLElement | null>
  cloneCount: Ref<number>,
  contentWidth: Ref<number>,
  calculateCloneCount: () => number,
}

export function useCloneElements(value: string | string[]): UseCloneElements {
  const containerElement = ref<HTMLElement | null>(null)
  const containerWidth = ref<number>(0)
  const contentWidth = ref<number>(0)
  const cloneCount = ref<number>(0)

  function calculateCloneCount() {
    containerWidth.value = containerElement.value?.offsetWidth ?? 0
    contentWidth.value = useWordWidth({
      content: value,
      itemClasses: ["fake-marquee-item", "h1", !Array.isArray(value) ? "has-dash" : ""],
      wrapperClasses: ["fake-content-wrapper"],
    })
    return contentWidth.value > containerWidth.value!
      ? 1
      : Math.ceil((containerWidth.value! - contentWidth.value) / contentWidth.value) + 1
  }

  onMounted(async () => {
    await nextTick(() => {
      cloneCount.value = calculateCloneCount() ?? 0
    })
  })
  return {
    containerElement,
    cloneCount,
    contentWidth,
    calculateCloneCount,
  }
}
