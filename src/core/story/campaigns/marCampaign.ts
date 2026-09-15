import { type CampaignStep, type RankTier } from './campaignTypes';

// ============================================================================
// 1. CAMPAÑA DE TROPA / MARINERO DE PRIMERA (ARA BELGRANO / IMARA)
// ============================================================================
export const MAR_TROPA_CAMPAIGN: CampaignStep[] = [
  {
    id: 'mar-tropa-1',
    stepNumber: 1,
    date: '16 DE ABRIL DE 1982',
    location: 'BASE NAVAL PUERTO BELGRANO / MAR AUSTRAL',
    title: 'ZARPADA A BORDO DEL CRUCERO ARA GENERAL BELGRANO',
    situation: 'Sos marinero conscripto a bordo del colosal crucero ARA General Belgrano con 1.093 tripulantes. Navegan hacia el sur patrullando el banco de Burdwood fuera de la zona de exclusión británica.',
    choices: [
      {
        label: 'Revisar las válvulas de las calderas y los sistemas de bombas de achique en sala de máquinas.',
        reaction: 'Conocimiento vital de las entrañas del buque que resultará crucial ante una emergencia.',
        changes: { pericia: +15, salud: +10, coraje: +5 },
        soundEffect: 'confirm'
      },
      {
        label: 'Ayudar al suboficial armero a engrasar los mecanismos de la torreta triple de 152mm.',
        reaction: 'Los cañones principales quedan calibrados para un eventual combate de superficie.',
        changes: { pericia: +10, coraje: +10, impactoGuerra: +10 },
        soundEffect: 'confirm'
      },
      {
        label: 'Quedarte en cubierta fumando con compañeros mirando la estela del mar embravecido.',
        reaction: 'Camaradería entre marineros, aunque el viento antártico congela las extremidades.',
        changes: { liderazgo: +10, salud: -10 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'mar-tropa-2',
    stepNumber: 2,
    date: '2 DE MAYO DE 1982',
    location: 'ATLÁNTICO SUR (AL SUR DE LAS ISLAS)',
    title: 'EL TORPEDEO DEL ARA GENERAL BELGRANO',
    situation: 'A las 16:01 hs, dos torpedos Mk 8 del submarino nuclear HMS Conqueror impactan la sala de máquinas y la proa. Se corta la luz, sube humo espeso y el crucero se escora rápidamente a babor.',
    choices: [
      {
        label: 'Descender a oscuras a los camarotes inundados para rescatar a camaradas atrapados.',
        reaction: '¡Heroísmo inmenso! Lográs sacar a cuatro compañeros a la cubierta antes de que se selle el mamparo.',
        changes: { coraje: +30, liderazgo: +30, salud: -25, impactoGuerra: +20 },
        medalAwarded: 'La Nación Argentina al Heroico Valor en Combate',
        soundEffect: 'alert',
        fatalText: 'Quedaste atrapado en la sala de calderas mientras asegurabas la salida de tus compañeros.'
      },
      {
        label: 'Correr a cubierta, soltar las balsas salvavidas autoinflables y ayudar en el desembarco ordenado.',
        reaction: 'Disciplina naval ejemplar: decenas de vidas se salvan gracias al despliegue rápido de balsas.',
        changes: { liderazgo: +20, pericia: +15, coraje: +15 },
        soundEffect: 'confirm'
      },
      {
        label: 'Tirarte al agua helada por pánico sin chaleco salvavidas.',
        reaction: 'El choque térmico a -2°C te paraliza al instante. El instinto de supervivencia es tu única salvación.',
        changes: { salud: -35, coraje: -20 },
        soundEffect: 'alert',
        fatalText: 'La hipotermia extrema en las aguas gélidas del Atlántico Sur no te dio tregua.'
      }
    ]
  },
  {
    id: 'mar-tropa-3',
    stepNumber: 3,
    date: '3 DE MAYO DE 1982',
    location: 'BALSAS SALVAVIDAS EN ALTA MAR',
    title: '30 HORAS EN EL MAR HELADO',
    situation: 'Estás en una balsa de goma con 18 tripulantes en medio de un temporal con olas de 8 metros y sensación térmica de -20°C. Varios sufren principio de congelamiento.',
    choices: [
      {
        label: 'Cantar el Himno Nacional Argentino y ordenar turnos de flexiones para no caer en el sueño blanco letal.',
        reaction: 'Tu temple moral mantiene a todos despiertos hasta que el aviso ARA Gurruchaga los avista.',
        changes: { liderazgo: +30, coraje: +25, salud: -15 },
        soundEffect: 'confirm'
      },
      {
        label: 'Racionar las pastillas de glucosa y el agua potable gota a gota entre todos los heridos.',
        reaction: 'Mantenés la disciplina y la calma en la balsa. Todos sobreviven a la odisea.',
        changes: { liderazgo: +20, pericia: +15, salud: +10 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'mar-tropa-4',
    stepNumber: 4,
    date: '14 DE JUNIO DE 1982',
    location: 'PUERTO DESEADO / HOSPITAL NAVAL',
    title: 'EL JURAMENTO DEL SOBREVIVIENTE',
    situation: 'Llegás a tierra firme con vida. En el hospital naval te entregan una medalla y te abrazan tus familiares entre llanto y admiración patriótica.',
    choices: [
      {
        label: '"El Belgrano no se rindió jamás. Volvería a embarcarme por las Malvinas mil veces más".',
        reaction: 'Espíritu de acero. Tu testimonio honra para siempre la memoria de los 323 tripulantes caídos.',
        changes: { coraje: +30, liderazgo: +25, impactoGuerra: +15 },
        soundEffect: 'confirm'
      }
    ]
  }
];

// ============================================================================
// 2. CAMPAÑA DE OFICIAL / PILOTO AERONAVAL (TENIENTE DE NAVÍO - SUPER ÉTENDARD)
// ============================================================================
export const MAR_OFICIAL_CAMPAIGN: CampaignStep[] = [
  {
    id: 'mar-ofic-1',
    stepNumber: 1,
    date: '4 DE MAYO DE 1982',
    location: 'BAM RÍO GRANDE (2DA ESCUADRILLA AERONAVAL)',
    title: 'EL DISPARO DEL EXOCET AL HMS SHEFFIELD',
    situation: 'Sos Teniente de Navío y piloto de Super Étendard. El avión explorador Neptune detecta un contacto de la flota inglesa. Despegás armado con el misil antibuque AM-39 Exocet.',
    choices: [
      {
        label: 'Volar a 10 metros sobre el agua en silencio de radio, subir 10 segundos para encender el radar Agave, enganchar el blanco y disparar.',
        reaction: '¡MISIL DISPARADO Y ENCAMINADO! El Exocet impacta de lleno en el HMS Sheffield incendiándolo por completo.',
        changes: { pericia: +30, coraje: +25, impactoGuerra: +45, liderazgo: +20 },
        medalAwarded: 'La Nación Argentina al Heroico Valor en Combate',
        soundEffect: 'alert'
      },
      {
        label: 'Mantener el radar encendido continuamente para asegurar un guiado perfecto del misil.',
        reaction: 'El destructor detecta tus emisiones de radar y activa contramedidas chaff desviando el misil.',
        changes: { pericia: -15, impactoGuerra: -20, coraje: +10 },
        soundEffect: 'alert'
      },
      {
        label: 'Abortar si las condiciones del viento polar cruzan el límite de seguridad del ala.',
        reaction: 'Preservás el preciado avión, pero perdés la oportunidad de oro de golpear a la Task Force.',
        changes: { liderazgo: -20, coraje: -15, impactoGuerra: -25 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'mar-ofic-2',
    stepNumber: 2,
    date: '25 DE MAYO DE 1982',
    location: 'NORESTE DE MALVINAS',
    title: 'EL ATAQUE AL ATLANTIC CONVEYOR',
    situation: 'Día de la Patria. Nueva misión de Super Étendard guiada por reabastecimiento en vuelo con KC-130. Se detectan buques capitales de la flota británica.',
    choices: [
      {
        label: 'Disparar el misil Exocet al blanco más grande en pantalla (el buque portacontenedores de helicópteros Atlantic Conveyor).',
        reaction: '¡IMPACTO DESTRUCTOR! Se hunde el Atlantic Conveyor con todos los helicópteros Chinook y suministros de la Task Force.',
        changes: { impactoGuerra: +45, pericia: +25, liderazgo: +25, coraje: +20 },
        promotedToRankIndex: 6, // Capitán de Corbeta
        soundEffect: 'alert'
      },
      {
        label: 'Buscar la silueta del portaaviones HMS Hermes a mayor profundidad de la flota enemiga.',
        reaction: 'La cortina de misiles Sea Dart de escolta te obliga a disparar al límite sin confirmar impacto.',
        changes: { coraje: +20, pericia: +10, impactoGuerra: +15 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'mar-ofic-3',
    stepNumber: 3,
    date: '30 DE MAYO DE 1982',
    location: 'ESTE DE MALVINAS',
    title: 'EL ATAQUE CONJUNTO AL HMS INVINCIBLE',
    situation: 'Misión ultra secreta combinada con 4 A-4C Skyhawk de la Fuerza Aérea. Tu Super Étendard lleva el último misil Exocet AM-39 disponible en todo el país.',
    choices: [
      {
        label: 'Acelerar a Mach 0.93, enganchar la proa del portaaviones HMS Invincible y lanzar el último Exocet de la República.',
        reaction: '¡MISIL LANZADO CON PRECISIÓN QUIRÚRGICA! El misil abre brecha y los cazas de la FAA completan el bombardeo.',
        changes: { impactoGuerra: +50, pericia: +30, coraje: +30, liderazgo: +25 },
        medalAwarded: 'Cruz La Nación Argentina al Heroico Valor en Combate',
        soundEffect: 'alert'
      },
      {
        label: 'Dudar por turbulencia severa en el reabastecimiento en vuelo y eyectar tanques suplementarios.',
        reaction: 'Perdés alcance y debés retornar a la base sin disparar el misil.',
        changes: { liderazgo: -25, impactoGuerra: -30, coraje: -15 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'mar-ofic-4',
    stepNumber: 4,
    date: '14 DE JUNIO DE 1982',
    location: 'BASE AERONAVAL COMANDANTE ESPORA',
    title: 'EL DESTINO DE LA AVIACIÓN NAVAL',
    situation: 'La 2da Escuadrilla Aeronaval de Caza y Ataque cambió para siempre la historia naval moderna en el mundo.',
    choices: [
      {
        label: 'Brindar con tus mecánicos y pilotos diciendo: "Con 5 misiles pusimos de rodillas a la mayor flota del imperio".',
        reaction: 'Ovación cerrada en la base. Admiración unánime de todas las marinas del mundo.',
        changes: { liderazgo: +35, coraje: +25, impactoGuerra: +20 },
        soundEffect: 'confirm'
      }
    ]
  }
];

// ============================================================================
// 3. CAMPAÑA DE ALTO MANDO NAVAL (ALMIRANTE DE LA FLOTA)
// ============================================================================
export const MAR_ALTO_MANDO_CAMPAIGN: CampaignStep[] = [
  {
    id: 'mar-gral-1',
    stepNumber: 1,
    date: '17 DE ABRIL DE 1982',
    location: 'ESTADO MAYOR NAVAL (PUERTO BELGRANO)',
    title: 'EL DESPLIEGUE DEL PORTAAVIONES ARA 25 DE MAYO',
    situation: 'Sos Almirante de la Flota de Mar. Tenés bajo tu mando el Grupo de Tareas 79.1 encabezado por el Portaaviones ARA 25 de Mayo escoltado por destructores Tipo 42.',
    choices: [
      {
        label: 'Avanzar al norte de Malvinas para lanzar un ataque aéreo de aviones A-4Q Skyhawk armados con bombas contra los portaaviones británicos.',
        reaction: 'Maniobra audaz: estás a punto de trabar el primer duelo de portaaviones desde la Segunda Guerra Mundial.',
        changes: { pericia: +25, liderazgo: +25, coraje: +25, impactoGuerra: +30 },
        soundEffect: 'confirm'
      },
      {
        label: 'Ordenar el repliegue inmediato a aguas poco profundas de la plataforma continental argentina.',
        reaction: 'Preservás la flota de superficie intacta frente a los torpedos de los submarinos nucleares ingleses.',
        changes: { salud: +25, pericia: +15, impactoGuerra: +10 },
        soundEffect: 'confirm'
      },
      {
        label: 'Fondejar la flota en Puerto Madryn sin tomar contacto con el enemigo.',
        reaction: 'Críticas severas en las fuerzas conjuntas por inacción del poder naval.',
        changes: { liderazgo: -30, impactoGuerra: -30, coraje: -20 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'mar-gral-2',
    stepNumber: 2,
    date: '1 DE MAYO DE 1982',
    location: 'CUBIERTA DEL PORTAAVIONES ARA 25 DE MAYO',
    title: 'LA CALMA CHICHA Y EL DILEMA DEL ATAQUE',
    situation: 'Los aviones A-4Q están cargados con bombas listos en la catapulta. Sin embargo, el viento cesa por completo (calma chicha). Los cazas pesados no pueden despegar sin viento de proa.',
    choices: [
      {
        label: 'Exigir máxima potencia a las turbinas del portaaviones para generar viento relativo artificial y lanzar los cazas.',
        reaction: '¡Despegue al límite! Los A-4Q vuelan hacia la flota británica pero con riesgo de sobrecalentamiento del buque.',
        changes: { coraje: +30, liderazgo: +25, impactoGuerra: +35 },
        soundEffect: 'confirm'
      },
      {
        label: 'Cancelar el lanzamiento y virar al oeste al recibir alerta de sonar de un submarino nuclear enemigo.',
        reaction: 'Evitás una tragedia como la del Belgrano. El portaaviones regresa a salvo a puerto.',
        changes: { pericia: +20, salud: +20, liderazgo: +15 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'mar-gral-3',
    stepNumber: 3,
    date: '10 DE JUNIO DE 1982',
    location: 'PUERTO ARGENTINO (BATERÍA ITB EXOCET TERRESTRE)',
    title: 'LA BATERÍA COSTERA IMPROVISADA ITB',
    situation: 'Diseñada por ingenieros navales criollos en tiempo récord: montaron tubos lanzadores de misiles Exocet sobre un camión en la costa de Puerto Argentino.',
    choices: [
      {
        label: 'Autorizar el disparo nocturno guiado por el radar RASIT contra el destructor HMS Glamorgan que bombardea la costa.',
        reaction: '¡IMPACTO DIRECTO HISTÓRICO! El HMS Glamorgan sufre graves daños y fuego en el hangar. Primera vez en la historia que se usa un Exocet de tierra.',
        changes: { impactoGuerra: +40, pericia: +30, liderazgo: +25 },
        soundEffect: 'alert'
      },
      {
        label: 'Desmantelar la batería para evitar que sea capturada por tropas de infantería enemigas.',
        reaction: 'Desperdiciás una oportunidad dorada de neutralizar el cañoneo naval británico.',
        changes: { impactoGuerra: -20, coraje: -15 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'mar-gral-4',
    stepNumber: 4,
    date: '14 DE JUNIO DE 1982',
    location: 'ESTADO MAYOR DE LA ARMADA',
    title: 'EL DESTINO DEL PODER NAVAL',
    situation: 'Cese al fuego. La Armada preservó su aviación y tecnología para el futuro de la Nación.',
    choices: [
      {
        label: '"Nuestros marinos y aviadores navales pelearon con honor supremo en las aguas más hostiles del planeta".',
        reaction: 'El legado de la Armada en 1982 perdura en la memoria del pueblo argentino.',
        changes: { liderazgo: +30, coraje: +25, impactoGuerra: +20 },
        soundEffect: 'confirm'
      }
    ]
  }
];

export function getMarCampaignByTier(tier: RankTier): CampaignStep[] {
  switch (tier) {
    case 'tropa':
      return MAR_TROPA_CAMPAIGN;
    case 'suboficial':
      return MAR_TROPA_CAMPAIGN;
    case 'oficial':
      return MAR_OFICIAL_CAMPAIGN;
    case 'alto_mando':
      return MAR_ALTO_MANDO_CAMPAIGN;
    default:
      return MAR_OFICIAL_CAMPAIGN;
  }
}

export const MAR_CAMPAIGN = MAR_OFICIAL_CAMPAIGN;
