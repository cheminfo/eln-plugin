import defaultType from './types/default.ts';
import lib from './types/index.ts';
import type { TypeProcessor } from './types/types.ts';

/**
 * Get a type processor by type name, optionally scoped to a kind.
 * @param type - The type name.
 * @param kind - Optional kind to scope the search.
 * @param custom - Optional custom overrides.
 * @returns The type processor.
 */
export function getType(
  type: string,
  kind?: string,
  custom?: Partial<TypeProcessor>,
): TypeProcessor {
  if (kind) {
    if (lib[kind]?.[type]) {
      return { ...defaultType, ...lib[kind][type], ...custom };
    }
  } else {
    for (const kindKey in lib) {
      if (lib[kindKey]?.[type]) {
        return {
          ...defaultType,
          ...lib[kindKey].default,
          ...lib[kindKey][type],
          ...custom,
        };
      }
    }
  }

  return { ...defaultType };
}

/**
 * Get all type processors for a given kind.
 * @param kind - The kind name.
 * @param custom - Optional custom overrides.
 * @returns Array of type processors.
 */
export function getAllTypes(
  kind: string,
  custom?: Partial<TypeProcessor>,
): TypeProcessor[] {
  const all: TypeProcessor[] = [];

  for (const type in lib[kind]) {
    if (type !== 'default') {
      all.push(getType(type, kind, custom));
    }
  }
  return all;
}
