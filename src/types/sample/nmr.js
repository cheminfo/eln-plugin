import { fromJcamp } from 'nmr-metadata';

import common from '../common';

const isFid = /[^a-z]fid[^a-z]/i;
const replaceFid = /[^a-z]fid[^a-z]?/i;
export default {
  find: (nmr, filename) => {
    let reference = getReference(filename);

    return nmr.find((nmr) => {
      return getReference(common.getFilename(nmr)) === reference;
    });
  },

  getProperty: (filename) => {
    const extension = common.getExtension(filename);
    if (extension === 'jdx' || extension === 'dx' || extension === 'jcamp') {
      if (isFid.test(filename)) {
        return 'jcampFID';
      }
    }
    return common.getTargetProperty(filename);
  },

  process: (filename, content) => {
    const extension = common.getExtension(filename);
    let metaData = {};
    if (extension === 'jdx' || extension === 'dx' || extension === 'jcamp') {
      let textContent = common.getTextContent(content);
      metaData = fromJcamp(textContent);
    }
    return metaData;
  },

  jpath: ['spectra', 'nmr'],
};

const reg2 = /(.*)\.(.*)/;

function getReference(filename) {
  if (typeof filename === 'undefined') return undefined;

  let reference = common.getBasename(filename);
  reference = reference.replace(reg2, '$1');

  if (isFid.test(filename)) {
    reference = reference.replace(replaceFid, '');
  }
  return reference;
}
