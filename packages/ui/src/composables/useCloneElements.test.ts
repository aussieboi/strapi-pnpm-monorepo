import { describe, it, vi } from 'vitest';

import { withSetup } from './helper';
import { useCloneElements } from './useCloneElements';

describe('useCloneElements', () => {
  it('confirms composable works with single value', () => {
    const [result, app] = withSetup(() => useCloneElements('Single value'))
    const spy = vi.spyOn(result, 'calculateCloneCount');
    // const { calculateCloneCount } = result
    const calculateCloneCount = result.calculateCloneCount

    const mockedContainer = document.createElement('div');
    Object.defineProperties(mockedContainer, {
      offsetWidth: {
        value: 1000
      }
    })

    // containerElement.value = mockedContainer

    nextTick(() => {
      calculateCloneCount();
      expect(spy).toHaveBeenCalled()
    })
  })
})