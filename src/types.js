import bulk from 'bulk-require';

const lib = bulk(__dirname, 'types/**/*.js');

console.log(lib.types);




export function getType(type, kind, custom) {
  if (kind) {
    if (lib.types[kind][type]) {
      return Object.assign(
        {},
        lib.types.default.default,
        lib.types[kind].default,
        lib.types[kind][type].default,
        custom,
      );
    }
  } else {
    for (kind in lib.types) {
      if (lib.types[kind][type]) {


        return Object.assign(
          {},
          lib.types.default.default,
          lib.types[kind].default,
          lib.types[kind][type].default,
          custom,
        );
      }
    }
  }

  return Object.assign({}, lib.types.default);
}

export function getAllTypes(kind, custom) {
  let all = [];

  for (let type in lib.types[kind]) {
    if (type !== 'default') {
      all.push(getType(type, kind, custom));
    }
  }
  return all;
}