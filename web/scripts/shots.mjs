import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import assert from 'node:assert/strict';
import path from 'node:path';

const base = process.env.BASE_URL ?? 'http://127.0.0.1:3000';
const output = path.resolve('../docs/mockup');
const review = path.resolve('../.impeccable/review');
await mkdir(output, { recursive: true }); await mkdir(review, { recursive: true });
const executablePath = process.env.BROWSER_PATH ?? ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
const errors = [], checks = [];
const context = await browser.newContext({ deviceScaleFactor: 2, reducedMotion: 'reduce' });
const page = await context.newPage();
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error' || message.type() === 'warning') errors.push(`${message.text()} ${message.location().url}`); });
const screens = [
  ['/', 'p00-beranda', 1440, 1000],
  ['/app/asisten', 'p31-asisten', 1440, 1000],
  ['/app/dashboard', 'dashboard', 1440, 1000],
  ['/app', 'p10-hari-ini', 1440, 900],
  ['/app/sesi/s-pd-rina', 'p11-detail-sesi', 1440, 1100],
  ['/jadwal', 'p01-cek-jadwal', 390, 844],
  ['/k/KD-4812', 'p04-jam-datang', 390, 844],
  ['/admin/laporan', 'p15-laporan', 1440, 900],
  ['/app/riwayat', 'riwayat', 1440, 900],
  ...['dokter', 'poli', 'pengguna', 'jadwal', 'pengaturan', 'demo'].map(name => [`/admin/${name}`, `admin-${name}`, 1440, 900]),
];
async function open(route, width, height = 900) {
  await page.setViewportSize({ width, height });
  const response = await page.goto(base + route);
  assert.equal(response.status(), 200, `${route}: HTTP 200`);
  await page.evaluate(() => document.fonts.ready);
  await page.locator('h1').waitFor();
  await page.waitForFunction(() => !document.querySelector('[data-slot="chart"]') || document.querySelector('.recharts-surface'));
}
try {
  for (const [route, name, width, height] of screens) {
    await open(route, width, height);
    assert.equal(await page.locator('html').getAttribute('lang'), 'id');
    assert.equal(await page.getByText('Data simulasi', { exact: true }).count(), 1);
    await page.screenshot({ path: path.join(output, `${name}.png`), fullPage: true, animations: 'disabled' });
    await page.screenshot({ path: path.join(review, `${name}-viewport.png`), animations: 'disabled' });
    for (const size of [375, 768, 1440]) {
      await page.setViewportSize({ width: size, height: 900 });
      await page.waitForFunction(() => document.documentElement.scrollWidth <= innerWidth, undefined, { timeout: 5000 });
      const layout = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
      assert.ok(layout.scroll <= layout.width, `${route} overflow ${JSON.stringify(layout)}`);
      await page.screenshot({ path: path.join(review, `${name}-${size}.png`), fullPage: true, animations: 'disabled' });
      checks.push(`${route}: ${size}px, no horizontal overflow`);
    }
    const visible = await page.locator('body').innerText();
    assert.ok(!visible.includes('Segera'), `${route}: no unfinished menu labels`);
    assert.ok(!/[—–]/.test(visible), `${route}: no em dash`);
    if (route === '/app') { assert.ok(visible.includes('90')); assert.ok(visible.includes('10.15')); }
    if (route === '/app/sesi/s-pd-rina') assert.equal(await page.locator('tbody tr').count(), 22);
    if (route === '/jadwal') { assert.equal(await page.locator('.public-doctor').count(), 5); assert.ok(!visible.includes('OK 2')); assert.ok(!visible.includes('visite')); }
    if (route === '/k/KD-4812') for (const text of ['10.45', '11.15', '11.30', '12', 'Ibu Sri Wahyuni']) assert.ok(visible.includes(text));
    if (route === '/admin/laporan') for (const text of ['35,5', '15,7', '27,7', '16,8', '93,4', '16,0']) assert.ok(visible.includes(text));
  }
  await open('/app/dashboard', 1440);
  const initialWidth = await page.locator('.workspace').evaluate(n => n.getBoundingClientRect().width);
  await page.getByRole('button', { name: 'Tutup sidebar', exact: true }).click();
  assert.ok(await page.locator('.workspace').evaluate(n => n.getBoundingClientRect().width) > initialWidth);
  assert.equal(await page.locator('.desktop-sidebar .brand-wordmark').isVisible(), false);
  await page.getByRole('button', { name: 'Buka sidebar', exact: true }).click();
  assert.equal(await page.locator('.desktop-sidebar .brand-wordmark').isVisible(), true);
  checks.push('Sidebar resizes workspace and hides collapsed wordmark');
  await open('/app', 375);
  const burger = page.getByRole('button', { name: 'Buka menu', exact: true });
  await burger.click(); await page.getByRole('dialog', { name: 'Navigasi', exact: true }).waitFor();
  for (let i = 0; i < 18; i++) { await page.keyboard.press('Tab'); assert.ok(await page.evaluate(() => !!document.activeElement?.closest('#mobile-sidebar'))); }
  await page.keyboard.press('Escape'); assert.equal(await burger.getAttribute('aria-expanded'), 'false'); assert.ok(await burger.evaluate(node => node === document.activeElement));
  await burger.click(); await page.locator('.scrim').click({ position: { x: 350, y: 300 } }); assert.equal(await burger.getAttribute('aria-expanded'), 'false');
  await burger.click(); await page.getByRole('button', { name: 'Tutup menu', exact: true }).click(); assert.equal(await burger.getAttribute('aria-expanded'), 'false');
  await burger.click(); await page.locator('#mobile-sidebar').getByRole('link', { name: 'Laporan', exact: true }).click(); await page.waitForURL('**/admin/laporan'); assert.equal(await page.getByRole('button', { name: 'Buka menu' }).getAttribute('aria-expanded'), 'false');
  checks.push('Drawer: focus trap, Escape, scrim, close button, navigation, focus restoration');
  await open('/app', 1440); await page.getByRole('combobox', { name: 'Filter poli' }).selectOption('Mata'); assert.equal(await page.locator('#perhatian .session-row').count(), 0); assert.ok(await page.getByText('Tidak ada sesi yang memerlukan perhatian di poli ini.').isVisible());
  await page.getByRole('textbox', { name: 'Cari pasien atau kode booking' }).fill('Sri'); await page.getByRole('textbox', { name: 'Cari pasien atau kode booking' }).press('Enter'); await page.waitForURL('**?q=Sri'); assert.equal(await page.locator('tbody tr').count(), 1);
  await open('/app/sesi/s-pd-rina', 1440); await page.getByRole('button', { name: 'Belum dibaca', exact: true }).click(); assert.equal(await page.locator('tbody tr').count(), 5);
  await page.getByRole('button', { name: 'Hadir', exact: true }).click(); assert.equal(await page.locator('tbody tr').count(), 12);
  await page.getByRole('button', { name: 'Jadwal ulang', exact: true }).click(); assert.equal(await page.locator('tbody tr').count(), 1);
  await page.getByRole('button', { name: 'Semua', exact: true }).click(); await page.getByRole('textbox', { name: 'Cari di antrean' }).fill('Tidakada'); assert.ok(await page.getByText('Pasien tidak ditemukan', { exact: true }).isVisible());
  await page.getByRole('button', { name: 'Atur ulang pencarian' }).click(); assert.equal(await page.locator('tbody tr').count(), 22);
  await page.getByRole('button', { name: 'Urutkan nomor antrean' }).click(); assert.equal(await page.locator('tbody tr').first().locator('td').first().textContent(), '22');
  await page.getByRole('button', { name: 'Kirim ulang ke 5 pasien yang belum membaca' }).click(); assert.ok(await page.locator('dialog[open]').isVisible()); await page.keyboard.press('Escape');
  checks.push('P10/P11: clinic filter, patient search, status counts 5/12/1, empty state, reset, sorting, simulated resend dialog');
  await open('/jadwal', 390, 844); await page.getByRole('textbox', { name: 'Cari poli atau nama dokter' }).fill('Mata'); assert.equal(await page.locator('.public-doctor').count(), 1);
  await page.getByRole('button', { name: 'Kode booking', exact: false }).click(); await page.getByLabel('Kode booking', { exact: true }).fill('SALAH'); await page.locator('dialog[open]').getByRole('button', { name: 'Lihat jam datang', exact: true }).click(); assert.ok(await page.locator('#booking-error').isVisible());
  await page.getByLabel('Kode booking', { exact: true }).fill('kd-4812'); await page.locator('dialog[open]').getByRole('button', { name: 'Lihat jam datang', exact: true }).click(); await page.waitForURL('**/k/KD-4812'); assert.ok(await page.getByRole('heading', { name: 'Ibu Sri Wahyuni', exact: true }).isVisible());
  checks.push('Patient: doctor search, invalid booking feedback, KD-4812 navigation');
  await open('/admin/laporan', 1440); await page.getByRole('button', { name: 'Rerata', exact: false }).click(); assert.ok((await page.locator('tbody tr').first().textContent()).includes('B1.')); await page.getByRole('button', { name: 'Rerata', exact: false }).click(); assert.ok((await page.locator('tbody tr').first().textContent()).includes('A.'));
  checks.push('Report: sorting ascending and descending');
  for (const kind of ['dokter', 'poli', 'pengguna']) {
    await open(`/admin/${kind}`, 1440);
    assert.equal(await page.locator('.desktop-sidebar [aria-current="page"]').getAttribute('href'), `/admin/${kind}`);
    assert.equal(await page.locator('.desktop-sidebar').getByText('Segera').count(), 0);
    await page.getByRole('button', { name: `Tambah ${kind}`, exact: true }).click();
    const dialog = page.locator('dialog[open]');
    await dialog.getByLabel(`Nama ${kind}`, { exact: true }).fill('Uji administrasi');
    if (kind === 'poli') await dialog.getByLabel('Dokter penanggung jawab').fill('Dokter uji');
    await dialog.getByRole('button', { name: 'Simpan', exact: true }).click();
    assert.ok(await page.getByRole('heading', { name: 'Uji administrasi', exact: true }).isVisible());
    await page.getByRole('button', { name: 'Ubah Uji administrasi', exact: true }).click();
    await page.locator('dialog[open]').getByLabel('Aktif', { exact: true }).uncheck();
    await page.locator('dialog[open]').getByRole('button', { name: 'Simpan', exact: true }).click();
    assert.ok(await page.locator('.directory-row').filter({ hasText: 'Uji administrasi' }).getByText('Nonaktif', { exact: true }).isVisible());
    await page.getByRole('textbox', { name: `Cari ${kind}`, exact: true }).fill('Tidak ditemukan xyz');
    assert.ok(await page.getByRole('heading', { name: 'Tidak ada hasil' }).isVisible());
    checks.push(`${kind}: add, edit status, search empty state, correct active navigation`);
  }
  await open('/admin/pengaturan', 375);
  await page.getByLabel('Rentang prediksi perlu konfirmasi').fill('35');
  await page.getByRole('button', { name: 'Simpan pengaturan' }).click();
  assert.ok((await page.locator('.save-notice').innerText()).includes('berhasil'));
  await page.getByRole('button', { name: 'Kembalikan nilai awal' }).click();
  assert.equal(await page.getByLabel('Rentang prediksi perlu konfirmasi').inputValue(), '30');
  checks.push('Settings: change, save, restore defaults on mobile');
  await open('/admin/jadwal', 768);
  const startTime = page.getByLabel('Mulai dr. Rina Setyaningsih, Sp.PD', { exact: true });
  await startTime.fill('09:15');
  await page.getByRole('button', { name: 'Simpan jadwal' }).click();
  assert.ok((await page.locator('.save-notice').innerText()).includes('berhasil'));
  await startTime.fill('14:00');
  assert.equal(await startTime.evaluate(n => n.validity.valid), false);
  checks.push('Schedule: local save and invalid time rejection');
  await open('/app/riwayat', 375);
  await page.getByLabel('Tanggal', { exact: true }).fill('2026-11-08');
  assert.ok(await page.getByRole('heading', { name: 'Belum ada sesi pada tanggal ini' }).isVisible());
  await page.getByRole('button', { name: 'Lihat 9 November 2026' }).click();
  assert.equal(await page.locator('.history-row').count(), 5);
  checks.push('History: date filter and empty state recovery');
  await open('/admin/demo', 1440);
  await page.getByLabel('Kecepatan', { exact: true }).selectOption('4');
  await page.getByRole('button', { name: 'Mulai demo', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('.demo-current small')?.textContent !== 'Peristiwa 1 dari 6');
  await page.getByRole('button', { name: 'Jeda', exact: true }).click();
  const paused = await page.locator('.demo-current small').innerText();
  await page.waitForTimeout(800);
  assert.equal(await page.locator('.demo-current small').innerText(), paused);
  await page.getByRole('button', { name: 'Atur ulang', exact: true }).click();
  assert.equal(await page.locator('.demo-current small').innerText(), 'Peristiwa 1 dari 6');
  checks.push('Demo player: start, pause, speed, reset');
  await open('/app/dashboard', 1440);
  await page.getByRole('button', { name: 'Tutup sidebar', exact: true }).click();
  assert.ok(await page.locator('.desktop-sidebar').getByRole('link', { name: 'Jadwal publik', exact: true }).isVisible());
  await page.locator('.desktop-sidebar').getByRole('link', { name: 'Jadwal publik', exact: true }).click();
  await page.waitForURL('**/jadwal');
  assert.ok(await page.locator('.public-page').evaluate(n => n.getBoundingClientRect().width) > 1000);
  await page.getByRole('combobox', { name: 'Filter poli publik' }).selectOption('Mata');
  assert.equal(await page.locator('.public-doctor').count(), 1);
  await page.getByRole('textbox', { name: 'Cari poli atau nama dokter' }).fill('Rina');
  assert.equal(await page.locator('.public-doctor').count(), 0);
  await page.getByRole('button', { name: 'Lihat semua dokter' }).click();
  assert.equal(await page.locator('.public-doctor').count(), 5);
  checks.push('Public schedule: accessible collapsed navigation, desktop layout, combined filters and reset');
  await page.route('https://router.project-osrm.org/**', route => route.fulfill({ json: { code: 'Ok', routes: [{ duration: 1800, distance: 12000 }] } }));
  await open('/k/KD-4812', 375);
  await page.getByRole('button', { name: 'Coba lokasi rumah simulasi' }).click();
  await page.getByText('Rute selesai dihitung.', { exact: false }).waitFor();
  assert.ok((await page.locator('.travel-result').innerText()).includes('10.30'));
  assert.ok((await page.locator('.arrival-time .display-time').innerText()).includes('10.30'));
  assert.equal(await page.locator('.patient-message').count(), 0, 'Patient view has no notification preview');
  await page.screenshot({ path: path.join(output, 'p04-rute-otomatis.png'), fullPage: true, animations: 'disabled' });
  const mapRoute = new URL(await page.getByRole('link', { name: 'Lihat rute di Google Maps' }).getAttribute('href'));
  assert.equal(mapRoute.searchParams.get('origin'), '-7.57,110.75');
  await page.evaluate(() => Object.defineProperty(navigator, 'geolocation', { configurable: true, value: { getCurrentPosition: success => success({ coords: { latitude: -7.55, longitude: 110.77 } }) } }));
  await page.getByRole('button', { name: 'Hitung dari lokasi saya' }).click();
  await page.getByText('Rute selesai dihitung.', { exact: false }).waitFor();
  assert.ok((await page.locator('.travel-result').innerText()).includes('Lokasi perangkat'));
  await open('/app/sesi/s-pd-rina', 375);
  await page.locator('.notification-summary').click();
  assert.equal(await page.getByRole('button', { name: 'Hitung dari lokasi saya' }).count(), 0);
  await page.getByRole('button', { name: 'Hitung dari alamat pasien' }).click();
  await page.getByText('Saran dari alamat pasien siap ditinjau.', { exact: true }).waitFor();
  assert.ok((await page.locator('.patient-message').innerText()).includes('Berdasarkan alamat rumah Anda'));
  assert.ok((await page.locator('.patient-message').innerText()).includes('10.30'));
  assert.ok(await page.locator('.staff-notifications').evaluate(n => n.scrollWidth <= n.clientWidth));
  await page.screenshot({ path: path.join(output, 'p11-notifikasi-pasien.png'), fullPage: true, animations: 'disabled' });
  checks.push('POV: no WhatsApp preview on patient page; staff notification calculates from saved address without device geolocation');
  await open('/k/KD-4812', 375);
  await page.unroute('https://router.project-osrm.org/**');
  await page.route('https://router.project-osrm.org/**', route => route.fulfill({ json: { code: 'NoRoute', routes: [] } }));
  await page.getByRole('button', { name: 'Coba lokasi rumah simulasi' }).click();
  await page.getByText('Rute tidak ditemukan', { exact: true }).waitFor();
  assert.equal(await page.locator('.travel-result').count(), 0);
  assert.ok((await page.locator('.arrival-time .display-time').innerText()).includes('10.45'));
  await page.evaluate(() => Object.defineProperty(navigator, 'geolocation', { configurable: true, value: { getCurrentPosition: (_success, error) => error({ code: 1 }) } }));
  await page.getByRole('button', { name: 'Hitung dari lokasi saya' }).click();
  assert.ok(await page.getByText('Izin lokasi ditolak.', { exact: false }).isVisible());
  checks.push('Travel: automatic route duration, departure/header and WhatsApp preview, route failure clears stale result, location permission denial');
  await open('/', 1440);
  assert.equal(await page.locator('.landing-copy').evaluate(n => getComputedStyle(n).animationName), 'none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  assert.equal(await page.locator('.landing-copy').evaluate(n => getComputedStyle(n).animationName), 'reference-enter');
  checks.push('Motion: entrance enabled by preference, disabled for reduced motion');
  assert.deepEqual(errors, [], 'Browser console must be clean');
  await writeFile(path.join(output, 'verification.json'), JSON.stringify({ base, browser: browser.version(), checks, consoleErrors: errors, screenshots: screens.map(([route, name, width, height]) => ({ route, file: `${name}.png`, viewport: { width, height }, deviceScaleFactor: 2, fullPage: true, provenance: 'Playwright capture of the locally built KapanDok mockup; source data from project docs.' })) }, null, 2));
  process.stdout.write(`${checks.length} browser checks passed; ${screens.length} proposal PNGs saved to ${output}\n`);
} finally { await browser.close(); }
