# SmartHealth — Sistem Antrean & EMR Terpadu RSUD Dr. H. Abdul Moeloek (Provinsi Lampung)

Aplikasi web layanan kesehatan interaktif, modern, dan siap produksi yang mengintegrasikan antrean multi-kanal, anjungan mandiri (kiosk), rekam medis elektronik (EMR SOAP) berbasis CDSS keselamatan pasien, modul farmasi konseling (KIO), dan *Command Center* eksekutif Dinas Kesehatan Provinsi Lampung.

---

## 🌟 5 Antarmuka Operasional (Role-Switcher)

1. **📱 Aplikasi Mobile Pasien (PWA Pasien & Wali)**
   - **Pelacakan Antrean Langsung**: Nomor tiket **A-025** dengan posisi antrean saat ini (**A-024**, sisa 1 pasien).
   - **Estimasi Waktu Dinamis**: Perhitungan estimasi panggil (09:30 WIB, ~6 menit lagi) dengan stepper 4 tahapan (*Check-in* → *Ruang Tunggu* → *Pemeriksaan Dokter* → *Farmasi*).
   - **Check-In QR**: Barcode & QR Code digital untuk *check-in* di Kiosk (#BK-20261112-0429).
   - **Pengingat Jadwal Obat**: Paracetamol Sirup 6.25 ml (PRN demam > 38.2°C), Ondansetron 2.5 ml, dan Oralit 5 sachet dengan pencatatan kepatuhan minum obat.
   - **Notifikasi Farmasi F-018**: *In-App Push Banner* saat obat selesai diracik dan dipanggil di Loket 2.
   - **Viewport Switcher**: Tombol pengalih antara bingkai realistis *iPhone 16 Pro* dan tampilan layar penuh responsif.

2. **🎫 Anjungan Kiosk & Loket Pendaftaran**
   - **Pratinjau Cetak Karcis Thermal**: Format karcis fisik 80mm lengkap dengan perforasi bergerigi, logo RSUD Dr. H. Abdul Moeloek, nomor hero **A - 025**, poli tujuan, dan QR verification.
   - **Verifikasi BPJS VClaim & Dukcapil**: Validasi otomatis NIK `1871011209230002` dan No. BPJS `0001827391823`, bridging rujukan FKTP Puskesmas Kedaton (`0142/RJK-KDT/XI/2026`), serta penerbitan SEP `#SEP-20261112-09214`.
   - **Pemanggilan Suara (Web Speech API)**: Sintesis suara dwibahasa (**Bahasa Indonesia** dan **Bahasa Lampung Dialek Api/Nyo**) dengan visualisasi audio equalizer.
   - **Pintasan Keyboard Fisik**: Hotkey `[F2]` Panggil Antrean, `[F3]` Panggil Ulang / Pasien Masuk, dan `[F4]` Lewati Antrean.
   - **Mode Ramah Lansia (A+)**: Tombol aksesibilitas satu klik untuk memperbesar font, mengoptimalkan rasio kontras, dan membesarkan area sentuh.

3. **🩺 Dashboard EMR & SOAP Dokter Poli Anak (Dr. Agtari Ayu, Sp.A)**
   - **Pengunci CDSS Alergi Berat Penisilin**: *Red safety alert banner* di puncak antarmuka dan *hard-lock modal* yang memblokir peresepan bila dokter memilih Amoksisilin/Penisilin.
   - **Input TTV Real-Time**: Suhu aksila 38.6°C (Febris tinggi abnormal), Nadi 122 x/mnt, RR 26 x/mnt, SpO2 98%, Berat Badan **14.2 kg**, dan Tinggi 94 cm.
   - **Bridging LIS Laboratorium**: Trombosit 108.000 /µL (menurun), Leukosit 3.200 /µL, Hematokrit 41.2%, dan NS1 Dengue Antigen REAKTIF (+).
   - **Kodifikasi ICD-10 & SNOMED CT**: Diagnosis primer `A97.0 Dengue Fever with Warning Signs` (DBD Derajat I-II) dan sekunder `E86.0 Dehidrasi Ringan-Sedang`.
   - **e-Resep Digital #RX-20261112-0042**: Kalkulator dosis pediatrik otomatis berbasis berat badan 14.2 kg (10.5 mg/kgBB = 6.25 ml per pemberian).
   - **Penerbitan SPRI Rawat Inap**: Penerbitan digital Surat Perintah Rawat Inap alokasi **Bed 04 Ruang Melati Pediatrik**.

4. **💊 Modul Farmasi & Konseling Apoteker (apt. Fajar Nugroho, S.Farm)**
   - **Kanban Penyerahan 3 Kolom**: Kolom alur terpadu (*1. Diterima dari Dokter* → *2. Sedang Disiapkan / Diracik* → *3. Siap Diserahkan & KIO*).
   - **Telaah Resep 3 Aspek (Permenkes No. 73/2016)**: Checklist interaktif aspek Administratif, Farmasetik, dan Klinis/CDSS.
   - **Visualisasi Takaran Spuit Oral**: Gambar spuit medis interaktif dengan slider penanda meniskus cairan pada batas presisi **6.25 ml** (setara 150 mg Paracetamol).
   - **Teach-Back & Tanda Tangan Digital**: Evaluasi pemahaman 3 pertanyaan ibu pasien dan kanvas tanda tangan digital (*HTML5 touch/mouse canvas*) tersertifikasi SIPA Apoteker (SIPA 19890412/SIPA_18.71/2023).

5. **📊 Command Center Eksekutif Dinkes Provinsi Lampung**
   - **4 KPI Eksekutif**: Waktu tunggu SPM (23.4 menit vs target <30 menit), Bed Occupancy Rate (BOR 76.8% optimal), total kunjungan 1.428 pasien, dan 100% integrasi SatuSehat FHIR.
   - **Grafik SVG Waktu Tunggu per Poli**: Visualisasi waktu tunggu dengan garis ambang batas merah SPM 30 menit.
   - **BOR Bangsal & Ruang Melati**: Kapasitas tempat tidur real-time yang langsung berubah saat Bed 04 diisi.
   - **Penampil Audit Log Berenkripsi AES-256**: Pencatatan riwayat transaksi medis *non-deletable* yang patuh UU Pelindungan Data Pribadi (UU No. 27/2022) dan PMK No. 24/2022 Rekam Medis Elektronik.

---

## 👤 Data Konsistensi Pasien Utama

| Atribut | Nilai Terpadu |
|---|---|
| **Nama Pasien** | Ananda Rayyan Pratama |
| **Jenis Kelamin / Usia** | Laki-laki / 3 tahun 2 bulan (Lahir 10 Sep 2023) |
| **Berat Badan / Tinggi** | **14.2 kg** / 94 cm |
| **Nomor Rekam Medis (RM)** | **RM-2026-98124** |
| **NIK / No. BPJS** | `1871011209230002` / `0001827391823` (BPJS PBI Aktif) |
| **Wali Pasien** | Ibu Siti Rahmawati (0812-9842-1102) |
| **Riwayat Alergi** | **Alergi Berat Penisilin & Amoksisilin** (Angioedema & Erupsi Makulopapular) |
| **Faskes Perujuk** | Puskesmas Kedaton (Bandar Lampung) (No. Rujukan: `0142/RJK-KDT/XI/2026`) |
| **Nomor Tiket Antrean** | **A-025** (Kode Booking: `#BK-20261112-0429`) |
| **Nomor Resep / Tiket Farmasi** | `#RX-20261112-0042` / **F-018** |
| **Dokter DPJP** | Dr. Agtari Ayu, Sp.A (SIP: 446/102/SIP/2024) |
| **Apoteker** | apt. Fajar Nugroho, S.Farm (SIPA: 19890412/SIPA_18.71/2023) |
| **Diagnosis** | `A97.0 Dengue Fever with Warning Signs` (DBD Derajat I-II) |
| **Disposisi Rawat Inap** | **Ruang Melati Pediatrik, Bed 04** |

---

## 🎨 Token Desain Khusus

- **Primary**: `#00685f` (Teal Medis RSUDAM Lampung)
- **Primary Container**: `#008378`
- **Error / CITO / Alergi**: `#ba1a1a` (Merah Peringatan Keselamatan)
- **Tertiary (Sukses / Siap)**: `#006947`
- **Background**: `#f8f9ff`
- **Surface**: `#ffffff`

---

## 🚀 Cara Menjalankan Aplikasi

### Opsi 1: Menjalankan Localhost Instan (Sangat Cepat & Tanpa Setup)
Cukup klik ganda file:
```cmd
JALANKAN_LOCALHOST.bat
```
Server HTTP PowerShell lokal akan aktif pada port **8080** dan membuka peramban secara otomatis di `http://localhost:8080`.

### Opsi 2: Buka Langsung di Peramban
Klik kanan file `index.html` dan pilih **Open with Google Chrome** atau **Microsoft Edge**.

### Opsi 3: Menjalankan Proyek Next.js / TypeScript
Bila Node.js dan npm telah terpasang:
```bash
npm install
npm run dev
```
Buka `http://localhost:3000` di peramban Anda.

