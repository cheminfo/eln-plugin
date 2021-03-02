import genbankParser from 'genbank-parser';

import common from '../common';

export default {
  find(genbank, filename) {
    let reference = common.getBasename(filename);

    return genbank.find((genbank) => {
      return common.getBasename(common.getFilename(genbank)) === reference;
    });
  },

  getProperty(filename) {
    return common.getTargetProperty(filename);
  },

  process(filename, content) {
    let textContent = common.getTextContent(content);
    let toReturn;
    const parsed = genbankParser(textContent);
    toReturn = {
      seq: parsed.map((p) => p.parsedSequence),
    };
    return toReturn;
  },

  jpath: ['biology', 'nucleic'],
};
