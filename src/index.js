'use strict';

const types = require('./types');
const defaults = require('./util/defaults');
const util = require('./types/common');

module.exports = {
  util,
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

    const typeProcessor = types.getType(type);
    const arr = createFromJpath(doc, typeProcessor);
    const entry = typeProcessor.find(arr, filename);
    const property = typeProcessor.getProperty(filename, content);
    if (property === undefined) {
      throw new Error(`Could not get property of ${filename} (type ${type}`);
    }
    const metadata = typeProcessor.process(filename, content);

    metadata[property] = {
      filename: module.exports.getFilename(type, content.filename)
    };

    if (options.keepContent) {
      metadata[property].data = util.getContent(content, property);
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
    var match = /[^/]*$/.exec(filename);
    if (match) filename = match[0];
    const typeProcessor = types.getType(type);
    const jpath = typeProcessor.jpath;
    if (!jpath) throw new Error('No such type or no jpath');
    return jpath.concat(filename).join('/');
  },

  getEmpty(kind, content) {
    const typeProcessors = types.getAllTypes(kind);
    if (!content) content = {};
    for (let i = 0; i < typeProcessors.length; i++) {
      createFromJpath(content, typeProcessors[i]);
    }

    return content;
  },

  defaults(kind, content) {
    var empty = module.exports.getEmpty(kind);
    defaults(true, content, empty);
    return content;
  }
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
