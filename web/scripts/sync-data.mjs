import { readFileSync, writeFileSync } from 'node:fs';
const seed = JSON.parse(readFileSync('../docs/seed/mockup-data.json', 'utf8'));
const administrasi = JSON.parse(readFileSync('../docs/seed/administrasi-mockup.json', 'utf8'));
const asisten = JSON.parse(readFileSync('../docs/seed/asisten-mockup.json', 'utf8'));
const source = readFileSync('../docs/riset/lampiran-c/ringkasan.md', 'utf8');
const strategi = source.split('\n').filter(line => /^\| (A\.|B1\.|B2\.|\*\*C\.)/.test(line)).map(line => {
  const [nama, ...values] = line.split('|').slice(1, -1).map(value => value.trim().replaceAll('**', ''));
  const [rerata, median, lebih60, menganggur] = values.map(value => Number(value.replace(',', '.').replace('%', '')));
  return { nama, rerata, median, lebih60, menganggur };
});
if (strategi.length !== 4) throw new Error('Empat strategi laporan harus tersedia.');
writeFileSync('src/data/mockup-data.json', JSON.stringify({ ...seed, administrasi, asisten, laporan: { sumber: 'docs/riset/lampiran-c/ringkasan.md', sesi: 300, cakupan: 93.4, mae: 16, strategi } }, null, 2) + '\n');
writeFileSync('src/data/travel-config.json', readFileSync('../docs/seed/travel-config.json', 'utf8'));
