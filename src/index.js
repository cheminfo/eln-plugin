import { getAllTypes, getType } from './types';
import util from './types/common';
import defaults from './util/defaults';

const elnPlugin = {
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
    const typeProcessor = getType(type);
    const arr = createFromJpath(doc, typeProcessor);
    const entry = typeProcessor.find(arr, filename);
    const property = typeProcessor.getProperty(filename, content);
    if (property === undefined) {
      throw new Error(`Could not get property of ${filename} (type ${type}`);
    }
    const metadata = typeProcessor.process(filename, content);

    metadata[property] = {
      filename: elnPlugin.getFilename(type, content.filename),
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
    const typeProcessor = getType(type, kind);
    return getFromJpath(doc, typeProcessor);
  },

  getFilename(type, filename) {
    let match = /[^/]*$/.exec(filename);
    if (match) filename = match[0];
    const typeProcessor = getType(type);
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
    let empty = elnPlugin.getEmpty(kind);
    defaults(true, content, empty);
    return content;
  },
};

function createFromJpath(doc, typeProcessor) {
  const jpath = typeProcessor.jpath;
  if (!jpath) {
    throw new Error('createFromJpath: undefined jpath argument');
  }
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

export default elnPlugin;
