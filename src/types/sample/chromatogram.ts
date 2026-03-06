import parseNetCDF from 'netcdf-gcms';

import type { ContentData } from '../common.ts';
import {
  getBufferContent,
  getExtension,
  getTargetProperty,
  referenceFind,
} from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const chromatogram: TypeProcessor = {
  jpath: ['spectra', 'chromatogram'],
  find: referenceFind,
  getProperty: getTargetProperty,
  process: processChromatogram,
};

export default chromatogram;

function processChromatogram(
  filename: string,
  content: ContentData,
): Record<string, unknown> {
  const extension = getExtension(filename);
  const metaData: Record<string, unknown> = {};
  if (extension === 'cdf' || extension === 'netcdf') {
    const bufferContent = getBufferContent(content);
    const parsed = parseNetCDF(bufferContent, { meta: true });
    const firstSeries = parsed.series[0];
    if (parsed.series.length === 1 && firstSeries) {
      metaData.detector = firstSeries.name;
    }
  }
  return metaData;
}
