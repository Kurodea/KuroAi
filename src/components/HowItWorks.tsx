import React from 'react';
import { MessageSquare, Brain, CheckCircle } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "Sorunuzu Sorun",
      description: "Hukuki sorunuzu detaylı bir şekilde platformumuza yazın"
    },
    {
      icon: Brain,
      title: "AI Analiz Eder",
      description: "Yapay zeka teknolojimiz sorunuzu analiz eder ve en uygun çözümü bulur"
    },
    {
      icon: CheckCircle,
      title: "Çözüm Alın",
      description: "Profesyonel ve detaylı hukuki çözümünüzü anında alın"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Nasıl Çalışır?</h2>
          <p className="text-xl text-gray-600">3 basit adımda hukuki desteğe ulaşın</p>
        </div>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                  <div className="bg-black text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-gray-300"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;