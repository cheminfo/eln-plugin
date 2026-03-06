import reactionGeneral from './reaction/general.ts';
import sampleChromatogram from './sample/chromatogram.ts';
import sampleCyclicVoltammetry from './sample/cyclicVoltammetry.ts';
import sampleDifferentialCentrifugalSedimentation from './sample/differentialCentrifugalSedimentation.ts';
import sampleDifferentialScanningCalorimetry from './sample/differentialScanningCalorimetry.ts';
import sampleDls from './sample/dls.ts';
import sampleElementAnalysis from './sample/elementAnalysis.ts';
import sampleGenbank from './sample/genbank.ts';
import sampleGeneral from './sample/general.ts';
import sampleHgPorosimetry from './sample/hgPorosimetry.ts';
import sampleIcp from './sample/icp.ts';
import sampleImage from './sample/image.ts';
import sampleIr from './sample/ir.ts';
import sampleIsotherm from './sample/isotherm.ts';
import sampleIv from './sample/iv.ts';
import sampleMass from './sample/mass.ts';
import sampleNmr from './sample/nmr.ts';
import sampleOan from './sample/oan.ts';
import samplePelletHardness from './sample/pelletHardness.ts';
import samplePermeability from './sample/permeability.ts';
import samplePhysical from './sample/physical.ts';
import sampleRaman from './sample/raman.ts';
import sampleStock from './sample/stock.ts';
import sampleThermogravimetricAnalysis from './sample/thermogravimetricAnalysis.ts';
import sampleUv from './sample/uv.ts';
import sampleVideo from './sample/video.ts';
import sampleVoidVolume from './sample/voidVolume.ts';
import sampleXps from './sample/xps.ts';
import sampleXray from './sample/xray.ts';
import sampleXrd from './sample/xrd.ts';
import sampleXrf from './sample/xrf.ts';
import sampleZetaPotential from './sample/zetaPotential.ts';
import type { TypeProcessor } from './types.ts';

const lib: Record<string, Record<string, TypeProcessor>> = {
  reaction: {
    general: reactionGeneral,
  },
  sample: {
    chromatogram: sampleChromatogram,
    cyclicVoltammetry: sampleCyclicVoltammetry,
    differentialCentrifugalSedimentation:
      sampleDifferentialCentrifugalSedimentation,
    differentialScanningCalorimetry: sampleDifferentialScanningCalorimetry,
    dls: sampleDls,
    elementAnalysis: sampleElementAnalysis,
    genbank: sampleGenbank,
    general: sampleGeneral,
    hgPorosimetry: sampleHgPorosimetry,
    icp: sampleIcp,
    image: sampleImage,
    ir: sampleIr,
    isotherm: sampleIsotherm,
    iv: sampleIv,
    mass: sampleMass,
    nmr: sampleNmr,
    oan: sampleOan,
    pelletHardness: samplePelletHardness,
    permeability: samplePermeability,
    physical: samplePhysical,
    raman: sampleRaman,
    stock: sampleStock,
    thermogravimetricAnalysis: sampleThermogravimetricAnalysis,
    uv: sampleUv,
    video: sampleVideo,
    voidVolume: sampleVoidVolume,
    xps: sampleXps,
    xray: sampleXray,
    xrd: sampleXrd,
    xrf: sampleXrf,
    zetaPotential: sampleZetaPotential,
  },
};

export default lib;
