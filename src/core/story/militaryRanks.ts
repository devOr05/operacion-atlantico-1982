export type MilitaryBranch = 'tierra' | 'aire' | 'mar';

export interface RankInfo {
  index: number;
  title: string;
  category: 'Tropa' | 'Suboficial' | 'Oficial Subalterno' | 'Oficial Jefe' | 'Oficial Superior' | 'Alto Mando';
  isGeneralTier: boolean;
}

export const RANKS_BY_BRANCH: Record<MilitaryBranch, RankInfo[]> = {
  tierra: [
    { index: 0, title: 'Soldado Conscripto', category: 'Tropa', isGeneralTier: false },
    { index: 1, title: 'Cabo', category: 'Suboficial', isGeneralTier: false },
    { index: 2, title: 'Sargento', category: 'Suboficial', isGeneralTier: false },
    { index: 3, title: 'Subteniente', category: 'Oficial Subalterno', isGeneralTier: false },
    { index: 4, title: 'Teniente Primero', category: 'Oficial Subalterno', isGeneralTier: false },
    { index: 5, title: 'Capitán', category: 'Oficial Subalterno', isGeneralTier: false },
    { index: 6, title: 'Mayor', category: 'Oficial Jefe', isGeneralTier: false },
    { index: 7, title: 'Teniente Coronel', category: 'Oficial Jefe', isGeneralTier: false },
    { index: 8, title: 'Coronel', category: 'Oficial Superior', isGeneralTier: false },
    { index: 9, title: 'General de Brigada', category: 'Alto Mando', isGeneralTier: true },
    { index: 10, title: 'General de División', category: 'Alto Mando', isGeneralTier: true }
  ],
  aire: [
    { index: 0, title: 'Soldado Conscripto Aeronáutico', category: 'Tropa', isGeneralTier: false },
    { index: 1, title: 'Cabo Primero', category: 'Suboficial', isGeneralTier: false },
    { index: 2, title: 'Alférez Piloto', category: 'Oficial Subalterno', isGeneralTier: false },
    { index: 3, title: 'Teniente Piloto', category: 'Oficial Subalterno', isGeneralTier: false },
    { index: 4, title: 'Primer Teniente (Jefe de Escuadrilla)', category: 'Oficial Subalterno', isGeneralTier: false },
    { index: 5, title: 'Capitán de Caza', category: 'Oficial Subalterno', isGeneralTier: false },
    { index: 6, title: 'Mayor (Comandante de Escuadrón)', category: 'Oficial Jefe', isGeneralTier: false },
    { index: 7, title: 'Vicecomodoro', category: 'Oficial Jefe', isGeneralTier: false },
    { index: 8, title: 'Comodoro', category: 'Oficial Superior', isGeneralTier: false },
    { index: 9, title: 'Brigadier', category: 'Alto Mando', isGeneralTier: true },
    { index: 10, title: 'Brigadier General', category: 'Alto Mando', isGeneralTier: true }
  ],
  mar: [
    { index: 0, title: 'Marinero de Primera / Conscripto IMARA', category: 'Tropa', isGeneralTier: false },
    { index: 1, title: 'Cabo Principal', category: 'Suboficial', isGeneralTier: false },
    { index: 2, title: 'Guardiamarina', category: 'Oficial Subalterno', isGeneralTier: false },
    { index: 3, title: 'Teniente de Corbeta', category: 'Oficial Subalterno', isGeneralTier: false },
    { index: 4, title: 'Teniente de Fragata', category: 'Oficial Subalterno', isGeneralTier: false },
    { index: 5, title: 'Teniente de Navío (Piloto Exocet)', category: 'Oficial Subalterno', isGeneralTier: false },
    { index: 6, title: 'Capitán de Corbeta', category: 'Oficial Jefe', isGeneralTier: false },
    { index: 7, title: 'Capitán de Fragata', category: 'Oficial Jefe', isGeneralTier: false },
    { index: 8, title: 'Capitán de Navío', category: 'Oficial Superior', isGeneralTier: false },
    { index: 9, title: 'Contraalmirante', category: 'Alto Mando', isGeneralTier: true },
    { index: 10, title: 'Almirante de la Flota', category: 'Alto Mando', isGeneralTier: true }
  ]
};

export const ARGENTINE_PROVINCES = [
  'Buenos Aires',
  'Córdoba',
  'Corrientes',
  'Santa Fe',
  'Chaco',
  'Mendoza',
  'Entre Ríos',
  'Tucumán',
  'Salta',
  'Misiones',
  'Santiago del Estero',
  'San Juan',
  'Jujuy',
  'Río Negro',
  'Neuquén',
  'Formosa',
  'Chubut',
  'San Luis',
  'Catamarca',
  'La Rioja',
  'La Pampa',
  'Santa Cruz',
  'Tierra del Fuego',
  'Ciudad Autónoma de Buenos Aires'
];
