import React from 'react';
import { Tag, FileText, Sparkles, Layers, Award } from 'lucide-react';

export default function StepProductDetails({ formData, setFormData, onNext }) {
  const categories = ['Gaming', 'Electronics', 'Luxury', 'Cameras', 'Collectibles'];

  const handleQuickPreset = (preset) => {
    if (preset === 'cyber') {
      setFormData(prev => ({
        ...prev,
        name: "NVIDIA RTX 5090 Liquid-Cooled Founder's Edition",
        category: "Gaming",
        brand: "NVIDIA Quantum Labs",
        description: "Zero-latency 32GB GDDR7 flagship GPU with bespoke custom acrylic distribution plate and dual 360mm radiator fittings. Factory sealed unit #007/500.",
        images: ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1200&q=80"]
      }));
    } else if (preset === 'watch') {
      setFormData(prev => ({
        ...prev,
        name: "Patek Philippe Grand Complications Celestial",
        category: "Luxury",
        brand: "Patek Philippe Genève",
        description: "44mm platinum masterpiece with nocturnal sky chart, phases and orbit of the moon, and celestial time indication. Complete with provenance certificate.",
        images: ["https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80"]
      }));
    } else if (preset === 'camera') {
      setFormData(prev => ({
        ...prev,
        name: "Leica M11 Monochrom 60MP Rangefinder",
        category: "Cameras",
        brand: "Leica Camera Wetzlar",
        description: "Dedicated black and white sensor producing unmatched light sensitivity and micro-contrast. Paired with Summilux-M 35mm f/1.4 ASPH lens.",
        images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80"]
      }));
    }
  };

  const isFormValid = formData.name.trim() !== '' && formData.description.trim() !== '' && formData.category !== '';

  return (
    <div className="space-y-6">
      
      {/* Quick Sample Presets Loader */}
      <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-slate-200">Test Autofill Presets:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleQuickPreset('cyber')}
            className="px-3 py-1 rounded-lg text-xs font-medium bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 transition-colors"
          >
            RTX 5090 Flagship
          </button>
          <button
            type="button"
            onClick={() => handleQuickPreset('watch')}
            className="px-3 py-1 rounded-lg text-xs font-medium bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 transition-colors"
          >
            Patek Celestial
          </button>
          <button
            type="button"
            onClick={() => handleQuickPreset('camera')}
            className="px-3 py-1 rounded-lg text-xs font-medium bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 transition-colors"
          >
            Leica M11 Pro
          </button>
        </div>
      </div>

      {/* Product Name */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-2">
          <Tag className="w-3.5 h-3.5 text-cyan-400" />
          Product Name <span className="text-rose-400">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Alienware M18 R2 Gaming Laptop or Rolex Cosmograph"
          className="w-full px-4 py-3.5 rounded-2xl glass-input text-sm font-medium focus:ring-2 focus:ring-cyan-400 placeholder:text-slate-500"
        />
      </div>

      {/* Category & Brand row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-2">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            Category <span className="text-rose-400">*</span>
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3.5 rounded-2xl glass-input text-sm font-medium focus:ring-2 focus:ring-cyan-400 appearance-none cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="bg-[#0b101c] text-white">
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-2">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            Brand / Manufacturer
          </label>
          <input
            type="text"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            placeholder="e.g. Alienware, Rolex, Sony, Apple"
            className="w-full px-4 py-3.5 rounded-2xl glass-input text-sm font-medium focus:ring-2 focus:ring-cyan-400 placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-2">
          <FileText className="w-3.5 h-3.5 text-cyan-400" />
          Product Description <span className="text-rose-400">*</span>
        </label>
        <textarea
          rows={4}
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Provide accurate details on specs, provenance, serial numbers, warranty, and included accessories..."
          className="w-full px-4 py-3 rounded-2xl glass-input text-sm font-medium focus:ring-2 focus:ring-cyan-400 placeholder:text-slate-500"
        />
        <p className="text-[11px] text-slate-400 mt-1">
          Detailed descriptions increase final closing bid values by up to 28%.
        </p>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-end pt-4 border-t border-white/10">
        <button
          type="button"
          disabled={!isFormValid}
          onClick={onNext}
          className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Next: Upload Images →
        </button>
      </div>

    </div>
  );
}
