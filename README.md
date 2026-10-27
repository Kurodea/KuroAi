# AI Destekli Hukuk Danışmanı ve Avukat Eşleştirme Platformu
Kullanıcıların hukuki konularda yapay zekadan anlık bilgi almasını sağlayan ve sorunun uzmanlık alanına göre platforma kayıtlı avukatları akıllı bir şekilde öneren web uygulaması.

Öne Çıkan Özellikler:
AI Destekli Hukuk Asistanı: Kullanıcı sorularını analiz ederek mevzuat ve hukuki süreçler hakkında rehberlik sunar.
Akıllı Avukat Öneri Sistemi: Yapay zeka, kullanıcının ihtiyacını analiz ederek ilgili uzmanlık alanına (Ceza, Aile, İş Hukuku vb.) sahip avukatları konuşma sırasında otomatik olarak önerir.
Avukat Yönetim Paneli: Sisteme uzmanlık alanlarına göre yeni avukat profilleri eklenebilir ve yönetilebilir.

Proje Önizlemesi:----


**Teknolojiler ve Mimari**
 projenin geliştirilmesinde kullanılan ana diller, çatılar ve yardımcı kütüphaneler:

* **JavaScript (Node.js):** Backend tarafında sunucu mantığını yürütmek, Express.js ile API rotalarını oluşturmak, veritabanı bağlantılarını kurmak ve Gemini yapay zeka entegrasyonunu sağlamak için kullanıldı.
* **TypeScript:** Frontend tarafında React component'lerini yazarken veri tiplerini (`Message`, `ChatHistoryItem` vb.) güvenli bir şekilde tanımlamak için kullanıldı.
* **HTML5 & CSS3 (Tailwind CSS):** Kullanıcı arayüzünün (`ChatPage`) görsel düzenini, responsive yapısını ve stillerini oluşturmak için kullanıldı.
* **JSON:** Backend ile frontend arasında haberleşme verisi göndermek ve ayar dosyalarını yapılandırmak için kullanıldı.

**Yardımcı Kütüphane & Teknolojiler**

* **React & React Router (React.js):** Frontend arayüz mimarisi ve sayfalar arası yönlendirme için.
* **MongoDB & Mongoose:** Veritabanı ve veri modelleri (`User`, `Chat`, `Lawyer`) için.
* **Express.js:** Node.js backend çatısı olarak.
* **Google GenAI SDK:** Gemini 2.5 Flash yapay zeka modelini projeye bağlamak için.

Not: Bu platform yalnızca bilgilendirme ve yönlendirme amacıyla geliştirilmiş bir demo projesidir. Üretilen yanıtlar resmi hukuki tavsiye niteliği taşımaz.


