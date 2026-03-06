import { toByteArray } from 'base64-js';
import { convert } from 'jcampconverter';

export interface ContentData {
  content: string;
  encoding?: string;
  filename?: string;
}

export type TypeEntry = Record<string, { filename: string } | unknown>;

export interface MappingOptions {
  mapping?: Record<string, string>;
}

/**
 * Get the basename of a file path, stripping trailing numeric extensions.
 * @param filename - The file path.
 * @returns The basename.
 */
export function getBasename(filename: string): string {
  const base = filename.replace(/.*\//, '');
  return base.replace(/\.[0-9]+$/, '');
}

/**
 * Get the reference from a filename by removing basedir, trailing numeric extension, and file extension.
 * @param filename - The file path.
 * @returns The reference string.
 */
export function getReference(filename: string): string {
  let base = filename.replace(/.*\//, '');
  base = base.replace(/\.[0-9]+$/, '');
  return base.replace(/\..*?$/, '');
}

/**
 * Get the lowercase file extension.
 * @param filename - The file path.
 * @returns The extension.
 */
export function getExtension(filename: string): string {
  const extension = getBasename(filename);
  return extension.replace(/.*\./, '').toLowerCase();
}

/**
 * Get the filename from a type entry object.
 * @param typeEntry - The type entry object.
 * @returns The filename or undefined.
 */
export function getFilename(typeEntry: TypeEntry): string | undefined {
  for (const key of Object.keys(typeEntry)) {
    const value = typeEntry[key] as { filename?: string } | undefined;
    if (value?.filename) {
      return value.filename;
    }
  }
  return undefined;
}

/**
 * Find a type entry by matching basename.
 * @param typeEntries - Array of type entries.
 * @param filename - The filename to match.
 * @returns The matching entry or undefined.
 */
export function basenameFind(
  typeEntries: TypeEntry[],
  filename: string,
): TypeEntry | undefined {
  const reference = getBasename(filename);

  return typeEntries.find((typeEntry) => {
    return getBasename(getFilename(typeEntry) ?? '') === reference;
  });
}

/**
 * Find a type entry by matching reference.
 * @param typeEntries - Array of type entries.
 * @param filename - The filename to match.
 * @returns The matching entry or undefined.
 */
export function referenceFind(
  typeEntries: TypeEntry[],
  filename: string,
): TypeEntry | undefined {
  const reference = getReference(filename);

  return typeEntries.find((typeEntry) => {
    return getReference(getFilename(typeEntry) ?? '') === reference;
  });
}

/**
 * Get the target property name based on file extension.
 * @param filename - The file path.
 * @returns The target property string.
 */
export function getTargetProperty(filename: string): string {
  switch (getExtension(filename)) {
    case 'jdx':
    case 'dx':
    case 'jcamp':
      return 'jcamp';
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'tif':
    case 'tiff':
    case 'svg':
      return 'image';
    case 'mp4':
    case 'm4a':
    case 'avi':
    case 'wav':
      return 'video';
    case 'cif':
      return 'cif';
    case 'pdb':
      return 'pdb';
    case 'xml':
    case 'mzml':
    case 'mzxml':
    case 'mzdata':
      return 'xml';
    case 'cdf':
    case 'nc':
    case 'netcdf':
      return 'cdf';
    case 'pdf':
      return 'pdf';
    case 'txt':
    case 'text':
    case 'csv':
    case 'tsv':
      return 'text';
    case 'gbk':
    case 'gb':
      return 'genbank';
    default:
      return 'file';
  }
}

/**
 * Get content as text or buffer depending on the target property.
 * @param content - The content data.
 * @param target - The target property name.
 * @returns The decoded content.
 */
export function getContent(
  content: ContentData,
  target: string,
): string | Uint8Array {
  switch (target) {
    case 'text':
    case 'xml':
    case 'pdb':
    case 'jcamp':
    case 'cif':
    case 'genbank':
      return getTextContent(content);
    default:
      return getBufferContent(content);
  }
}

/**
 * Decode content as text.
 * @param content - The content data.
 * @returns The text content.
 */
export function getTextContent(content: ContentData): string {
  if (content.encoding === 'base64') {
    return atob(content.content);
  }
  return content.content;
}

/**
 * Decode content as a buffer.
 * @param content - The content data.
 * @returns The buffer content.
 */
export function getBufferContent(content: ContentData): string | Uint8Array {
  if (content.encoding === 'base64') {
    return toByteArray(content.content);
  }
  return content.content;
}

/**
 * Extract metadata from a JCAMP file using optional key mapping.
 * @param filename - The file path.
 * @param content - The content data.
 * @param options - Options with optional mapping.
 * @returns The extracted metadata.
 */
export function getMetaFromJcamp(
  filename: string,
  content: ContentData,
  options: MappingOptions = {},
): Record<string, unknown> {
  const extension = getExtension(filename);
  const { mapping } = options;
  const metaData: Record<string, unknown> = {};
  if (extension === 'jdx' || extension === 'dx' || extension === 'jcamp') {
    const textContent = getTextContent(content);
    const parsed = convert(textContent, {
      withoutXY: true,
      keepRecordsRegExp: /.*/i,
      canonicMetadataLabels: true,
    }).flatten[0];
    if (parsed?.meta?.CHEMINFO) {
      try {
        const cheminfo = JSON.parse(String(parsed.meta.CHEMINFO));
        if (cheminfo.meta) {
          return cheminfo.meta as Record<string, unknown>;
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.trace(error);
      }
    }
    if (mapping && parsed?.meta) {
      for (const key in mapping) {
        const mappingValue = mapping[key];
        if (!mappingValue || !parsed.meta[key]) continue;
        const paths = mappingValue.split('.');
        let currentTarget = metaData;
        for (let i = 0; i < paths.length - 1; i++) {
          const pathSegment = paths[i] as string;
          if (!currentTarget[pathSegment]) {
            metaData[pathSegment] = {};
          }
          currentTarget = metaData[pathSegment] as Record<string, unknown>;
        }
        const lastPath = paths.at(-1) as string;
        currentTarget[lastPath] = parsed.meta[key];
      }
    }
  }
  return metaData;
}

const common = {
  getBasename,
  getReference,
  getExtension,
  getFilename,
  basenameFind,
  referenceFind,
  getTargetProperty,
  getContent,
  getTextContent,
  getBufferContent,
  getMetaFromJcamp,
};

export default common;
