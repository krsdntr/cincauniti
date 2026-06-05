# Cincauniti — Website Profile

Website profil bisnis resmi **Cincauniti**, minuman cincau hijau organik murni.

## 🌿 Tentang

Website marketing-sentris yang dibangun dengan HTML/CSS/JS vanilla, dioptimasi untuk:
- **Cloudflare Pages** (Edge Runtime compatible)
- **SEO Lokal** (Jakarta, cincau hijau organik)
- **Konversi** via WhatsApp, Instagram, Google Maps
- **Responsif** untuk semua ukuran layar

## 📁 Struktur File

```
cincauniti-web/
├── index.html          ← Halaman utama (SPA)
├── css/
│   └── style.css       ← Design system lengkap
├── js/
│   └── main.js         ← Interaksi & animasi
├── images/
│   ├── hero.png        ← Foto produk hero
│   └── products.png    ← Flatlay produk
├── _headers            ← Cloudflare cache & security headers
└── _redirects          ← URL redirect rules
```

## 🚀 Deploy ke Cloudflare Pages

### Via GitHub (Recommended)

1. Push folder ini ke repository GitHub
2. Login [Cloudflare Dashboard](https://dash.cloudflare.com)
3. Pages → Create a project → Connect to Git
4. Pilih repo ini
5. **Build settings:** Tidak perlu (static site)
   - Build command: *(kosongkan)*
   - Build output directory: `/` atau `.`
6. Deploy!

### Direct Upload

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login
wrangler login

# Deploy langsung
wrangler pages deploy . --project-name=cincauniti
```

## 📱 Platform yang Terintegrasi

| Platform | Link |
|---|---|
| WhatsApp | wa.me/6281213079617 |
| Instagram | instagram.com/cincauniti |
| Google Maps | maps.app.goo.gl/7AoBBpT1qenzALYC7 |

## 🔧 Customization

### Ganti Nomor WhatsApp
Cari dan ganti `6281213079617` di `index.html`

### Ganti Foto
Replace file di folder `images/`:
- `hero.png` — Foto produk hero
- `products.png` — Foto flatlay produk

### Update Warna Brand
Edit CSS variables di `css/style.css` bagian `:root {}`

---

© 2026 Cincauniti. All rights reserved.
