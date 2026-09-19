# Audit & perbaikan portofolio Gofi
Tanggal: 19 September 2026

## Hasil
Identitas gelap–oranye dipertahankan. Halaman utama, layanan, kontak, dan delapan kategori karya sekarang menggunakan komponen serta hierarki visual bersama. Konten situs tetap dalam bahasa Inggris mengikuti versi sebelumnya.

## Temuan dan perubahan

| Area | Temuan awal | Perbaikan |
| --- | --- | --- |
| Hierarki visual | Body menggunakan font tulisan tangan; ukuran, jarak dan tampilan judul berbeda-beda | DM Sans untuk isi, Poppins untuk heading, aksen tulisan tangan terbatas; token warna, container, tombol dan spacing bersama |
| Beranda | Pembuka generik, komposisi absolut meninggalkan ruang kosong besar, CTA karya kurang jelas | Pembuka yang menjelaskan bidang kerja, galeri floating dari karya asli yang dapat digeser dengan mouse, sentuhan, atau keyboard, CTA Explore my work dan kontak |
| Portofolio | Kartu berupa div yang dapat diklik, deskripsi bergantung pada hover | Tautan native, deskripsi selalu terlihat, filter All work / Design & media / Build & grow dengan state yang terbaca assistive technology |
| Navigasi | Tombol menggantikan tautan; menu bertingkat; tidak ada active state atau label menu mobile | Tautan nyata, active state, disclosure Work, tombol mobile berlabel, Escape dan penutupan saat fokus keluar |
| Konsistensi proyek | Hero berbeda, banner berulang, intro dan tag duplikat | ProjectHero bersama, breadcrumb All work, sampul statis, heading dan tag seragam; isi studi kasus dipertahankan |
| Kontak | Hierarki kontak lemah, WhatsApp memakai HTTP, ukuran email rawan overflow | Kartu email dan WhatsApp HTTPS, konteks brief, social links konsisten, tata letak responsif |
| Galeri | Tombol ikon tanpa nama, target pagination kecil, pemutar short-form hanya mouse | Label kontrol, status filter/pagination, area klik pagination diperbesar, pemutar dapat diakses dengan Enter/Space |
| Video | Modal tanpa pengelolaan fokus atau Escape dan iframe tanpa judul | Native dialog, focus containment, pengembalian fokus, scroll lock, Escape, judul iframe, navigasi video dan fallback tautan YouTube |
| Gerak & loading | Banyak video banner autoplay/preload, canvas dan konten yang bergerak terus di beranda | Banner statis, canvas beranda dihapus, galeri UI/UX statis, client logo statis, lazy-loading galeri, dukungan reduced motion |
| SEO | Hanya title; seluruh route berada di client; metadata dan sitemap tidak tersedia | HTML statis per route, title/description/canonical, Open Graph, Twitter card, social preview, JSON-LD Person/WebSite/WebPage/BreadcrumbList, sitemap dan robots |
| Routing | URL tak dikenal diganti ke beranda; deep link bergantung pada rewrite SPA | Halaman 404; HTML .html dan directory index untuk hosting; native history, anchor, modified click dan trailing slash didukung |
| Aset | Seluruh gambar fotografi dan satu thumbnail motion tidak tersedia; satu video ID placeholder | Photography menjadi halaman kurasi noindex, tidak ditampilkan dalam grid/sitemap. Draft motion dipertahankan di unpublished-project.txt |
| Konfigurasi | Build mendefinisikan GEMINI_API_KEY untuk bundle browser meski tidak digunakan | Definisi key dihapus. Origin kanonis dapat dikonfigurasi melalui VITE_SITE_URL. Vercel Analytics hanya aktif jika VITE_ENABLE_ANALYTICS=true |
| Pemeliharaan | Navigasi memetakan judul lewat if/else di banyak tempat | Model kategori bertipe dengan ID route; judul/tag/cover dipakai bersama oleh navigasi, kartu, layanan dan hero |

## Verifikasi yang dijalankan

- `npm run lint`: lulus TypeScript.
- `npm run build`: lulus; 13 dokumen HTML dihasilkan, ditambah salinan directory index untuk deep link.
- `npm run check:build`: lulus; 194 referensi aset serta 234 tautan internal/anchor pada HTML hasil build valid.
- Setiap dokumen memiliki tepat satu H1, judul unik, description, canonical, social metadata dan JSON-LD yang dapat diparse.
- Sitemap memuat 11 halaman yang dapat diindeks; halaman fotografi dan 404 memakai noindex.
- Browser: beranda pada desktop 1440 px; seluruh route pada viewport mobile 390 px, tanpa horizontal overflow; halaman data pada tablet 768 px.
- Browser: filter kategori menghasilkan empat kategori Technical; filter galeri RSPI memperbarui selected state dan gambar.
- Browser: menu mobile membuka kategori dan menuju halaman motion.
- Browser: modal motion terbuka, next video mengubah 1/5 menjadi 2/5, Escape menutup dan mengembalikan fokus ke pemutar; body scroll dipulihkan.
- Browser: pemutar short-form dapat dibuka dengan Enter.
- Browser: URL /web-dev.html memuat Web Development; URL tak dikenal menampilkan halaman not-found dan noindex.
- Pemeriksaan HTML: tidak ada tombol kosong tanpa accessible name pada hasil render awal.

## Konten yang masih memerlukan aset asli

1. Photography: tambahkan foto yang memang dimiliki portofolio sebelum mengaktifkan galeri, kartu kategori dan indexing.
2. PT Advanced Agri: ganti ID YouTube placeholder dan tambahkan thumbnail. Data aslinya tetap tersedia dalam `docs/unpublished-project.txt`.
3. Statistik pengalaman dan hasil studi kasus yang dipertahankan berasal dari konten proyek sebelumnya; audit ini tidak memverifikasi angka tersebut dengan sumber eksternal.

## Batas verifikasi

Perubahan tersedia secara lokal dan belum dipublikasikan. Audit ini tidak mengklaim skor Lighthouse, Core Web Vitals lapangan, kenaikan ranking, atau hasil Search Console. Ketersediaan semua video dan situs eksternal belum diverifikasi satu per satu. Respons HTTP 404 dari hosting perlu dikonfirmasi setelah deploy; preview Vite menggunakan fallback lokal, sedangkan konfigurasi Vercel dan berkas 404.html disiapkan untuk hosting produksi.

## Rujukan implementasi

- [Google: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google: Crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [W3C: Native modal dialog](https://www.w3.org/WAI/WCAG22/Techniques/html/H102)

## Revisi interaksi dan halaman project

- Positioning utama berfokus pada digital: development, design, motion, dan data. “Based in Indonesia” dihapus dari positioning.
- Aksen oranye diseragamkan menjadi #ff6a00. Beranda memakai gambar floating dengan pause/resume dan reduced motion.
- All work diacak sekali setiap kunjungan setelah hydration; pergantian filter mempertahankan urutan itu.
- Navbar tetap sticky dan terlihat. Work terbuka saat hover; klik menahan dropdown sampai klik kedua, Escape, memilih tautan, atau klik di luar.
- Delapan halaman project memakai hero, navigasi anchor bagian, gutter, hierarki judul, dan navigasi project berikutnya bersama.
- Motion Graphics: lima kartu studi kasus dengan preview besar, thumbnail film, penanda pilihan, previous/next berlabel per klien, toolkit dengan nama terbaca, dan proses ringkas. Galeri tumpang-tindih serta dekorasi animasi berulang diganti dengan layout responsif yang fokus pada karya.
- Graphic: lima bagian dengan anchor; kontrol galeri berlabel dan pilihan aktif jelas.
- Short-form / Long-form: navigasi menuju koleksi dan hierarki heading diperbaiki.
- Web Development: CTA kunjungan situs, gutter, tag, serta spacing studi kasus diselaraskan.
- Market Research: statistik dipindah ke panel terbaca, bukan menumpuk di gambar; judul bagian dan label dirapikan.
- Data Analysis: deskripsi dan tag selalu terlihat; grid responsif.
- Meta Ads: navigasi overview, campaign, dan framework; wording proses dirapikan.

Verifikasi tambahan: pengacakan memuat delapan kategori unik dan stabil setelah filter; kontrol pause dan reset posisi gambar bekerja; navbar tetap di atas setelah scroll; Work tetap terbuka setelah pointer keluar jika diklik, lalu menutup pada klik kedua. Motion mobile tidak memiliki horizontal overflow atau gambar gagal dimuat pada gambar yang selesai loading. Modal membuka film terpilih dan Escape memulihkan fokus. Pemeriksaan build mencakup anchor lokal, ID unik, dan navigasi bersama setiap halaman project.

## Animasi halaman dan kontrol play

- Setiap route memakai first-load fade 280 ms dan entrance hero 400 ms.
- Scroll reveal memakai IntersectionObserver, durasi 360 ms, perpindahan 14 px, tanpa antrean delay panjang. Konten yang sudah muncul tidak dianimasikan ulang saat scroll balik.
- Entrance lama pada halaman project disatukan; progress bar dipercepat menjadi 400–450 ms. Interaksi carousel tetap dipertahankan.
- Seluruh kontrol play buatan situs memakai ScribblePlay dengan bentuk arsiran dan gerak stop-motion berulang seperti Meta Ads. Kontrol di dalam iframe YouTube tetap milik YouTube.
- Homepage menggunakan grid 56 px dengan garis putih sekitar 2,4% opacity.
- Reduced motion menonaktifkan entrance, reveal, dan gerak scribble. Konten HTML tetap terbaca tanpa JavaScript; fokus keyboard membuka konten reveal sebelum interaksi.
- Browser: entrance terpasang di seluruh 13 route; scroll homepage mengubah 4 elemen menjadi revealed; 25 ikon play di empat halaman video menggunakan infinite loop; seluruh tujuh gambar floating selesai dimuat; tombol play Motion tetap membuka dialog.
- `npm run lint`, `npm run build`, dan `npm run check:build` lulus.

## Slider Motion Graphics

Galeri Motion kini menampilkan tiga kartu: video aktif di tengah dan dua preview di samping, dengan transisi 320 ms. Mendukung drag horizontal, tombol panah, keyboard kiri/kanan, indikator pilihan, dan klik kartu samping. Drag tidak membuka video secara tidak sengaja. Page by Page tetap satu kartu sesuai jumlah asetnya. Verifikasi browser: drag berpindah dari film 1 ke 2, klik membuka film 2, keyboard kembali ke film 1, indikator memilih film 3; mobile tidak memiliki horizontal overflow. TypeScript, build, dan validasi 13 halaman lulus (184 referensi aset, 234 tautan/anchor).
