# ifood Mobile App Clone

Bu proje, ifood uygulamasının profesyonel bir klonudur. React Native ve Expo kullanılarak geliştirilmiştir.

## 🚀 Özellikler

### ✅ Tamamlanan Özellikler
- **Splash Screen**: Uygulama başlangıç ekranı
- **Onboarding Flow**: Hoş geldin, izinler ve kimlik doğrulama seçimi
- **Konum İzinleri**: Konum ve bildirim izinleri yönetimi
- **Ana Sayfa**: Restoran listesi ve kategoriler
- **Tab Navigation**: Ana navigasyon yapısı
- **Profil Sayfası**: Kullanıcı profili ve ayarlar
- **State Management**: Zustand ile global state yönetimi

### 🔄 Geliştirilecek Özellikler
- Kimlik doğrulama ekranları (Login/Register)
- Restoran detay sayfaları
- Sipariş işlemleri
- Ödeme entegrasyonu
- Bildirim sistemi
- Arama fonksiyonu

## 🛠️ Teknolojiler

- **React Native**: 0.79.6
- **Expo**: 53.0.22
- **Expo Router**: 3.5.24
- **TypeScript**: 5.8.3
- **Zustand**: 4.5.7 (State Management)
- **React Native Vector Icons**: Icon kütüphanesi
- **Expo Linear Gradient**: Gradient efektleri
- **Expo Blur**: Blur efektleri
- **Expo Location**: Konum servisleri
- **Expo Notifications**: Bildirim servisleri

## 📁 Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir bileşenler
│   ├── ui/             # UI bileşenleri (Button, Card, vb.)
│   ├── common/         # Ortak bileşenler
│   └── forms/          # Form bileşenleri
├── screens/            # Ekran bileşenleri
│   ├── onboarding/     # Onboarding ekranları
│   ├── main/           # Ana ekranlar
│   └── auth/           # Kimlik doğrulama ekranları
├── constants/          # Sabitler (renkler, tipografi, boşluklar)
├── types/              # TypeScript tip tanımları
├── store/              # Zustand store'ları
├── services/           # API ve servis fonksiyonları
├── utils/              # Yardımcı fonksiyonlar
├── hooks/              # Custom React hooks
└── assets/             # Resimler, ikonlar, fontlar
```

## 🎨 Tasarım Sistemi

### Renkler
- **Primary**: #EA1D2C (ifood kırmızısı)
- **Secondary**: #FFC107 (Sarı)
- **Success**: #4CAF50 (Yeşil)
- **Error**: #F44336 (Kırmızı)

### Tipografi
- **Font Sizes**: XS(12) - 5XL(48)
- **Font Weights**: Light(300) - ExtraBold(800)
- **Line Heights**: Tight(1.2) - Loose(1.8)

### Boşluklar
- **Spacing**: XS(4) - 4XL(96)
- **Border Radius**: XS(4) - Full(9999)
- **Shadows**: SM, MD, LG gölge seviyeleri

## 🚀 Kurulum

1. **Bağımlılıkları yükleyin:**
```bash
npm install
```

2. **Uygulamayı başlatın:**
```bash
npm start
```

3. **Platform seçin:**
- iOS: `npm run ios`
- Android: `npm run android`
- Web: `npm run web`

## 📱 Ekranlar

### Onboarding Flow
1. **Splash Screen**: Uygulama başlangıç ekranı
2. **Welcome Screen**: Hoş geldin ve restoran örnekleri
3. **Permissions Screen**: Konum ve bildirim izinleri
4. **Auth Choice Screen**: Giriş/Kayıt seçimi

### Ana Ekranlar
1. **Home Screen**: Restoran listesi ve kategoriler
2. **Explore Screen**: Keşfet sayfası (geliştirilecek)
3. **Orders Screen**: Sipariş geçmişi
4. **Profile Screen**: Kullanıcı profili ve ayarlar

## 🔧 Geliştirme

### Yeni Ekran Ekleme
1. `src/screens/` altında uygun klasöre ekran dosyası oluşturun
2. `app/` altında route dosyası oluşturun
3. Layout dosyalarında route'u tanımlayın

### Yeni Bileşen Ekleme
1. `src/components/` altında uygun klasöre bileşen dosyası oluşturun
2. TypeScript tip tanımlarını ekleyin
3. Gerekirse constants dosyalarını güncelleyin

### State Management
- Zustand store'ları `src/store/` altında tanımlanır
- Selector hook'ları store dosyasında export edilir
- Bileşenlerde `useAppStore()` hook'u kullanılır

## 📄 Lisans

Bu proje eğitim amaçlı geliştirilmiştir. ifood markası ve tasarımı orijinal sahiplerine aittir.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

Proje hakkında sorularınız için issue açabilirsiniz.
