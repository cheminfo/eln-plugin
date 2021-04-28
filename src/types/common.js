import atob from 'atob';
import { toByteArray } from 'base64-js';
import { convert } from 'jcampconverter';

const common = {};
export default common;
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
      return atob(content.content);
    default:
      return content.content;
  }
};

common.getBufferContent = function getBufferContent(content) {
  switch (content.encoding) {
    case 'base64':
      return toByteArray(content.content);
    default:
      return content.content;
  }
};

common.getMetaFromJcamp = (filename, content) => {
  const extension = common.getExtension(filename);
  let metaData = {};
  if (extension === 'jdx' || extension === 'dx' || extension === 'jcamp') {
    let textContent = common.getTextContent(content);
    let parsed = convert(textContent, {
      withoutXY: true,
      keepRecordsRegExp: /cheminfo/i,
    }).flatten[0];
    return (
      (parsed &&
        parsed.meta &&
        parsed.meta.cheminfo &&
        parsed.meta.cheminfo.meta) ||
      {}
    );
  }
  return metaData;
};
