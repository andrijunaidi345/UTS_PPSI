---
name: smarthealth-design
description: Sistem desain "SmartHealth" untuk platform antrean & rekam medis elektronik terpadu RSUD Kardinah (Kota Tegal) dan Puskesmas, terintegrasi SatuSehat Kemenkes dan bridging BPJS / Mobile JKN. Berisi tiga shell, yaitu dasbor web (sidebar 288px + header 80px, untuk Dokter, Loket, Farmasi, Dinkes), aplikasi mobile pasien (header + bottom nav 4 tab, atau header dengan tombol kembali), dan layar kiosk anjungan mandiri. Gunakan skill ini setiap kali membuat, mengubah, atau memperluas halaman/komponen untuk SmartHealth atau aplikasi layanan kesehatan/rumah sakit Indonesia bergaya serupa. Contoh layar mencakup EMR SOAP, konsol pemanggilan poli, konsol loket, kiosk check-in, e-karcis QR, tracker antrean pasien, kanban farmasi, telaah e-resep, konseling apoteker (KIO), notifikasi obat siap, SPRI rawat inap, dan Dinkes Command Center. Pakai juga bila pengguna menyebut antrean poli, e-resep, SOAP, ICD-10, SatuSehat, FHIR, SEP, VClaim, PCare, Mobile JKN, SPRI, CDSS, KIO, teach-back, kiosk, karcis thermal, atau "gaya SmartHealth", walau tidak menyebut nama skill ini.
---

# SmartHealth, Sistem Desain Antrean & EMR Terpadu

Skill ini menangkap bahasa visual, token, pola komponen, dan konvensi konten dari 12 layar SmartHealth, supaya halaman baru terasa seperti bagian dari produk yang sama. Domainnya klinis, jadi kejelasan dan keselamatan pasien lebih penting daripada hiasan.

## 1. Karakter & Prinsip

- **Mood**: tenang, bersih, dapat dipercaya. Hijau teal tua (`primary`) untuk aksi, hijau zamrud (`tertiary`) untuk "aktif/valid/siap", merah (`error`) hanya untuk alergi, cito, dan bahaya. Latar putih kebiruan, bukan abu-abu mati dan bukan neon.
- **Tiga shell**:
  - **Web dashboard** (`shell-type: web_dashboard`) untuk Dokter, Petugas Loket, Apoteker, Dinkes. Sidebar kiri tetap, header atas tetap, konten padat.
  - **Mobile** untuk pasien/wali: `mobile_tab` (beranda dengan bottom nav) dan `mobile_stack` (halaman detail dengan tombol kembali).
  - **Kiosk** (tetap memakai shell web): target sentuh besar, teks besar, banner gawat darurat wajib.
- **Bahasa UI: Bahasa Indonesia** (`<html lang="id">`). Istilah baku tetap dipakai: *SOAP, EMR, e-Resep, SPRI, SEP, VClaim, PCare, CDSS, KIO, CITO, IGD, DPJP, TTV, BB/TB, ICD-10, SNOMED CT, FHIR*.
- **Nomor antrean adalah pahlawan**: kode antrean memakai `font-display-queue` / `display-queue-mobile`, warna `text-primary`, `font-extrabold`. Angka klinis (suhu, trombosit, dosis) besar dan rapi. Kode (No. RM, NIK, No. BPJS, resep, encounter, booking) memakai `font-mono`.
- **Peringatan keselamatan selalu di atas**: alergi berat dan kondisi CITO tampil sebagai banner merah di bagian paling atas halaman klinis, sebelum konten lain.
- **Integrasi terlihat**: hampir setiap layar menampilkan badge status `SatuSehat`, `BPJS`, `WebSocket Sync`, stempel waktu WIB, dan ID jejak (encounter, resep, booking).
- **Tanpa border keras**: pemisahan lewat lapisan surface (`surface-container-*`) dan shadow tipis. Border hanya `border-outline-variant/30` pada pemisah tipis, `border-l-4` pada kartu aktif/callout, dan `border-dashed` pada karcis/perforasi.
- **Dua font**: Plus Jakarta Sans untuk judul dan angka antrean, Inter untuk isi dan label.
- **Aturan klinis yang harus tercermin di UI**:
  - **Telaah resep 3 aspek** (administratif, farmasetik, klinis/CDSS) sebelum racik.
  - **Dosis pediatrik** selalu ditampilkan beserta BB dan hitungan mg/kgBB.
  - **Skrining alergi**: tulis hasilnya sebagai "resep **tidak mengandung** golongan X", bukan "pasien tidak alergi". Jika pasien punya alergi tercatat, jangan pernah menulis teks yang menyiratkan pasien bebas alergi.
  - **Pasien gawat darurat tidak antre di poli/kiosk**: banner IGD wajib di kiosk, tracker pasien, dan portal pasien.
  - **Akses medis tercatat** (audit trail, UU PDP 27/2022) dan SPM waktu tunggu < 30 menit tampil di dashboard Dinkes.

## 2. Stack Teknis

HTML tunggal per layar, Tailwind via CDN, Google Fonts, Material Symbols Outlined, JavaScript vanilla inline (tanpa framework).

### Head dasbor web

```html
<html lang="id"><head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta name="shell-type" content="web_dashboard"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link href="https://fonts.gstatic.com" rel="preconnect" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
<style>
@layer base{
  html,body{margin:0;padding:0;}
  body{overscroll-behavior:none;}
  main>:first-child{margin-top:0!important;}
  main>:last-child{margin-bottom:0!important;}
}
::-webkit-scrollbar{display:none;}
</style>
<script src="https://cdn.tailwindcss.com"></script>
<script id="tailwind-config">/* lihat bagian 3 */</script>
</head>
<body class="bg-background font-body-md text-on-surface antialiased">
```

### Head mobile

Sama, dengan perbedaan:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"/>
<meta name="shell-type" content="mobile_tab"/>  <!-- atau mobile_stack untuk halaman detail -->
<style>
@layer base{
  html,body{width:100vw;margin:0;padding:0;}
  body{overscroll-behavior:none;}
  .pb-safe{padding-bottom:env(safe-area-inset-bottom,0px);}
  .pt-safe{padding-top:env(safe-area-inset-top,0px);}
  main>:first-child{margin-top:0!important;}
  main>:last-child{margin-bottom:0!important;}
}
::-webkit-scrollbar{display:none;}
body{min-height:max(884px,100dvh);}
</style>
<body class="bg-surface font-body-md text-on-surface flex flex-col min-h-screen">
```

Pasang `<link>` Material Symbols **sekali saja** (versi sumber menduplikasinya berkali-kali).

Ikon: `<span class="material-symbols-outlined text-[20px]">stethoscope</span>`. Ikon terisi: `style="font-variation-settings: 'FILL' 1;"` (status penting, tombol utama, ikon sukses/peringatan).

> Bila artefak dipublikasikan sebagai halaman hosted: CDN Tailwind dan Google Fonts diizinkan, tetapi **gambar remote diblokir**. Gunakan blok inisial/ikon sebagai pengganti foto (lingkaran `bg-primary text-on-primary` berisi inisial, atau ikon `person`/`child_care`), jangan URL gambar eksternal.

## 3. Token (Tailwind config)

Salin utuh. Konfigurasi sama untuk web, mobile, dan kiosk.

```js
tailwind.config = { darkMode: "class", theme: { extend: {
  colors: {
    "primary":"#00685f","on-primary":"#ffffff","primary-container":"#008378","on-primary-container":"#f4fffc",
    "primary-fixed":"#89f5e7","primary-fixed-dim":"#6bd8cb","on-primary-fixed":"#00201d","on-primary-fixed-variant":"#005049",
    "secondary":"#565e74","on-secondary":"#ffffff","secondary-container":"#dae2fd","on-secondary-container":"#5c647a",
    "secondary-fixed":"#dae2fd","secondary-fixed-dim":"#bec6e0","on-secondary-fixed":"#131b2e","on-secondary-fixed-variant":"#3f465c",
    "tertiary":"#006947","on-tertiary":"#ffffff","tertiary-container":"#00855b","on-tertiary-container":"#f5fff6",
    "tertiary-fixed":"#6ffbbe","tertiary-fixed-dim":"#4edea3","on-tertiary-fixed":"#002113","on-tertiary-fixed-variant":"#005236",
    "error":"#ba1a1a","on-error":"#ffffff","error-container":"#ffdad6","on-error-container":"#93000a",
    "background":"#f8f9ff","on-background":"#0b1c30","surface":"#f8f9ff","surface-bright":"#f8f9ff","surface-dim":"#cbdbf5","surface-tint":"#006a61",
    "surface-container-lowest":"#ffffff","surface-container-low":"#eff4ff","surface-container":"#e5eeff",
    "surface-container-high":"#dce9ff","surface-container-highest":"#d3e4fe","surface-variant":"#d3e4fe",
    "on-surface":"#0b1c30","on-surface-variant":"#3d4947","outline":"#6d7a77","outline-variant":"#bcc9c6",
    "inverse-surface":"#213145","inverse-on-surface":"#eaf1ff","inverse-primary":"#6bd8cb"
  },
  borderRadius: { DEFAULT:"0.25rem", lg:"0.5rem", xl:"0.75rem", full:"9999px" },
  spacing: { "space-xs":"0.25rem","space-sm":"0.5rem","space-md":"1rem","space-lg":"1.5rem","space-xl":"2rem","space-2xl":"3rem",
             "margin":"2rem","margin-mobile":"1rem","gutter":"1.5rem","gutter-mobile":"1rem" },
  fontFamily: {
    "body-sm":["Inter"],"body-md":["Inter"],"body-lg":["Inter"],"body-xl":["Inter"],
    "label-sm":["Inter"],"label-md":["Inter"],"label-lg":["Inter"],
    "headline-sm":["Plus Jakarta Sans"],"headline-md":["Plus Jakarta Sans"],"headline-lg":["Plus Jakarta Sans"],"headline-lg-mobile":["Plus Jakarta Sans"],
    "display-queue":["Plus Jakarta Sans"],"display-queue-mobile":["Plus Jakarta Sans"]
  },
  fontSize: {
    "body-sm":["14px",{lineHeight:"20px",fontWeight:"400"}],"body-md":["16px",{lineHeight:"24px",fontWeight:"400"}],
    "body-lg":["18px",{lineHeight:"28px",fontWeight:"400"}],"body-xl":["20px",{lineHeight:"30px",fontWeight:"400"}],
    "label-sm":["12px",{lineHeight:"16px",letterSpacing:"0.04em",fontWeight:"600"}],
    "label-md":["14px",{lineHeight:"20px",fontWeight:"600"}],"label-lg":["16px",{lineHeight:"22px",fontWeight:"600"}],
    "headline-sm":["20px",{lineHeight:"28px",fontWeight:"600"}],"headline-md":["24px",{lineHeight:"32px",fontWeight:"600"}],
    "headline-lg":["36px",{lineHeight:"44px",letterSpacing:"-0.02em",fontWeight:"700"}],
    "headline-lg-mobile":["28px",{lineHeight:"36px",letterSpacing:"-0.01em",fontWeight:"700"}],
    "display-queue":["64px",{lineHeight:"72px",letterSpacing:"-0.02em",fontWeight:"800"}],
    "display-queue-mobile":["44px",{lineHeight:"52px",letterSpacing:"-0.01em",fontWeight:"800"}]
  }
}}};
```

Saat menulis ulang, **tulis semua 13 nama fontFamily secara eksplisit**.

### Peran warna

| Peran | Token |
|---|---|
| Latar halaman | `bg-background` / `bg-surface` |
| Kartu, sidebar, header, tiket | `bg-surface-container-lowest` (putih) |
| Blok lembut di dalam kartu, field input | `bg-surface-container-low` |
| Chip netral, panel info, tab segmented | `bg-surface-container` |
| Tombol tonal, hover, badge netral | `bg-surface-container-high` / `-highest` |
| Teks utama / sekunder | `text-on-surface` / `text-on-surface-variant` |
| Nomor antrean, judul penting, tombol utama | `text-primary` / `bg-primary text-on-primary` (hover `bg-primary-container`) |
| Status **aktif / valid / selesai / siap** | `bg-tertiary-fixed text-on-tertiary-fixed`, atau `bg-tertiary text-on-tertiary` (kuat) |
| Status **info / berikutnya / netral-biru** | `bg-secondary-container text-on-secondary-container` |
| **Alergi, CITO, abnormal, terlewat, bahaya** | `bg-error-container text-on-error-container`, kuat: `bg-error text-on-error` |
| Hasil lab/TTV abnormal | angka `text-error`, kartu `bg-error-container/40` |
| Item selesai/terlewat (redup) | `opacity-60`–`opacity-80`, nama `line-through` |
| Panel gelap (telemetri kiosk, toast mobile) | `bg-inverse-surface text-inverse-on-surface` |

Status indikator: titik `w-2 h-2 rounded-full` + `animate-pulse` (live), `animate-ping` (sedang dilayani / baru).

### Tipografi

| Penggunaan | Kelas |
|---|---|
| Nomor antrean hero | `font-display-queue text-display-queue text-primary font-extrabold` (mobile: `display-queue-mobile`) |
| Judul halaman web | `font-headline-lg text-headline-lg` atau `headline-md` pada konsol padat |
| Judul kartu/section | `font-headline-sm text-headline-sm text-on-surface font-bold` |
| Nama pasien | `font-headline-md text-headline-md font-bold` |
| Isi | `font-body-sm text-body-sm` (14px) sebagai default kartu, `body-md` untuk kiosk/mobile |
| Label, badge, chip | `font-label-sm text-label-sm` / `label-md`; kapital: `uppercase tracking-wider text-on-surface-variant` |
| Kode RM, NIK, booking, resep, hash | `font-mono` |
| Angka vital | `font-headline-md font-bold` (+ `tabular-nums` untuk timer) |

### Spacing & radius

Token spacing (`p-space-md`, `gap-space-sm`, `px-space-xl`) sebagai default; nilai Tailwind biasa (`py-2.5`, `gap-1.5`) boleh untuk penyetelan halus. Radius: kartu `rounded-xl` (kiosk: `rounded-2xl`/`rounded-3xl`), input/tombol `rounded-xl` atau `rounded-lg`, badge `rounded-full`/`rounded`.

## 4. Shell Web Dashboard

Urutan: `<aside>` fixed → `<div class="pl-72">` berisi `<header>` fixed + `<main class="w-full pt-20 px-space-xl bg-background min-h-screen">` → `<div class="flex flex-col w-full pb-space-2xl">`.

### Sidebar

`fixed left-0 top-0 h-full w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between`

1. **Brand** (`h-20 px-space-lg flex items-center gap-space-sm`): logo `h-8`, "SmartHealth" (`headline-sm text-primary tracking-tight`), "RSUD & Puskesmas" (`label-sm uppercase tracking-wider text-on-surface-variant`).
2. **Status WebSocket**: `bg-surface-container-low p-space-sm rounded-xl`, titik `bg-tertiary-container animate-pulse` + "WebSocket Sync" + chip latensi (`18ms`).
3. **Role Klinis Aktif**: label kapital + `<select>` `appearance-none bg-surface-container-low rounded-xl` dengan ikon `unfold_more`. Opsi tetap: Dokter & EMR (Poliklinik), Petugas Loket (Pendaftaran), Petugas Farmasi & Apotek, Dinkes Command Center, Pasien Mobile/Web.
4. **Nav** (5 item tetap, urutan jangan diubah): Dokter & Konsultasi (`stethoscope`), Antrean Loket Faskes (`confirmation_number`), Farmasi & Resep (`medication`), Dinkes Regional Command (`monitoring`), Portal Pasien Mandiri (`smartphone`).
   - Biasa: `flex items-center gap-space-sm px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-xl transition-all font-label-md text-label-md`
   - Aktif (`aria-current="page"`): `bg-primary-container text-on-primary-container font-semibold rounded-xl`.
   - Pasang `data-path` pada tiap `<a>` dan `data-active-classes` pada `<nav>`.
5. **Kartu footer**: ikon `local_hospital`, "RSUD Kardinah", "Server ID: TGL-01", ikon `dns`.

### Header

`fixed top-0 left-72 right-0 h-20 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-xl`

- Kiri: judul "Sistem Antrean & EMR Terpadu (SmartHealth)" (`headline-sm`) + subjudul "Platform Integrasi SatuSehat Kemenkes & Bridging BPJS Mobile JKN" (`body-sm text-on-surface-variant`).
- Kanan: pil `SatuSehat Live • Bridging BPJS OK` (`hidden xl:flex bg-surface-container-low rounded-full`), tombol bulat `w-10 h-10` untuk pencarian pasien dan notifikasi cito (titik `bg-error` di pojok), lalu nama dokter + SIP dan avatar `w-8 h-8 rounded-full`.
- **Ganti nama pengguna/SIP sesuai persona halaman** (apoteker, petugas loket), jangan menyalin Dr. Agtari Ayu ke semua layar.

### Pola isi halaman web

- **Bar konteks** di atas konten: kartu `bg-surface-container-lowest rounded-xl p-space-md shadow-sm` berisi poli/lokasi, dokter/petugas, chip sesi, telemetri perangkat.
- **Grid kerja**: `grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start`. Pola umum: 8+4 (EMR + sidebar antrean), 7+5 (hero pemanggilan + roster), 4+8 (antrean + konsol telaah), 3+5+4 (konseling).
- **Switcher mode simulasi** (opsional, untuk prototipe multi-peran): bar `bg-surface-container-lowest rounded-xl p-space-sm` berisi tombol pil; aktif `bg-primary text-on-primary`, lain `bg-surface-container-low`; panel disembunyikan dengan `hidden`/`flex` (`.role-view`).

## 5. Shell Mobile (Pasien/Wali)

### Header

`fixed top-0 w-full z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]`, isi `h-16 px-margin-mobile flex items-center justify-between`.
- **mobile_tab**: kiri "SmartHealth Mobile" (`label-sm uppercase tracking-wider text-secondary`) + judul layar (`headline-sm`); kanan tombol notifikasi `w-11 h-11` + avatar `w-8 h-8 rounded-full bg-primary` ikon `person`.
- **mobile_stack**: tombol kembali `w-11 h-11` (`arrow_back`, `onclick="history.back()"`), judul `truncate`, dua status kecil `SATUSEHAT` dan `BPJS` (`label-sm`, titik pulse), kanan nama pasien + wali.
- Ganti judul sesuai layar ("Status Kunjungan & Obat", "Tiket Resep Farmasi", "Beranda Antrean").

### Bottom nav (hanya mobile_tab)

`fixed bottom-0 w-full z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-1px_12px_rgba(0,0,0,0.05)]`, isi `flex justify-around items-center h-20 px-space-xs`. Empat tab tetap: **Antrean** (`local_hospital`), **Rujukan** (`clinical_notes`), **Poli & Jam** (`calendar_month`), **Profil** (`badge`). Tab: `flex flex-col items-center justify-center gap-1 w-16 h-14`, ikon `text-[24px]`, label `label-sm truncate`. Aktif: `text-primary font-label-md` + `aria-current="page"`; lain: `text-on-surface-variant hover:text-on-surface`. Beri `pb-24` pada `<main>`.

### Aturan mobile

- Konten dalam `px-margin-mobile`, kartu `bg-surface-container-lowest rounded-xl shadow-sm p-space-md`, jarak `space-y-space-md`.
- Target sentuh minimal `min-h-[44px]`; tombol utama `h-12`. Beri `active:scale-95` atau `active:scale-[0.98]`.
- Tombol CTA bawah ditumpuk (`flex flex-col gap-space-sm`): primer `bg-primary` di atas, sekunder `bg-surface-container` di bawah.
- Urutan blok tracker pasien: profil/verifikasi → **banner CITO** → kartu antrean live → status audio → panduan akses → layanan mandiri → riwayat & resep.

## 6. Katalog Komponen

### Kartu & section

```html
<div class="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-space-sm">
      <span class="material-symbols-outlined text-primary text-headline-sm">clinical_notes</span>
      <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Judul Section</h3>
    </div>
    <span class="px-space-sm py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">Status</span>
  </div>
  <!-- isi -->
</div>
```

Dekorasi hero: lingkaran blur `absolute -right-16 -top-16 w-48 h-48 rounded-full bg-primary/5 blur-2xl pointer-events-none` (tambah `relative overflow-hidden` pada kartu).

### Banner Alergi / CITO (wajib di halaman klinis)

```html
<div class="bg-error-container text-on-error-container p-space-md rounded-xl flex items-start gap-space-sm">
  <span class="material-symbols-outlined text-error text-headline-sm shrink-0" style="font-variation-settings:'FILL' 1;">warning</span>
  <div>
    <span class="font-label-lg text-label-lg text-error font-bold uppercase">Peringatan Alergi Berat (Obat)</span>
    <p class="font-body-sm text-body-sm mt-1">Riwayat alergi: <strong>Golongan Penisilin & Amoksisilin</strong>. Reaksi lampau: erupsi makulopapular & angioedema.</p>
  </div>
</div>
```

Varian kiosk/pasien (**gawat darurat**): `rounded-2xl`, kotak ikon `bg-error text-on-error` (`emergency` / `e911_emergency`), judul "PERINGATAN GAWAT DARURAT MEDIS (CITO)" + chip `Wajib Baca`, dan teks yang menyebut gejala (sesak napas akut, nyeri dada, kejang, perdarahan masif, tidak sadar) lalu pil `IGD 24 JAM`. Pada kartu CDSS tambahkan chip `CDSS Prescription Guard On` dengan ikon `lock`.

### Header identitas pasien

Foto/inisial `w-20 h-20 rounded-xl` (badge penjamin kecil di pojok: `BPJS PBI`), nama `headline-md font-bold`, chip jenis kelamin/usia, chip status (`Sedang Dilayani` dengan titik `animate-ping`), grid 2×4 metadata (`No. RM`, `NIK`, `No. BPJS`, `Poliklinik`) berformat label kapital kecil `text-on-surface-variant/70 uppercase` + nilai `font-semibold`. Di kanan: nomor antrean `display-queue-mobile` dan tombol aksi (Panggil Suara, Selesai Periksa).

### Kartu antrean (roster)

`p-space-sm rounded-xl flex items-center justify-between`:
- **Sedang dipanggil/dilayani**: `bg-primary/10` atau `bg-tertiary-container/10`, kotak kode `w-12 h-12 rounded-xl bg-tertiary-container text-on-tertiary`, badge `Sedang Periksa` `animate-pulse`.
- **Berikutnya**: `bg-surface-container-low hover:bg-surface-container`, badge `Berikutnya` (`bg-secondary-container`), tombol panggil `p-2 rounded-xl bg-primary text-on-primary`.
- **Menunggu**: sama, kode `font-headline-md`, ikon `schedule`, estimasi "Est. ~25 min".
- **Terlewat**: `bg-error-container/20`, kode `text-error`, "Terlewat 2x (09:18 WIB)", tombol `Panggil Lagi`.
- **Selesai**: `opacity-60 – 80`, nama `line-through`, centang `check`, badge `Selesai`.
- Daftar dibungkus `max-h-[460px]–[620px] overflow-y-auto`, tab filter segmented di atasnya: wadah `bg-surface-container p-1 rounded-xl`, tab aktif `bg-surface-container-lowest text-on-surface font-bold shadow-xs`.

### Panel kendali pemanggilan (dokter)

Grid 4 tombol `py-3 rounded-lg flex-col` dengan chip shortcut `font-mono`: **Panggil Ulang [F2]** (tonal), **Pasien Masuk [F3] → buka EMR** (`bg-primary` + `shadow-primary/20`), **Lewati Antrean [F4]** (tonal, hover merah), **Tindakan CITO** (`bg-error`). Di atasnya teks toleransi tunggu dengan timer `font-mono text-error`, plus pil audio ber-bar animasi (`animate-bounce` dengan `animation-delay` berbeda).

### Tile tanda vital

`bg-surface-container-low p-space-sm rounded-xl`: label kapital + ikon kanan, angka `headline-md font-bold` + satuan, keterangan interpretasi (`label-sm`, "Febris Tinggi", "Eupnea"). Abnormal: latar `bg-error-container/30–40`, ikon & angka `text-error`, ikon `thermostat` boleh `animate-pulse`. Grid `grid-cols-2 sm:grid-cols-4`.

### Panel lab (bridging LIS)

Kontainer `rounded-xl bg-surface-container p-space-md`, grid 5 kartu: normal `bg-surface-container-lowest`, abnormal `bg-error-container/60` dengan panah ↑/↓ dan rentang normal. Hasil NS1 dituliskan `REAKTIF (+)` merah.

### Kartu SOAP (S / O / A / P)

Header kartu: kotak huruf `w-8 h-8 rounded-lg bg-primary-container text-on-primary-container font-bold` + judul + subjudul `label-sm`, dan chip di kanan (mis. "Alloanamnesis (Ibu Kandung)", "SatuSehat Validated"). Isi: blok `p-space-md rounded-xl bg-surface-container-low`. **Assessment**: diagnosis utama `bg-error-container/20` dengan badge `Diagnosis Utama` (`bg-error`), kode ICD-10 + SNOMED CT; diagnosis sekunder `bg-surface-container-low` dengan badge `bg-secondary`. **Plan**: kartu disposisi (ikon `hotel`, chip bed `bg-tertiary-fixed`), protokol cairan IV, daftar e-Resep bernomor (bulatan `w-7 h-7`, nama + signa, chip jumlah), dua kartu monitoring & edukasi bahaya syok.

### Tabel e-Resep & telaah dosis

- **Tabel dokter**: `thead bg-surface-container uppercase label-sm`, baris `bg-surface-container-lowest divide-y`, kolom: Nama Obat & Formula, Bentuk/Dosis, Aturan Pakai, Jumlah, Aksi (`×` hover `text-error`).
- **Kartu telaah farmasi**: `bg-surface-container-low rounded-xl p-space-md`, badge `R/1` (`w-8 h-8 rounded-lg bg-primary-container`), nama `label-lg font-bold`, kemasan (chip), signa tebal, baris hitung dosis (`bg-surface-container-highest text-primary`, "10.5 mg/kgBB (rentang 10-15)") + `✓ Tepat Dosis`, jumlah dispense kanan, tombol verifikasi `w-10 h-10`.
- **Telaah 3 aspek**: grid 3 kartu (Administratif, Farmasetik, Klinis & CDSS), masing-masing ikon `check_circle` terisi `text-tertiary` + hasil ("Lolos Verifikasi", "Kompatibel", "CDSS Alert Aman").

### Kanban farmasi

3 kolom `bg-surface-container-low rounded-xl p-space-md`: **Diterima dari Dokter** (titik `bg-secondary`) → **Sedang Diracik** (titik `bg-primary animate-pulse`, kartu `border-l-4 border-primary`) → **Siap Diserahkan** (titik `bg-tertiary`). Kartu: kode `R-0xx` `display-queue-mobile`, badge (Alergi Penisilin merah / Non-Racikan / Racikan Pulveres), nama pasien, poli + dokter, daftar obat `bg-surface-container-low p-space-xs rounded`, tombol lebar penuh (`bg-primary` mulai racik, `bg-tertiary` selesai & panggil). Kolom ketiga: `Panggil Suara` + `Serahkan`.

### Kartu edukasi obat (KIO)

Kartu `bg-surface-container-low rounded-xl p-space-md hover:shadow-md`: kotak ikon `w-10 h-10 rounded-lg` (`thermostat`, `sentiment_worried`, `water_drop`), label golongan kapital, nama + kemasan + Exp, badge aturan di kanan (`PRN`, `2 x 2.5 ml`). Di dalamnya `bg-surface-container-lowest p-space-sm rounded-xl`: takaran tepat (angka besar `text-primary font-extrabold`), **grafik takaran spuit** (track `h-5 rounded-full bg-surface-container`, isi `bg-primary-container` selebar persentase, garis target `bg-tertiary-fixed-dim w-1`), catatan kritis berikon `info`, penyimpanan berikon `inventory_2`. Larangan memakai ikon `warning`/`cancel` merah.

### Evaluasi teach-back & tanda tangan

Tiga kartu pertanyaan (`bg-surface-container-low`, judul + ikon `check_circle`, badge `Paham Sempurna` `bg-tertiary`) dan ringkasan `3/3 Paham`. Tanda tangan dua pihak: grid 2 kolom `h-28 bg-surface-container-low rounded-xl` berisi goresan SVG (`stroke="currentColor"`, `text-primary`), nama, serta verifikasi (`Verified OTP WhatsApp`, `SIPA ...`). Tombol akhir: utama `h-12` (Selesaikan Penyerahan & Kirim Notif), tonal `h-11` (Cetak Lembar Edukasi), `bg-secondary-container` (Panggil Duta Pasien).

### Kiosk anjungan mandiri

- Bar identitas kiosk: ikon `contactless` dalam kotak `w-16 h-16 rounded-2xl bg-primary`, chip `Kiosk 01 - Lobi Utama` + `Online & Terhubung`, jam real-time (`headline-sm text-primary`), tombol `Panduan Suara` dan `Mode Lansia (A+)` (`h-14 rounded-xl`).
- **Banner CITO** tepat di bawah header (lihat di atas).
- Dua kartu besar `rounded-2xl p-space-xl shadow-md`: **Sudah Daftar Online** (badge `OPSI UTAMA CEPAT (10 DETIK)`, viewfinder QR) dan **Pasien Baru / Tanpa Aplikasi** (kartu `Tempelkan e-KTP`, `Ketik NIK KTP`, grid 6 poli dengan sisa kuota; kuota kritis `text-error`).
- Viewfinder QR: `aspect-square bg-inverse-surface rounded-xl`, empat sudut `border-t-4 border-l-4 border-primary-fixed`, garis laser `h-1 bg-primary-fixed animate-pulse`. Setelah terbaca tampilkan banner "QR CODE TERDETEKSI & VALID!", kartu data pasien `ring-2 ring-primary`, dan progres cetak.
- Target sentuh kiosk: tombol utama `py-4`, kartu pilihan `min-h-[140px]`, teks `body-lg/md`.
- Bar telemetri bawah `bg-inverse-surface text-inverse-on-surface rounded-2xl`: chip status Printer EPSON, Pemindai 2D Honeywell, Sensor e-KTP NFC, jaringan SatuSehat, ID terminal & versi firmware.

### Tiket karcis (thermal / e-karcis)

- **Karcis fisik** (web): kartu `bg-surface rounded-2xl border-2 border-dashed border-outline-variant shadow-xl text-center`, urutan: pegangan `w-12 h-2`, "RSUD KARDINAH" (+ ikon `local_hospital`), alamat/telepon, garis, label "Nomor Antrean Poliklinik", **nomor besar** `display-queue`, chip poli `bg-primary-container`, tabel info (`Nama`, `Dokter`, `Waktu Cetak`, `Estimasi Dilayani`, `Pasien di Depan`), QR SVG `w-24 h-24`, teks "Pindai QR ini...".
- **e-Karcis** (mobile): kartu `rounded-2xl shadow-xl overflow-hidden` tiga bagian: header `bg-primary text-on-primary` (rumah sakit + kode booking + pil kelayakan BPJS), tengah `bg-surface-container-low` (nomor, poli, mini-pill "Sedang Dilayani A-024 / Sisa 1 Antrean"), bawah QR + barcode. **Perforasi**: baris `h-8` dengan garis `border-dashed border-outline-variant/60` dan dua lingkaran `w-8 h-8 rounded-full bg-surface` di kiri/kanan (`-left-4`, `-right-4`).
- Tiket resep farmasi (mobile): header `bg-primary` "Tiket Pengambilan Obat", pil "Sedang Dipanggil di Loket 2" (titik `animate-ping`), kode `F - 018`, tombol audio, grid meta, perforasi, QR `RX-...-VERIF`.

### Push notification (in-app)

`bg-surface-container-lowest shadow-xl rounded-xl p-space-md`: ikon aplikasi `w-6 h-6 rounded-lg bg-primary`, "SmartHealth RSUD Kardinah • Baru Saja (09:48 WIB)", tombol tutup, judul tebal ("🔔 Resep Obat Siap Diambil!"), isi, pil `SIAP DIAMBIL (READY FOR PICKUP)` `bg-tertiary-fixed`.

### Kartu antrean live (pasien)

`bg-surface-container-lowest rounded-xl shadow-md p-space-md`: header "SEDANG BERLANGSUNG • LIVE SYNC" (titik pulse), kartu poli + dokter, **dua blok kembar**: nomor Anda (`bg-primary/10`, `display-queue-mobile text-primary`) dan nomor dipanggil (`bg-surface-container-high`, "Sisa 1 Pasien Lagi!"), pil estimasi (`cloud_download`, "09:30 WIB (~6 Menit lagi)" + tombol refresh), stepper 4 tahap (Check-in → Ruang Tunggu → Konsultasi → Farmasi): selesai `bg-tertiary` + `check`, aktif `bg-primary animate-pulse`, menunggu `bg-surface-container`, belum `text-outline`.

### Rawat inap & petunjuk arah

- **Kartu disposisi**: ikon `hotel`/`single_bed`, "Ruang Melati Pediatrik", "Bed 04", chip `Bed Siap`.
- **Petunjuk jalur**: stepper vertikal bulat bernomor (aktif `bg-primary`, berikut `bg-surface-container`) dengan garis `w-0.5 h-6 bg-outline-variant`.
- **Duta Pasien**: foto/inisial `w-12 h-12 rounded-full` + titik online, tombol `Panggil / Hubungi Duta` dan `Kursi Roda`.
- **Modal SPRI** (web): kartu `rounded-2xl max-w-lg`, ikon `bedroom_parent text-error`, ringkasan pasien & indikasi, select ruang (nama ruang + sisa bed), tombol `Batal` + `Terbitkan SPRI BPJS Online` (`bg-error`). Widget bed: bar `h-2` (merah bila ≥ 90% terisi, hijau bila longgar).

### Dinkes Command Center

- Header dengan chip kapital + judul `headline-lg` + tombol unduh laporan.
- 4 KPI `bg-surface-container-low p-space-md rounded-xl`: label + ikon, angka `headline-lg`, tren (▲/✓), keterangan pendamping. Contoh: Total Pasien, Rata-rata Waktu Tunggu (< 30 mnt), BOR (optimal 60-85%), Sinkron SatuSehat HL7 FHIR.
- Grafik garis SVG inline (< 2 KB): garis ambang `stroke-dasharray="4 4"` merah, kurva `text-primary` dengan isi `text-primary/10`, titik puncak merah.
- **Audit trail**: daftar `font-mono` `bg-surface-container-lowest p-space-xs rounded` dengan stempel `text-primary font-bold`, label UU PDP 27/2022.

### Badge & chip status

`inline-flex items-center gap-1 px-space-xs py-0.5 rounded font-label-sm text-label-sm font-bold` (pil: `rounded-full px-space-sm`).

| Teks | Warna |
|---|---|
| Sedang Dilayani / Selesai / Valid / Aktif / Siap / Terverifikasi | `bg-tertiary-fixed text-on-tertiary-fixed` (atau `bg-tertiary text-on-tertiary` bila perlu kuat) |
| Online JKN / Berikutnya / Info | `bg-secondary-container text-on-secondary-container` |
| Walk-in / Menunggu / Netral | `bg-surface-container(-high) text-on-surface-variant` |
| Alergi / CITO / Terlewat / Perlu Verifikasi / Kritis | `bg-error-container text-on-error-container` (kuat `bg-error text-on-error`) |
| Penjamin BPJS PBI | `bg-tertiary text-on-tertiary` kecil di pojok foto |
| Integrasi (SatuSehat, VClaim, FHIR) | `bg-tertiary-fixed` / `bg-surface-container text-tertiary` + titik atau `cloud_done` |

### Tombol

| Jenis | Kelas |
|---|---|
| Primer | `px-space-md py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md shadow-sm flex items-center gap-space-xs transition-all` |
| Sukses/selesai | `bg-tertiary text-on-tertiary hover:opacity-90` (atau `bg-tertiary-container hover:bg-tertiary`) |
| Tonal | `bg-surface-container text-on-surface hover:bg-surface-container-high` |
| Tonal biru | `bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-on-secondary` |
| Destruktif/CITO | `bg-error text-on-error hover:opacity-90` |
| Ikon bulat | `w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-surface-container` |
| Link kecil | `text-primary font-label-md font-bold hover:underline` + ikon `sync`/`arrow_forward` |

Semua tombol: `type="button"` (kecuali submit form), ikon `text-body-md`/`text-[18px]` di kiri teks, `active:scale-95`, `transition-all`. Saat proses: ganti ikon dengan `animate-spin` (`autorenew`/`sync`) dan `disabled = true`.

### Form

- Input/select/textarea: `bg-surface-container-low text-on-surface font-body-sm px-space-md py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary`, tanpa border. Di atas latar `-low`, input memakai `bg-surface-container-lowest`.
- Label: `font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase`.
- Input dengan tombol di dalam (Cek Dukcapil, Cek VClaim): pembungkus `relative`, tombol `absolute right-2 top-2 px-space-xs py-1 rounded bg-surface-container text-primary`.
- Pencarian: ikon `absolute left-3`, input `pl-10`.
- Pemindai: input `font-mono tracking-wider uppercase` ukuran `headline-sm` untuk kiosk.
- Form walk-in: grid 2/3 kolom, tombol `Reset` (teks) + `Terbitkan Nomor Antrean & Cetak Karcis`.
- Toggle: switch `w-12 h-6 bg-primary rounded-full` dengan ibu jari `w-5 h-5` (`translate-x-6` bila aktif) atau `peer` checkbox. Beri `role="switch"` dan `aria-checked`.
- Rating bintang: 5 tombol ikon `star` terisi `text-amber-500`.

### Toast, modal, drawer

- **Toast web**: `fixed bottom-6 right-6 z-50 bg-surface-container-lowest rounded-xl shadow-xl p-space-md flex items-center gap-space-sm border-l-4 border-primary max-w-md`, sembunyikan dengan `translate-y-32 opacity-0`, tampil `translate-y-0 opacity-100`, hilang otomatis ±3,8 dtk. Kiosk: tengah bawah `bg-on-background text-inverse-on-surface rounded-2xl`.
- **Modal**: `fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-50 hidden items-center justify-center p-space-md`, kartu `bg-surface-container-lowest rounded-2xl shadow-xl max-w-lg w-full p-space-lg`, tutup lewat tombol `×`, `Batal`, atau klik latar.
- **Modal e-karcis QR (mobile)**: kartu `max-w-sm`, QR SVG `w-48 h-48`, tombol simpan gambar.

## 7. Konvensi Konten

- **Faskes**: "RSUD Kardinah" (Kota Tegal, Server ID TGL-01), faskes 1 "Puskesmas Garuda". Alamat karcis: "Jl. KS Tubun No. 2, Kota Tegal". Gunakan satu nomor telepon yang konsisten dalam satu produk.
- **Format kode**:
  - Antrean poli `A-025` (di karcis boleh `A - 025`), walk-in `W-009`, poli lain `B-018` / `C-007`, prioritas `P-xxx`, farmasi `F-018`, resep racik `R-041`.
  - Booking `#BK-20261112-0429`, e-resep `#RX-20261112-0042` (token `-VERIF`), encounter `ENC-20261112-08992`, rujukan `0142/RJK-GAR/XI/2026`, SatuSehat Pasien `P-10029481920`, No. RM `RM-2026-104992`.
  - **Satu pasien = satu set identitas** di semua layar (RM, NIK, BPJS, BB, usia, tanggal kunjungan).
- **Tanggal & waktu**: `12 Nov 2026`, `09:36 WIB`; durasi `04:15`; hari penuh "Kamis, 12 November 2026". Selalu sertakan "WIB".
- **Angka**: titik ribuan Indonesia (`108.000 /µL`, `1.428`), desimal koma pada teks narasi atau titik pada nilai klinis (`38.6 °C`, `14.2 kg`); pilih satu gaya per layar. Satuan ditulis dengan spasi (`6.25 ml`, `120 mg / 5 ml`).
- **Dosis**: format `signa` "3 x 6.25 ml per oral prn bila suhu aksila > 38.2°C", sertakan hitungan mg/kgBB dan rentang acuan (Formularium Nasional & IDAI).
- **Diagnosis**: tulis kode + nama (`A97.0 - Dengue Fever with Warning Signs`); gunakan kode ICD-10 yang sama di semua layar untuk kasus yang sama.
- **Penjamin**: `BPJS PBI`, `BPJS Non-PBI`, `Umum Mandiri`, `Asuransi Swasta`.
- **Regulasi yang dirujuk**: PMK 24/2022 (rekam medis), UU PDP 27/2022, SPM waktu tunggu < 30 menit.
- **Nada teks**: jelas, ramah keluarga pasien, kalimat perintah singkat ("Larutkan 1 sachet dalam 200 ml air matang"). Hindari singkatan klinis tanpa konteks pada layar pasien.

## 8. Micro-interaction (JS vanilla inline)

Semua interaksi di prototipe adalah **simulasi** (tanpa backend); jangan mengesankan data tersimpan sungguhan.

- **Toast helper**: `showToast(title, desc, icon?, isError?)`, memutar kelas `translate-y-*`/`opacity-*`, `setTimeout` ±3,8–4,5 dtk.
- **Suara panggilan**: `speechSynthesis` dengan `utterance.lang = 'id-ID'`, `rate` 0.9–0.95; ucapkan kode antrean dengan jeda ("Nomor Antrean, A-025, silakan menuju Poli Anak Kamar nol tiga"). Selalu `speechSynthesis.cancel()` sebelum `speak()` dan cek `'speechSynthesis' in window`.
- **Pintasan keyboard** konsol dokter: `F2` panggil ulang, `F3` pasien masuk, `F4` lewati (`e.preventDefault()`).
- **Timer**: hitung mundur auto-skip 5 menit dan stopwatch konsultasi dengan `setInterval`, format `mm:ss` + `padStart`.
- **Pindah status kanban**: pindahkan `closest('.flex-col')` antar kolom, ganti tombol, panggil toast.
- **Cetak**: ubah tombol menjadi `Mencetak...` + `animate-spin`, `setTimeout` 1–1,5 dtk, lalu pulihkan dan beri efek `ring-4 ring-primary scale-105` pada pratinjau tiket 2 dtk.
- **Mode switcher**: tukar kelas `hidden`/`flex` pada panel dan kelas aktif pada tombol.
- **Toggle audio/alarm**: ganti ikon (`volume_up` ↔ `volume_off`), teks status, dan (mobile) `navigator.vibrate(80)`.
- **Berbagi**: `navigator.share` bila tersedia, bila gagal tampilkan toast "Tautan disalin".
- Bungkus skrip dalam IIFE; cek elemen ada (`if (el)`) sebelum memasang listener.

## 9. Alur Kerja Saat Dipakai

1. Tentukan **persona dan shell**: web (Dokter, Loket, Farmasi, Dinkes), mobile pasien (`mobile_tab` / `mobile_stack`), atau kiosk.
2. Tentukan **pasien contoh** dan pakai satu set identitas tetap (lihat §10) agar data konsisten lintas layar.
3. Mulai dari kerangka shell (§4/§5) lalu isi dengan komponen katalog (§6). Jangan membuat varian warna baru; pakai token.
4. Letakkan **banner alergi / CITO** paling atas bila halaman bersifat klinis; letakkan banner **gawat darurat** bila halaman untuk pasien/kiosk.
5. Tambahkan jejak integrasi (SatuSehat, BPJS, ID encounter/resep) dan stempel WIB.
6. Pasang interaksi simulasi secukupnya (§8) dan jangan menambahkan library.

### Daftar periksa sebelum menyerahkan

- [ ] Config Tailwind lengkap (13 fontFamily eksplisit) dan `lang="id"`.
- [ ] `shell-type` meta sesuai shell; Material Symbols dipasang sekali.
- [ ] Sidebar 5 item tetap (web) / bottom nav 4 tab tetap (mobile_tab); item aktif benar dan judul header diganti sesuai layar.
- [ ] Nama pengguna/SIP di header sesuai persona layar.
- [ ] Banner alergi/CITO atau gawat darurat ada bila relevan.
- [ ] Teks skrining alergi tidak menyiratkan pasien bebas alergi bila alergi tercatat.
- [ ] Dosis pediatrik menampilkan BB dan hitungan mg/kgBB.
- [ ] Nomor antrean memakai `display-queue(-mobile)` dan kode memakai `font-mono`.
- [ ] Format kode/tanggal/identitas konsisten dengan seluruh layar lain.
- [ ] Tidak ada gambar remote bila dipublikasikan; tidak ada `localStorage` untuk data penting.
- [ ] Target sentuh mobile ≥ 44px dan kiosk lebih besar; fokus & `aria-label` pada tombol ikon.

## 10. Identitas Contoh Baku (gunakan ini, jangan mengarang varian)

Agar tidak mengulang ketidakkonsistenan sumber, pakai satu set data contoh untuk pasien utama:

| Field | Nilai |
|---|---|
| Pasien | Ananda Rayyan Pratama, L, 3 th 2 bln (lahir 10 Sep 2023) |
| BB / TB | 14.2 kg / 94 cm |
| No. RM | RM-2026-104992 |
| Wali | Ibu Siti Rahmawati (Ibu Kandung), 0812-9842-1102 |
| Penjamin | BPJS PBI, No. 0001827391823 |
| SatuSehat | P-10029481920 |
| Alergi | Penisilin & Amoksisilin (angioedema, erupsi makulopapular) |
| Tanggal kunjungan | 12 Nov 2026 |
| Booking / antrean / resep | #BK-20261112-0429 / A-025 / #RX-20261112-0042 (F-018) |
| Dokter | Dr. Agtari Ayu, Sp.A, SIP 446/102/SIP/2024 (Poli Anak Kamar 03 Lt. 2) |
| Apoteker | apt. Fajar Nugroho, S.Farm, SIPA 19890412/SIPA_33.76/2023 |
| Diagnosis | A97.0 Dengue Fever with Warning Signs; sekunder E86.0 |
| Terapi | Paracetamol sirup 3 x 6.25 ml prn, Ondansetron sirup 2 x 2.5 ml, Oralit 5 sachet, IVFD RL 50 ml/jam |
| Disposisi | Ruang Melati Pediatrik, Bed 04 |

Persona pendukung: Ny. Sukarsih (B-018), Tn. Hendra Saputra (C-007), Nurhayati Lestari (A-026), Kevin Sanjaya (A-027), Aisyah Putri (A-028), Bagas Pratama (A-012, terlewat).

## 11. Catatan Ketidakkonsistenan Sumber (jangan ditiru)

Sumber prototipe mengandung kontradiksi. Jangan menyalinnya ke layar baru:

1. **Alergi**: layar konseling menulis "tidak memiliki riwayat alergi amoksisilin" padahal layar lain mencatat alergi penisilin/amoksisilin. Gunakan wording "resep bebas golongan penisilin".
2. **BB** 12.5 kg vs 14.2 kg, **usia** 3 th vs 4 th, **suhu** 38.4 vs 38.6 °C, **oralit** 6 vs 5 sachet: pakai nilai di §10.
3. **Tanggal** 10 Nov vs 12 Nov 2026 (kunjungan) dan rujukan 01 Nov vs 09 Nov.
4. **No. RM** (tiga format), **NIK/BPJS/usia** Ibu Siti, **nomor telepon RSUD** (tiga nomor), **format nomor rujukan**.
5. **ICD-10 DBD**: A91 vs A97.0.
6. **Dokter Poli Anak** tertulis dua nama berbeda; pakai satu.
7. **Bed**: Ruang Melati "tersisa 1 bed" tetapi Bed 04 sudah dialokasikan; sinkronkan hitungan bed.
8. **Switcher role/navigasi** hanya fungsional di satu layar; pada layar lain tautan masih `href="#"`. Buat nav yang benar-benar berpindah halaman bila diminta.
9. Tag `<link>` Material Symbols dan blok `<style>` tinggi minimum terduplikasi di sumber; pasang sekali.
