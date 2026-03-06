declare module 'netcdf-gcms' {
  interface Series {
    name: string;
  }
  interface ParseResult {
    series: Series[];
  }
  export default function parseNetCDF(
    data: string | Uint8Array,
    options?: { meta?: boolean },
  ): ParseResult;
}
