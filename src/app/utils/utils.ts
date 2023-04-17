import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from 'tailwind.config.js';
import { KeyValue } from '@angular/common';

const fullConfig = resolveConfig(tailwindConfig);

export const color = fullConfig.theme!.colors;

export const originalOrder = (
  a: KeyValue<number, string>,
  b: KeyValue<number, string>
): number => {
  return 0;
};
