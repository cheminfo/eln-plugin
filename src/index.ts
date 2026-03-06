import { getAllTypes, getType } from './typeUtils.ts';
import type { ContentData, TypeEntry } from './types/common.ts';
import common, { getContent } from './types/common.ts';
import type { TypeProcessor } from './types/types.ts';
import defaults from './util/defaults.ts';

export interface ProcessOptions {
  keepContent?: boolean;
}

const elnPlugin = {
  util: common,

  /**
   * Process a file and add its metadata to the document.
   * @param type - The type name.
   * @param doc - The document object to update.
   * @param content - The content data.
   * @param customMetadata - Optional custom metadata to merge.
   * @param options - Processing options.
   * @returns The updated document.
   */
  process(
    type: string,
    doc: Record<string, unknown>,
    content: ContentData,
    customMetadata?: Record<string, unknown>,
    options: ProcessOptions = {},
  ): Record<string, unknown> {
    const filename = content.filename;
    if (!filename) {
      throw new Error('Content must have a filename');
    }
    const typeProcessor = getType(type);
    const arr = createFromJpath(doc, typeProcessor) as TypeEntry[];
    const entry = typeProcessor.find?.(arr, filename);
    const property = typeProcessor.getProperty?.(filename, content);
    if (property === undefined) {
      throw new Error(`Could not get property of ${filename} (type ${type}`);
    }
    const metadata: Record<string, unknown> =
      typeProcessor.process?.(filename, content) ?? {};

    metadata[property] = {
      filename: elnPlugin.getFilename(type, filename),
    };

    if (options.keepContent) {
      (metadata[property] as Record<string, unknown>).data = getContent(
        content,
        property,
      );
    }

    if (entry) {
      Object.assign(entry, metadata, customMetadata);
    } else {
      Object.assign(metadata, customMetadata);
      (arr as unknown[]).push(metadata);
    }

    return doc;
  },

  /**
   * Get the type data from a document.
   * @param type - The type name.
   * @param doc - The document object.
   * @param kind - Optional kind scope.
   * @returns The type data or undefined.
   */
  getType(type: string, doc: Record<string, unknown>, kind?: string): unknown {
    const typeProcessor = getType(type, kind);
    return getFromJpath(doc, typeProcessor);
  },

  /**
   * Get the full filename including jpath prefix.
   * @param type - The type name.
   * @param filename - The base filename.
   * @returns The full path.
   */
  getFilename(type: string, filename: string): string {
    const match = /[^/]*$/.exec(filename);
    if (match) filename = match[0];
    const typeProcessor = getType(type);
    const jpath = typeProcessor.jpath;
    if (!jpath) throw new Error('No such type or no jpath');
    return jpath.concat(filename).join('/');
  },

  /**
   * Get an empty document structure for a given kind.
   * @param kind - The kind name.
   * @param content - Optional existing content to populate.
   * @returns The empty document.
   */
  getEmpty(
    kind: string,
    content?: Record<string, unknown>,
  ): Record<string, unknown> {
    const typeProcessors = getAllTypes(kind);
    if (!content) content = {};
    for (const typeProcessor of typeProcessors) {
      createFromJpath(content, typeProcessor);
    }

    return content;
  },

  /**
   * Apply default values to a document.
   * @param kind - The kind name.
   * @param content - The document to apply defaults to.
   * @returns The document with defaults applied.
   */
  defaults(
    kind: string,
    content: Record<string, unknown>,
  ): Record<string, unknown> {
    const empty = elnPlugin.getEmpty(kind);
    defaults(true, content, empty);
    return content;
  },
};

function createFromJpath(
  doc: Record<string, unknown>,
  typeProcessor: TypeProcessor,
): unknown {
  const jpath = typeProcessor.jpath;
  if (!jpath) {
    throw new Error('createFromJpath: undefined jpath argument');
  }
  let current: Record<string, unknown> = doc;
  for (const [index, key] of jpath.entries()) {
    if (current[key] === undefined) {
      if (index !== jpath.length - 1) {
        current[key] = {};
      } else {
        current[key] = typeProcessor.getEmpty?.() ?? [];
      }
    }
    current = current[key] as Record<string, unknown>;
  }
  if (jpath.length === 0) {
    Object.assign(current, typeProcessor.getEmpty?.() ?? []);
  }
  return current;
}

function getFromJpath(
  doc: Record<string, unknown> | undefined,
  typeProcessor: TypeProcessor,
): unknown {
  if (!doc) return undefined;
  const jpath = typeProcessor.jpath;
  if (!jpath) throw new Error('getFromJpath: undefined jpath argument');
  let current: Record<string, unknown> = doc;
  for (const key of jpath) {
    if (current[key] === undefined) {
      return undefined;
    }
    current = current[key] as Record<string, unknown>;
  }
  return current;
}

export default elnPlugin;
