// Motor de Música Procedural Diegética 1982: "Marcha de las Malvinas"
// Síntesis en tiempo real estilo Chiptune / Synthwave analógico de los 80.
// Cero dependencias externas, calidad de estudio a 44.1/48kHz, bucle perfecto.

export class MalvinasBgmEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private currentBeat: number = 0;
  private nextBeatTime: number = 0;
  private tempoBpm: number = 98; // Tempo marcial solemne

  // Frecuencias base temperadas
  private notes: Record<string, number> = {
    // Escala central y armónicos
    C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, Bb3: 233.08, B3: 246.94,
    C4: 261.63, D4: 293.66, Eb4: 311.13, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, Bb4: 466.16, B4: 493.88,
    C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, Bb5: 932.33,
    // Bajos
    F2: 87.31, G2: 98.00, A2: 110.00, Bb2: 116.54, C2: 65.41, D2: 73.42, E2: 82.41
  };

  // Melodía completa y auténtica de la Marcha de las Malvinas (en F Mayor)
  // Duraciones en beats (1 beat = 1 tiempo de negra a 98 BPM)
  private melodyScore: Array<{ note: string | null; duration: number }> = [
    // --- INTRO (4 compases / 16 beats): Redoble y acordes atmosféricos ---
    { note: null, duration: 16 },

    // --- ESTROFA 1: "Tras su manto de neblinas..." ---
    { note: 'A4', duration: 0.75 },
    { note: 'G4', duration: 0.25 },
    { note: 'F4', duration: 0.5 },
    { note: 'C4', duration: 0.5 },
    { note: 'C4', duration: 0.5 },
    { note: 'C4', duration: 0.5 },
    { note: 'D4', duration: 0.5 },
    { note: 'C4', duration: 1.5 },
    { note: null, duration: 0.5 },

    // "...no las hemos de olvidar"
    { note: 'C4', duration: 0.5 },
    { note: 'C4', duration: 0.5 },
    { note: 'D4', duration: 0.5 },
    { note: 'C4', duration: 0.5 },
    { note: 'D4', duration: 0.75 },
    { note: 'F4', duration: 0.75 },
    { note: 'E4', duration: 2.0 },
    { note: null, duration: 0.5 },

    // "¡Las Malvinas, Argentinas!"
    { note: 'C4', duration: 0.5 },
    { note: 'E4', duration: 0.5 },
    { note: 'G4', duration: 0.5 },
    { note: 'C5', duration: 1.0 },
    { note: 'F4', duration: 0.5 },
    { note: 'G4', duration: 0.5 },
    { note: 'A4', duration: 1.0 },
    { note: 'F4', duration: 1.0 },
    { note: null, duration: 0.5 },

    // "clama el viento y ruge el mar"
    { note: 'F4', duration: 0.5 },
    { note: 'A4', duration: 0.5 },
    { note: 'G4', duration: 0.75 },
    { note: 'F4', duration: 0.25 },
    { note: 'E4', duration: 0.5 },
    { note: 'F4', duration: 0.5 },
    { note: 'G4', duration: 2.0 },
    { note: null, duration: 0.5 },

    // --- ESTROFA 2: "Ni de aquellos horizontes..." ---
    { note: 'A4', duration: 0.75 },
    { note: 'G4', duration: 0.25 },
    { note: 'F4', duration: 0.5 },
    { note: 'C4', duration: 0.5 },
    { note: 'C4', duration: 0.5 },
    { note: 'C4', duration: 0.5 },
    { note: 'D4', duration: 0.5 },
    { note: 'C4', duration: 1.5 },
    { note: null, duration: 0.5 },

    // "...nuestra enseña han de arrancar"
    { note: 'C4', duration: 0.5 },
    { note: 'C4', duration: 0.5 },
    { note: 'D4', duration: 0.5 },
    { note: 'C4', duration: 0.5 },
    { note: 'D4', duration: 0.75 },
    { note: 'F4', duration: 0.75 },
    { note: 'E4', duration: 2.0 },
    { note: null, duration: 0.5 },

    // "¡Las Malvinas, Argentinas!"
    { note: 'C4', duration: 0.5 },
    { note: 'E4', duration: 0.5 },
    { note: 'G4', duration: 0.5 },
    { note: 'C5', duration: 1.0 },
    { note: 'F4', duration: 0.5 },
    { note: 'G4', duration: 0.5 },
    { note: 'A4', duration: 1.0 },
    { note: 'F4', duration: 1.0 },
    { note: null, duration: 0.5 },

    // "¡Clama el viento y ruge el mar! (Final Épico y Solemne)"
    { note: 'A4', duration: 0.5 },
    { note: 'C5', duration: 0.5 },
    { note: 'Bb4', duration: 0.75 },
    { note: 'G4', duration: 0.25 },
    { note: 'E4', duration: 0.5 },
    { note: 'G4', duration: 0.5 },
    { note: 'F4', duration: 3.0 },
    { note: null, duration: 2.0 }
  ];

  // Acordes por compás (armonía militar en F mayor)
  // Cada entrada cubre 4 beats (1 compás de 4/4)
  private chordProgression: Array<{ chord: string[]; bass: string }> = [
    // Intro
    { chord: ['F3', 'A3', 'C4'], bass: 'F2' },
    { chord: ['F3', 'A3', 'C4'], bass: 'F2' },
    { chord: ['Bb3', 'D4', 'F4'], bass: 'Bb2' },
    { chord: ['C3', 'G3', 'C4'], bass: 'C2' },

    // Estrofa 1
    { chord: ['F3', 'A3', 'C4'], bass: 'F2' },
    { chord: ['F3', 'A3', 'C4'], bass: 'F2' },
    { chord: ['Bb3', 'D4', 'F4'], bass: 'Bb2' },
    { chord: ['C3', 'G3', 'C4'], bass: 'C2' },
    { chord: ['C3', 'E3', 'G3'], bass: 'C2' },
    { chord: ['C3', 'E3', 'G3'], bass: 'C2' },
    { chord: ['F3', 'A3', 'C4'], bass: 'F2' },
    { chord: ['F3', 'A3', 'C4'], bass: 'F2' },

    // Estrofa 2
    { chord: ['F3', 'A3', 'C4'], bass: 'F2' },
    { chord: ['F3', 'A3', 'C4'], bass: 'F2' },
    { chord: ['Bb3', 'D4', 'F4'], bass: 'Bb2' },
    { chord: ['C3', 'G3', 'C4'], bass: 'C2' },
    { chord: ['D3', 'F3', 'A3'], bass: 'D2' },
    { chord: ['Bb3', 'D4', 'F4'], bass: 'Bb2' },
    { chord: ['C3', 'G3', 'Bb3', 'E4'], bass: 'C2' },
    { chord: ['F3', 'A3', 'C4'], bass: 'F2' }
  ];

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.20, this.ctx.currentTime); // Volumen equilibrado de fondo
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Comienza la reproducción en bucle continuo
  public start() {
    this.initContext();
    if (this.isPlaying || !this.ctx) return;

    this.isPlaying = true;
    this.nextBeatTime = this.ctx.currentTime + 0.1;
    this.currentBeat = 0;
    this.scheduleLoop();
  }

  // Detiene la música
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
      const targetGain = muted ? 0.0001 : 0.20;
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

  // Programador de eventos rítmicos por pulsos (Clock Scheduler)
  private scheduleLoop = () => {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const secondsPerBeat = 60 / this.tempoBpm;
    const scheduleAhead = 0.25; // 250ms anticipación para precisión militar

    while (this.nextBeatTime < this.ctx.currentTime + scheduleAhead) {
      const time = this.nextBeatTime;
      const beatIndex = this.currentBeat;

      // 1. Percusión de marcha 1982 (Bombo en 1 y 3, redoble / caja analógica en 2 y 4)
      const barBeat = beatIndex % 4;
      if (barBeat === 0 || barBeat === 2) {
        this.playKick(time);
      } else if (barBeat === 1 || barBeat === 3) {
        this.playSnare(time);
      }

      // 2. Línea de bajo arpegiado analógico de los 80 (cada medio tiempo)
      const barIndex = Math.floor(beatIndex / 4) % this.chordProgression.length;
      const currentHarmony = this.chordProgression[barIndex];
      const bassFreq = this.notes[currentHarmony.bass] || 87.31;
      
      // Bajo en semicorcheas/corcheas con pulso octavado clásico synthwave
      this.playBassNote(bassFreq, time, secondsPerBeat * 0.45);
      this.playBassNote(bassFreq * 2, time + (secondsPerBeat * 0.5), secondsPerBeat * 0.4);

      // 3. Colchón armónico analógico (Pad de sintetizador) en el inicio de cada compás
      if (barBeat === 0) {
        this.playChordPad(currentHarmony.chord, time, secondsPerBeat * 3.8);
      }

      // 4. Voz Líder: Melodía de la Marcha de las Malvinas
      this.playMelodyStep(beatIndex, time, secondsPerBeat);

      this.nextBeatTime += secondsPerBeat;
      this.currentBeat++;
    }

    // Próximo ciclo de chequeo a 50ms
    this.timerId = window.setTimeout(this.scheduleLoop, 50);
  };

  // Cálculo del evento melódico según el beat actual acumulado
  private playMelodyStep(currentBeat: number, time: number, secondsPerBeat: number) {
    if (!this.ctx || !this.masterGain) return;

    // Calcular la duración total de la melodía en beats
    const totalMelodyBeats = this.melodyScore.reduce((acc, step) => acc + step.duration, 0);
    const loopBeat = currentBeat % totalMelodyBeats;

    let accumulatedBeats = 0;
    for (const step of this.melodyScore) {
      if (loopBeat >= accumulatedBeats && loopBeat < accumulatedBeats + 0.99) {
        if (Math.abs(loopBeat - accumulatedBeats) < 0.05 && step.note) {
          const freq = this.notes[step.note];
          if (freq) {
            this.playLeadSynth(freq, time, step.duration * secondsPerBeat);
          }
        }
        break;
      }
      accumulatedBeats += step.duration;
    }
  }

  // Sintetizador Líder (Lead 80s: Pulse + Triángulo con filtro resonante y vibrato)
  private playLeadSynth(freq: number, time: number, duration: number) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const noteGain = this.ctx.createGain();

    // Timbre épico analógico
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(freq, time);

    osc2.type = 'square';
    osc2.frequency.setValueAtTime(freq * 1.002, time); // Ligero detune para grosor coral

    // Filtro pasa bajos militar clásico
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, time);
    filter.frequency.exponentialRampToValueAtTime(1100, time + duration);
    filter.Q.setValueAtTime(2.2, time);

    // Envolvente ADSR
    const attack = 0.03;
    const decay = 0.10;
    const sustainLevel = 0.16;
    const release = 0.15;

    noteGain.gain.setValueAtTime(0.0001, time);
    noteGain.gain.linearRampToValueAtTime(0.24, time + attack);
    noteGain.gain.linearRampToValueAtTime(sustainLevel, time + attack + decay);
    noteGain.gain.setValueAtTime(sustainLevel, time + Math.max(attack + decay, duration - release));
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

  // Sintetizador de Bajo (Bass 80s: Moog / Roland Juno Style)
  private playBassNote(freq: number, time: number, duration: number) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, time);
    filter.frequency.exponentialRampToValueAtTime(140, time + duration);
    filter.Q.setValueAtTime(3.0, time);

    gain.gain.setValueAtTime(0.22, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  // Colchón de cuerdas/sintetizador analógico (Pad de fondo)
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
      filter.frequency.setValueAtTime(700, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.05, time + 0.4);
      gain.gain.setValueAtTime(0.05, time + duration - 0.4);
      gain.gain.linearRampToValueAtTime(0.001, time + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(time);
      osc.stop(time + duration);
    });
  }

  // Percusión: Bombo de marcha (Kick 808 analógico profundo)
  private playKick(time: number) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(110, time);
    osc.frequency.exponentialRampToValueAtTime(38, time + 0.12);

    gain.gain.setValueAtTime(0.24, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.16);
  }

  // Percusión: Caja de marcha militar (Snare analógico con ruido blanco filtrado)
  private playSnare(time: number) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const bufferSize = this.ctx.sampleRate * 0.12;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.28));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1600, time);
    filter.Q.setValueAtTime(1.8, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
  }
}

// Instancia singleton para toda la aplicación
export const malvinasBgm = new MalvinasBgmEngine();
