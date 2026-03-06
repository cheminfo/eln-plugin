import { expect, test } from 'vitest';

import {
  getBasename,
  getExtension,
  getReference,
  getTargetProperty,
} from '../types/common.ts';

test('common.ts', () => {
  expect(getBasename('./ab/cd/ef.ext')).toBe('ef.ext');
  expect(getExtension('./ab/cd/ef.ext')).toBe('ext');
  expect(getExtension('./ab/cd/ef.EXT')).toBe('ext');
  expect(getExtension('./ab/cd/ef.EXT.1234')).toBe('ext');

  expect(getReference('ab.cdf')).toBe('ab');
  expect(getReference('./ab/cd/ab.cdf')).toBe('ab');

  expect(getTargetProperty('./ab/cd/ef.jdx')).toBe('jcamp');
  expect(getTargetProperty('./ab/cd/ef.dx')).toBe('jcamp');
  expect(getTargetProperty('./ab/cd/ef.jcamp')).toBe('jcamp');
  expect(getTargetProperty('./ab/cd/ef.pdf')).toBe('pdf');
  expect(getTargetProperty('./ab/cd/ef.xml')).toBe('xml');
  expect(getTargetProperty('./ab/cd/ef.cdf')).toBe('cdf');
  expect(getTargetProperty('./ab/cd/ef.tiff')).toBe('image');
  expect(getTargetProperty('./ab/cd/ef.tif')).toBe('image');
  expect(getTargetProperty('./ab/cd/ef.png')).toBe('image');
  expect(getTargetProperty('./ab/cd/ef.jpg')).toBe('image');
  expect(getTargetProperty('./ab/cd/ef.jpeg')).toBe('image');
  expect(getTargetProperty('./ab/cd/ef.doc')).toBe('file');
  expect(getTargetProperty('./ab/cd/ef.xls')).toBe('file');
  expect(getTargetProperty('./ab/cd/ef.ppt')).toBe('file');
});
