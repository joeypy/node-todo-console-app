import fs from 'fs';

const file = './db/data.json';

const saveInFile = (data) => {
  fs.writeFileSync(file, JSON.stringify(data));
};

const readFromFile = () => {
  if (!fs.existsSync(file)) return null;

  const info = fs.readFileSync(file, { encoding: 'utf-8' });
  const data = JSON.parse(info);
  return data;
};

export { saveInFile, readFromFile };
