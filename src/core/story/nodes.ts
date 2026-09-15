export interface StrategicNode {
  id: string;
  name: string;
  codeName: string;
  type: 'base' | 'outpost' | 'airfield' | 'naval_zone' | 'mountain';
  coordinates: { x: number; y: number }; // Porcentaje sobre el mapa (0 a 100)
  island: 'soledad' | 'gran_malvina' | 'continente' | 'mar';
  status: 'secure' | 'contested' | 'alert' | 'critical';
  garrison: string;
  threatLevel: 'low' | 'medium' | 'high' | 'extreme';
  description: string;
  intel: string;
  activeMissionId?: string;
}

export const STRATEGIC_NODES: StrategicNode[] = [
  {
    id: 'pto-argentino',
    name: 'Puerto Argentino',
    codeName: 'PUNTO ALFA',
    type: 'airfield',
    coordinates: { x: 79, y: 48 },
    island: 'soledad',
    status: 'alert',
    garrison: 'Comando de la Brigada X / Radar TPS-43 / BAM Malvinas',
    threatLevel: 'high',
    description: 'Centro neurálgico y logístico. El radar Westinghouse TPS-43 opera las 24 horas sorteando bombardeos navales británicos nocturnos.',
    intel: 'La pista de 1250m recibe vuelos nocturnos de Hércules C-130 que burlan el bloqueo británico a ras del agua.'
  },
  {
    id: 'monte-longdon',
    name: 'Monte Longdon / Dos Hermanas',
    codeName: 'PUNTO BRAVO',
    type: 'mountain',
    coordinates: { x: 74, y: 44 },
    island: 'soledad',
    status: 'contested',
    garrison: 'Regimiento de Infantería Mecanizada 7 (RI 7)',
    threatLevel: 'extreme',
    description: 'Posición clave sobre las alturas que dominan el acceso a la capital. Clima bajo cero, viento blanco y combate cuerpo a cuerpo.',
    intel: 'Los paracaidistas británicos del 3 PARA preparan ataques nocturnos con visores pasivos de visión nocturna Starlight.'
  },
  {
    id: 'goose-green',
    name: 'Pradera del Ganso / Darwin',
    codeName: 'PUNTO CHARLIE',
    type: 'outpost',
    coordinates: { x: 57, y: 55 },
    island: 'soledad',
    status: 'critical',
    garrison: 'Fuerza de Tareas Mercedes (RI 12) / Escuadrón Pucará',
    threatLevel: 'extreme',
    description: 'Istmo estrecho de Darwin. Pista de turba de la BAM Cóndor con aviones bi-turbohélice IA-58 Pucará de apoyo cercano.',
    intel: 'Aislados del grueso de las fuerzas. Escasez de víveres calientes y munición pesada de mortero.'
  },
  {
    id: 'san-carlos',
    name: 'Estrecho de San Carlos',
    codeName: 'CALLEJÓN DE LAS BOMBAS',
    type: 'naval_zone',
    coordinates: { x: 48, y: 38 },
    island: 'soledad',
    status: 'contested',
    garrison: 'Grupo Aeronaval de Ataque / Baterías Costeras',
    threatLevel: 'high',
    description: 'Canal natural entre ambas islas donde la flota británica estableció su cabeza de playa de desembarco anfibio.',
    intel: 'Las fragatas y destructores Type 21 y Type 42 sufren pasadas a 15 metros del agua de los A-4 Skyhawk y Dagger argentinos.'
  },
  {
    id: 'bahia-fox',
    name: 'Bahía Fox / Howard',
    codeName: 'PUNTO DELTA',
    type: 'outpost',
    coordinates: { x: 34, y: 64 },
    island: 'gran_malvina',
    status: 'secure',
    garrison: 'Regimiento de Infantería 8 y 5',
    threatLevel: 'medium',
    description: 'Guarniciones en la Gran Malvina. Soportan hostigamiento de cañoneo naval nocturno y aislamiento logístico por mar.',
    intel: 'Sin pistas para cazas pesados; dependen de lanchas de desembarco que evaden patrullas de helicópteros Sea King.'
  },
  {
    id: 'rio-grande',
    name: 'Base Aeronaval Río Grande',
    codeName: 'NIDO DE EXOCET',
    type: 'base',
    coordinates: { x: 12, y: 82 },
    island: 'continente',
    status: 'secure',
    garrison: '2da Escuadrilla Aeronaval de Caza y Ataque (Super Étendard)',
    threatLevel: 'low',
    description: 'Base continental en Tierra del Fuego. Los Super Étendard armados con los preciados misiles AM-39 Exocet despegan en sigilo de radio.',
    intel: 'Stock crítico de misiles antibuque guiados. Cada disparo debe ser quirúrgico y coordinado con reabastecedores KC-130.'
  }
];
