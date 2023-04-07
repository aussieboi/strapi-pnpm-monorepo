import { describe, it } from 'vitest';

import { withSetup } from './helper';
import { useWordWidth } from './useWordWidth';

describe('useWordWidth', () => {
  it('confirms composable works', () => {
    const [result, app] = withSetup(() => useWordWidth({
      content: 'Word',
      itemClasses: ["fake-marquee-item", "h1", "has-dash"],
      wrapperClasses: ["fake-content-wrapper"],
    }));
  })
})