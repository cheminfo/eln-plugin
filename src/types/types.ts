import type { ContentData, TypeEntry } from './common.ts';

export interface TypeProcessor {
  jpath: string[];
  find?: (entries: TypeEntry[], filename: string) => TypeEntry | undefined;
  getProperty?: (filename: string, content?: ContentData) => string | undefined;
  process?: (filename: string, content: ContentData) => Record<string, unknown>;
  getEmpty?: () => Record<string, unknown> | TypeEntry[];
}
