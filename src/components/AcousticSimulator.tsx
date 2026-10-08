import React, { useState, useEffect, useRef } from 'react';
import { playAcousticSample } from '../utils/audio';
import { Volume2, Play, Activity, Sparkles } from 'lucide-react';

export const AcousticSimulator: React.FC = () => {
  const [activeProfile, setActiveProfile] = useState<'studio' | 'bass' | 'spatial' | 'vocal'>('studio');
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const profiles: {
    id: 'studio' | 'bass' | 'spatial' | 'vocal';
    title: string;
    description: string;
    curve: string;
    bassBoost: string;
    thd: string;
    idealFor: string;
  }[] = [
    {
      id: 'studio',
      title: 'Studio Reference (Harmonic Neutral)',
      description: 'Zero coloration, absolute master-tape transparency as intended by the mixing engineer.',
      curve: 'Flat ±0.5dB (20Hz - 20kHz)',
      bassBoost: '0.0 dB',
      thd: '< 0.05%',
      idealFor: 'Acoustic jazz, classical symphonies, mastering monitoring',
    },
    {
      id: 'bass',
      title: 'Sub-Bass Titan (Extended Lows)',
      description: 'Deep physical rumble down to 10Hz without muddying mid-range instrument articulation.',
      curve: '+6.5dB Sub-Bass Shelf @ 60Hz',
      bassBoost: '+6.5 dB',
      thd: '< 0.08%',
      idealFor: 'Electronic, cinematic film scores, hip-hop, gaming action',
    },
    {
      id: 'spatial',
      title: 'Acoustic Spatial 360° (Binaural Sphere)',
      description: 'Wide holographic soundstage with pinpoint directional imaging and binaural separation.',
      curve: 'Binaural HRTF Spatialized',
      bassBoost: '+1.5 dB',
      thd: '< 0.06%',
      idealFor: 'Live concert recordings, open-world gaming, 7.1 movies',
    },
    {
      id: 'vocal',
      title: 'Vocal Presence & High Air',
      description: 'Elevated 2kHz - 5kHz articulation rendering spoken word, podcasts, and vocals with crystalline clarity.',
      curve: '+3.0dB Clarity Peak @ 3.2kHz',
      bassBoost: '-1.0 dB',
      thd: '< 0.04%',
      idealFor: 'Podcasts, conference calls, acoustic singer-songwriter',
    },
  ];

  const current = profiles.find((p) => p.id === activeProfile)!;

  // Real-time canvas waveform visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Draw background frequency grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Dynamic waveform
      ctx.beginPath();
      ctx.lineWidth = 2.5;

      // Color based on active profile
      if (activeProfile === 'bass') {
        ctx.strokeStyle = '#F59E0B'; // Amber
      } else if (activeProfile === 'studio') {
        ctx.strokeStyle = '#D4AF37'; // Gold
      } else if (activeProfile === 'spatial') {
        ctx.strokeStyle = '#38BDF8'; // Sky blue
      } else {
        ctx.strokeStyle = '#A78BFA'; // Purple
      }

      for (let x = 0; x < width; x++) {
        let freq1 = 0.02;
        let amp1 = 20;

        if (activeProfile === 'bass') {
          freq1 = 0.008;
          amp1 = 36 * (1 - x / width * 0.5);
        } else if (activeProfile === 'spatial') {
          freq1 = 0.035;
          amp1 = 24 * Math.sin(x * 0.005 + step * 0.02);
        } else if (activeProfile === 'vocal') {
          freq1 = 0.04;
          amp1 = x > width * 0.3 && x < width * 0.7 ? 32 : 12;
        }

        const wave =
          Math.sin(x * freq1 + step * 0.05) * amp1 +
          Math.sin(x * 0.05 - step * 0.02) * (amp1 * 0.3);

        const y = centerY + wave;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      step += isPlaying ? 2.5 : 0.8;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [activeProfile, isPlaying]);

  const handleTestTone = (pId: 'studio' | 'bass' | 'spatial' | 'vocal') => {
    setActiveProfile(pId);
    setIsPlaying(true);
    playAcousticSample(pId);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  return (
    <section id="sound-lab" className="py-20 bg-[#0A0B0F] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Acoustic Testing Suite</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Acoustic Profile Simulator
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Audition the acoustic tuning characteristics built into ALI MURTAZA transducers.
            Select an acoustic profile to preview the simulated frequency response and live waveform.
          </p>
        </div>

        {/* Simulator Cockpit Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#121318] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
          
          {/* Left Column: Profile Selectors */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1">
                Select Acoustic Curve
              </span>

              {profiles.map((p) => {
                const isSelected = activeProfile === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleTestTone(p.id)}
                    className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-white/10 border-amber-500/60 shadow-[0_4px_20px_rgba(212,175,55,0.15)]'
                        : 'bg-zinc-900/60 border-white/5 hover:border-white/20 hover:bg-zinc-900'
                    }`}
                  >
                    <div>
                      <div className={`text-sm font-semibold ${isSelected ? 'text-amber-300' : 'text-white'}`}>
                        {p.title}
                      </div>
                      <div className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                        {p.curve}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`p-2 rounded-lg ${isSelected ? 'bg-amber-400 text-black' : 'bg-white/5 text-zinc-400'}`}>
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Audition Trigger Button */}
            <button
              onClick={() => handleTestTone(activeProfile)}
              className="mt-2 w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
            >
              <Volume2 className="w-4 h-4" />
              <span>{isPlaying ? 'Auditioning Harmonic Tone...' : `Audition ${current.title.split(' ')[0]} Preset`}</span>
            </button>
          </div>

          {/* Right Column: Waveform Screen & Telemetry */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#08090C] border border-white/5 rounded-2xl p-6">
            
            {/* Visualizer Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">
                  Real-Time Transducer Visualizer
                </span>
              </div>
              <div className="text-xs font-mono text-amber-400 tabular-nums">
                {current.curve}
              </div>
            </div>

            {/* Waveform Canvas */}
            <div className="py-6 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={560}
                height={160}
                className="w-full h-40 max-w-full rounded-lg"
              />
            </div>

            {/* Profile Detail Specs */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-zinc-500 block">Harmonic Distortion</span>
                <span className="font-mono text-zinc-200 font-semibold">{current.thd}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Sub-Bass Compensation</span>
                <span className="font-mono text-zinc-200 font-semibold">{current.bassBoost}</span>
              </div>
              <div className="sm:col-span-1">
                <span className="text-zinc-500 block">Ideal Acoustic Genre</span>
                <span className="text-zinc-300 line-clamp-1">{current.idealFor}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
