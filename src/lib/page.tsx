"use client";

export default function DebugEnvPage() {
    // Variabel dengan prefix NEXT_PUBLIC_ aman diakses di client-side.
    // Membaca langsung dari process.env saat render untuk menghindari cascading renders.
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "TIDAK DITEMUKAN / UNDEFINED";

    const isWrongUrl = backendUrl !== "TIDAK DITEMUKAN / UNDEFINED" && backendUrl.includes("saas-echo.web.id");
    const isNotSet = backendUrl === "TIDAK DITEMUKAN / UNDEFINED";

    return (
        <div style={{ padding: '2rem', fontFamily: 'monospace', color: 'white', backgroundColor: '#111', minHeight: '100vh' }}>
            <h1>Halaman Debug Environment Variable</h1>
            <p>Halaman ini menampilkan nilai variabel yang dipakai untuk koneksi ke API backend.</p>
            <hr style={{ margin: '1rem 0', borderColor: '#444' }} />
            <h2><code>NEXT_PUBLIC_BACKEND_API_URL</code></h2>
            <div style={{
                marginTop: '1rem', padding: '1rem', backgroundColor: '#333',
                border: '1px solid #555', borderRadius: '8px', fontSize: '1.2rem', wordWrap: 'break-word'
            }}>
                <p>Nilai saat ini: <strong style={{ color: isWrongUrl || isNotSet ? '#F1948A' : '#76D7C4' }}>{backendUrl}</strong></p>
            </div>
            <hr style={{ margin: '1rem 0', borderColor: '#444' }} />
            <h2>Analisis</h2>
            {(isWrongUrl || isNotSet) ? (
                <div style={{ color: '#F1948A', marginTop: '1rem' }}>
                    <p><strong>🚨 MASALAH DITEMUKAN:</strong> Nilai di atas adalah penyebab error Anda.</p>
                    <p>{isWrongUrl ? "URL tersebut adalah alamat Frontend, bukan Backend. Request API jadi salah alamat." : "Variabel ini belum di-set di environment production Anda."}</p>
                </div>
            ) : (
                <div style={{ color: '#82E0AA', marginTop: '1rem' }}>
                    <p><strong>✅ TERLIHAT BENAR:</strong> URL ini sepertinya sudah benar mengarah ke backend. Jika masih error, masalah mungkin ada di server backend itu sendiri.</p>
                </div>
            )}

            <h2 style={{ marginTop: '2rem' }}>Solusi (Wajib Dilakukan)</h2>
            <ol style={{ paddingLeft: '2rem', lineHeight: '1.6' }}>
                <li>Buka dashboard hosting Anda (EdgeOne Pages / Vercel).</li>
                <li>Masuk ke menu **Settings `&gt;` Environment Variables** di project Anda.</li>
                <li>Cari variabel bernama `NEXT_PUBLIC_BACKEND_API_URL`.</li>
                <li>**Ubah nilainya** menjadi URL server backend Anda yang sebenarnya (contoh: `https://api.domainanda.com` atau `https://backend-anda.fly.dev`).</li>
                <li>**Simpan** dan **Redeploy** aplikasi Anda.</li>
            </ol>
        </div>
    );
}