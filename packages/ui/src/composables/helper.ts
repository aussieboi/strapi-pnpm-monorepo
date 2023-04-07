import { createApp } from 'vue'

export function withSetup<T>(composable: (...params: any) => T) {
  let result: T;

  const app = createApp({
    setup() {
      result = composable()
      // suppress missing template warning
      return () => { }
    }
  })

  app.mount(document.createElement('div'))

  // return the result and the app instance
  // for testing provide / unmount
  // @ts-ignore
  return [result, app] as const;
}