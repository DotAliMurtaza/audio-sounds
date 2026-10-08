/**
 * High-fidelity Web Audio synthesis for luxury brand micro-interactions
 * and the interactive Acoustic Simulator test room.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Play a cinematic warm golden harmonic chime for the brand intro
 */
export function playBrandChime() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const baseFreq = 216; // Warm resonant tuning
    const harmonics = [1, 1.5, 2, 2.5, 3]; // Musical harmonic series

    harmonics.forEach((h, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * h, now + i * 0.08);

      gain.gain.setValueAtTime(0, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.06 / (i + 1), now + i * 0.08 + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 2.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 2.3);
    });
  } catch {
    // Gracefully handle browser autoplay policies
  }
}

/**
 * Play subtle tactile feedback on primary actions
 */
export function playHapticSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.05);

    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  } catch {
    // Ignore autoplay restriction
  }
}

/**
 * Simulate different acoustic EQ sound profiles in the interactive sound room
 */
export function playAcousticSample(profile: 'studio' | 'bass' | 'spatial' | 'vocal') {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    
    // Create base chord with profile-specific harmonic weighting
    let frequencies: number[] = [220, 330, 440, 550, 660];
    let filterFreq = 4000;
    let resonance = 2;

    if (profile === 'bass') {
      frequencies = [55, 110, 165, 220, 330];
      filterFreq = 800;
      resonance = 5;
    } else if (profile === 'studio') {
      frequencies = [220, 277.18, 329.63, 440, 554.37];
      filterFreq = 8000;
      resonance = 1;
    } else if (profile === 'spatial') {
      frequencies = [196, 246.94, 293.66, 392, 493.88, 587.33];
      filterFreq = 12000;
      resonance = 3;
    } else if (profile === 'vocal') {
      frequencies = [440, 523.25, 659.25, 783.99, 880];
      filterFreq = 5000;
      resonance = 4;
    }

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterFreq, now);
    filter.Q.setValueAtTime(resonance, now);

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.08, now + 0.15);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      osc.type = idx === 0 && profile === 'bass' ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      osc.connect(filter);
      osc.start(now);
      osc.stop(now + 1.8);
    });

    filter.connect(masterGain);
    masterGain.connect(ctx.destination);
  } catch {
    // Graceful fallback
  }
}
