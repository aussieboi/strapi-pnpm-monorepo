import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// @ts-ignore
export function useGSAP() {
  gsap.registerPlugin(ScrollTrigger)
  return {
    provide: {
      gsap,
      ScrollTrigger,
    },
  }
}
