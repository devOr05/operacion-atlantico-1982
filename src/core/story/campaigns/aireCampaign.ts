import { type CampaignStep } from './tierraCampaign';

export const AIRE_CAMPAIGN: CampaignStep[] = [
  {
    id: 'aire-1',
    stepNumber: 1,
    date: '20 DE ABRIL DE 1982',
    location: 'BASE AÉREA MILITAR RÍO GALLEGOS',
    title: 'LA PREPARACIÓN DE LOS HALCONES',
    situation: 'Te incorporás al Grupo 5 de Caza con tu reactor A-4B Skyhawk. El hangar vibra con el rugido de las turbinas. Cada vuelo será al límite del combustible.',
    choices: [
      {
        label: 'Calibrar la mira de tiro y practicar navegación a 10 metros del agua.',
        reaction: 'Volar rozando las olas será la única forma de engañar a los radares ingleses.',
        changes: { pericia: +20, coraje: +10 },
        soundEffect: 'confirm'
      },
      {
        label: 'Despegar con sobrepeso de bombas sin practicar el vuelo rasante.',
        reaction: 'El exceso de peso casi hace estrellar el avión en la pista. Daño mecánico.',
        changes: { salud: -20, pericia: -10 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'aire-2',
    stepNumber: 2,
    date: '1 DE MAYO DE 1982',
    location: 'ATLÁNTICO SUR (SOBRE EL MAR)',
    title: 'EL BAUTISMO DE FUEGO AÉREO',
    situation: 'Tu escuadrilla vuela hacia Malvinas. La radio de alerta advierte: cazas Sea Harrier británicos patrullan con misiles Sidewinder AIM-9L.',
    choices: [
      {
        label: 'Descender de inmediato a ras del mar a 500 nudos en silencio de radio.',
        reaction: 'Tu sangre fría burla los radares de los Harrier. La escuadrilla pasa desapercibida.',
        changes: { pericia: +20, liderazgo: +15, salud: +5 },
        promotedToRankIndex: 4, // Primer Teniente
        soundEffect: 'confirm'
      },
      {
        label: 'Entrar en combate cerrado frontal en altura contra los Sea Harrier.',
        reaction: '¡Combate suicida! Un misil estalla cerca de tu cola perforando el fuselaje.',
        changes: { coraje: +25, salud: -40, pericia: +10, impactoGuerra: +10 },
        soundEffect: 'alert',
        fatalText: 'Tu avión fue alcanzado por un misil aire-aire AIM-9L británico; caíste en las gélidas aguas del Atlántico Sur el 1 de mayo.'
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
        changes: { pericia: +20, salud: +5 },
        soundEffect: 'confirm'
      },
      {
        label: 'Insistir con violencia en el enganche rompiendo la válvula de combustible.',
        reaction: 'Chorros de JP-1 bañan la cabina. Pérdida crítica de combustible.',
        changes: { salud: -25, pericia: -15 },
        soundEffect: 'alert',
        fatalText: 'Te quedaste sin combustible a 200 millas del continente en medio de un temporal fuerza 8 en el Atlántico Sur.'
      }
    ]
  },
  {
    id: 'aire-4',
    stepNumber: 4,
    date: '21 DE MAYO DE 1982',
    location: 'ESTRECHO DE SAN CARLOS ("BOMB ALLEY")',
    title: 'EL VIERNES NEGRO DE LA FLOTA',
    situation: 'Entrás al estrecho a 900 km/h. Frente a vos se alzan los mástiles de fragatas británicas disparando un muro de fuego antiaéreo.',
    choices: [
      {
        label: 'Pasar a 5 metros sobre los mástiles de la fragata y soltar tres bombas de 1000 lb.',
        reaction: '¡IMPACTO DIRECTO! La fragata enemiga arde. Salís rozando el agua.',
        changes: { coraje: +30, pericia: +25, salud: -25, impactoGuerra: +25 },
        promotedToRankIndex: 5, // Capitán de Caza
        medalAwarded: 'Cruz La Nación Argentina al Heroico Valor en Combate',
        soundEffect: 'alert',
        fatalText: 'Un impacto directo de cañón antiaéreo de 40mm te alcanzó en la pasada rasante sobre la fragata británica en San Carlos.'
      },
      {
        label: 'Lanzar las bombas a mayor distancia para evitar el fuego concentrado.',
        reaction: 'Las bombas caen al agua sin estallar. Salvas el avión pero la flota sigue intacta.',
        changes: { salud: +5, coraje: -15, impactoGuerra: -10 },
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
    situation: 'El destructor Type 42 Coventry guía a los cazas ingleses. Tu escuadrilla recibe la misión de silenciarlo.',
    choices: [
      {
        label: 'Volar en formación cerrada a 10 metros y soltar las bombas a quemarropa.',
        reaction: '¡TRES BOMBAS IMPACTAN EN LA LÍNEA DE FLOTACIÓN! El Coventry se hunde en 20 minutos.',
        changes: { pericia: +25, coraje: +25, impactoGuerra: +30 },
        promotedToRankIndex: 7, // Vicecomodoro
        soundEffect: 'confirm'
      },
      {
        label: 'Trepar para lanzar señuelos chaff atrayendo el fuego sobre vos mismo.',
        reaction: 'Una esquirla de misil Sea Dart daña tu timón pero salvaste a tus tres compañeros.',
        changes: { coraje: +30, liderazgo: +25, salud: -30 },
        soundEffect: 'alert',
        fatalText: 'Tu reactor fue alcanzado de lleno por un misil antiaéreo Sea Dart lanzado por el HMS Coventry.'
      }
    ]
  },
  {
    id: 'aire-6',
    stepNumber: 6,
    date: '8 DE JUNIO DE 1982',
    location: 'BAHÍA AGRADABLE (FITZROY)',
    title: 'EL DÍA MÁS NEGRO DE LA ROYAL NAVY',
    situation: 'Dos buques de transporte británicos repletos de guardias galeses están desembarcando sin cobertura aérea.',
    choices: [
      {
        label: 'Lanzar dos oleadas sucesivas de Mirage Dagger y A-4 Skyhawk en pasada rasante.',
        reaction: 'Desastre naval inglés: los buques Sir Galahad y Sir Tristram quedan destruidos.',
        changes: { liderazgo: +30, pericia: +25, impactoGuerra: +35 },
        promotedToRankIndex: 9, // Brigadier
        soundEffect: 'confirm'
      },
      {
        label: 'Preservar los cazas en el continente por alerta meteorológica polar.',
        reaction: 'La tropa enemiga desembarca sin oposición y consolida el cerco terrestre.',
        changes: { impactoGuerra: -20, coraje: -15 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'aire-7',
    stepNumber: 7,
    date: '12 DE JUNIO DE 1982',
    location: 'ESTADO MAYOR DE LA FUERZA AÉREA',
    title: 'EL GOLPE FINAL DEL BRIGADIER GENERAL',
    situation: 'Al mando supremo de la Fuerza Aérea, recibís informes de que los portaaviones británicos están sin cazas de repuesto.',
    choices: [
      {
        label: 'Operación Aérea Total: atacar en masa al portaaviones HMS Hermes y quebrar la flota.',
        reaction: '¡VICTORIA AÉREA TOTAL! El Hermes sufre daños críticos y la Royal Navy se retira.',
        changes: { liderazgo: +40, pericia: +35, impactoGuerra: +40 },
        promotedToRankIndex: 10, // BRIGADIER GENERAL
        soundEffect: 'confirm'
      },
      {
        label: 'Cesar las salidas de combate para preservar el inventario de cazas nacional.',
        reaction: 'La falta de apoyo aéreo sella el destino de la guarnición en Puerto Argentino.',
        changes: { liderazgo: -10, impactoGuerra: -25 },
        soundEffect: 'alert'
      }
    ]
  }
];
