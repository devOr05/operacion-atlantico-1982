import { type CampaignStep } from './tierraCampaign';

export const AIRE_CAMPAIGN: CampaignStep[] = [
  {
    id: 'aire-1',
    stepNumber: 1,
    date: '20 DE ABRIL DE 1982',
    location: 'BASE AÉREA MILITAR RÍO GALLEGOS',
    title: 'LA LLEGADA AL SUR',
    situation: 'Te incorporás al Grupo 5 de Caza con tu reactor A-4B Skyhawk. El hangar vibra con el rugido de las turbinas Pratt & Whitney.',
    choices: [
      {
        label: 'Calibrar la mira de tiro y practicar navegación a 10 metros del agua.',
        reaction: 'Volar rozando las olas será la única forma de engañar a los radares ingleses.',
        changes: { pericia: +20, coraje: +10 },
        soundEffect: 'confirm'
      },
      {
        label: 'Revisar minuciosamente los sistemas de combustible y las bombas de 1000 lb.',
        reaction: 'El combustible será el límite entre volver al continente o caer en el mar.',
        changes: { salud: +10, pericia: +15 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'aire-2',
    stepNumber: 2,
    date: '1 DE MAYO DE 1982',
    location: 'ATLÁNTICO SUR (SOBRE EL MAR)',
    title: 'EL BAUTISMO DE FUEGO AÉREO',
    situation: 'Tu escuadrilla despega hacia Puerto Argentino. La radio avisa: cazas Sea Harrier británicos patrullan la zona con misiles Sidewinder AIM-9L.',
    choices: [
      {
        label: 'Entrar en combate cerrado maniobrando a alta velocidad.',
        reaction: 'Esquivás un misil en picada y alcanzás con cañones de 20mm a un Harrier.',
        changes: { coraje: +25, pericia: +20, impactoGuerra: +15 },
        promotedToRankIndex: 4, // Primer Teniente
        medalAwarded: 'Distinción al Mérito Aeronáutico en Combate',
        soundEffect: 'alert'
      },
      {
        label: 'Descender a ras del agua en silencio de radio total y cumplir la misión.',
        reaction: 'Tu sangre fría salva a la escuadrilla de la emboscada enemiga.',
        changes: { liderazgo: +20, pericia: +15, salud: +10 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'aire-3',
    stepNumber: 3,
    date: '9 DE MAYO DE 1982',
    location: 'ATLÁNTICO SUR - 50°S',
    title: 'REABASTECIMIENTO EN VUELO (KC-130)',
    situation: 'Un temporal helado sacude el avión. La lanza de reabastecimiento tiene que enganchar la canasta del Hércules con turbulencia extrema.',
    choices: [
      {
        label: 'Ajustar gases milimétricamente y conectar de un solo intento.',
        reaction: '¡Enganche perfecto! Cargás los litros necesarios para llegar a las islas.',
        changes: { pericia: +25, salud: +10 },
        soundEffect: 'confirm'
      },
      {
        label: 'Abortar el reabastecimiento propio para que cargue combustible tu numeral.',
        reaction: 'Espíritu de camaradería aeronáutica ejemplar en la escuadrilla.',
        changes: { liderazgo: +25, coraje: +15 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'aire-4',
    stepNumber: 4,
    date: '21 DE MAYO DE 1982',
    location: 'ESTRECHO DE SAN CARLOS ("BOMB ALLEY")',
    title: 'EL VIERNES NEGRO DE LA ROYAL NAVY',
    situation: 'Entrás al estrecho a 900 km/h. Frente a vos se alzan los mástiles de fragatas británicas disparando un muro de fuego antiaéreo.',
    choices: [
      {
        label: 'Pasar a 5 metros sobre los mástiles y soltar tres bombas de 1000 lb.',
        reaction: '¡IMPACTO DIRECTO! La fragata enemiga estalla en llamas. Vuelo legendario.',
        changes: { coraje: +30, pericia: +25, impactoGuerra: +30 },
        promotedToRankIndex: 5, // Capitán de Caza
        medalAwarded: 'Cruz La Nación Argentina al Heroico Valor en Combate',
        soundEffect: 'alert'
      },
      {
        label: 'Disparar cañones sobre los radares directores de tiro de la fragata.',
        reaction: 'Cegás las defensas enemigas permitiendo que la segunda oleada ataque.',
        changes: { liderazgo: +25, pericia: +20, impactoGuerra: +20 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'aire-5',
    stepNumber: 5,
    date: '25 DE MAYO DE 1982',
    location: 'NORTE DE LA ISLA SOLEDAD',
    title: 'ATAQUE AL DESTRUCTOR HMS COVENTRY',
    situation: 'El destructor Type 42 Coventry guía a los Sea Harrier. Te toca liderar la sección de ataque en rasante.',
    choices: [
      {
        label: 'Volar en formación cerrada y soltar las bombas a quemarropa.',
        reaction: '¡TRES BOMBAS IMPACTAN EN LA LÍNEA DE FLOTACIÓN! El Coventry se hunde.',
        changes: { pericia: +30, coraje: +30, impactoGuerra: +35 },
        promotedToRankIndex: 6, // Mayor (Comandante de Escuadrón)
        soundEffect: 'alert'
      },
      {
        label: 'Maniobrar como señuelo para absorber el fuego y liberar a tus compañeros.',
        reaction: 'Esquivás dos misiles Sea Dart en una trepada violenta. Victoria total.',
        changes: { coraje: +35, liderazgo: +25, salud: -5 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'aire-6',
    stepNumber: 6,
    date: '30 DE MAYO DE 1982',
    location: 'ESTE DE MALVINAS',
    title: 'LA OPERACIÓN INVINCIBLE',
    situation: 'Misión conjunta con la Armada. Cuatro A-4C siguen la estela del misil Exocet buscando al portaaviones HMS Invincible.',
    choices: [
      {
        label: 'Guiar el avión entre la humareda del misil y bombardear la cubierta de vuelo.',
        reaction: '¡IMPACTO CONFIRMADO EN LA ISLA DEL PORTAAVIONES! Fuego en cubierta.',
        changes: { pericia: +35, coraje: +35, impactoGuerra: +40 },
        promotedToRankIndex: 7, // Vicecomodoro
        medalAwarded: 'Héroe de la Batalla Aeronaval',
        soundEffect: 'alert'
      },
      {
        label: 'Retornar rasante al límite del combustible con el parabrisas quemado.',
        reaction: 'Aterrizaje milagroso en Río Grande solo con vapores de combustible.',
        changes: { pericia: +30, salud: +15, liderazgo: +20 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'aire-7',
    stepNumber: 7,
    date: '8 DE JUNIO DE 1982',
    location: 'BAHÍA AGRADABLE',
    title: 'EL DÍA MÁS NEGRO DE LA FLOTA',
    situation: 'Como Jefe de Operaciones Aéreas, detectás dos buques de desembarco británicos repletos de tropas en Fitzroy.',
    choices: [
      {
        label: 'Lanzar dos oleadas sucesivas de Mirage Dagger y A-4 Skyhawk.',
        reaction: 'Desastre total para la flota británica: Sir Galahad y Sir Tristram arden.',
        changes: { liderazgo: +30, impactoGuerra: +35, pericia: +25 },
        promotedToRankIndex: 8, // Comodoro
        soundEffect: 'confirm'
      },
      {
        label: 'Asegurar patrullas de cazas Mirage III en altura para frenar a los Harrier.',
        reaction: 'Protegés a los aviones de ataque y derribás a un caza enemigo.',
        changes: { pericia: +30, liderazgo: +25, coraje: +20 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'aire-8',
    stepNumber: 8,
    date: '12 DE JUNIO DE 1982',
    location: 'COMANDO AÉREO ESTRATÉGICO',
    title: 'ASCENSO A BRIGADIER GENERAL',
    situation: 'Tus victorias aéreas te colocan al frente de la Fuerza Aérea. Como Brigadier General, diseñás el golpe aéreo definitivo.',
    choices: [
      {
        label: 'Operación aérea total: neutralizar el portaaviones HMS Hermes y cortar el apoyo aéreo británico.',
        reaction: '¡VICTORIA AÉREA TOTAL! La Royal Navy queda sin cobertura aérea y se retira.',
        changes: { liderazgo: +40, pericia: +35, impactoGuerra: +50 },
        promotedToRankIndex: 10, // BRIGADIER GENERAL MÁXIMO
        soundEffect: 'confirm'
      },
      {
        label: 'Establecer puente aéreo nocturno rasante con C-130 para abastecer a la capital.',
        reaction: 'Los aviones Hércules salvan a la guarnición con munición y alimentos.',
        changes: { liderazgo: +35, salud: +20, impactoGuerra: +30 },
        promotedToRankIndex: 9, // Brigadier
        soundEffect: 'confirm'
      }
    ]
  }
];
