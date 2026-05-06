import React from 'react';
import { Scale } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Scale className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold">HukukAI</span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Yapay zeka teknolojisi ile güçlendirilmiş hukuk danışmanlığı platformu. 
              Hızlı, güvenilir ve profesyonel hukuki destek.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Hizmetler</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Sözleşme Analizi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hukuki Danışmanlık</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Yasal Uyumluluk</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Döküman İnceleme</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Şirket</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Hakkımızda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kariyer</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">İletişim</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 HukukAI. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;