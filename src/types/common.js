import atob from 'atob';
import { toByteArray } from 'base64-js';
import { convert } from 'jcampconverter';

const common = {};
export default common;
common.getBasename = function getBasename(filename) {
  let base = filename.replace(/.*\//, '');
  return base.replace(/\.[0-9]+$/, '');
};

/**
 * The reference remove the basedir and the extension
 * @param {*} filename
 * @returns
 */
common.getReference = function getReference(filename) {
  let base = filename.replace(/.*\//, '');
  base = base.replace(/\.[0-9]+$/, '');
  return base.replace(/\..*?$/, '');
};

common.getExtension = function getExtension(filename) {
  let extension = common.getBasename(filename);
  return extension.replace(/.*\./, '').toLowerCase();
};

common.getFilename = function getFilename(typeEntry) {
  let keys = Object.keys(typeEntry);
  for (let i = 0; i < keys.length; i++) {
    if (typeEntry[keys[i]] && typeEntry[keys[i]].filename) {
      return typeEntry[keys[i]].filename;
    }
  }
  return undefined;
};

common.basenameFind = function basenameFind(typeEntries, filename) {
  let reference = common.getBasename(filename);

  return typeEntries.find((typeEntry) => {
    return common.getBasename(common.getFilename(typeEntry)) === reference;
  });
};

common.referenceFind = function referenceFind(typeEntries, filename) {
  let reference = common.getReference(filename);

  return typeEntries.find((typeEntry) => {
    return common.getReference(common.getFilename(typeEntry)) === reference;
  });
};

common.getTargetProperty = function getTargetProperty(filename) {
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

common.getContent = function getContent(content, target) {
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

common.getMetaFromJcamp = function getMetaFromJcamp(
  filename,
  content,
  options = {},
) {
  const extension = common.getExtension(filename);
  const { mapping } = options;
  let metaData = {};
  if (extension === 'jdx' || extension === 'dx' || extension === 'jcamp') {
    let textContent = common.getTextContent(content);
    let parsed = convert(textContent, {
      withoutXY: true,
      keepRecordsRegExp: /.*/i,
      canonicMetadataLabels: true,
    }).flatten[0];
    if (parsed && parsed.meta && parsed.meta.CHEMINFO) {
      try {
        let cheminfo = JSON.parse(parsed.meta.CHEMINFO);
        if (cheminfo.meta) {
          return cheminfo.meta;
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.trace(e);
      }
    }
    if (mapping && parsed && parsed.meta) {
      for (let key in mapping) {
        if (parsed.meta[key]) {
          const paths = mapping[key].split('.');
          let currentTarget = metaData;
          for (let i = 0; i < paths.length - 1; i++) {
            if (!currentTarget[paths[i]]) {
              metaData[paths[i]] = {};
            }
            currentTarget = metaData[paths[i]];
          }
          currentTarget[paths[paths.length - 1]] = parsed.meta[key];
        }
      }
    }
  }
  return metaData;
};
