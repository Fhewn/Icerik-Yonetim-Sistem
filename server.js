const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();

// Session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/dersler', (req, res) => {
    res.render('dersler');
});

app.get('/dersler/:slug', (req, res) => {
    const slug = req.params.slug;
    res.render(`dersler/${slug}`, (err, html) => {
        if (err) {
            console.error(`Ders yüklenirken hata oluştu (${slug}):`, err);
            res.status(404).send(`
                <!DOCTYPE html>
                <html lang="tr">
                <head>
                    <meta charset="UTF-8">
                    <title>Ders Bulunamadı</title>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
                    <style>
                        body {
                            background: #f8fafc;
                            font-family: 'Inter', Arial, sans-serif;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            min-height: 100vh;
                            margin: 0;
                        }
                        .error-container {
                            background: #fff;
                            border-radius: 2rem;
                            box-shadow: 0 8px 32px rgba(99,102,241,0.10);
                            padding: 3rem 2rem;
                            text-align: center;
                            max-width: 400px;
                            animation: fadeInDown 1s;
                        }
                        .error-icon {
                            font-size: 4rem;
                            color: #6366f1;
                            margin-bottom: 1rem;
                            text-shadow: 0 4px 24px #a5b4fc44;
                        }
                        h1 {
                            color: #6366f1;
                            font-size: 2.2rem;
                            margin-bottom: 0.5rem;
                            font-weight: 800;
                        }
                        .error {
                            color: #64748b;
                            margin: 20px 0 30px 0;
                            font-size: 1.1rem;
                        }
                        .back {
                            color: #fff;
                            background: linear-gradient(90deg, #6366f1 60%, #a5b4fc 100%);
                            text-decoration: none;
                            padding: 0.7em 2em;
                            border-radius: 1.5em;
                            font-weight: 600;
                            font-size: 1.1rem;
                            box-shadow: 0 2px 8px #6366f122;
                            transition: background 0.2s;
                            display: inline-block;
                        }
                        .back:hover {
                            background: linear-gradient(90deg, #fbbf24 60%, #6366f1 100%);
                            color: #fff;
                        }
                        @keyframes fadeInDown {
                            from { opacity: 0; transform: translateY(-40px);}
                            to { opacity: 1; transform: translateY(0);}
                        }
                    </style>
                </head>
                <body>
                    <div class="error-container">
                        <div class="error-icon"><i class="fas fa-exclamation-triangle"></i></div>
                        <h1>404 - Ders Bulunamadı</h1>
                        <div class="error">Aradığınız ders sayfası bulunamadı.</div>
                        <a href="/dersler" class="back"><i class="fas fa-arrow-left"></i> Derslere Geri Dön</a>
                    </div>
                </body>
                </html>
            `);
        } else {
            res.send(html);
        }
    });
});

app.get('/katilimcilar', (req, res) => {
    res.render('katilimcilar');
});

app.get('/denemeler', (req, res) => {
    res.render('denemeler');
});

app.get('/hakkimda', (req, res) => {
    res.render('hakkimda');
});

// Web Programlama Denemesi Soru Dizisi
const webProgramlamaSorular = [
  { soru: "HTML'de bir sayfanın başlığı hangi etiketle belirlenir?", secenekler: ["A) <head>", "B) <title>", "C) <body>", "D) <meta>"], dogru: "B" },
  { soru: "CSS'de arka plan rengini değiştirmek için hangi özellik kullanılır?", secenekler: ["A) color", "B) background-color", "C) font-color", "D) bg-color"], dogru: "B" },
  { soru: "JavaScript'te bir değişken tanımlamak için hangisi kullanılır?", secenekler: ["A) var", "B) let", "C) const", "D) Hepsi"], dogru: "D" },
  { soru: "HTML'de bağlantı (link) oluşturmak için hangi etiket kullanılır?", secenekler: ["A) <a>", "B) <link>", "C) <href>", "D) <url>"], dogru: "A" },
  { soru: "CSS'de bir elementi seçmek için kullanılan işaret nedir?", secenekler: ["A) . (nokta)", "B) # (kare)", "C) > (büyüktür)", "D) * (yıldız)"], dogru: "A" },
  { soru: "JavaScript'te bir fonksiyon nasıl tanımlanır?", secenekler: ["A) function fonk() {}", "B) fonksiyon fonk() {}", "C) func fonk() {}", "D) fonk() function {}"], dogru: "A" },
  { soru: "HTML'de resim eklemek için hangi etiket kullanılır?", secenekler: ["A) <img>", "B) <src>", "C) <image>", "D) <pic>"], dogru: "A" },
  { soru: "CSS'de tüm <p> etiketlerini seçmek için hangi selector kullanılır?", secenekler: ["A) p", "B) .p", "C) #p", "D) *p"], dogru: "A" },
  { soru: "JavaScript'te bir dizi (array) nasıl tanımlanır?", secenekler: ["A) let arr = [];", "B) let arr = {};", "C) let arr = ();", "D) let arr = <>;"], dogru: "A" },
  { soru: "HTML'de tablo oluşturmak için hangi etiket kullanılır?", secenekler: ["A) <table>", "B) <tab>", "C) <tr>", "D) <td>"], dogru: "A" },
  { soru: "CSS'de bir elementi ID'sine göre seçmek için hangi işaret kullanılır?", secenekler: ["A) .", "B) #", "C) :", "D) *"], dogru: "B" },
  { soru: "JavaScript'te koşul ifadesi için hangi anahtar kelime kullanılır?", secenekler: ["A) if", "B) for", "C) while", "D) switch"], dogru: "A" },
  { soru: "HTML'de form elemanlarını gruplamak için hangi etiket kullanılır?", secenekler: ["A) <fieldset>", "B) <formgroup>", "C) <group>", "D) <div>"], dogru: "A" },
  { soru: "CSS'de yazı tipi (font) değiştirmek için hangi özellik kullanılır?", secenekler: ["A) font-family", "B) font-size", "C) font-style", "D) font-weight"], dogru: "A" },
  { soru: "JavaScript'te bir fonksiyonu çağırmak için hangisi kullanılır?", secenekler: ["A) fonk[]", "B) fonk()", "C) fonk{}", "D) fonk<>"], dogru: "B" }
];

// Web Programlama Denemesi Giriş POST
app.post('/denemeler/web-programlama/giris', (req, res) => {
    const { ad, soyad, okulno } = req.body;
    // Kullanıcı bilgilerini session'a kaydet
    req.session.kullanici = { ad, soyad, okulno };
    res.json({ success: true });
});

// Web Programlama Denemesi Giriş GET
app.get('/denemeler/web-programlama/giris', (req, res) => {
    res.render('denemeler/web-programlama-giris');
});

// Web Programlama Denemesi Sınav Akışı
app.get('/denemeler/web-programlama', (req, res) => {
    // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
    if (!req.session.kullanici) {
        return res.redirect('/denemeler/web-programlama/giris');
    }

    let s = parseInt(req.query.s) || 1;
    if (s < 1) s = 1;
    if (s > webProgramlamaSorular.length) s = webProgramlamaSorular.length;
    const soru = webProgramlamaSorular[s-1];
    res.render('denemeler/web-programlama-sinav', {
        soruNo: s,
        toplam: webProgramlamaSorular.length,
        soru: soru.soru,
        secenekler: soru.secenekler,
        webProgramlamaSorular: webProgramlamaSorular,
        kullanici: req.session.kullanici
    });
});

// Sonuçlar dizisi (tüm katılımcılar için)
const webProgramlamaSonuclar = [];

// Sınavı bitir route'u
app.get('/denemeler/web-programlama/sonuc', (req, res) => {
    const { ad, soyad, okulno, dogru, yanlis, oran } = req.query;
    if (ad && soyad && okulno && dogru && yanlis && oran) {
        // Aynı kullanıcının önceki sonucunu sil
        const index = webProgramlamaSonuclar.findIndex(k => k.okulno === okulno);
        if (index !== -1) {
            webProgramlamaSonuclar.splice(index, 1);
        }
        // Yeni sonucu ekle
        webProgramlamaSonuclar.push({ 
            ad, 
            soyad, 
            okulno, 
            dogru: Number(dogru), 
            yanlis: Number(yanlis), 
            oran: Number(oran) 
        });
    }
    // Başarıya göre sırala
    const sirali = webProgramlamaSonuclar.slice().sort((a, b) => b.oran - a.oran);
    res.render('denemeler/web-programlama-sonuc', { katilimcilar: sirali });
});

// Veritabanı Yönetimi Denemesi Soru Dizisi
const veritabaniSorular = [
  { soru: "Bir veritabanında veri bütünlüğünü sağlamak için kullanılan anahtar nedir?", secenekler: ["A) Yabancı Anahtar", "B) Birincil Anahtar", "C) Alternatif Anahtar", "D) Aday Anahtar"], dogru: "B" },
  { soru: "SQL'de tüm kayıtları seçmek için hangi komut kullanılır?", secenekler: ["A) SELECT *", "B) GET ALL", "C) SHOW ALL", "D) FETCH *"], dogru: "A" },
  { soru: "Bir tabloda aynı değerin tekrar etmesini engelleyen anahtar nedir?", secenekler: ["A) Birincil Anahtar", "B) Yabancı Anahtar", "C) Dış Anahtar", "D) İkincil Anahtar"], dogru: "A" },
  { soru: "Veritabanında birden fazla tabloyu birleştirmek için hangi SQL komutu kullanılır?", secenekler: ["A) JOIN", "B) UNION", "C) MERGE", "D) LINK"], dogru: "A" },
  { soru: "SQL'de bir tabloya yeni kayıt eklemek için hangi komut kullanılır?", secenekler: ["A) INSERT INTO", "B) ADD ROW", "C) NEW RECORD", "D) APPEND"], dogru: "A" },
  { soru: "Bir veritabanında veri tekrarını azaltmak için yapılan işleme ne ad verilir?", secenekler: ["A) Normalizasyon", "B) Denormalizasyon", "C) Optimizasyon", "D) Sorgulama"], dogru: "A" },
  { soru: "SQL'de bir tablodan kayıt silmek için hangi komut kullanılır?", secenekler: ["A) DELETE", "B) REMOVE", "C) DROP", "D) ERASE"], dogru: "A" },
  { soru: "Bir tablonun yapısını değiştirmek için hangi SQL komutu kullanılır?", secenekler: ["A) ALTER TABLE", "B) MODIFY TABLE", "C) CHANGE TABLE", "D) UPDATE TABLE"], dogru: "A" },
  { soru: "Veritabanında ilişkili iki tabloyu bağlamak için hangi anahtar kullanılır?", secenekler: ["A) Yabancı Anahtar", "B) Birincil Anahtar", "C) Alternatif Anahtar", "D) Karma Anahtar"], dogru: "A" },
  { soru: "SQL'de bir tablonun tüm kayıtlarını silmek için hangi komut kullanılır?", secenekler: ["A) TRUNCATE", "B) DELETE", "C) DROP", "D) REMOVE"], dogru: "A" },
  { soru: "Bir veritabanında veri tekrarını önlemek için hangi işlem yapılır?", secenekler: ["A) Normalizasyon", "B) Sorgulama", "C) Yedekleme", "D) Kopyalama"], dogru: "A" },
  { soru: "SQL'de bir tablonun adını değiştirmek için hangi komut kullanılır?", secenekler: ["A) RENAME TABLE", "B) CHANGE NAME", "C) ALTER NAME", "D) UPDATE NAME"], dogru: "A" },
  { soru: "Bir veritabanında veri yedekleme işlemine ne ad verilir?", secenekler: ["A) Backup", "B) Restore", "C) Replication", "D) Mirroring"], dogru: "A" },
  { soru: "SQL'de bir tablonun yapısını tamamen silmek için hangi komut kullanılır?", secenekler: ["A) DROP TABLE", "B) DELETE TABLE", "C) REMOVE TABLE", "D) ERASE TABLE"], dogru: "A" },
  { soru: "Bir veritabanında veri kaybını önlemek için hangi işlem yapılır?", secenekler: ["A) Yedekleme", "B) Sorgulama", "C) Normalizasyon", "D) Kopyalama"], dogru: "A" }
];

// Veritabanı Yönetimi Giriş GET
app.get('/denemeler/veritabani/giris', (req, res) => {
    res.render('denemeler/veritabani-giris');
});
// Veritabanı Yönetimi Giriş POST
app.post('/denemeler/veritabani/giris', (req, res) => {
    const { ad, soyad, okulno } = req.body;
    req.session.veritabani_kullanici = { ad, soyad, okulno };
    res.json({ success: true });
});
// Veritabanı Yönetimi Sınav Akışı
app.get('/denemeler/veritabani', (req, res) => {
    let s = parseInt(req.query.s) || 1;
    if (s < 1) s = 1;
    if (s > veritabaniSorular.length) s = veritabaniSorular.length;
    const soru = veritabaniSorular[s-1];
    res.render('denemeler/veritabani-sinav', {
        soruNo: s,
        toplam: veritabaniSorular.length,
        soru: soru.soru,
        secenekler: soru.secenekler,
        veritabaniSorular: veritabaniSorular,
        kullanici: req.session.veritabani_kullanici
    });
});
// Sonuçlar dizisi (tüm katılımcılar için)
const veritabaniSonuclar = [];
// Sınavı bitir route'u
app.get('/denemeler/veritabani/sonuc', (req, res) => {
    const { ad, soyad, okulno, dogru, yanlis, oran } = req.query;
    if (ad && soyad && okulno && dogru && yanlis && oran) {
        const index = veritabaniSonuclar.findIndex(k => k.okulno === okulno);
        if (index !== -1) {
            veritabaniSonuclar.splice(index, 1);
        }
        veritabaniSonuclar.push({ ad, soyad, okulno, dogru: Number(dogru), yanlis: Number(yanlis), oran: Number(oran) });
    }
    const sirali = veritabaniSonuclar.slice().sort((a, b) => b.oran - a.oran);
    res.render('denemeler/veritabani-sonuc', { katilimcilar: sirali });
});

// Backend Geliştirme Denemesi Soru Dizisi
const backendSorular = [
  { soru: "Node.js'de asenkron işlemler nasıl yönetilir?", secenekler: ["A) Callback fonksiyonları", "B) For döngüleri", "C) While döngüleri", "D) If-else yapıları"], dogru: "A" },
  { soru: "REST API'de HTTP metodlarından hangisi veri güncellemek için kullanılır?", secenekler: ["A) GET", "B) POST", "C) PUT", "D) DELETE"], dogru: "C" },
  { soru: "Express.js'de middleware ne işe yarar?", secenekler: ["A) Veritabanı bağlantısı", "B) İstek-yanıt döngüsünü yönetme", "C) Sunucu başlatma", "D) Port ayarlama"], dogru: "B" },
  { soru: "MongoDB'de bir doküman nasıl güncellenir?", secenekler: ["A) updateOne()", "B) modifyDoc()", "C) changeOne()", "D) editDoc()"], dogru: "A" },
  { soru: "JWT (JSON Web Token) ne için kullanılır?", secenekler: ["A) Kimlik doğrulama", "B) Veritabanı sorguları", "C) Sunucu yapılandırması", "D) Port yönetimi"], dogru: "A" },
  { soru: "Node.js'de bir dosya nasıl okunur?", secenekler: ["A) fs.readFile()", "B) file.read()", "C) readFromFile()", "D) fileSystem.get()"], dogru: "A" },
  { soru: "Express.js'de statik dosyalar nasıl sunulur?", secenekler: ["A) express.static()", "B) app.static()", "C) static.serve()", "D) express.public()"], dogru: "A" },
  { soru: "MongoDB'de bir koleksiyon nasıl oluşturulur?", secenekler: ["A) createCollection()", "B) newCollection()", "C) makeCollection()", "D) addCollection()"], dogru: "A" },
  { soru: "Node.js'de bir HTTP sunucusu nasıl oluşturulur?", secenekler: ["A) http.createServer()", "B) server.create()", "C) http.makeServer()", "D) createHTTP()"], dogru: "A" },
  { soru: "REST API güvenliği için hangi yöntem kullanılmaz?", secenekler: ["A) JWT", "B) OAuth", "C) Basic Auth", "D) FTP"], dogru: "D" },
  { soru: "Node.js'de hata yönetimi nasıl yapılır?", secenekler: ["A) try-catch bloklarıyla", "B) if-else ile", "C) switch-case ile", "D) for döngüsüyle"], dogru: "A" },
  { soru: "WebSocket hangi durumda kullanılır?", secenekler: ["A) Gerçek zamanlı iletişim", "B) Dosya yükleme", "C) Veritabanı sorguları", "D) Statik dosya sunumu"], dogru: "A" },
  { soru: "Node.js'de npm ne işe yarar?", secenekler: ["A) Paket yönetimi", "B) Sunucu yönetimi", "C) Port yönetimi", "D) Dosya yönetimi"], dogru: "A" },
  { soru: "REST API'de CORS ne için kullanılır?", secenekler: ["A) Güvenlik politikaları", "B) Veritabanı bağlantısı", "C) Sunucu yapılandırması", "D) Port yönetimi"], dogru: "A" },
  { soru: "Node.js'de process.env ne işe yarar?", secenekler: ["A) Ortam değişkenlerini yönetme", "B) Sunucu portunu ayarlama", "C) Dosya yollarını belirleme", "D) Veritabanı bağlantısı"], dogru: "A" }
];

// Backend Geliştirme Denemesi Giriş GET
app.get('/denemeler/backend/giris', (req, res) => {
    res.render('denemeler/backend-giris');
});

app.post('/denemeler/backend/giris', (req, res) => {
    const { ad, soyad, okulno } = req.body;
    req.session.backend_kullanici = { ad, soyad, okulno };
    res.json({ success: true });
});

app.get('/denemeler/backend', (req, res) => {
    if (!req.session.backend_kullanici) {
        return res.redirect('/denemeler/backend/giris');
    }

    let s = parseInt(req.query.s) || 1;
    if (s < 1) s = 1;
    if (s > backendSorular.length) s = backendSorular.length;
    const soru = backendSorular[s-1];
    res.render('denemeler/backend-sinav', {
        soruNo: s,
        toplam: backendSorular.length,
        soru: soru.soru,
        secenekler: soru.secenekler,
        backendSorular: backendSorular,
        kullanici: req.session.backend_kullanici
    });
});

// Backend Geliştirme Sonuçları
const backendSonuclar = [];

app.get('/denemeler/backend/sonuc', (req, res) => {
    const { ad, soyad, okulno, dogru, yanlis, oran } = req.query;
    if (ad && soyad && okulno && dogru && yanlis && oran) {
        const index = backendSonuclar.findIndex(k => k.okulno === okulno);
        if (index !== -1) {
            backendSonuclar.splice(index, 1);
        }
        backendSonuclar.push({ 
            ad, 
            soyad, 
            okulno, 
            dogru: Number(dogru), 
            yanlis: Number(yanlis), 
            oran: Number(oran) 
        });
    }
    const sirali = backendSonuclar.slice().sort((a, b) => b.oran - a.oran);
    res.render('denemeler/backend-sonuc', { katilimcilar: sirali });
});

// Frontend Frameworks Denemesi Soru Dizisi
const frontendSorular = [
  { soru: "React'te bir component ne zaman yeniden render edilir?", secenekler: ["A) State veya props değiştiğinde", "B) Sadece props değiştiğinde", "C) Sadece state değiştiğinde", "D) Component mount olduğunda"], dogru: "A" },
  { soru: "Vue.js'de 'v-for' direktifi ne için kullanılır?", secenekler: ["A) Liste render etmek", "B) Koşullu render", "C) Event binding", "D) Two-way binding"], dogru: "A" },
  { soru: "Angular'da servisler ne için kullanılır?", secenekler: ["A) Dependency Injection", "B) Template oluşturma", "C) Routing", "D) Form validation"], dogru: "A" },
  { soru: "React Hooks nedir?", secenekler: ["A) Fonksiyonel componentlerde state yönetimi", "B) Class componentler", "C) Routing sistemi", "D) Build tool"], dogru: "A" },
  { soru: "Vue.js'de 'computed' özellikleri ne işe yarar?", secenekler: ["A) Reaktif veri işleme", "B) DOM manipülasyonu", "C) HTTP istekleri", "D) Form validation"], dogru: "A" },
  { soru: "React Context API ne için kullanılır?", secenekler: ["A) Global state yönetimi", "B) Routing", "C) Form handling", "D) API calls"], dogru: "A" },
  { soru: "Angular'da NgModule nedir?", secenekler: ["A) Modül organizasyonu", "B) Component tanımı", "C) Service tanımı", "D) Directive tanımı"], dogru: "A" },
  { soru: "Vue.js'de 'v-model' direktifi ne için kullanılır?", secenekler: ["A) Two-way data binding", "B) Event handling", "C) Conditional rendering", "D) List rendering"], dogru: "A" },
  { soru: "Redux ne için kullanılır?", secenekler: ["A) State management", "B) Routing", "C) API calls", "D) Form validation"], dogru: "A" },
  { soru: "Angular'da RxJS ne için kullanılır?", secenekler: ["A) Reactive programming", "B) Template syntax", "C) Form handling", "D) Routing"], dogru: "A" },
  { soru: "Vue.js'de 'v-if' direktifi ne için kullanılır?", secenekler: ["A) Koşullu render", "B) Liste render", "C) Event binding", "D) Style binding"], dogru: "A" },
  { soru: "React'te useEffect Hook'u ne için kullanılır?", secenekler: ["A) Side effects yönetimi", "B) State yönetimi", "C) Prop drilling", "D) Event handling"], dogru: "A" },
  { soru: "Angular'da NgRx ne için kullanılır?", secenekler: ["A) State management", "B) Form validation", "C) Routing", "D) HTTP calls"], dogru: "A" },
  { soru: "Vue.js'de 'v-bind' direktifi ne için kullanılır?", secenekler: ["A) Attribute binding", "B) Event handling", "C) Form validation", "D) List rendering"], dogru: "A" },
  { soru: "React'te useCallback Hook'u ne için kullanılır?", secenekler: ["A) Memoized callback", "B) State management", "C) Side effects", "D) Context API"], dogru: "A" }
];

// Frontend Frameworks Denemesi Giriş GET
app.get('/denemeler/frontend/giris', (req, res) => {
    res.render('denemeler/frontend-giris');
});

app.post('/denemeler/frontend/giris', (req, res) => {
    const { ad, soyad, okulno } = req.body;
    req.session.frontend_kullanici = { ad, soyad, okulno };
    res.json({ success: true });
});

app.get('/denemeler/frontend', (req, res) => {
    if (!req.session.frontend_kullanici) {
        return res.redirect('/denemeler/frontend/giris');
    }

    let s = parseInt(req.query.s) || 1;
    if (s < 1) s = 1;
    if (s > frontendSorular.length) s = frontendSorular.length;
    const soru = frontendSorular[s-1];
    res.render('denemeler/frontend-sinav', {
        soruNo: s,
        toplam: frontendSorular.length,
        soru: soru.soru,
        secenekler: soru.secenekler,
        frontendSorular: frontendSorular,
        kullanici: req.session.frontend_kullanici
    });
});

// Frontend Frameworks Sonuçları
const frontendSonuclar = [];

app.get('/denemeler/frontend/sonuc', (req, res) => {
    const { ad, soyad, okulno, dogru, yanlis, oran } = req.query;
    if (ad && soyad && okulno && dogru && yanlis && oran) {
        const index = frontendSonuclar.findIndex(k => k.okulno === okulno);
        if (index !== -1) {
            frontendSonuclar.splice(index, 1);
        }
        frontendSonuclar.push({ 
            ad, 
            soyad, 
            okulno, 
            dogru: Number(dogru), 
            yanlis: Number(yanlis), 
            oran: Number(oran) 
        });
    }
    const sirali = frontendSonuclar.slice().sort((a, b) => b.oran - a.oran);
    res.render('denemeler/frontend-sonuc', { katilimcilar: sirali });
});

// Güvenlik ve DevOps Denemesi
app.get('/denemeler/guvenlik-devops', (req, res) => {
    res.render('guvenlik-devops');
});

// Güvenlik ve DevOps Denemesi
app.get('/denemeler/guvenlik-devops/giris', (req, res) => {
    res.render('denemeler/guvenlik-devops-giris');
});

app.post('/denemeler/guvenlik-devops/giris', (req, res) => {
    const { ad, soyad, okulno } = req.body;
    req.session.guvenlik_devops_kullanici = { ad, soyad, okulno };
    res.json({ success: true });
});

app.get('/denemeler/guvenlik-devops', (req, res) => {
    // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
    if (!req.session.guvenlik_devops_kullanici) {
        return res.redirect('/denemeler/guvenlik-devops/giris');
    }
    res.render('guvenlik-devops', { kullanici: req.session.guvenlik_devops_kullanici });
});

// Güvenlik ve DevOps Sonuçları
const guvenlikDevopsSonuclar = [];

app.get('/denemeler/guvenlik-devops/sonuc', (req, res) => {
    const { ad, soyad, okulno, dogru, yanlis, oran } = req.query;
    if (ad && soyad && okulno && dogru && yanlis && oran) {
        const index = guvenlikDevopsSonuclar.findIndex(k => k.okulno === okulno);
        if (index !== -1) {
            guvenlikDevopsSonuclar.splice(index, 1);
        }
        guvenlikDevopsSonuclar.push({ 
            ad, 
            soyad, 
            okulno, 
            dogru: Number(dogru), 
            yanlis: Number(yanlis), 
            oran: Number(oran) 
        });
    }
    const sirali = guvenlikDevopsSonuclar.slice().sort((a, b) => b.oran - a.oran);
    res.render('denemeler/guvenlik-devops-sonuc', { katilimcilar: sirali });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
}); 