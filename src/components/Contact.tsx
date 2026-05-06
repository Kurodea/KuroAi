import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be implemented with backend
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">İletişime Geçin</h2>
          <p className="text-xl text-gray-600">
            Sorularınız için bizimle iletişime geçmekten çekinmeyin
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-black mb-6">Bize Ulaşın</h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-black text-white p-3 rounded-lg">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold text-black">E-posta</div>
                  <div className="text-gray-600">info@hukukai.com</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-black text-white p-3 rounded-lg">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold text-black">Telefon</div>
                  <div className="text-gray-600">+90 (212) 555 0123</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-black text-white p-3 rounded-lg">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold text-black">Adres</div>
                  <div className="text-gray-600">İstanbul, Türkiye</div>
                </div>
              </div>
            </div>
            
            {/* Harita */}
            <div className="mt-8">
              <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.2441!2d29.1174!3d41.0082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9be6c7b2c63%3A0x8b2b2b2b2b2b2b2b!2sMadenler%2C%20%C3%9Csk%C3%BCdar%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-72"
                ></iframe>
              </div>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-black mb-2">
                  Mesaj
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Mesaj Gönder</span>
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;