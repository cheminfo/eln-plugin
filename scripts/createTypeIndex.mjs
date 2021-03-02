import fs from 'fs/promises';
import path from 'path';

const outFile = 'src/types/index.js';
const outContent = ['const lib = {};'];
const inputDir = 'src/types';
async function exec() {
  let directories = await fs.readdir(inputDir, {
    withFileTypes: true,
  });
  directories = directories.filter((dir) => dir.isDirectory());
  for (let directory of directories) {
    const kind = directory.name;
    const typeDirectory = path.join(inputDir, directory.name);

    let files = await fs.readdir(typeDirectory, {
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
  await fs.writeFile(outFile, outContent.join('\n'));
}

exec().catch(() => {
  console.error('building type index failed');
});
