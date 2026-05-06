import React from 'react';
import { FileText, Users, Shield, Clock } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: FileText,
      title: "Sözleşme Analizi",
      description: "Sözleşmelerinizi AI ile analiz edin, riskli maddeleri tespit edin ve öneriler alın."
    },
    {
      icon: Users,
      title: "Hukuki Danışmanlık",
      description: "Kişisel ve kurumsal hukuki sorularınıza 7/24 profesyonel yanıtlar alın."
    },
    {
      icon: Shield,
      title: "Yasal Uyumluluk",
      description: "İşletmenizin yasal gerekliliklere uygunluğunu kontrol edin ve eksikleri tespit edin."
    },
    {
      icon: Clock,
      title: "Hızlı Çözüm",
      description: "Saniyeler içinde hukuki sorularınıza detaylı ve güvenilir yanıtlar alın."
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Hizmetlerimiz</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI teknolojisi ile güçlendirilmiş kapsamlı hukuk hizmetleri
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-gray-50 group-hover:bg-black group-hover:text-white p-6 rounded-2xl mb-4 transition-colors">
                <service.icon className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-300 transition-colors leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;