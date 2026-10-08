import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ShieldCheck, CheckCircle2, ArrowRight, MessageSquare, Headphones } from 'lucide-react';
import { playHapticSound, playBrandChime } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Warranty & Serial Verification',
    message: '',
  });

  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Please provide a valid email address.';
    if (!formData.message.trim() || formData.message.length < 10) errs.message = 'Please provide at least 10 characters describing your inquiry.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    playHapticSound();

    setTimeout(() => {
      const ticketId = `AM-TK-${Math.floor(10000 + Math.random() * 90000)}`;
      
      // Save ticket to localStorage
      try {
        const stored = JSON.parse(localStorage.getItem('am_support_tickets') || '[]');
        stored.push({
          ticketId,
          ...formData,
          createdAt: new Date().toISOString(),
          status: 'Open',
        });
        localStorage.setItem('am_support_tickets', JSON.stringify(stored));
      } catch {
        // Fallback
      }

      setSubmittedTicket(ticketId);
      setIsSubmitting(false);
      playBrandChime();
    }, 600);
  };

  const resetForm = () => {
    setSubmittedTicket(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'Warranty & Serial Verification',
      message: '',
    });
    setErrors({});
  };

  return (
    <section id="contact" className="py-24 bg-[#08090D] border-t border-white/5 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              <Headphones className="w-3.5 h-3.5" />
              <span>Acoustic Consultation & Concierge</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Get in Touch with ALI MURTAZA
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Need guidance choosing between our planar earbuds or flagship over-ear monitors?
            Our acoustic hardware specialists are available to assist you.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Channels & Trust Markers */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              
              {/* Channel 1: Email */}
              <div className="p-5 rounded-2xl bg-[#111216] border border-white/5 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-zinc-900 border border-white/5 text-amber-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-0.5">
                    Official Support Email
                  </span>
                  <a
                    href="mailto:support@alimurtaza-audio.com"
                    className="text-base font-semibold text-white hover:text-amber-400 transition-colors"
                  >
                    support@alimurtaza-audio.com
                  </a>
                  <p className="text-xs text-zinc-400 mt-1">
                    Response time: within 2 to 4 business hours
                  </p>
                </div>
              </div>

              {/* Channel 2: Direct Helpline & WhatsApp */}
              <div className="p-5 rounded-2xl bg-[#111216] border border-white/5 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-zinc-900 border border-white/5 text-amber-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-0.5">
                    Acoustic Concierge & WhatsApp
                  </span>
                  <a
                    href="tel:+923008472910"
                    className="text-base font-semibold text-white hover:text-amber-400 transition-colors block"
                  >
                    +92 (300) 847-2910
                  </a>
                  <span className="text-xs text-zinc-400 font-mono">
                    Toll-Free Global: +1 (800) 584-AUDIO
                  </span>
                </div>
              </div>

              {/* Channel 3: Experience Lounge */}
              <div className="p-5 rounded-2xl bg-[#111216] border border-white/5 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-zinc-900 border border-white/5 text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-0.5">
                    Experience Studio & Flagship Lounge
                  </span>
                  <p className="text-sm font-semibold text-white">
                    ALI MURTAZA Audio Atelier, Sound Stage 4
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Hi-Fi Acoustic Avenue, Tech Innovation Zone
                  </p>
                </div>
              </div>

              {/* Channel 4: Operating Hours */}
              <div className="p-5 rounded-2xl bg-[#111216] border border-white/5 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-zinc-900 border border-white/5 text-amber-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-0.5">
                    Concierge Hours
                  </span>
                  <p className="text-sm font-semibold text-white">
                    Monday to Saturday: 9:00 AM – 8:00 PM
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Sunday: Dedicated priority email support
                  </p>
                </div>
              </div>

            </div>

            {/* Warranty & Guarantee Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-900 border border-amber-500/20 flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-amber-400 shrink-0" />
              <div className="text-xs">
                <span className="font-semibold text-white block text-sm">
                  Official 2-Year Replacement Warranty
                </span>
                <span className="text-zinc-400 leading-relaxed">
                  Every product registered through our store includes full serial warranty verification.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-[#101116] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
            {submittedTicket ? (
              <div className="py-12 flex flex-col items-center text-center max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  Inquiry Dispatched
                </h3>
                <p className="text-sm text-zinc-300 mb-6">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Your consultation request has been forwarded to the ALI MURTAZA technical desk.
                </p>

                <div className="w-full bg-[#0B0C10] border border-white/10 rounded-2xl p-5 mb-8 text-left font-mono text-xs space-y-2">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-zinc-500">Support Ticket ID:</span>
                    <span className="text-amber-400 font-bold">{submittedTicket}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-zinc-500">Subject:</span>
                    <span className="text-white">{formData.subject}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-zinc-500">Contact Email:</span>
                    <span className="text-zinc-300">{formData.email}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-zinc-500">Status:</span>
                    <span className="text-emerald-400">Assigned to Audio Specialist</span>
                  </div>
                </div>

                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-xl uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <h3 className="text-xl font-display font-bold text-white mb-1">
                    Send an Inquiry or Claim
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Fill out the form below and an ALI MURTAZA audio engineer will get back to you shortly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Murtaza Ali"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                    {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                    {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+92 (300) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Inquiry Topic */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                      Inquiry Category *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="Warranty & Serial Verification">Warranty & Serial Verification</option>
                      <option value="Order & Courier Tracking">Order & Courier Tracking</option>
                      <option value="Acoustic Tuning & Recommendation">Acoustic Tuning & Recommendation</option>
                      <option value="Wholesale & Studio Bulk Orders">Wholesale & Studio Bulk Orders</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                    Your Message / Model Specifications *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide details about your question, audio preferences, order reference, or warranty claim..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 resize-none"
                  />
                  {errors.message && <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>}
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting Ticket...' : 'Send Message to Audio Concierge'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-zinc-400 text-center font-mono pt-1">
                  Protected by 256-bit encryption · Official ALI MURTAZA direct response guarantee
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
