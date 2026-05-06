import React from 'react';
import { Scale, Menu, X, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import ProfileDropdown from './ProfileDropdown';
import ProfileModal from './ProfileModal';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  const { user } = useAuth();
  const [authModal, setAuthModal] = React.useState<{
    isOpen: boolean;
    mode: 'login' | 'register';
  }>({
    isOpen: false,
    mode: 'login'
  });
  const [profileModal, setProfileModal] = React.useState(false);

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthModal({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  const openProfileModal = () => {
    setProfileModal(true);
  };

  const closeProfileModal = () => {
    setProfileModal(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Scale className="h-8 w-8 text-black" />
              <span className="text-2xl font-bold text-black">HukukAI</span>
            </Link>
            
            <nav className="hidden md:flex space-x-8 flex-1 justify-center">
              <a href="#home" className="text-gray-700 hover:text-black transition-colors">Ana Sayfa</a>
              <a href="#services" className="text-gray-700 hover:text-black transition-colors">Hizmetler</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-black transition-colors">Nasıl Çalışır</a>
              <a href="#contact" className="text-gray-700 hover:text-black transition-colors">İletişim</a>
            </nav>
            
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <Link 
                    to="/chat"
                    className="flex items-center space-x-2 text-gray-700 hover:text-black transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Sohbet</span>
                  </Link>
                  <ProfileDropdown onOpenProfile={openProfileModal} />
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => openAuthModal('login')}
                    className="text-gray-700 hover:text-black transition-colors"
                  >
                    Giriş Yap
                  </button>
                  <button 
                    onClick={() => openAuthModal('register')}
                    className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Ücretsiz Dene
                  </button>
                </div>
              )}
            </div>
            
            <button 
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-4">
              <a href="#home" className="block text-gray-700 hover:text-black">Ana Sayfa</a>
              <a href="#services" className="block text-gray-700 hover:text-black">Hizmetler</a>
              <a href="#how-it-works" className="block text-gray-700 hover:text-black">Nasıl Çalışır</a>
              <a href="#contact" className="block text-gray-700 hover:text-black">İletişim</a>
              {!user && (
                <div className="pt-4 border-t border-gray-200">
                  {user && (
                    <Link 
                      to="/chat"
                      className="block w-full text-left text-gray-700 hover:text-black mb-2"
                    >
                      Sohbet
                    </Link>
                  )}
                  <button 
                    onClick={() => openAuthModal('login')}
                    className="block w-full text-left text-gray-700 hover:text-black mb-2"
                  >
                    Giriş Yap
                  </button>
                  <button 
                    onClick={() => openAuthModal('register')}
                    className="w-full bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Ücretsiz Dene
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        initialMode={authModal.mode}
      />

      <ProfileModal
        isOpen={profileModal}
        onClose={closeProfileModal}
      />
    </>
  );
};

export default Header;