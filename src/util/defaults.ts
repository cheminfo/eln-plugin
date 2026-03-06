/*
    Modified from https://github.com/justmoon/node-extend
    Copyright (c) 2014 Stefan Thomas
 */

function isPlainObject(obj: unknown): obj is Record<string, unknown> {
  if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') {
    return false;
  }

  const typedObj = obj as Record<string, unknown> & {
    constructor?: (new (...args: unknown[]) => unknown) & {
      prototype?: Record<string, unknown>;
    };
  };
  const hasOwnConstructor = Object.hasOwn(typedObj, 'constructor');
  const hasIsPrototypeOf =
    typedObj.constructor?.prototype &&
    Object.hasOwn(typedObj.constructor.prototype, 'isPrototypeOf');
  // Not own constructor property must be Object
  if (typedObj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    return false;
  }

  // Own properties are enumerated firstly, so to speed up,
  // if last one is own, then all properties are own.
  let key: string | undefined;
  for (key in typedObj as Record<string, unknown>) {
    /**/
  }

  return key === undefined || Object.hasOwn(typedObj, key);
}

/**
 * Deep merge with defaults behavior: only set properties that are undefined on the target.
 * @param args - Arguments: optional boolean (deep), target, and sources.
 * @returns The merged target.
 */
export default function defaults(...args: unknown[]): unknown {
  let target: Record<string, unknown>;
  let i = 1;
  const length = args.length;
  let deep = false;

  // Handle a deep copy situation
  if (typeof args[0] === 'boolean') {
    deep = args[0];
    target = (args[1] || {}) as Record<string, unknown>;
    // skip the boolean and the target
    i = 2;
  } else if (
    (typeof args[0] !== 'object' && typeof args[0] !== 'function') ||
    args[0] == null
  ) {
    target = {};
  } else {
    target = args[0] as Record<string, unknown>;
  }

  for (; i < length; ++i) {
    const options = args[i] as Record<string, unknown> | null | undefined;
    // Only deal with non-null/undefined values
    if (options != null) {
      // Extend the base object
      for (const name in options) {
        const copy = options[name];

        // Prevent never-ending loop
        if (target !== copy) {
          // Recurse if we're merging plain objects or arrays
          let copyIsArray = false;
          if (
            deep &&
            copy &&
            (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))
          ) {
            const src = target[name];
            let clone: unknown;
            if (copyIsArray) {
              clone = src && Array.isArray(src) ? src : [];
            } else {
              clone = src && isPlainObject(src) ? src : {};
            }

            // Never move original objects, clone them
            if (target[name] === undefined) {
              target[name] = defaults(deep, clone, copy) as Record<
                string,
                unknown
              >;
            } else {
              defaults(deep, clone, copy);
            }

            // Don't bring in undefined values
          } else if (copy !== undefined && target[name] === undefined) {
            target[name] = copy;
          }
        }
      }
    }
  }

  // Return the modified object
  return target;
}
