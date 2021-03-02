import common from '../types/common';

test('common.js', () => {
  expect(common.getBasename('./ab/cd/ef.ext')).toBe('ef.ext');
  expect(common.getExtension('./ab/cd/ef.ext')).toBe('ext');
  expect(common.getExtension('./ab/cd/ef.EXT')).toBe('ext');
  expect(common.getExtension('./ab/cd/ef.EXT.1234')).toBe('ext');

  expect(common.getTargetProperty('./ab/cd/ef.jdx')).toBe('jcamp');
  expect(common.getTargetProperty('./ab/cd/ef.dx')).toBe('jcamp');
  expect(common.getTargetProperty('./ab/cd/ef.jcamp')).toBe('jcamp');
  expect(common.getTargetProperty('./ab/cd/ef.pdf')).toBe('pdf');
  expect(common.getTargetProperty('./ab/cd/ef.xml')).toBe('xml');
  expect(common.getTargetProperty('./ab/cd/ef.cdf')).toBe('cdf');
  expect(common.getTargetProperty('./ab/cd/ef.tiff')).toBe('image');
  expect(common.getTargetProperty('./ab/cd/ef.tif')).toBe('image');
  expect(common.getTargetProperty('./ab/cd/ef.png')).toBe('image');
  expect(common.getTargetProperty('./ab/cd/ef.jpg')).toBe('image');
  expect(common.getTargetProperty('./ab/cd/ef.jpeg')).toBe('image');
  expect(common.getTargetProperty('./ab/cd/ef.doc')).toBe('file');
  expect(common.getTargetProperty('./ab/cd/ef.xls')).toBe('file');
  expect(common.getTargetProperty('./ab/cd/ef.ppt')).toBe('file');
});
