import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Compass, 
  Radio 
} from 'lucide-react';
import { STRATEGIC_NODES } from '../../core/story/nodes';

interface TacticalMapProps {
  currentLocationName?: string;
  stepNumber?: number;
  branch?: string;
}

export const TacticalMap: React.FC<TacticalMapProps> = ({ 
  currentLocationName = '', 
  stepNumber = 1,
  branch = 'tierra' 
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('pto-argentino');
  const [activeBlipPos, setActiveBlipPos] = useState<{ x: number; y: number }>({ x: 790, y: 310 });

  // Mapear la ubicación actual del paso al nodo más cercano
  useEffect(() => {
    const loc = currentLocationName.toUpperCase();
    let targetNodeId = 'pto-argentino';

    if (loc.includes('LONGDON') || loc.includes('DOS HERMANAS') || loc.includes('ZAPADOR')) {
      targetNodeId = 'monte-longdon';
    } else if (loc.includes('SAN CARLOS')) {
      targetNodeId = 'san-carlos';
    } else if (loc.includes('GOOSE GREEN') || loc.includes('DARWIN') || loc.includes('FITZROY')) {
      targetNodeId = 'goose-green';
    } else if (loc.includes('RÍO GRANDE') || loc.includes('RÍO GALLEGOS') || loc.includes('PALOMAR') || loc.includes('BELGRANO')) {
      targetNodeId = 'rio-grande';
    } else if (loc.includes('FOX') || loc.includes('HOWARD')) {
      targetNodeId = 'bahia-fox';
    }

    setSelectedNodeId(targetNodeId);

    const node = STRATEGIC_NODES.find(n => n.id === targetNodeId);
    if (node) {
      setActiveBlipPos({
        x: (node.coordinates.x / 100) * 1000,
        y: (node.coordinates.y / 100) * 650
      });
    }
  }, [currentLocationName, stepNumber]);

  const selectedNode = STRATEGIC_NODES.find((n) => n.id === selectedNodeId) || STRATEGIC_NODES[0];

  return (
    <div className="relative w-full h-full flex flex-col bg-[#030905] overflow-hidden tactical-border rounded-lg select-none font-mono-military">
      {/* Barra de estado superior del radar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-black/80 border-b border-[var(--crt-dim,#1f6b30)] text-xs z-20">
        <div className="flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-[var(--crt-primary,#55ff77)] animate-spin" style={{ animationDuration: '12s' }} />
          <span className="font-bold text-[var(--crt-primary,#55ff77)] text-[11px] sm:text-xs">
            TOAS • TEATRO {branch.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[var(--crt-dim,#1f6b30)]">
          <span className="hidden sm:inline">RADAR TPS-43 BARRIDO 360°</span>
          <span className="text-[var(--crt-accent,#aaffbb)] font-bold">51°45'S 59°00'W</span>
        </div>
      </div>

      {/* Pantalla del Radar SVG con animaciones */}
      <div className="relative flex-1 w-full min-h-[220px] sm:min-h-[280px] flex items-center justify-center p-1">
        <svg 
          viewBox="0 0 1000 650" 
          className="w-full h-full max-h-[460px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="radarBackdrop" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(10, 35, 18, 0.4)" />
              <stop offset="70%" stopColor="rgba(4, 16, 8, 0.7)" />
              <stop offset="100%" stopColor="rgba(2, 8, 4, 0.95)" />
            </radialGradient>

            <linearGradient id="radarSweepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--crt-primary, #55ff77)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--crt-primary, #55ff77)" stopOpacity="0" />
            </linearGradient>

            <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--crt-dim, #1f6b30)" strokeWidth="0.5" strokeOpacity="0.35" />
            </pattern>
          </defs>

          {/* Cuadrícula de coordenadas */}
          <rect width="1000" height="650" fill="url(#radarBackdrop)" />
          <rect width="1000" height="650" fill="url(#gridPattern)" />

          {/* Círculos concéntricos de alcance de radar */}
          <g transform="translate(680, 320)" opacity="0.4">
            <circle r="90" fill="none" stroke="var(--crt-dim, #1f6b30)" strokeWidth="1.5" strokeDasharray="4 6" />
            <circle r="180" fill="none" stroke="var(--crt-dim, #1f6b30)" strokeWidth="1.5" />
            <circle r="270" fill="none" stroke="var(--crt-dim, #1f6b30)" strokeWidth="1.5" strokeDasharray="6 8" />
            <circle r="360" fill="none" stroke="var(--crt-dim, #1f6b30)" strokeWidth="1" />
            <line x1="-380" y1="0" x2="380" y2="0" stroke="var(--crt-dim, #1f6b30)" strokeWidth="1" strokeDasharray="2 4" />
            <line x1="0" y1="-380" x2="0" y2="380" stroke="var(--crt-dim, #1f6b30)" strokeWidth="1" strokeDasharray="2 4" />
          </g>

          {/* HAZ DE BARRIDO DE RADAR GIRATORIO TPS-43 */}
          <g transform="translate(680, 320)" opacity="0.65" pointerEvents="none">
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="4.5s"
                repeatCount="indefinite"
              />
              <path d="M 0 0 L 370 -120 A 380 380 0 0 0 0 -380 Z" fill="url(#radarSweepGradient)" />
              <line x1="0" y1="0" x2="370" y2="-120" stroke="var(--crt-accent, #aaffbb)" strokeWidth="2" />
            </g>
          </g>

          {/* TIERRA DEL FUEGO (CONTINENTE) */}
          <g id="continente" opacity="0.8">
            <path 
              d="M 0,460 Q 60,490 90,520 T 130,580 L 110,650 L 0,650 Z" 
              fill="rgba(15, 45, 22, 0.45)" 
              stroke="var(--crt-primary, #55ff77)" 
              strokeWidth="1.5" 
            />
            <text x="30" y="580" fill="var(--crt-dim, #1f6b30)" fontSize="13" fontFamily="monospace" letterSpacing="2">
              TIERRA DEL FUEGO
            </text>
            <text x="30" y="600" fill="var(--crt-accent, #aaffbb)" fontSize="10" fontFamily="monospace">
              BAM RÍO GRANDE
            </text>
          </g>

          {/* ISLA GRAN MALVINA */}
          <g id="gran-malvina">
            <path 
              d="M 330,170 Q 360,150 410,180 T 430,220 T 450,260 T 420,320 T 390,390 T 340,430 T 290,410 T 270,340 T 310,270 T 300,210 Z" 
              fill="rgba(18, 55, 26, 0.6)" 
              stroke="var(--crt-primary, #55ff77)" 
              strokeWidth="2" 
            />
            <path d="M 330,410 Q 350,380 370,410" fill="none" stroke="var(--crt-dim, #1f6b30)" strokeWidth="1.5" />
            <text x="315" y="300" fill="var(--crt-accent, #aaffbb)" fontSize="12" fontFamily="monospace" opacity="0.75" letterSpacing="1">
              GRAN MALVINA
            </text>
          </g>

          {/* ESTRECHO DE SAN CARLOS */}
          <g id="estrecho-san-carlos">
            <path 
              d="M 440,190 Q 460,250 450,310 T 435,380" 
              fill="none" 
              stroke="var(--crt-dim, #1f6b30)" 
              strokeWidth="1.5" 
              strokeDasharray="3 3" 
            />
            <text x="410" y="240" fill="var(--crt-dim, #1f6b30)" fontSize="10" fontFamily="monospace" transform="rotate(-75 420 240)">
              ESTRECHO DE SAN CARLOS
            </text>
          </g>

          {/* ISLA SOLEDAD Y LAFONIA */}
          <g id="soledad">
            <path 
              d="M 480,180 Q 540,160 620,170 T 750,210 T 810,270 T 790,340 T 710,330 T 650,340 T 580,310 T 530,270 T 470,240 Z" 
              fill="rgba(18, 55, 26, 0.6)" 
              stroke="var(--crt-primary, #55ff77)" 
              strokeWidth="2" 
            />
            <path 
              d="M 570,340 Q 640,350 670,390 T 660,460 T 590,490 T 530,460 T 540,380 Z" 
              fill="rgba(18, 55, 26, 0.5)" 
              stroke="var(--crt-primary, #55ff77)" 
              strokeWidth="1.8" 
            />
            <text x="630" y="250" fill="var(--crt-accent, #aaffbb)" fontSize="12" fontFamily="monospace" opacity="0.75" letterSpacing="1">
              ISLA SOLEDAD
            </text>
            <text x="575" y="420" fill="var(--crt-dim, #1f6b30)" fontSize="10" fontFamily="monospace" opacity="0.7">
              LAFONIA
            </text>
          </g>

          {/* VECTOR DINÁMICO DE MOVIMIENTO POR TURNO */}
          <g id="vector-turno" opacity="0.95">
            {/* Línea de vector con animación fluida de trazos */}
            <line 
              x1="120" 
              y1="530" 
              x2={activeBlipPos.x} 
              y2={activeBlipPos.y} 
              stroke="#ffcc00" 
              strokeWidth="2" 
              strokeDasharray="8 6" 
            >
              <animate attributeName="stroke-dashoffset" values="28;0" dur="1s" repeatCount="indefinite" />
            </line>

            {/* Marcador táctico con anillo expansivo continuo */}
            <circle 
              cx={activeBlipPos.x} 
              cy={activeBlipPos.y} 
              fill="none" 
              stroke="#ffcc00" 
              strokeWidth="2" 
            >
              <animate attributeName="r" values="8;30;8" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.2;1" dur="1.8s" repeatCount="indefinite" />
            </circle>

            <circle 
              cx={activeBlipPos.x} 
              cy={activeBlipPos.y} 
              r="5" 
              fill="#ffcc00" 
            />

            {/* Retícula cruzada */}
            <line x1={activeBlipPos.x - 12} y1={activeBlipPos.y} x2={activeBlipPos.x + 12} y2={activeBlipPos.y} stroke="#ffcc00" strokeWidth="1.5" />
            <line x1={activeBlipPos.x} y1={activeBlipPos.y - 12} x2={activeBlipPos.x} y2={activeBlipPos.y + 12} stroke="#ffcc00" strokeWidth="1.5" />

            <text 
              x={activeBlipPos.x + 14} 
              y={activeBlipPos.y - 10} 
              fill="#ffcc00" 
              fontSize="11" 
              fontFamily="monospace" 
              fontWeight="bold"
              className="drop-shadow-[0_1px_3px_black]"
            >
              TURNO {stepNumber}: {currentLocationName.toUpperCase()}
            </text>
          </g>

          {/* NODOS ESTRATÉGICOS INTERACTIVOS */}
          {STRATEGIC_NODES.map((node) => {
            const cx = (node.coordinates.x / 100) * 1000;
            const cy = (node.coordinates.y / 100) * 650;
            const isSelected = selectedNodeId === node.id;

            let markerColor = 'var(--crt-primary, #55ff77)';
            if (node.status === 'critical') markerColor = '#ff4444';
            else if (node.status === 'contested') markerColor = '#ffbb00';

            return (
              <g 
                key={node.id} 
                transform={`translate(${cx}, ${cy})`}
                className="cursor-pointer group"
                onClick={() => setSelectedNodeId(node.id)}
              >
                <circle 
                  r={isSelected ? "14" : "9"} 
                  fill="rgba(4, 18, 8, 0.8)" 
                  stroke={markerColor} 
                  strokeWidth={isSelected ? "2.5" : "1.5"} 
                />
                <circle 
                  r={isSelected ? "5" : "3.5"} 
                  fill={markerColor} 
                />

                {isSelected && (
                  <g stroke={markerColor} strokeWidth="1.5">
                    <line x1="-18" y1="0" x2="-8" y2="0" />
                    <line x1="8" y1="0" x2="18" y2="0" />
                    <line x1="0" y1="-18" x2="0" y2="-8" />
                    <line x1="0" y1="8" x2="0" y2="18" />
                  </g>
                )}

                <text 
                  x="14" 
                  y="4" 
                  fill={isSelected ? "var(--crt-accent, #aaffbb)" : "var(--crt-primary, #55ff77)"} 
                  fontSize={isSelected ? "12" : "10"} 
                  fontWeight={isSelected ? "bold" : "normal"}
                  fontFamily="monospace"
                  className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                >
                  {node.name.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Panel de información del nodo seleccionado: UBICADO ABAJO DEL MAPA, NO ENCIMA */}
      {selectedNode && (
        <div className="p-2 sm:p-2.5 bg-black/95 border-t border-[var(--crt-dim,#1f6b30)] text-[11px] font-mono-military shrink-0">
          <div className="flex items-center justify-between gap-1 border-b border-[var(--crt-dim,#1f6b30)]/60 pb-1 mb-1">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[var(--crt-primary,#55ff77)]" />
              <span className="font-bold text-[var(--crt-primary,#55ff77)] uppercase truncate">
                {selectedNode.name}
              </span>
            </div>
            <span className={`px-1.5 py-0.5 text-[9px] rounded font-bold uppercase ${
              selectedNode.status === 'critical' ? 'bg-red-950 text-red-400 border border-red-600' :
              selectedNode.status === 'contested' ? 'bg-yellow-950 text-yellow-400 border border-yellow-600' :
              'bg-green-950 text-green-400 border border-green-600'
            }`}>
              {selectedNode.status}
            </span>
          </div>
          <p className="text-[10px] sm:text-xs text-zinc-300 leading-snug line-clamp-2">
            {selectedNode.description}
          </p>
        </div>
      )}

      {/* Pie del radar */}
      <div className="flex items-center justify-between px-2.5 py-1 bg-black/90 border-t border-[var(--crt-dim,#1f6b30)] text-[10px] text-zinc-400 shrink-0">
        <span className="flex items-center gap-1.5 text-[var(--crt-accent,#aaffbb)]">
          <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
          ECOS TÁCTICOS ACTIVOS
        </span>
        <span className="text-[var(--crt-dim,#1f6b30)]">HAZ ELECTRÓNICO SINTETIZADO</span>
      </div>
    </div>
  );
};
