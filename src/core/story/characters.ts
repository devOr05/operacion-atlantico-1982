export interface Character {
  id: string;
  name: string;
  rank: string;
  callsign: string;
  role: string;
  branch: 'Armada' | 'Ejército' | 'Fuerza Aérea' | 'Diplomacia';
  avatarInitials: string;
  bio: string;
}

export const CHARACTERS: Record<string, Character> = {
  curilovic: {
    id: 'curilovic',
    name: 'Roberto Curilovic',
    rank: 'Capitán de Corbeta',
    callsign: 'VASCO',
    role: 'Comandante de Escuadrilla Super Étendard',
    branch: 'Armada',
    avatarInitials: 'RC',
    bio: 'Piloto naval veterano con base en Río Grande. Experto en navegación a ciegas y ataque rasante a 15 metros sobre el oleaje del Atlántico Sur.'
  },
  baldini: {
    id: 'baldini',
    name: 'Juan Domingo Baldini',
    rank: 'Subteniente',
    callsign: 'CÓNDOR-7',
    role: 'Jefe de Sección de Tiradores - Monte Longdon',
    branch: 'Ejército',
    avatarInitials: 'JB',
    bio: 'Oficial de 24 años a cargo de soldados conscriptos en las crestas rocosas de Longdon. Duerme en la trinchera y comparte las raciones con su tropa.'
  },
  silva: {
    id: 'silva',
    name: 'Carlos Silva',
    rank: 'Mayor de Comunicaciones',
    callsign: 'CENTINELA',
    role: 'Jefe del Radar TPS-43 Puerto Argentino',
    branch: 'Fuerza Aérea',
    avatarInitials: 'CS',
    bio: 'Mantiene operativo el radar tridimensional esquivando los misiles antirradar Shrike británicos cambiando de frecuencia y apagando la antena en el segundo exacto.'
  },
  crippa: {
    id: 'crippa',
    name: 'Owen Crippa',
    rank: 'Teniente de Navío',
    callsign: 'LECHUZA',
    role: 'Piloto de Caza Liviano Aeronaval',
    branch: 'Armada',
    avatarInitials: 'OC',
    bio: 'Pionero en vuelos de exploración solitaria sobre el Estrecho de San Carlos a bordo de reactores livianos MB-339.'
  },
  diplomatico: {
    id: 'diplomatico',
    name: 'Embajador Estévez',
    rank: 'Ministro Plenipotenciario',
    callsign: 'PALACIO SAN MARTÍN',
    role: 'Enlace en Naciones Unidas (Nueva York / Ginebra)',
    branch: 'Diplomacia',
    avatarInitials: 'ME',
    bio: 'Negocia contra reloj ante el Consejo de Seguridad de la ONU intentando lograr un cese del fuego honorable antes de la ofensiva final.'
  }
};
