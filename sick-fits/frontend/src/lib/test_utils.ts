import addonStoryshots from '@storybook/addon-storyshots';
import { render, RenderResult } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

export function afterRender() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => setTimeout(resolve, 0));
  });
}

export function actAfterRender() {
  return act(() => afterRender());
}

const reactTestingLibrarySerializer: jest.SnapshotSerializerPlugin = {
  print: (val, serialize) =>
    serialize((val as RenderResult).container.firstChild),
  test: (val) => val && Object.prototype.hasOwnProperty.call(val, 'container'),
};

export function initStoryshots() {
  addonStoryshots({
    renderer: render,
    snapshotSerializers: [reactTestingLibrarySerializer],
  });
}
