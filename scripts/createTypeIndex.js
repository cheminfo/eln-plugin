import { writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const outFile = 'src/types/index.js';
const outContent = ['const lib = {};'];
const inputDir = 'src/types';
async function exec() {
  let directories = readdirSync(inputDir, {
    withFileTypes: true,
  });
  directories = directories.filter((dir) => dir.isDirectory());
  for (let directory of directories) {
    const kind = directory.name;
    const typeDirectory = join(inputDir, directory.name);

    let files = readdirSync(typeDirectory, {
      withFileTypes: true,
    });
    files = files.filter((file) => file.isFile());
    outContent.push(`lib['${kind}'] = {}`);
    for (let file of files) {
      const type = file.name.replace(/\.js$/, '');
      outContent.push(`import ${kind}${type} from './${kind}/${type}';`);
      outContent.push(`lib['${kind}']['${type}'] = ${kind}${type};\n`);
    }
  }

  outContent.push('export default lib;');
  writeFileSync(outFile, outContent.join('\n'));
}

exec().catch(() => {
  console.error('building type index failed');
});
