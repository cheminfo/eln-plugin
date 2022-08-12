import parseNetCDF from 'netcdf-gcms';

import common from '../common';

function process(filename, content) {
  const extension = common.getExtension(filename);
  let metaData = {};
  if (extension === 'cdf' || extension === 'netcdf') {
    let bufferContent = common.getBufferContent(content);
    let parsed = parseNetCDF(bufferContent, { meta: true });
    if (parsed.series.length === 1) {
      metaData.detector = parsed.series[0].name;
    }
  }
  return metaData;
}

export default {
  jpath: ['spectra', 'chromatogram'],
  find: common.referenceFind,
  getProperty: common.getTargetProperty,
  process,
};
