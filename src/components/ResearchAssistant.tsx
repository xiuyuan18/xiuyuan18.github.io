import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { generateResearchResponse } from '../services/geminiService';
import { DATA } from '../constants';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const ResearchAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: `Hi! I'm an AI assistant trained on ${DATA.profile.name.split(' ')[1]}'s research. Ask me anything about their publications or bio!` }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await generateResearchResponse(userMsg);

    setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    setLoading(false);
  };

  // Only show if API Key is presumably available (or just handle the error gracefully)
  // We can't check process.env in browser runtime effectively without configured build tool, 
  // but assuming the user will configure it.

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-academic-800 text-white rounded-full shadow-xl hover:bg-academic-700 transition-all duration-300 z-40 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open Research Assistant"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 w-full max-w-[360px] bg-white rounded-2xl shadow-2xl border border-academic-200 z-50 transition-all duration-300 transform origin-bottom-right flex flex-col overflow-hidden
        ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-8 pointer-events-none'}`}
        style={{ height: '500px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-academic-800 text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot size={20} />
            <span className="font-medium text-sm">Research Assistant</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-academic-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user'
                    ? 'bg-academic-accent text-white rounded-br-none'
                    : 'bg-white border border-academic-200 text-academic-800 rounded-bl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-academic-200 p-3 rounded-2xl rounded-bl-none shadow-sm">
                <Loader2 size={16} className="animate-spin text-academic-400" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-academic-100">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about research..."
              className="w-full pl-4 pr-10 py-3 bg-academic-50 border border-academic-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-academic-accent/50 focus:border-academic-accent text-sm"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-2 top-2 p-1.5 bg-academic-800 text-white rounded-lg hover:bg-academic-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResearchAssistant;