import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, ArrowLeft, Send, Bot, User } from 'lucide-react';

type Message = {
  role: 'user' | 'bot';
  text: string;
};

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const res = await fetch('http://localhost:8000/sor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) throw new Error('Sunucu hatası');

      const data = await res.json();
      const botMessage: Message = {
        role: 'bot',
        text: data?.cevap || 'Yanıt alınamadı.',
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: 'bot', text: 'Sunucuya ulaşılamadı. Lütfen tekrar deneyin.' },
      ]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Scale className="h-8 w-8 text-black" />
            <div>
              <h1 className="text-2xl font-bold text-black">HukukAI</h1>
              <p className="text-sm text-gray-600">AI Hukuk Danışmanı</p>
            </div>
          </div>
          <button
            className="flex items-center space-x-2 text-gray-700 hover:text-black transition-colors"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Ana Sayfa</span>
          </button>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-50 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Bot className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                HukukAI'ya Hoş Geldiniz
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Hukuki sorularınızı sorun, yapay zeka destekli danışmanınız size yardımcı olsun.
              </p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 ${
                  msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  msg.role === 'user' 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {msg.role === 'user' ? (
                    <User className="h-5 w-5" />
                  ) : (
                    <Bot className="h-5 w-5" />
                  )}
                </div>
                <div className={`max-w-2xl px-4 py-3 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-black text-white rounded-br-md'
                    : 'bg-gray-50 text-gray-800 rounded-bl-md'
                }`}>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-6 bg-white">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Hukuki sorunuzu detaylı bir şekilde yazın..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-2">
                Enter ile gönder, Shift+Enter ile yeni satır
              </p>
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-black text-white p-3 rounded-xl hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;