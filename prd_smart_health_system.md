# PRODUCT REQUIREMENT DOCUMENT (PRD)
# SISTEM ANTREAN & REKAM MEDIS TERPADU RSUD & PUSKESMAS (SMART HEALTH PORTAL)

**Nama Produk:** Sistem Antrean & Rekam Medis Terpadu RSUD & Puskesmas  
**Kategori:** Healthcare Information System / Smart City Portal  
**Jenis Produk:** Mobile App (Pasien), Web Portal (Faskes & Admin), Kiosk Screen (On-Site Faskes)  
**Target Pengguna:** Pasien, Petugas Loket/Puskesmas, Petugas RSUD, Dokter, Perawat, Apoteker, Administrator Dinas Kesehatan  
**Status Dokumen:** Master Product Requirement Document  
**Versi:** 2.0 (Consolidated Master)  
**Tanggal:** November 2026  

---

## 1. PENDAHULUAN & LATAR BELAKANG

### 1.1 Problem Statement
1. **Penumpukan dan Waktu Tunggu Pasien:** Pendaftaran manual menyebabkan antrean panjang berjam-jam di Puskesmas maupun RSUD hanya untuk mendapatkan nomor antrean dan verifikasi berkas/BPJS.
2. **Fragmentasi Data Rekam Medis:** Data riwayat medis pasien di Puskesmas (Faskes 1) tidak terhubung secara *real-time* dengan RSUD (Faskes Rujukan), memicu pengulangan pemeriksaan dan administrasi yang memperlambat penanganan medis.
3. **Informasi Rujukan & Kuota Tidak Transparan:** Pasien sering kali datang ke RSUD tanpa kejelasan ketersediaan kuota dokter spesialis atau status kelayakan rujukan.

### 1.2 Tujuan Utama & Visi Produk
* **Visi:** Mewujudkan ekosistem pelayanan kesehatan daerah yang terintegrasi, transparan, cepat, dan berorientasi pada kesinambungan pelayanan medis pasien (*continuum of care*).
* **Tujuan Utama:** Memangkas rata-rata waktu tunggu antrean di faskes hingga 60%, mengintegrasikan data EMR lintas faskes daerah, serta mempermudah alur rujukan secara digital.

### 1.3 Target KPIs (Key Performance Indicators)
* **Waktu Tunggu:** Penurunan rata-rata waktu tunggu pelayanan menjadi $< 30$ menit.
* **Adopsi Digital:** $> 70\%$ pendaftaran harian dilakukan via aplikasi online/Kiosk.
* **Integrasi EMR:** $100\%$ Puskesmas dan RSUD di bawah naungan Pemda terhubung pada sistem EMR terpadu.
* **Performa Sistem:** Keberhasilan transaksi pendaftaran $\ge 98\%$ dengan ketersediaan sistem (*uptime*) $\ge 99.5\%$.

---

## 2. TARGET PENGGUNA & MATRIKS HAK AKSES (RBAC)

### 2.1 Personas
1. **Pasien / Masyarakat:** Mengelola profil, mendaftar antrean online, melihat estimasi jam panggil, serta mengakses riwayat medis pribadi.
2. **Petugas Loket Faskes (Puskesmas/RSUD):** Verifikasi kedatangan (*check-in*), menangani pendaftaran *walk-in*, serta mengelola alur antrean fisik.
3. **Dokter & Tenaga Medis:** Membaca riwayat EMR lintas faskes, menginput diagnosa (ICD-10), tindakan, dan resep elektronik.
4. **Perawat:** Mencatat tanda-tanda vital (*vital signs*) dan memperbarui status alur pemeriksaan pasien.
5. **Admin Dinkes / Pimpinan Daerah:** Mengakses *executive dashboard* untuk evaluasi kapasitas faskes, kinerja layanan, dan pemetaan tren penyakit.

### 2.2 Matriks Hak Akses (Role-Based Access Control)

| Modul / Fitur | Pasien | Petugas Puskesmas | Petugas RSUD | Dokter | Perawat | Admin Dinkes |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| Registrasi & Profil Sendiri | **W/R** | - | - | - | - | - |
| Pendaftaran & Booking Antrean | **W/R** | **W/R** | **W/R** | - | - | - |
| Manajemen & Pemanggilan Antrean | - | **W/R** | **W/R** | **R** | **R** | **R** |
| Verifikasi & Pembuatan Rujukan | **R** | **W/R** | **W/R** | **W/R** | - | - |
| Akses Rekam Medis (EMR) | **R (Terbatas)** | **R (Sesuai Kewenangan)** | **R (Sesuai Kewenangan)** | **W/R** | **W/R (Vital Signs)** | - |
| Input Diagnosis & Resep | - | - | - | **W/R** | - | - |
| Kelola Jadwal & Kuota Dokter | - | - | **W/R** | - | - | **W/R** |
| Dashboard Exec & Audit Log | - | **R (Faskes)** | **R (Faskes)** | - | - | **W/R (System-Wide)** |

*Keterangan: W (Write/Edit), R (Read Only), - (No Access).*

---

## 3. CAKUPAN FITUR FUNGSIONAL (FUNCTIONAL REQUIREMENTS)

### 3.1 Autentikasi & Integrasi Identitas Single Sign-On (SSO)
* **FR-01 Integrasi NIK & BPJS:** Login menggunakan NIK yang terverifikasi otomatis dengan basis data Kependudukan / BPJS Health API.
* **FR-02 Manajemen Profil Pasien:** Pengelolaan data pribadi, nomor HP/WhatsApp untuk notifikasi, data kontak darurat, serta penanganan penggabungan data rekam medis ganda (*deduplication*).

### 3.2 Pendaftaran Online & Engine Antrean Digital
* **FR-03 Booking Antrean Multi-Faskes:** Pendaftaran H-7 sampai H-1 ke Puskesmas atau RSUD dengan memilih poli, dokter, dan jenis pembiayaan (BPJS/Umum).
* **FR-04 Real-Time Queue Engine & Live Tracker:**
  * Penomoran antrean otomatis berdasarkan format poli dan tanggal.
  * Estimasi waktu panggil adaptif berbasis kecepatan durasi penanganan pasien per dokter secara *real-time* (via WebSocket/Redis).
* **FR-05 Anjungan Kiosk Check-In & Walk-In:**
  * Scan QR Code di lokasi faskes untuk mengonfirmasi kehadiran pasien *booking*.
  * Pencetakan nomor antrean fisik bagi pasien lansia/non-smartphone (*walk-in*).
* **FR-06 Kuota & Lock Management:** Sistem otomatis memblokir pendaftaran jika kuota harian dokter telah terpenuhi.

### 3.3 Manajemen Rujukan Terpadu (Puskesmas ke RSUD)
* **FR-07 Penerbitan & Verifikasi Rujukan Digital:** Dokter/Petugas Puskesmas membuat rujukan digital beserta resume medis awal. Petugas RSUD menerima dan memverifikasi rujukan secara *real-time*.
* **FR-08 Status Tracking Rujukan:** Alur transparan status rujukan: `Draft` $\rightarrow$ `Dikirim` $\rightarrow$ `Menunggu Verifikasi` $\rightarrow$ `Diterima` / `Ditolak (dengan alasan)` $\rightarrow$ `Selesai`.

### 3.4 Rekam Medis Elektronik Terpadu (EMR)
* **FR-09 Integrasi Rekam Medis Lintas Faskes:** Dokter RSUD dapat melihat riwayat alergi, pengobatan, diagnosa (ICD-10), dan hasil laboratorium pasien dari kunjungan Puskesmas sebelumnya.
* **FR-10 Electronic Health Record Entry:** Interface dokter untuk pengisian *anamnesis*, pemeriksaan fisik, tanda vital, diagnosa, dan e-Resep yang terhubung langsung ke Apotek/Farmasi Faskes.
* **FR-11 Integrasi SATUSEHAT (Standard Health API):** Pemetaan data rekam medis mengikuti standar FHIR / HL7 untuk interoperabilitas data kesehatan nasional.

### 3.5 Dashboard Analytics & Notifikasi
* **FR-12 Executive Dashboard Dinkes:** Visualisasi *real-time* angka kunjungan, rata-rata durasi pelayanan per dokter, kapasitas tempat tidur RSUD, serta pemetaan tren penyakit kota.
* **FR-13 Multi-Channel Notifications:** Pengiriman pengingat jadwal, status panggilan antrean, dan notifikasi rujukan via WhatsApp Official API, Email, dan In-App Push Notification.

---

## 4. ATURAN BISNIS & BATASAN SISTEM (BUSINESS RULES & LIMITATIONS)

### 4.1 Business Rules Utama
1. Satu NIK hanya dapat melakukan 1 (satu) pendaftaran pada poli dan tanggal kunjungan yang sama.
2. Hak akses EMR oleh dokter hanya berlaku jika pasien berada dalam status antrean aktif atau memiliki riwayat rujukan resmi kepada dokter/faskes yang bersangkutan.
3. Pasien yang tidak melakukan *check-in* hingga 15 menit setelah estimasi waktu panggil tanpa konfirmasi akan ditandai sebagai `Terlewat` dan urutan antrean dialihkan.
4. Setiap perubahan catatan medis (*EMR Edit*) wajib menyimpan versi asli dan mencatat identitas penyuplai data dalam *Audit Log* (*non-deletable record*).

### 4.2 Batasan Sistem (System Scope Limitations)
1. **Bukan Sistem Klinis Otomatis:** Sistem tidak menggantikan keputusan medis dokter dan tidak melakukan diagnosa otomatis.
2. **Kondisi Gawat Darurat (UGD/IGD):** Pelayanan IGD tidak menggunakan antrean online dan wajib langsung ditangani sesuai prosedur triase medis.
3. **Ketergantungan API Eksternal:** Integrasi BPJS dan SATUSEHAT bergantung pada kesiapan serta ketersediaan API dari penyedia layanan nasional tersebut.

---

## 5. KEBUTUHAN NON-FUNGSIONAL & KEAMANAN

### 5.1 Performa & Skalabilitas
* **Concurrency:** Mampu menangani hingga $10.000$ transaksi antrean bersamaan pada jam puncak pendaftaran ($06.00 - 08.00$ WIB) dengan *latency* $< 2$ detik.
* **Uptime Availability:** Minimum $99.5\%$ *uptime* per bulan.

### 5.2 Keamanan & Privasi Data
* **Enkripsi Data:** AES-256 untuk data medis yang tersimpan (*at-rest*) dan TLS 1.3 untuk transmisi data (*in-transit*).
* **Kepatuhan Hukum:** Memenuhi ketentuan UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP) dan PMK No. 24 Tahun 2022 tentang Rekam Medis.
* **Audit Trail:** Mencatat log komprehensif terhadap setiap aktivitas pembacaan, pengubahan, atau ekspor data rekam medis.

### 5.3 Aksesibilitas UI/UX
* Antarmuka aplikasi mobile dirancang ramah lansia (mendukung mode kontras tinggi dan opsi ukuran teks besar/font adaptif).

---

## 6. ARSITEKTUR & TEKNOLOGI (TECHNICAL STACK)

* **Frontend:**
  * Mobile App (Pasien): React Native / Flutter
  * Web Portal (Dokter, Admin, Faskes): React.js / Next.js
* **Backend Services:**
  * Microservices Architecture: Go (Golang) / Node.js
  * API Gateway: Kong / NGINX
  * Real-Time Engine: Redis Pub/Sub & WebSockets
* **Database & Storage Layer:**
  * Primary Database: PostgreSQL (Relational DB dengan *table partitioning* antrean harian)
  * Cache & State Store: Redis (Token sesi, counter antrean aktif, dan *rate limiting*)
  * Object Storage: MinIO / Amazon S3 (Penyimpanan berkas foto rontgen & hasil pemindaian lab)

---

## 7. SKEMA DATA UTAMA (DATABASE ENTITIES OVERVIEW)

| Nama Tabel / Entitas | Atribut Utama | Fungsi Utama |
|---|---|---|
| `users` | `user_id` (PK), `nik`, `email`, `password_hash`, `role_id`, `status` | Manajemen kredensial pengguna |
| `patients` | `patient_id` (PK), `nomor_rm_nasional`, `nik`, `nama`, `tgl_lahir`, `no_bpjs` | Data demografi pasien |
| `facilities` | `facility_id` (PK), `nama_faskes`, `jenis` (Puskesmas/RSUD), `kode_faskes` | Master data fasilitas kesehatan |
| `doctors` | `doctor_id` (PK), `sip_number`, `nama_dokter`, `spesialisasi` | Master data tenaga medis |
| `schedules` | `schedule_id` (PK), `doctor_id`, `facility_id`, `hari`, `jam_buka`, `kuota` | Jadwal & batas kuota harian |
| `queues` | `queue_id` (PK), `patient_id`, `facility_id`, `schedule_id`, `nomor_antrean`, `status` | Transaksi antrean real-time |
| `referrals` | `referral_id` (PK), `patient_id`, `faskes_asal`, `faskes_tujuan`, `diagnosa_awal`, `status` | Alur transaksi rujukan faskes |
| `medical_records` | `record_id` (PK), `patient_id`, `doctor_id`, `faskes_id`, `icd10_code`, `anamnesis` | Data Rekam Medis Terpadu |
| `audit_logs` | `log_id` (PK), `user_id`, `action`, `resource_target`, `timestamp`, `ip_address` | Keamanan dan penelusuran akses data |

---

## 8. ROADMAP IMPLEMENTASI & TAHAPAN DEVELOPMENT

```
+-----------------------------------------------------------------------------------+
| FASE 1: PERSIAPAN & CORE QUEUE (Bulan 1-2)                                        |
| - Desain Database, Setup API Gateway & Auth SSO NIK                               |
| - Modul Pendaftaran Online, Engine Antrean Redis, & Kiosk Check-In                |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
| FASE 2: REKAM MEDIS & RUJUKAN (Bulan 3-4)                                         |
| - Modul EMR Terpadu (Input Diagnosis ICD-10, Resep Digital)                       |
| - Modul Rujukan Digital Puskesmas -> RSUD                                         |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
| FASE 3: INTEGRASI EKSTERNAL & SECURITY (Bulan 5)                                  |
| - Integrasi API SATUSEHAT & BPJS Health                                           |
| - Pentest Security Audit, Load Testing (High Concurrency), Audit Trail Verification|
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
| FASE 4: PILOT PROJECT & ROLLOUT (Bulan 6)                                         |
| - Pilot Project di 3 Puskesmas & 1 RSUD Utama                                     |
| - Pelatihan Staf Medis, Evaluasi UAT, & Full Rollout Kota                         |
+-----------------------------------------------------------------------------------+
```

---

## 9. ACCEPTANCE CRITERIA (KRITERIA PENERIMAAN PRODUK)

1. **Pendaftaran & Antrean:** Pasien dapat menyelesaikan pendaftaran online $< 2$ menit dan mendapatkan nomor antrean yang tervalidasi tanpa duplikasi.
2. **Kiosk Integration:** Mesin Kiosk mampu membaca QR Code pendaftaran online dan mencetak nomor antrean lokal dalam waktu $< 3$ detik.
3. **Visibilitas EMR:** Dokter di RSUD dapat mengakses riwayat rekam medis pasien dari Puskesmas dalam kurun waktu $< 2$ detik setelah mengonfirmasi rujukan/antrean.
4. **Keamanan Access Logs:** $100\%$ aktivitas pembacaan dan pengubahan data rekam medis tercatat tanpa celah pada modul *Audit Log*.