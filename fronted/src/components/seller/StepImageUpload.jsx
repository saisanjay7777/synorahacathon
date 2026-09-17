import React, { useState } from 'react';
import { UploadCloud, Image as ImageIcon, Trash2, Check, Sparkles, AlertCircle } from 'lucide-react';

export default function StepImageUpload({ formData, setFormData, onNext, onPrev }) {
  const [isDragging, setIsDragging] = useState(false);

  const samplePresets = [
    { label: "Flagship GPU", url: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1200&q=80" },
    { label: "Luxury Chrono", url: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80" },
    { label: "Cinema Camera", url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80" },
    { label: "Retro Synth / Rig", url: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80" }
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const processFiles = (files) => {
    const newUrls = [];
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      newUrls.push(url);
    });
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newUrls]
    }));
  };

  const addPresetImage = (url) => {
    if (!formData.images.includes(url)) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, url]
      }));
    }
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== indexToRemove)
    }));
  };

  const hasImages = formData.images.length > 0;

  return (
    <div className="space-y-6">
      
      {/* Upload Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-10 text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(56,189,248,0.2)]'
            : 'border-white/15 hover:border-cyan-500/40 bg-white/[0.02] hover:bg-white/[0.04]'
        }`}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInput}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4 text-cyan-300">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h4 className="text-base sm:text-lg font-bold font-display text-white">
          Drag & drop your product imagery here
        </h4>
        <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
          Supports PNG, JPG, or WEBP up to 25MB each. First image becomes the primary listing thumbnail.
        </p>

        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200">
          <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>Browse Files on Device</span>
        </div>
      </div>

      {/* Preset Quick Image Adders */}
      <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-semibold text-slate-200">Or use instant high-res lot presets:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {samplePresets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => addPresetImage(preset.url)}
              className="px-3 py-1 rounded-lg text-xs font-medium bg-white/5 hover:bg-purple-500/20 text-slate-300 hover:text-purple-200 border border-white/10 transition-colors cursor-pointer"
            >
              + {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Image Previews Grid */}
      {hasImages ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{formData.images.length} image(s) selected:</span>
            <span className="text-cyan-400">Primary cover marked</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {formData.images.map((imgUrl, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl overflow-hidden aspect-[4/3] glass-card border border-white/15 group"
              >
                <img
                  src={imgUrl}
                  alt={`Product view ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {idx === 0 && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-cyan-500/80 text-white backdrop-blur-md">
                    Cover
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-rose-600 text-white transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                  title="Remove image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>At least 1 product image is required to publish an auction.</span>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        >
          ← Back to Details
        </button>

        <button
          type="button"
          disabled={!hasImages}
          onClick={onNext}
          className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Next: Auction Settings →
        </button>
      </div>

    </div>
  );
}
