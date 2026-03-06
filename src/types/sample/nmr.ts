import { fromJcamp } from 'nmr-metadata';

import type { ContentData, TypeEntry } from '../common.ts';
import {
  getBasename,
  getExtension,
  getFilename,
  getTargetProperty,
  getTextContent,
} from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const isFid = /[^a-z]fid[^a-z]/i;
const replaceFid = /[^a-z]fid[^a-z]?/i;

const nmr: TypeProcessor = {
  find: (entries: TypeEntry[], filename: string) => {
    const reference = getReference(filename);

    return entries.find((entry) => {
      return getReference(getFilename(entry) ?? '') === reference;
    });
  },

  getProperty: (filename: string) => {
    const extension = getExtension(filename);
    if (
      (extension === 'jdx' || extension === 'dx' || extension === 'jcamp') &&
      isFid.test(filename)
    ) {
      return 'jcampFID';
    }
    return getTargetProperty(filename);
  },

  process: (filename: string, content: ContentData) => {
    const extension = getExtension(filename);
    let metaData: Record<string, unknown> = {};
    if (extension === 'jdx' || extension === 'dx' || extension === 'jcamp') {
      const textContent = getTextContent(content);
      metaData = fromJcamp(textContent) as unknown as Record<string, unknown>;
    }
    return metaData;
  },

  jpath: ['spectra', 'nmr'],
};

export default nmr;

const reg2 = /(?<name>.*)\.(?<ext>.*)/;

function getReference(filename: string): string | undefined {
  if (filename === undefined) return undefined;

  let reference = getBasename(filename);
  reference = reference.replace(reg2, '$1');

  if (isFid.test(filename)) {
    reference = reference.replace(replaceFid, '');
  }
  return reference;
}
