import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Добавляем расширения jest-dom
expect.extend(matchers);

afterEach(() => {
  cleanup();
});