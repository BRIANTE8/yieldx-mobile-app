'use client';

import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Send,
  Upload,
  Zap,
  Image as ImageIcon,
  MessageCircle,
  Leaf,
  Bug,
  TrendingUp,
  BookOpen,
  Mic,
  Volume2,
  Square,
  Loader,
  X,
} from 'lucide-react';
import Image from 'next/image';

interface AIAssistantProps {
  userRole: 'farmer' | 'seller' | 'farm-head';
}

type SelectedCrop = 'Rice' | 'Wheat' | 'Corn' | null;

export default function AIAssistant({ userRole }: AIAssistantProps) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: 'Hello! I\'m your AI farming assistant. I can help you with pest identification, crop recommendations, and market insights. You can type or use voice to communicate with me. How can I help you today?',
      timestamp: new Date(),
      hasVoice: true,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'pest' | 'crop' | 'market'>('chat');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<SelectedCrop>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        // Mock transcription - in production would use speech-to-text API
        const transcribedText = 'How should I manage nitrogen levels for my rice crop?';
        handleSendMessage(transcribedText);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Please enable microphone access');
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const playVoiceResponse = (messageId: number) => {
    setIsSpeaking(true);
    // Mock text-to-speech
    setTimeout(() => setIsSpeaking(false), 3000);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: text,
      timestamp: new Date(),
      hasVoice: false,
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsProcessing(true);

    // Mock assistant response
    setTimeout(() => {
      const assistantMessage = {
        id: messages.length + 2,
        sender: 'assistant',
        text: 'Based on your Rice crop and current soil conditions (N-level: 45 ppm), I recommend applying 80 kg/hectare of urea in 2 splits. First application should be 30 days after transplanting, second at 45-50 days. This will ensure optimal nitrogen availability during the critical growth phase. Also monitor for high humidity as Rice Blast disease risk is elevated in current weather conditions.',
        timestamp: new Date(),
        hasVoice: true,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 1000);
  };

  const mockCropAdvice = [
    { 
      title: 'Nitrogen Management', 
      advice: 'Current soil N-level: 45 ppm. Apply 80 kg/hectare urea in 2 splits for optimal growth',
      urgency: 'high',
      days: 'Apply within 3 days',
      image: '🌾',
      details: 'Split application improves nitrogen uptake efficiency and reduces loss through leaching.',
    },
    { 
      title: 'Disease Prevention - Rice Blast', 
      advice: 'High humidity detected. Preventive spray with tricyclazole @ 0.6g/L recommended',
      urgency: 'high',
      days: 'Apply immediately',
      image: '🔬',
      details: 'Early application prevents spore germination. Repeat application after 10-12 days if rains continue.',
    },
    { 
      title: 'Harvest Optimization', 
      advice: 'Grain moisture at 20%. Optimal harvest at 18-20% MC. Wait 4-5 days for peak quality',
      urgency: 'medium',
      days: 'Harvest in 4-5 days',
      image: '⏰',
      details: 'Harvesting at optimal moisture reduces grain breakage and increases market value by 8-12%.',
    },
    { 
      title: 'Irrigation Scheduling', 
      advice: 'Soil moisture at 35%. ET rate is 5.2mm/day. Irrigate with 50mm to field capacity',
      urgency: 'medium',
      days: 'Water on Day 3',
      image: '💧',
      details: 'Reduce irrigation if rainfall expected. Monitor field for water logging to prevent root rot.',
    },
    { 
      title: 'Micronutrient Deficiency Alert', 
      advice: 'Zinc deficiency symptoms detected. Apply ZnSO4 @ 25kg/ha + citric acid @ 6.25kg/ha',
      urgency: 'medium',
      days: 'Apply in 5 days',
      image: '⛏️',
      details: 'Foliar spray gives faster results than soil application. Add sticker to improve leaf coverage.',
    },
    { 
      title: 'Integrated Pest Management', 
      advice: 'Pest count: 2.5 insects/plant. Deploy light trap. Spray cypermethrin 10% SC @ 2ml/L',
      urgency: 'high',
      days: 'Action required',
      image: '🦟',
      details: 'Light traps attract and control airborne pests. Spray during cool hours (6-8 AM or 4-6 PM).',
    },
  ];

  const mockMarketInsights = [
    { crop: 'Rice', currentPrice: '₹450/kg', trend: '↑ 5% in 7 days', demand: 'High', image: '🌾' },
    { crop: 'Wheat', currentPrice: '₹380/kg', trend: '→ 0% in 7 days', demand: 'Medium', image: '🌾' },
    { crop: 'Corn', currentPrice: '₹320/kg', trend: '↑ 8% in 7 days', demand: 'Very High', image: '🌽' },
  ];

  const cropDetails: Record<string, any> = {
    'Rice': {
      currentPrice: '₹450/kg',
      trend: '↑ 5% in 7 days',
      demand: 'High',
      emoji: '🌾',
      description: 'Premium Basmati and Non-Basmati varieties in high demand',
      sections: [
        {
          title: 'Market Opportunities',
          items: [
            'Bulk buyers from Delhi INA Market need 50 tons/week',
            'Export quality Basmati rice commands 40% premium',
            'Direct wholesale contracts available with minimum 10 tons',
            'Government procurement at ₹425/kg for fair quality',
          ]
        },
        {
          title: 'Buyers Looking For You',
          items: [
            'Fresh Produce Hub (Delhi Central) - Rating: 4.8/5 - Need 250kg/week',
            'Premium Foods Trading - Rating: 4.9/5 - Need 500kg/week',
            'Organic Markets India - Rating: 4.7/5 - Need Organic variety',
          ]
        },
        {
          title: 'Best Selling Varieties',
          items: [
            'Basmati 1121: ₹600-700/kg (Premium)',
            'Basmati 1509: ₹550-650/kg (Standard)',
            'Sona Masuri: ₹420-480/kg (Non-Basmati)',
            'Ponni: ₹380-420/kg (South Indian)',
          ]
        },
        {
          title: 'Recommendations',
          items: [
            'Store in cool, dry place to maintain quality',
            'Clean and grade before selling for better prices',
            'Contact 3-4 market heads for volume contracts',
            'Consider organic certification for 30% price premium',
            'Minimum 500kg for bulk buyer contracts',
          ]
        },
        {
          title: 'Next Steps',
          items: [
            '📞 Call: +91 98765 43210 (Fresh Produce Hub)',
            '📞 Call: +91 99876 54321 (Golden Market Trading)',
            '📲 WhatsApp: Buyer details available in Contacts',
            '💰 Expected Revenue: ₹2,25,000 from 500kg sale',
          ]
        }
      ]
    },
    'Wheat': {
      currentPrice: '₹380/kg',
      trend: '→ 0% in 7 days',
      demand: 'Medium',
      emoji: '🌾',
      description: 'Steady demand for quality wheat flour and grains',
      sections: [
        {
          title: 'Market Opportunities',
          items: [
            'Flour mills need 20-30 tons/month directly',
            'Wholesale Grains Corp requires 100kg minimum orders',
            'Bakery chains looking for bulk wheat supplies',
            'Animal feed manufacturers offer stable prices',
          ]
        },
        {
          title: 'Buyers Looking For You',
          items: [
            'Golden Market Trading - Rating: 4.9/5 - Need 300kg/week',
            'Wholesale Grains Corp - Rating: 4.7/5 - Need 200kg/week',
            'Flour Mills Association - Multiple buyers linked',
          ]
        },
        {
          title: 'Best Selling Varieties',
          items: [
            'HD2329 (High Yield): ₹410-450/kg',
            'PBW343 (Quality): ₹390-430/kg',
            'Lok1 (Protein Rich): ₹420-460/kg',
            'UP2425 (Local Favorite): ₹380-420/kg',
          ]
        },
        {
          title: 'Quality Parameters',
          items: [
            'Protein content: 12-14% for premium rates',
            'Moisture: Below 10% essential for storage',
            'Foreign matter: Less than 1% acceptable',
            'Test weight: 75-80 kg/hectoliter for quality',
          ]
        },
        {
          title: 'Next Steps',
          items: [
            '📞 Contact: +91 97654 32109 (Wholesale Grains)',
            '🏭 Direct mill contracts (300+ tons annually)',
            '💰 Expected Revenue: ₹2,28,000 from 600kg sale',
            '⏰ Peak demand: September-November (harvest season)',
          ]
        }
      ]
    },
    'Corn': {
      currentPrice: '₹320/kg',
      trend: '↑ 8% in 7 days',
      demand: 'Very High',
      emoji: '🌽',
      description: 'Soaring demand for corn supply across multiple industries',
      sections: [
        {
          title: 'Market Opportunities',
          items: [
            'Feed mills buying 50+ tons/month at ₹320-350/kg',
            'Starch factories offering long-term contracts',
            'Biofuel producers seeking large volumes',
            'Premium pricing for sweet corn variety: ₹500+/kg',
          ]
        },
        {
          title: 'Urgent Buyer Demands',
          items: [
            '🔴 URGENT: Cargill Feed Mill needs 25 tons immediately',
            '🔴 URGENT: Dow Chemicals needs 50 tons for starch',
            '🟡 Sweet corn demand from exporters (monthly)',
            '🟡 Hybrid corn for seeds companies needed',
          ]
        },
        {
          title: 'Premium Varieties & Prices',
          items: [
            'Sweet Corn: ₹600-800/kg (Export quality)',
            'HC-136 Hybrid: ₹400-450/kg (High yield)',
            'HQPM-1: ₹380-420/kg (Quality protein)',
            'Local Yellow: ₹320-350/kg (Feed grade)',
          ]
        },
        {
          title: 'Why Corn Market is Hot',
          items: [
            'Global corn prices up 15% in last quarter',
            'Livestock industry expansion driving demand',
            'Alternative energy sector growing rapidly',
            'Poultry farms need consistent supply',
            'Food processing industry expansion',
          ]
        },
        {
          title: 'Immediate Actions',
          items: [
            '⚡ URGENT: Contact Cargill Feed Mill TODAY',
            '📞 Call: +91 XXXX XXXXX for bulk contract',
            '💰 Expected Revenue: ₹3,20,000 from 1000kg',
            '🎯 Lock in prices now - 8% growth continuing!',
          ]
        }
      ]
    }
  };

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {[
          { id: 'chat', label: 'Chat', icon: MessageCircle },
          { id: 'pest', label: 'Pest Detection', icon: Bug },
          { id: 'crop', label: 'Crop Advice', icon: Leaf },
          { id: 'market', label: 'Market Insights', icon: TrendingUp },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Chat Tab with Voice */}
      {activeTab === 'chat' && (
        <Card className="p-6 h-[500px] flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <div className="flex items-center justify-between gap-2 mt-2">
                    <span className="text-xs opacity-70">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {msg.hasVoice && msg.sender === 'assistant' && (
                      <button
                        onClick={() => playVoiceResponse(msg.id)}
                        className="ml-2 p-1 hover:bg-white hover:bg-opacity-20 rounded transition"
                        title="Play voice response"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Processing your question...</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Type your question or use voice..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="h-10"
              />
              <Button
                onClick={() => handleSendMessage()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              {!isRecording ? (
                <Button
                  onClick={startVoiceRecording}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white gap-2"
                >
                  <Mic className="w-4 h-4" />
                  Start Voice Input
                </Button>
              ) : (
                <Button
                  onClick={stopVoiceRecording}
                  className="flex-1 bg-red-700 hover:bg-red-800 text-white gap-2 animate-pulse"
                >
                  <Square className="w-4 h-4" />
                  Stop Recording
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Pest Detection Tab */}
      {activeTab === 'pest' && (
        <div className="space-y-4">
          <Card className="p-6 border-dashed border-2 border-gray-300 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setUploadedImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              id="pest-upload"
            />
            <label htmlFor="pest-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="font-semibold text-gray-900 mb-1">Upload crop image</p>
              <p className="text-sm text-gray-600">Click or drag to upload photo for pest detection</p>
            </label>
          </Card>

          {uploadedImage && (
            <Card className="p-6 space-y-4">
              <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={uploadedImage}
                  alt="Uploaded crop"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-4">
                  <Bug className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-orange-900 mb-1">
                      {mockPestDetectionResults.disease}
                    </h4>
                    <p className="text-sm text-orange-800 mb-2">
                      Confidence: {mockPestDetectionResults.confidence}%
                    </p>
                    <p className={`text-sm font-semibold mb-3 ${
                      mockPestDetectionResults.severity === 'High' ? 'text-red-700' :
                      mockPestDetectionResults.severity === 'Medium' ? 'text-yellow-700' :
                      'text-green-700'
                    }`}>
                      Severity: {mockPestDetectionResults.severity}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-white p-3 rounded">
                    <p className="text-xs text-gray-600 mb-1">Treatment</p>
                    <p className="text-sm font-semibold text-gray-900">{mockPestDetectionResults.treatment}</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <p className="text-xs text-gray-600 mb-1">Prevention</p>
                    <p className="text-sm font-semibold text-gray-900">{mockPestDetectionResults.prevention}</p>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Get Detailed Analysis
              </Button>
            </Card>
          )}
        </div>
      )}

      {/* Crop Advice Tab with Images */}
      {activeTab === 'crop' && (
        <div className="space-y-4">
          {mockCropAdvice.map((advice, idx) => (
            <Card key={idx} className="p-4 border-green-100 hover:shadow-lg transition overflow-hidden">
              <div className="flex gap-4">
                <div className="text-5xl flex-shrink-0">{advice.image}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-green-600" />
                      {advice.title}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      advice.urgency === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {advice.urgency.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{advice.advice}</p>
                  <p className="text-xs text-gray-600 mb-2 italic">{advice.details}</p>
                  <div className="flex gap-2 text-xs">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">⏱️ {advice.days}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Market Insights Tab */}
      {activeTab === 'market' && (
        <div className="space-y-3">
          {mockMarketInsights.map((market, idx) => (
            <Card key={idx} className="p-4 border-blue-100 hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">{market.image}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-900">{market.crop}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      market.demand === 'Very High' ? 'bg-red-100 text-red-700' :
                      market.demand === 'High' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {market.demand} Demand
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-bold text-green-600">{market.currentPrice}</p>
                    <p className={`text-sm font-semibold ${
                      market.trend.includes('↑') ? 'text-green-700' :
                      market.trend.includes('↓') ? 'text-red-700' :
                      'text-gray-700'
                    }`}>
                      Price Trend: {market.trend}
                    </p>
                  </div>
                  <Button 
                    onClick={() => setSelectedCrop(market.crop as SelectedCrop)}
                    className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs"
                  >
                    View Details & Opportunities
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Crop Details Modal */}
      {selectedCrop && cropDetails[selectedCrop] && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 sticky top-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{cropDetails[selectedCrop].emoji}</span>
                  <div>
                    <h2 className="text-3xl font-bold">{selectedCrop}</h2>
                    <p className="text-blue-100 text-sm mt-1">{cropDetails[selectedCrop].description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCrop(null)}
                  className="p-2 hover:bg-blue-500 rounded-lg transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-xs text-gray-600 font-semibold mb-1">CURRENT PRICE</p>
                  <p className="text-2xl font-bold text-green-700">{cropDetails[selectedCrop].currentPrice}</p>
                </div>
                <div className={`p-4 rounded-lg border ${
                  cropDetails[selectedCrop].trend.includes('↑') ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <p className="text-xs text-gray-600 font-semibold mb-1">PRICE TREND</p>
                  <p className={`text-lg font-bold ${cropDetails[selectedCrop].trend.includes('↑') ? 'text-green-700' : 'text-yellow-700'}`}>
                    {cropDetails[selectedCrop].trend}
                  </p>
                </div>
                <div className={`p-4 rounded-lg border ${
                  cropDetails[selectedCrop].demand === 'Very High' ? 'bg-red-50 border-red-200' :
                  cropDetails[selectedCrop].demand === 'High' ? 'bg-orange-50 border-orange-200' :
                  'bg-yellow-50 border-yellow-200'
                }`}>
                  <p className="text-xs text-gray-600 font-semibold mb-1">MARKET DEMAND</p>
                  <p className={`text-lg font-bold ${
                    cropDetails[selectedCrop].demand === 'Very High' ? 'text-red-700' :
                    cropDetails[selectedCrop].demand === 'High' ? 'text-orange-700' :
                    'text-yellow-700'
                  }`}>
                    {cropDetails[selectedCrop].demand}
                  </p>
                </div>
              </div>

              {/* Detailed Sections */}
              {cropDetails[selectedCrop].sections.map((section: any, idx: number) => (
                <div key={idx}>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-1 h-7 bg-blue-600 rounded"></span>
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.items.map((item: string, itemIdx: number) => (
                      <li key={itemIdx} className="flex gap-3 text-gray-700 text-sm">
                        <span className="text-blue-600 font-bold min-w-fit">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Action Buttons */}
              <div className="pt-6 border-t border-gray-200">
                <Button
                  onClick={() => setSelectedCrop(null)}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3"
                >
                  Close
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
