import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { ArrowRight, Check, ShieldCheck, Headphones, Mail } from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: ProductCategory | 'All') => void;
  onExploreSoundLab: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onExploreSoundLab }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#050608] border-t border-white/5 pt-16 pb-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* VIP Sound Club & Newsletter Strip */}
        <div className="bg-[#0D0E13] border border-white/5 rounded-3xl p-8 sm:p-12 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              <Mail className="w-4 h-4" />
              <span>VIP Audiophile Sound Circle</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              First Access to Master Batch Releases
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Receive private invitations to limited acoustic releases, firmware tuning updates, and exclusive private audition events.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              required
            />
            <button
              type="submit"
              className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Joined</span>
                </>
              ) : (
                <>
                  <span>Join Club</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <BrandLogo size="md" showTagline={true} />
            <p className="mt-4 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              Dedicated to uncompromised acoustic fidelity. Precision transducers, aerospace metallurgy, and master-tape tuning across Earbuds, Handsfree, and Headphones.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>2-Year Comprehensive Manufacturer Warranty</span>
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-4">
              Disciplines
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('Earbuds')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Wireless & TWS Earbuds
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Handsfree')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Kevlar & Hi-Res Handsfree
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Headphones')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Over-Ear Studio Headphones
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('All')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Complete Hardware Catalog
                </button>
              </li>
            </ul>
          </div>

          {/* Sound Engineering */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-4">
              Technology
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={onExploreSoundLab}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Acoustic Profile Simulator
                </button>
              </li>
              <li>
                <span className="text-zinc-500">Beryllium Diaphragms</span>
              </li>
              <li>
                <span className="text-zinc-500">-48dB Studio Isolation</span>
              </li>
              <li>
                <span className="text-zinc-500">Lossless LDAC & aptX HD</span>
              </li>
            </ul>
          </div>

          {/* Care & Support */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-4">
              Care & Service
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">
                  Contact Acoustic Concierge
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">
                  Warranty & Serial Verification
                </a>
              </li>
              <li>
                <span className="text-zinc-400">30-Day Audition Policy</span>
              </li>
              <li>
                <a href="mailto:support@alimurtaza-audio.com" className="hover:text-amber-400 transition-colors">
                  support@alimurtaza-audio.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar (Clean quiet footer per constitution) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} ALI MURTAZA Audio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Designed for Audiophile Acoustics</span>
            <span>·</span>
            <span>Worldwide Courier Dispatch</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
