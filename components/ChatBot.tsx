import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_PRODUCTS } from '../constants';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Bonjour ! Je suis l'assistant Electro. Comment puis-je vous aider aujourd'hui ?", sender: 'bot' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const productContext = MOCK_PRODUCTS.map(p => `${p.name} (${p.price}€)`).join(', ');
    const context = `Produits disponibles: ${productContext}.`;

    let responseText = 'Une erreur est survenue.';
    try {
      const resp = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, context })
      });

      if (resp.ok) {
        const data = await resp.json();
        responseText = data.text || 'Je n\'ai pas compris votre demande.';
      } else {
        const err = await resp.json().catch(() => null);
        responseText = err?.error || `Erreur serveur (${resp.status})`;
      }
    } catch (err) {
      console.error('Fetch /api/generate error:', err);
      responseText = 'Erreur réseau. Veuillez réessayer.';
    }

    const botMsg: Message = { id: Date.now() + 1, text: responseText, sender: 'bot' };
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-xl z-40 transition-all duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 bg-secondary hover:bg-secondary/90 text-white'}`}
      >
        <MessageCircle size={32} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            {...{
              initial: { opacity: 0, y: 50, scale: 0.9 },
              animate: { opacity: 1, y: 0, scale: 1 },
              exit: { opacity: 0, y: 50, scale: 0.9 }
            } as any}
            className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold">Assistant Electro</h3>
                  <span className="text-xs text-white/80 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> En ligne
                  </span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded transition">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                    <Loader2 size={16} className="animate-spin text-primary" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Posez votre question..." 
                  className="flex-1 bg-gray-100 border-0 rounded-full px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};