import defaultType from './types/default.js';
import lib from './types/index';

export function getType(type, kind, custom) {
  if (kind) {
    if (lib[kind][type]) {
      return Object.assign({}, defaultType, lib[kind][type], custom);
    }
  } else {
    for (kind in lib) {
      if (lib[kind][type]) {
        return Object.assign(
          {},
          defaultType,
          lib[kind].default,
          lib[kind][type],
          custom,
        );
      }
    }
  }

  return Object.assign({}, defaultType);
}

export function getAllTypes(kind, custom) {
  let all = [];

  for (let type in lib[kind]) {
    if (type !== 'default') {
      all.push(getType(type, kind, custom));
    }
  }
  return all;
}

export default lib;
