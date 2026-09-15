import React, { useState } from 'react';
import { X, Shield } from 'lucide-react';
import { useGameStore, gameStore } from '../../core/state/gameStore';

interface DossierItem {
  id: string;
  title: string;
  category: 'Aeronave' | 'Tecnología' | 'Infantería' | 'Armada';
  subtitle: string;
  specs: Record<string, string>;
  description: string;
  historyText: string;
}

const DOSSIER_DATA: DossierItem[] = [
  {
    id: 'super-etendard',
    title: 'Dassault Super Étendard & AM-39 Exocet',
    category: 'Aeronave',
    subtitle: 'Segunda Escuadrilla Aeronaval de Caza y Ataque',
    specs: {
      'Origen': 'Francia / Armada Argentina',
      'Velocidad Máxima': '1.200 km/h (Mach 1.0)',
      'Alcance Táctico': '850 km (requiere reabastecimiento)',
      'Armamento Principal': 'Misil antibuque AM-39 Exocet + 2 cañones DEFA 30mm'
    },
    description: 'Caza bombardero naval embarcado. Argentina disponía de solo 5 aviones y 5 misiles Exocet al iniciarse el conflicto debido al embargo europeo.',
    historyText: 'Sus ataques a ras del mar (volando a 10-15 metros sobre las crestas de las olas con radar apagado) revolucionaron para siempre la guerra aeronaval del siglo XX tras impactar al HMS Sheffield y al Atlantic Conveyor.'
  },
  {
    id: 'a4-skyhawk',
    title: 'Douglas A-4 Skyhawk (A-4B / A-4C / A-4Q)',
    category: 'Aeronave',
    subtitle: 'Fuerza Aérea Argentina y Armada Argentina',
    specs: {
      'Tripulación': '1 piloto',
      'Carga de Bombas': '3 bombas retardadas por paracaídas de 1000 lb',
      'Táctica': 'Vuelo ultra rasante a 500 nudos rozando las olas'
    },
    description: 'Avión de ataque ligero sin radar moderno de navegación. Los pilotos debían calcular el rumbo a mano y entrar al estrecho bajo fuego de misiles Sea Cat y Sea Wolf.',
    historyText: 'Conocidos por los marinos británicos como "Halcones". Su osadía al arrojar bombas pasando a metros de los mástiles de los buques mereció el elogio de los comandantes enemigos.'
  },
  {
    id: 'radar-tps43',
    title: 'Radar Tridimensional Westinghouse TPS-43',
    category: 'Tecnología',
    subtitle: 'Centro de Información y Control (CIC) Puerto Argentino',
    specs: {
      'Alcance Máximo': '450 km (240 millas náuticas)',
      'Tipo': 'Radar 3D móvil de vigilancia aérea táctica',
      'Operadores': 'Fuerza Aérea Argentina'
    },
    description: 'El "ojo invisible" de la defensa argentina. Detectaba la salida de los Sea Harrier británicos y guiaba las interceptaciones aéreas.',
    historyText: 'Fue atacado repetidamente con misiles antirradiación AGM-45 Shrike lanzados por bombarderos británicos Vulcan. Los técnicos argentinos apagaban el radar segundos antes del impacto para desviar los misiles al fango.'
  },
  {
    id: 'monte-longdon-inf',
    title: 'Regimiento de Infantería 7 - Monte Longdon',
    category: 'Infantería',
    subtitle: 'Defensa Terrestre de Puerto Argentino',
    specs: {
      'Composición': 'Oficiales, suboficiales y soldados conscriptos (Clase 62/63)',
      'Armamento': 'Fusiles FN FAL 7,62mm, ametralladoras MAG, cañones sin retroceso',
      'Condición': 'Trincheras de turba y roca, temperaturas de -10°C con viento polar'
    },
    description: 'Posición clave que cubría el acceso norte a Puerto Argentino. La 1ra Sección de la Compañía B sostuvo uno de los choques de infantería más sangrientos de la era contemporánea.',
    historyText: 'El combate nocturno contra el 3er Batallón de Paracaidistas británico se prolongó por más de 10 horas en la oscuridad total peñón por peñón con bayoneta calada.'
  }
];

export const DossierModal: React.FC = () => {
  const { dossierOpen } = useGameStore();
  const [selectedId, setSelectedId] = useState<string>('super-etendard');

  if (!dossierOpen) return null;

  const currentItem = DOSSIER_DATA.find((d) => d.id === selectedId) || DOSSIER_DATA[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm select-none font-mono-military">
      <div className="relative w-full max-w-3xl h-[90vh] max-h-[640px] flex flex-col bg-[#040c06] tactical-border rounded-lg shadow-2xl overflow-hidden">
        {/* Cabecera del Dossier */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-black/80 border-b border-[var(--crt-dim,#1f6b30)]">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[var(--crt-primary,#55ff77)]" />
            <span className="font-bold text-sm sm:text-base font-chakra uppercase text-[var(--crt-primary,#55ff77)] glow-text">
              DOSSIER DE INTELIGENCIA MILITAR • MALVINAS 1982
            </span>
          </div>
          <button
            onClick={() => gameStore.setDossierOpen(false)}
            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
          {/* Lista lateral de elementos del dossier */}
          <div className="w-full sm:w-56 bg-black/50 border-b sm:border-b-0 sm:border-r border-[var(--crt-dim,#1f6b30)] overflow-y-auto p-2 space-y-1">
            <div className="text-[10px] text-[var(--crt-dim,#1f6b30)] font-bold px-2 py-1 uppercase">
              ARCHIVOS CLASIFICADOS
            </div>
            {DOSSIER_DATA.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`w-full p-2 rounded text-left text-xs transition-all flex flex-col gap-0.5 ${
                  selectedId === item.id
                    ? 'bg-[var(--crt-primary,#55ff77)]/20 border border-[var(--crt-primary,#55ff77)] text-[var(--crt-accent,#aaffbb)] font-bold'
                    : 'text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200'
                }`}
              >
                <span className="text-[9px] uppercase tracking-wider text-zinc-500">{item.category}</span>
                <span className="truncate">{item.title}</span>
              </button>
            ))}
          </div>

          {/* Ficha técnica y texto histórico */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[rgba(2,6,3,0.9)] text-xs sm:text-sm">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                {currentItem.category} • {currentItem.subtitle}
              </span>
              <h2 className="text-base sm:text-xl font-bold font-chakra text-[var(--crt-primary,#55ff77)] glow-text">
                {currentItem.title}
              </h2>
            </div>

            {/* Especificaciones técnicas en cuadrícula */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-black/60 p-3 rounded border border-[var(--crt-dim,#1f6b30)]">
              {Object.entries(currentItem.specs).map(([key, value]) => (
                <div key={key} className="text-xs">
                  <span className="text-zinc-500 block text-[10px] uppercase">{key}:</span>
                  <span className="text-[var(--crt-accent,#aaffbb)] font-bold">{value}</span>
                </div>
              ))}
            </div>

            {/* Descripción operacional */}
            <div className="space-y-1.5 leading-relaxed text-zinc-300">
              <h3 className="font-bold text-[var(--crt-primary,#55ff77)] text-xs uppercase">
                PANORAMA OPERACIONAL:
              </h3>
              <p>{currentItem.description}</p>
            </div>

            {/* Contexto histórico verídico */}
            <div className="p-3 rounded bg-amber-950/20 border border-amber-500/30 text-amber-200 space-y-1 leading-relaxed text-xs">
              <span className="font-bold uppercase tracking-wider text-[10px] text-amber-400 block">
                MEMORIA HISTÓRICA DE 1982:
              </span>
              <p>{currentItem.historyText}</p>
            </div>
          </div>
        </div>

        {/* Pie del modal */}
        <div className="px-4 py-2 bg-black/90 border-t border-[var(--crt-dim,#1f6b30)] flex items-center justify-between text-[11px] text-zinc-500">
          <span>REGISTRO HISTÓRICO DOCUMENTAL</span>
          <button
            onClick={() => gameStore.setDossierOpen(false)}
            className="px-3 py-1 tactical-btn rounded font-bold uppercase text-xs"
          >
            CERRAR ARCHIVO
          </button>
        </div>
      </div>
    </div>
  );
};
