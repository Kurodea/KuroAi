import React, { Suspense } from 'react';
import { Bot } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LazyAuthModal = React.lazy(() => import('./AuthModal'));

const Hero: React.FC = () => {
  const { user } = useAuth();
  const [authModal, setAuthModal] = React.useState<{
    isOpen: boolean;
    mode: 'login' | 'register';
  }>({
    isOpen: false,
    mode: 'login'
  });

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthModal({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  const handleStartClick = () => {
    if (user) {
      // Giriş yapılmışsa ChatPage'e yönlendir
      window.location.href = '/chat';
    } else {
      // Giriş yapılmamışsa login modal'ı aç
      openAuthModal('login');
    }
  };

  return (
    <>
      <section id="home" className="pt-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-black text-white p-4 rounded-full">
                <Bot className="h-12 w-12" />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
              Yapay Zeka ile
              <br />
              <span className="text-gray-600">Hukuk Danışmanlığı</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              7/24 erişilebilir AI destekli hukuk danışmanınız. Hızlı, güvenilir ve 
              profesyonel hukuki destek alın.
            </p>

            <div className="flex justify-center">
              <button 
                onClick={handleStartClick}
                className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors text-lg"
              >
                Hemen Başla
              </button>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-black mb-2">24/7</div>
                <div className="text-gray-600">Kesintisiz Hizmet</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black mb-2">10K+</div>
                <div className="text-gray-600">Memnun Kullanıcı</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black mb-2">99%</div>
                <div className="text-gray-600">Doğruluk Oranı</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AuthModal lazy yükleniyor */}
      <Suspense fallback={null}>
        <LazyAuthModal
          isOpen={authModal.isOpen}
          onClose={closeAuthModal}
          initialMode={authModal.mode}
        />
      </Suspense>
    </>
  );
};

export default Hero;
