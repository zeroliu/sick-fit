import { act } from 'react-dom/test-utils';

export function afterRender() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => setTimeout(resolve, 0));
  });
}

export function actAfterRender() {
  return act(() => afterRender());
}
