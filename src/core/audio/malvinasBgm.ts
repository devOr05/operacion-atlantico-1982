// Motor de Audio Diegético 1982: Banda Sonora Dinámica
// Track A: "Marcha de las Malvinas" (Épica, solemne, 100% reconocible para Bienvenida y Ranking)
// Track B: "Dron Táctico Dark Synth 1982" (Tensión fría de radar, arpegios Carpenter/Vangelis y sonar para Juego)
// 100% Síntesis Web Audio API en tiempo real - Cero descargas externas - 44.1/48kHz

export type BgmTrack = 'marcha' | 'dron';

export class MalvinasBgmEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private currentTrack: BgmTrack = 'marcha';

  private currentBeat: number = 0;
  private nextBeatTime: number = 0;

  // Frecuencias estándar temperadas (A4 = 440Hz)
  private notes: Record<string, number> = {
    // Bajos profundos
    D1: 36.71, E1: 41.20, F1: 43.65, G1: 49.00, A1: 55.00, Bb1: 58.27, C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.00, A2: 110.00, Bb2: 116.54,
    // Rango medio
    C3: 130.81, Csharp3: 138.59, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, Bb3: 233.08, B3: 246.94,
    C4: 261.63, Csharp4: 277.18, D4: 293.66, Eb4: 311.13, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, Bb4: 466.16, B4: 493.88,
    // Agudos melódicos
    C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, Bb5: 932.33,
    C6: 1046.50, E6: 1318.51, A6: 1760.00
  };

  // =========================================================================
  // 1. PARTITURA AUTÉNTICA: MARCHA DE LAS MALVINAS (Fa Mayor - 100 BPM)
  // Melodía inconfundible: "¡Tras su man-to de ne-bli-nas, no las he-mos de ol-vi-dar!..."
  // =========================================================================
  private marchaScore: Array<{ note: string | null; duration: number }> = [
    // Introducción marcial con redoble y fanfarria (8 beats)
    { note: null, duration: 8 },

    // "¡Tras su man-to de ne-bli-nas..." (LA - LA - LA - SOL - FA - DO)
    { note: 'A4', duration: 1.0 },
    { note: 'A4', duration: 0.5 },
    { note: 'A4', duration: 0.5 },
    { note: 'G4', duration: 0.5 },
    { note: 'F4', duration: 0.5 },
    { note: 'C4', duration: 1.5 },
    { note: null, duration: 0.5 },

    // "...no las he-mos de ol-vi-dar!" (DO - DO - RE - DO - RE - FA - MI)
    { note: 'C4', duration: 0.5 },
    { note: 'C4', duration: 0.5 },
    { note: 'D4', duration: 0.5 },
    { note: 'C4', duration: 0.5 },
    { note: 'D4', duration: 0.75 },
    { note: 'F4', duration: 0.75 },
    { note: 'E4', duration: 2.0 },
    { note: null, duration: 0.5 },

    // "¡Las Mal-vi-nas, Ar-gen-ti-nas!" (DO - MI - SOL - DO' ... FA - SOL - LA - LA - FA)
    { note: 'C4', duration: 0.5 },
    { note: 'E4', duration: 0.5 },
    { note: 'G4', duration: 0.5 },
    { note: 'C5', duration: 1.5 },
    { note: null, duration: 0.5 },
    { note: 'F4', duration: 0.5 },
    { note: 'G4', duration: 0.5 },
    { note: 'A4', duration: 1.0 },
    { note: 'A4', duration: 1.0 },
    { note: 'F4', duration: 2.0 },
    { note: null, duration: 0.5 },

    // "cla-ma el vien-to y ru-ge el mar!" (FA - LA - SOL - FA - MI - FA - SOL)
    { note: 'F4', duration: 0.5 },
    { note: 'A4', duration: 0.5 },
    { note: 'G4', duration: 0.5 },
    { note: 'F4', duration: 0.5 },
    { note: 'E4', duration: 0.5 },
    { note: 'F4', duration: 0.5 },
    { note: 'G4', duration: 2.5 },
    { note: null, duration: 0.5 },

    // "Ni de a-que-llos ho-ri-zon-tes..." (LA - LA - LA - SOL - FA - DO)
    { note: 'A4', duration: 1.0 },
    { note: 'A4', duration: 0.5 },
    { note: 'A4', duration: 0.5 },
    { note: 'G4', duration: 0.5 },
    { note: 'F4', duration: 0.5 },
    { note: 'C4', duration: 1.5 },
    { note: null, duration: 0.5 },

    // "...nues-tra en-se-ña han de ar-ran-car" (DO - DO - RE - DO - RE - FA - MI)
    { note: 'C4', duration: 0.5 },
    { note: 'C4', duration: 0.5 },
    { note: 'D4', duration: 0.5 },
    { note: 'C4', duration: 0.5 },
    { note: 'D4', duration: 0.75 },
    { note: 'F4', duration: 0.75 },
    { note: 'E4', duration: 2.0 },
    { note: null, duration: 0.5 },

    // "¡Las Mal-vi-nas, Ar-gen-ti-nas!" (DO - MI - SOL - DO' ... FA - SOL - LA - LA - FA)
    { note: 'C4', duration: 0.5 },
    { note: 'E4', duration: 0.5 },
    { note: 'G4', duration: 0.5 },
    { note: 'C5', duration: 1.5 },
    { note: null, duration: 0.5 },
    { note: 'F4', duration: 0.5 },
    { note: 'G4', duration: 0.5 },
    { note: 'A4', duration: 1.0 },
    { note: 'A4', duration: 1.0 },
    { note: 'F4', duration: 2.0 },
    { note: null, duration: 0.5 },

    // "¡cla-ma el vien-to y ru-ge el mar! (Final Triunfal)" (FA - LA - SOL - FA - MI - SOL - FA)
    { note: 'F4', duration: 0.5 },
    { note: 'A4', duration: 0.5 },
    { note: 'G4', duration: 0.5 },
    { note: 'F4', duration: 0.5 },
    { note: 'E4', duration: 0.5 },
    { note: 'G4', duration: 0.5 },
    { note: 'F4', duration: 3.5 },
    { note: null, duration: 2.0 }
  ];

  // Armonía para la Marcha (cada entrada son 4 beats)
  private marchaChords: Array<{ chord: string[]; bass: string }> = [
    { chord: ['F3', 'A3', 'C4'], bass: 'F2' },
    { chord: ['F3', 'A3', 'C4'], bass: 'F2' },
    { chord: ['F3', 'A3', 'C4'], bass: 'F2' },
    { chord: ['F3', 'A3', 'C4'], bass: 'F2' },
    { chord: ['Bb3', 'D4', 'F4'], bass: 'Bb2' },
    { chord: ['C3', 'G3', 'C4'], bass: 'C2' },
    { chord: ['C3', 'E3', 'G3'], bass: 'C2' },
    { chord: ['F3', 'A3', 'C4'], bass: 'F2' },
    { chord: ['F3', 'A3', 'C4'], bass: 'F2' },
    { chord: ['Bb3', 'D4', 'F4'], bass: 'Bb2' },
    { chord: ['C3', 'G3', 'C4'], bass: 'C2' },
    { chord: ['F3', 'A3', 'C4'], bass: 'F2' },
    { chord: ['D3', 'F3', 'A3'], bass: 'D2' },
    { chord: ['Bb3', 'D4', 'F4'], bass: 'Bb2' },
    { chord: ['C3', 'E3', 'G3', 'Bb3'], bass: 'C2' },
    { chord: ['F3', 'A3', 'C4'], bass: 'F2' }
  ];

  // =========================================================================
  // 2. DRON TÁCTICO DARK SYNTH 1982 (Re Menor - 82 BPM)
  // Tensión fría de radar, arpegios nocturnos de guerra fría y sonar de submarino
  // =========================================================================
  private dronChords: Array<{ chord: string[]; bass: string; root: string }> = [
    { chord: ['D3', 'F3', 'A3'], bass: 'D1', root: 'D' },
    { chord: ['D3', 'F3', 'A3'], bass: 'D1', root: 'D' },
    { chord: ['Bb2', 'D3', 'F3'], bass: 'Bb1', root: 'Bb' },
    { chord: ['A2', 'Csharp3', 'E3'], bass: 'A1', root: 'A' },
    { chord: ['G2', 'Bb2', 'D3'], bass: 'G1', root: 'G' },
    { chord: ['A2', 'Csharp3', 'E3'], bass: 'A1', root: 'A' },
    { chord: ['D3', 'F3', 'A3'], bass: 'D1', root: 'D' },
    { chord: ['D3', 'F3', 'A3'], bass: 'D1', root: 'D' }
  ];

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.22, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public getTrack(): BgmTrack {
    return this.currentTrack;
  }

  // Cambio dinámico de pista sin interrupciones abruptas
  public setTrack(track: BgmTrack) {
    if (this.currentTrack === track) return;
    this.currentTrack = track;
    this.currentBeat = 0;
    if (this.ctx) {
      this.nextBeatTime = this.ctx.currentTime + 0.15;
    }
  }

  public start() {
    this.initContext();
    if (this.isPlaying || !this.ctx) return;

    this.isPlaying = true;
    this.nextBeatTime = this.ctx.currentTime + 0.1;
    this.currentBeat = 0;
    this.scheduleLoop();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      const targetGain = muted ? 0.0001 : 0.22;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.08);
    }
  }

  public toggle(): boolean {
    if (this.isPlaying && !this.isMuted) {
      this.setMuted(true);
      return false;
    } else {
      if (!this.isPlaying) {
        this.start();
      }
      this.setMuted(false);
      return true;
    }
  }

  // Bucle central de sincronización
  private scheduleLoop = () => {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const tempo = this.currentTrack === 'marcha' ? 100 : 82;
    const secondsPerBeat = 60 / tempo;
    const scheduleAhead = 0.25;

    while (this.nextBeatTime < this.ctx.currentTime + scheduleAhead) {
      const time = this.nextBeatTime;
      const beat = this.currentBeat;

      if (this.currentTrack === 'marcha') {
        this.renderMarchaStep(beat, time, secondsPerBeat);
      } else {
        this.renderDronStep(beat, time, secondsPerBeat);
      }

      this.nextBeatTime += secondsPerBeat;
      this.currentBeat++;
    }

    this.timerId = window.setTimeout(this.scheduleLoop, 45);
  };

  // =========================================================================
  // RENDERIZADOR TRACK 1: MARCHA DE LAS MALVINAS
  // =========================================================================
  private renderMarchaStep(beat: number, time: number, secondsPerBeat: number) {
    // 1. Percusión militar (Bombo en 1 y 3, caja / redoble en 2 y 4)
    const barBeat = beat % 4;
    if (barBeat === 0 || barBeat === 2) {
      this.playKick(time, 0.22);
    } else {
      this.playSnare(time, 0.14);
    }

    // 2. Línea de bajo arpegiada estilo 80s
    const barIndex = Math.floor(beat / 4) % this.marchaChords.length;
    const harm = this.marchaChords[barIndex];
    const bassFreq = this.notes[harm.bass] || 87.31;
    this.playBassNote(bassFreq, time, secondsPerBeat * 0.45);
    this.playBassNote(bassFreq * 2, time + secondsPerBeat * 0.5, secondsPerBeat * 0.40);

    // 3. Colchón armónico analógico
    if (barBeat === 0) {
      this.playChordPad(harm.chord, time, secondsPerBeat * 3.85);
    }

    // 4. Melodía auténtica y nítida de la Marcha
    const totalBeats = this.marchaScore.reduce((acc, s) => acc + s.duration, 0);
    const loopBeat = beat % totalBeats;

    let accum = 0;
    for (const step of this.marchaScore) {
      if (loopBeat >= accum && loopBeat < accum + 0.99) {
        if (Math.abs(loopBeat - accum) < 0.05 && step.note) {
          const freq = this.notes[step.note];
          if (freq) {
            this.playLeadSynth(freq, time, step.duration * secondsPerBeat);
          }
        }
        break;
      }
      accum += step.duration;
    }
  }

  // =========================================================================
  // RENDERIZADOR TRACK 2: DARK SYNTH 1982 / DRON TÁCTICO MILITAR
  // =========================================================================
  private renderDronStep(beat: number, time: number, secondsPerBeat: number) {
    const barIndex = Math.floor(beat / 4) % this.dronChords.length;
    const harm = this.dronChords[barIndex];
    const barBeat = beat % 4;

    // 1. Pulso de latido sub-grave táctico (Heartbeat de sonar cada 2 beats)
    if (barBeat === 0 || barBeat === 2) {
      this.playSubPulse(time, 0.28);
    }

    // 2. Ping de Sonar Naval de Submarino (cada 8 beats)
    if (beat % 8 === 0) {
      this.playSonarPing(time);
    }

    // 3. Dron armónico continuo analógico de guerra fría
    if (barBeat === 0) {
      this.playDarkDrone(harm.chord, time, secondsPerBeat * 3.9);
    }

    // 4. Arpegio hipnótico estilo John Carpenter / Vangelis en semicorcheas
    const subStep = secondsPerBeat / 4;
    const root = harm.root;
    const arpeggioNotes = root === 'D' 
      ? ['D3', 'F3', 'A3', 'D4', 'F4', 'D4', 'A3', 'F3']
      : root === 'Bb'
      ? ['Bb2', 'D3', 'F3', 'Bb3', 'D4', 'Bb3', 'F3', 'D3']
      : root === 'A'
      ? ['A2', 'Csharp3', 'E3', 'A3', 'Csharp4', 'A3', 'E3', 'Csharp3']
      : ['G2', 'Bb2', 'D3', 'G3', 'Bb3', 'G3', 'D3', 'Bb2'];

    for (let i = 0; i < 4; i++) {
      const noteIndex = (barBeat * 4 + i) % arpeggioNotes.length;
      const noteName = arpeggioNotes[noteIndex];
      const freq = this.notes[noteName];
      if (freq) {
        this.playTenseArp(freq, time + i * subStep, subStep * 0.85);
      }
    }
  }

  // =========================================================================
  // INSTRUMENTOS ANALÓGICOS PROCEDURALES
  // =========================================================================

  // Lead de la Marcha de las Malvinas (Nítido, solemne, con presencia y brillo de los 80)
  private playLeadSynth(freq: number, time: number, duration: number) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const noteGain = this.ctx.createGain();

    // Dientes de sierra + Cuadrada con armónicos para definición melódica total
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(freq, time);

    osc2.type = 'square';
    osc2.frequency.setValueAtTime(freq * 1.0025, time); // Coro analógico

    // Filtro analógico brillante y resonante
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2800, time);
    filter.frequency.exponentialRampToValueAtTime(1400, time + duration);
    filter.Q.setValueAtTime(2.4, time);

    const attack = 0.02;
    const decay = 0.08;
    const sustain = 0.22;
    const release = 0.12;

    noteGain.gain.setValueAtTime(0.0001, time);
    noteGain.gain.linearRampToValueAtTime(0.30, time + attack);
    noteGain.gain.linearRampToValueAtTime(sustain, time + attack + decay);
    noteGain.gain.setValueAtTime(sustain, time + Math.max(attack + decay, duration - release));
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration + 0.05);
    osc2.stop(time + duration + 0.05);
  }

  // Bajo analógico Juno de los 80
  private playBassNote(freq: number, time: number, duration: number) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, time);
    filter.frequency.exponentialRampToValueAtTime(160, time + duration);
    filter.Q.setValueAtTime(3.2, time);

    gain.gain.setValueAtTime(0.24, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  // Colchón armónico analógico
  private playChordPad(chordNotes: string[], time: number, duration: number) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    chordNotes.forEach((noteName) => {
      if (!this.ctx || !this.masterGain) return;
      const freq = this.notes[noteName];
      if (!freq) return;

      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(750, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.055, time + 0.35);
      gain.gain.setValueAtTime(0.055, time + duration - 0.35);
      gain.gain.linearRampToValueAtTime(0.001, time + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(time);
      osc.stop(time + duration);
    });
  }

  // Dron oscuro continuo para la pantalla de juego
  private playDarkDrone(chordNotes: string[], time: number, duration: number) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    chordNotes.forEach((noteName) => {
      if (!this.ctx || !this.masterGain) return;
      const freq = this.notes[noteName];
      if (!freq) return;

      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq * 0.5, time); // Una octava más abajo para peso

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, time);
      filter.frequency.linearRampToValueAtTime(450, time + duration * 0.5);
      filter.frequency.linearRampToValueAtTime(300, time + duration);
      filter.Q.setValueAtTime(4.0, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.06, time + 0.6);
      gain.gain.setValueAtTime(0.06, time + duration - 0.6);
      gain.gain.linearRampToValueAtTime(0.001, time + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(time);
      osc.stop(time + duration);
    });
  }

  // Arpegio tenso estilo John Carpenter / Stranger Things (Juego)
  private playTenseArp(freq: number, time: number, duration: number) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, time);
    filter.Q.setValueAtTime(2.5, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(0.08, time + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration + 0.01);
  }

  // Sonar de Submarino / Radar en el mar de Malvinas (Tensión Diegética)
  private playSonarPing(time: number) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1480, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(0.09, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 1.25);
  }

  // Pulso cardíaco sub-grave (Juego)
  private playSubPulse(time: number, vol: number) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(65, time);
    osc.frequency.exponentialRampToValueAtTime(32, time + 0.16);

    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.20);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.22);
  }

  // Bombo de Marcha militar
  private playKick(time: number, vol: number) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(120, time);
    osc.frequency.exponentialRampToValueAtTime(42, time + 0.14);

    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.16);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.18);
  }

  // Caja de Marcha militar analógica
  private playSnare(time: number, vol: number) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const bufferSize = this.ctx.sampleRate * 0.14;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.26));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1750, time);
    filter.Q.setValueAtTime(1.9, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.14);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
  }
}

export const malvinasBgm = new MalvinasBgmEngine();
