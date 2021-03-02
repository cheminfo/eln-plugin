'use strict';

var bulk = require('bulk-require');
var atob = require('atob');
var base64Js = require('base64-js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var bulk__default = /*#__PURE__*/_interopDefaultLegacy(bulk);
var atob__default = /*#__PURE__*/_interopDefaultLegacy(atob);

const lib = bulk__default['default'](__dirname, 'types/**/*.js');

console.log(lib.types);




function getType(type, kind, custom) {
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

function getAllTypes(kind, custom) {
  let all = [];

  for (let type in lib.types[kind]) {
    if (type !== 'default') {
      all.push(getType(type, kind, custom));
    }
  }
  return all;
}

const common = {};
common.getBasename = function (filename) {
  let base = filename.replace(/.*\//, '');
  return base.replace(/\.[0-9]+$/, '');
};

common.getExtension = function (filename) {
  let extension = common.getBasename(filename);
  return extension.replace(/.*\./, '').toLowerCase();
};

common.getFilename = function (typeEntry) {
  let keys = Object.keys(typeEntry);
  for (let i = 0; i < keys.length; i++) {
    if (typeEntry[keys[i]] && typeEntry[keys[i]].filename) {
      return typeEntry[keys[i]].filename;
    }
  }
  return undefined;
};

common.basenameFind = function (typeEntries, filename) {
  let reference = common.getBasename(filename);

  return typeEntries.find((typeEntry) => {
    return common.getBasename(common.getFilename(typeEntry)) === reference;
  });
};

common.getTargetProperty = function (filename) {
  switch (common.getExtension(filename)) {
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
};

common.getContent = function (content, target) {
  switch (target) {
    case 'text':
    case 'xml':
    case 'pdb':
    case 'jcamp':
    case 'cif':
    case 'genbank':
      return common.getTextContent(content);
    default:
      return common.getBufferContent(content);
  }
};

common.getTextContent = function getTextContent(content) {
  switch (content.encoding) {
    case 'base64':
      return atob__default['default'](content.content);
    default:
      return content.content;
  }
};

common.getBufferContent = function getBufferContent(content) {
  switch (content.encoding) {
    case 'base64':
      return base64Js.toByteArray(content.content);
    default:
      return content.content;
  }
};

/*
    Modified from https://github.com/justmoon/node-extend
    Copyright (c) 2014 Stefan Thomas
 */

/* eslint prefer-rest-params: 0 */

let hasOwn = Object.prototype.hasOwnProperty;
let toStr = Object.prototype.toString;

let isArray = function isArray(arr) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(arr);
  }

  return toStr.call(arr) === '[object Array]';
};

let isPlainObject = function isPlainObject(obj) {
  if (!obj || toStr.call(obj) !== '[object Object]') {
    return false;
  }

  let hasOwnConstructor = hasOwn.call(obj, 'constructor');
  let hasIsPrototypeOf =
    obj.constructor &&
    obj.constructor.prototype &&
    hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
  // Not own constructor property must be Object
  if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    return false;
  }

  // Own properties are enumerated firstly, so to speed up,
  // if last one is own, then all properties are own.
  let key;
  for (key in obj) {
    /**/
  }

  return typeof key === 'undefined' || hasOwn.call(obj, key);
};
function defaults() {
  let options, name, src, copy, copyIsArray, clone;
  let target = arguments[0];
  let i = 1;
  let length = arguments.length;
  let deep = false;

  // Handle a deep copy situation
  if (typeof target === 'boolean') {
    deep = target;
    target = arguments[1] || {};
    // skip the boolean and the target
    i = 2;
  } else if (
    (typeof target !== 'object' && typeof target !== 'function') ||
    target == null
  ) {
    target = {};
  }

  for (; i < length; ++i) {
    options = arguments[i];
    // Only deal with non-null/undefined values
    if (options != null) {
      // Extend the base object
      for (name in options) {
        src = target[name];
        copy = options[name];

        // Prevent never-ending loop
        if (target !== copy) {
          // Recurse if we're merging plain objects or arrays
          if (
            deep &&
            copy &&
            (isPlainObject(copy) || (copyIsArray = isArray(copy)))
          ) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && isArray(src) ? src : [];
            } else {
              clone = src && isPlainObject(src) ? src : {};
            }

            // Never move original objects, clone them
            if (typeof target[name] === 'undefined') {
              target[name] = defaults(deep, clone, copy);
            } else {
              defaults(deep, clone, copy);
            }

            // Don't bring in undefined values
          } else if (typeof copy !== 'undefined') {
            if (typeof target[name] === 'undefined') {
              target[name] = copy;
            }
          }
        }
      }
    }
  }

  // Return the modified object
  return target;
}

var index = {
  util: common,
  /**
   *
   * @param {*} type
   * @param {*} doc
   * @param {*} content
   * @param {*} customMetadata
   * @param {object} [options={}]
   * @param {boolean} [options.keepContent=false]
   */
  process: function (type, doc, content, customMetadata, options = {}) {
    let filename = content.filename;
    const typeProcessor = getType(type);
    const arr = createFromJpath(doc, typeProcessor);
    const entry = typeProcessor.find(arr, filename);
    const property = typeProcessor.getProperty(filename, content);
    if (property === undefined) {
      throw new Error(`Could not get property of ${filename} (type ${type}`);
    }
    const metadata = typeProcessor.process(filename, content);

    console.log(metadata, property);

    metadata[property] = {
      filename: module.exports.getFilename(type, content.filename),
    };

    if (options.keepContent) {
      metadata[property].data = common.getContent(content, property);
    }

    if (entry) {
      Object.assign(entry, metadata, customMetadata);
    } else {
      Object.assign(metadata, customMetadata);
      arr.push(metadata);
    }

    return doc;
  },

  getType: function (type, doc, kind) {
    const typeProcessor = types.getType(type, kind);
    return getFromJpath(doc, typeProcessor);
  },

  getFilename(type, filename) {
    let match = /[^/]*$/.exec(filename);
    if (match) filename = match[0];
    const typeProcessor = types.getType(type);
    const jpath = typeProcessor.jpath;
    if (!jpath) throw new Error('No such type or no jpath');
    return jpath.concat(filename).join('/');
  },

  getEmpty(kind, content) {
    const typeProcessors = getAllTypes(kind);
    if (!content) content = {};
    for (let i = 0; i < typeProcessors.length; i++) {
      createFromJpath(content, typeProcessors[i]);
    }

    return content;
  },

  defaults(kind, content) {
    let empty = module.exports.getEmpty(kind);
    defaults(true, content, empty);
    return content;
  },
};

function createFromJpath(doc, typeProcessor) {
  const jpath = typeProcessor.jpath;
  if (!jpath) throw new Error('createFromJpath: undefined jpath argument');
  for (let i = 0; i < jpath.length; i++) {
    if (doc[jpath[i]] === undefined) {
      if (i !== jpath.length - 1) {
        doc[jpath[i]] = {};
      } else {
        doc[jpath[i]] = typeProcessor.getEmpty();
      }
    }
    doc = doc[jpath[i]];
  }
  if (jpath.length === 0) {
    doc = Object.assign(doc, typeProcessor.getEmpty());
  }
  return doc;
}

function getFromJpath(doc, typeProcessor) {
  if (!doc) return undefined;
  const jpath = typeProcessor.jpath;
  if (!jpath) throw new Error('getFromJpath: undefined jpath argument');
  for (let i = 0; i < jpath.length; i++) {
    if (doc[jpath[i]] === undefined) {
      return undefined;
    }
    doc = doc[jpath[i]];
  }
  return doc;
}

module.exports = index;
