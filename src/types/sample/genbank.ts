import { genbankToJson } from 'genbank-parser';

import type { ContentData, TypeEntry } from '../common.ts';
import {
  getBasename,
  getFilename,
  getTargetProperty,
  getTextContent,
} from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const genbank: TypeProcessor = {
  find(entries: TypeEntry[], filename: string) {
    const reference = getBasename(filename);

    return entries.find((entry) => {
      return getBasename(getFilename(entry) ?? '') === reference;
    });
  },

  getProperty(filename: string) {
    return getTargetProperty(filename);
  },

  process(filename: string, content: ContentData) {
    const textContent = getTextContent(content);
    const parsed = genbankToJson(textContent);
    return {
      seq: parsed,
    } as Record<string, unknown>;
  },

  jpath: ['biology', 'nucleic'],
};

export default genbank;
