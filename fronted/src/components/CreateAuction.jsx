import React, { useState } from 'react';
import { 
  Rocket, 
  CheckCircle2, 
  Layers, 
  Image as ImageIcon, 
  Sliders, 
  Eye, 
  ArrowLeft, 
  Sparkles, 
  LayoutDashboard,
  PlusCircle,
  ShieldCheck
} from 'lucide-react';
import { useAuction } from '../context/AuctionContext';
import StepProductDetails from './seller/StepProductDetails';
import StepImageUpload from './seller/StepImageUpload';
import StepAuctionSettings from './seller/StepAuctionSettings';
import StepPreviewPublish from './seller/StepPreviewPublish';
import SellerDashboard from './seller/SellerDashboard';
import RealtimeFlowDiagram from './seller/RealtimeFlowDiagram';

export default function CreateAuction() {
  const { addCustomAuction, setCurrentView } = useAuction();
  
  // Tab within seller portal: 'create' | 'dashboard'
  const [sellerTab, setSellerTab] = useState('create');
  const [currentStep, setCurrentStep] = useState(1);
  const [isPublishing, setIsPublishing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Gaming',
    brand: '',
    description: '',
    images: [],
    startingPrice: '1200',
    minIncrement: '50',
    duration: '24h',
    reservePrice: '1600'
  });

  const steps = [
    { num: 1, title: "Product Details", icon: Layers },
    { num: 2, title: "Upload Images", icon: ImageIcon },
    { num: 3, title: "Auction Settings", icon: Sliders },
    { num: 4, title: "Preview & Publish", icon: Eye },
  ];

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      addCustomAuction(formData);
      setIsPublishing(false);
      setSellerTab('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 relative overflow-hidden bg-radial-gradient">
      
      {/* Ambient background glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[750px] h-[500px] bg-gradient-to-r from-purple-600/15 via-blue-600/15 to-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Navigation Breadcrumb / Return CTA */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            type="button"
            onClick={() => {
              setCurrentView('marketplace');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
            <span>Return to Buyer Marketplace</span>
          </button>

          {/* Tab Pill Switcher (Create New vs Seller Dashboard) */}
          <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10">
            <button
              type="button"
              onClick={() => setSellerTab('create')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                sellerTab === 'create'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Create Auction</span>
            </button>
            <button
              type="button"
              onClick={() => setSellerTab('dashboard')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                sellerTab === 'dashboard'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Seller Dashboard</span>
            </button>
          </div>
        </div>

        {/* Header Hero for Seller Portal */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          
          {/* Future Expansion Badge requested by user */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 px-4 py-2 rounded-2xl glass-panel border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.2)]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-extrabold uppercase tracking-wider">
              <Rocket className="w-3.5 h-3.5 text-purple-400" />
              🚀 Future Expansion
            </span>
            <span className="text-xs text-slate-300 text-center sm:text-left leading-tight">
              BidSphere evolves from a buyer-only platform into a complete real-time auction ecosystem where verified users can create, manage, and monitor their own live auctions.
            </span>
          </div>

          {/* Title requested by user */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white pt-2">
            Launch Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Auction</span>
          </h1>

          {/* Subtitle requested by user */}
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            "Create a live auction in minutes and let thousands of buyers compete in real time."
          </p>

        </div>

        {/* Main Seller Body */}
        {sellerTab === 'create' ? (
          <div className="space-y-12">
            
            {/* Multi-Step Wizard Progress Bar */}
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {steps.map((s) => {
                  const Icon = s.icon;
                  const isCompleted = currentStep > s.num;
                  const isCurrent = currentStep === s.num;

                  return (
                    <button
                      key={s.num}
                      type="button"
                      onClick={() => {
                        // Allow jumping back to earlier steps
                        if (s.num < currentStep) setCurrentStep(s.num);
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                        isCurrent
                          ? 'bg-gradient-to-r from-cyan-950/50 to-blue-950/50 border-cyan-400/80 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                          : isCompleted
                          ? 'bg-white/[0.04] border-emerald-500/40 text-emerald-300'
                          : 'bg-white/[0.02] border-white/5 text-slate-500 hover:border-white/15'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                          isCurrent
                            ? 'bg-cyan-500 text-white shadow-md'
                            : isCompleted
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-white/5 text-slate-400'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : `0${s.num}`}
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 leading-tight">
                          Step {s.num}
                        </p>
                        <p className={`text-xs font-bold truncate ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                          {s.title}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step Form Container */}
            <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl glass-panel border border-white/10 shadow-2xl">
              {currentStep === 1 && (
                <StepProductDetails
                  formData={formData}
                  setFormData={setFormData}
                  onNext={() => setCurrentStep(2)}
                />
              )}

              {currentStep === 2 && (
                <StepImageUpload
                  formData={formData}
                  setFormData={setFormData}
                  onNext={() => setCurrentStep(3)}
                  onPrev={() => setCurrentStep(1)}
                />
              )}

              {currentStep === 3 && (
                <StepAuctionSettings
                  formData={formData}
                  setFormData={setFormData}
                  onNext={() => setCurrentStep(4)}
                  onPrev={() => setCurrentStep(2)}
                />
              )}

              {currentStep === 4 && (
                <StepPreviewPublish
                  formData={formData}
                  onPublish={handlePublish}
                  onPrev={() => setCurrentStep(3)}
                  isPublishing={isPublishing}
                />
              )}
            </div>

          </div>
        ) : (
          <SellerDashboard onCreateNew={() => { setSellerTab('create'); setCurrentStep(1); }} />
        )}

        {/* Real-Time Integration Flow Diagram Section */}
        <div className="mt-20">
          <RealtimeFlowDiagram />
        </div>

      </div>
    </div>
  );
}
