import { type CampaignStep, type RankTier } from './campaignTypes';

// ============================================================================
// 1. CAMPAÑA DE TROPA / CONSCRIPTO AERONÁUTICO
// ============================================================================
export const AIRE_TROPA_CAMPAIGN: CampaignStep[] = [
  {
    id: 'aire-tropa-1',
    stepNumber: 1,
    date: '20 DE ABRIL DE 1982',
    location: 'BAM CÓNDOR (PRADERA DEL GANSO)',
    title: 'DEFENSA ANTIAÉREA DE LA PISTA DE TURBA',
    situation: 'Sos conscripto de la Fuerza Aérea asignado a servir una batería de cañones antiaéreos Rheinmetall de 20mm protegiendo los aviones Pucará en la pista de tierra de Darwin.',
    choices: [
      {
        label: 'Alinear la mira reflex y vigilar el horizonte marino en turnos dobles bajo la llovizna.',
        reaction: 'Vigilancia implacable. Detectás el sonido de turbinas aproximándose a baja cota.',
        changes: { pericia: +15, salud: -5, coraje: +10 },
        soundEffect: 'confirm'
      },
      {
        label: 'Cargar cajones de cintas de 20mm perforantes-incendiarias hasta agotar stock.',
        reaction: 'Tus cañones quedan listos para disparar 1.000 tiros por minuto sin interrupción.',
        changes: { pericia: +10, coraje: +10, impactoGuerra: +10 },
        soundEffect: 'confirm'
      },
      {
        label: 'Buscar refugio en el hangar de lana de Darwin ante las alarmas rojas.',
        reaction: 'Te protegés del frío, pero la pieza antiaérea queda desatendida.',
        changes: { coraje: -15, liderazgo: -10, salud: +10 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'aire-tropa-2',
    stepNumber: 2,
    date: '1 DE MAYO DE 1982',
    location: 'BAM MALVINAS (PUERTO ARGENTINO)',
    title: 'EL ATAQUE DE LOS SEA HARRIER',
    situation: 'Tres Sea Harrier británicos atacan en rasante soltando bombas de racimo sobre la pista. El cañón de tu sección empieza a disparar.',
    choices: [
      {
        label: 'Mantener el fuego concentrado guiando las trazadoras directamente al morro del avión líder.',
        reaction: '¡Tocado! Humo negro brota de la turbina del Harrier inglés que se aleja al mar perdiendo altura.',
        changes: { pericia: +25, coraje: +25, impactoGuerra: +25, salud: -15 },
        medalAwarded: 'La Nación Argentina al Valor en Combate',
        soundEffect: 'alert'
      },
      {
        label: 'Correr a apagar el fuego en los depósitos de combustible de aviación arriesgando tu vida.',
        reaction: 'Salvaste los tanques de combustible JP-1 para que los aviones argentinos sigan operando.',
        changes: { coraje: +25, liderazgo: +20, salud: -25, impactoGuerra: +20 },
        fatalText: 'Una esquirla de bomba Belouga te alcanzó cuando combatías el incendio en la pista.'
      },
      {
        label: 'Tirarte al pozo de zorro y taparte los oídos.',
        reaction: 'Sobrevivís, pero la pista sufre impactos graves de bombas retardadas.',
        changes: { coraje: -20, salud: +5, liderazgo: -10 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'aire-tropa-3',
    stepNumber: 3,
    date: '29 DE MAYO DE 1982',
    location: 'BAM CÓNDOR (ISLA SOLEDAD)',
    title: 'ARMANDO LOS PUCARÁ BAJO FUEGO DE MORTERO',
    situation: 'Los paracaidistas británicos están a tiro de fusil. Los mecánicos necesitan cargar coheteras de 70mm en el último IA-58 Pucará antes de que despegue.',
    choices: [
      {
        label: 'Correr bajo fuego de tiradores ingleses para encastrar los cohetes en las alas.',
        reaction: '¡Misión cumplida! El Pucará despega a ras de tierra y ametralla la posición enemiga.',
        changes: { coraje: +25, pericia: +15, impactoGuerra: +20 },
        soundEffect: 'confirm'
      },
      {
        label: 'Tomar un fusil FAL y disparar contra los exploradores ingleses para cubrir al piloto.',
        reaction: 'Mantenés a raya al enemigo permitiendo que el avión carretee en la pista de turba.',
        changes: { coraje: +20, pericia: +10, liderazgo: +15 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'aire-tropa-4',
    stepNumber: 4,
    date: '14 DE JUNIO DE 1982',
    location: 'RADAR TPS-43 (PUERTO ARGENTINO)',
    title: 'DESTRUIR EL EQUIPO ELECTRÓNICO CLASIFICADO',
    situation: 'El cerco británico se cierra sobre el radar. Tenés la orden de destruir las válvulas y circuitos de la consola para que la OTAN no obtenga nuestra tecnología de guerra electrónica.',
    choices: [
      {
        label: 'Destruir a mazazos las válvulas de radar y quemar los manuales criptográficos.',
        reaction: 'Cero información sensible para el enemigo. Actuaste con absoluta lealtad militar.',
        changes: { pericia: +15, coraje: +15, liderazgo: +10 },
        soundEffect: 'confirm'
      },
      {
        label: 'Desconectar los cables principales y enterrar las tarjetas lógicas en la turba.',
        reaction: 'Operación de camuflaje perfecta: el equipo queda totalmente inservible para el invasor.',
        changes: { pericia: +20, coraje: +10 },
        soundEffect: 'confirm'
      }
    ]
  }
];

// ============================================================================
// 2. CAMPAÑA DE PILOTO SUBALTERNO (ALFÉREZ / TENIENTE DE CAZA A-4 / DAGGER)
// ============================================================================
export const AIRE_PILOTO_CAMPAIGN: CampaignStep[] = [
  {
    id: 'aire-piloto-1',
    stepNumber: 1,
    date: '1 DE MAYO DE 1982',
    location: 'BAM SAN JULIÁN / RÍO GRANDE',
    title: 'EL BAUTISMO DE FUEGO EN EL MAR AUSTRAL',
    situation: 'Despegás en tu caza A-4B Skyhawk cargado con tres bombas de 250 kg. Cruzás el Atlántico a 900 km/h en silencio de radio total rozando las crestas de las olas.',
    choices: [
      {
        label: 'Descender a 15 metros del agua para volar por debajo del lóbulo del radar naval británico.',
        reaction: 'La sal marina empaña tu cúpula pero sos invisible para los radares de las fragatas.',
        changes: { pericia: +20, coraje: +15, salud: -5 },
        soundEffect: 'confirm'
      },
      {
        label: 'Ascender a 500 metros para ahorrar combustible JP-1 y tener mejor visibilidad del blanco.',
        reaction: '¡Alarma en cabina! Un destructor Type 42 te engancha con misiles antiaéreos Sea Dart.',
        changes: { coraje: +10, salud: -25, impactoGuerra: -5 },
        soundEffect: 'alert'
      },
      {
        label: 'Verificar la mira de tiro y repasar la oración de los pilotos de caza en voz baja.',
        reaction: 'Temple de acero. Tu respiración en la máscara de oxígeno se calma por completo.',
        changes: { coraje: +15, liderazgo: +10, pericia: +10 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'aire-piloto-2',
    stepNumber: 2,
    date: '21 DE MAYO DE 1982',
    location: 'ESTRECHO DE SAN CARLOS (CALLEJÓN DE LAS BOMBAS)',
    title: 'EL ASALTO A LA FRAGATA EN EL ESTRECHO',
    situation: 'Entrás al Estrecho de San Carlos entre cerros empinados. Frente a vos se dibuja la silueta de una fragata Type 21 disparando todas sus armas antiaéreas Seacat y cañón de 114mm.',
    choices: [
      {
        label: 'Mantener la mira sobre la línea de flotación de la fragata y soltar las bombas a quemarropa.',
        reaction: '¡IMPACTO DIRECTO! Las bombas estallan en el casco de la fragata HMS Ardent. Maniobrás con 6G saliendo del estrecho.',
        changes: { pericia: +25, coraje: +25, impactoGuerra: +35, salud: -15 },
        medalAwarded: 'La Nación Argentina al Heroico Valor en Combate',
        soundEffect: 'alert'
      },
      {
        label: 'Virar bruscamente con postcombustión para evitar la cortina de trazadoras que perfora tu ala.',
        reaction: 'Esquivás el fuego denso pero tus bombas caen al agua sin dañar el buque enemigo.',
        changes: { pericia: +10, coraje: -5, salud: +10 },
        soundEffect: 'confirm'
      },
      {
        label: 'Soltar bombas sobre el buque y embestir las antenas del radar inglés al pasar a centímetros.',
        reaction: '¡Acto suicida de bravura! Dejás ciega a la flota enemiga pero tu turbina aspira esquirlas.',
        changes: { coraje: +35, impactoGuerra: +30, salud: -40 },
        fatalText: 'Tu avión fue alcanzado por fuego antiaéreo concentrado tras soltar tus bombas en San Carlos.'
      }
    ]
  },
  {
    id: 'aire-piloto-3',
    stepNumber: 3,
    date: '8 DE JUNIO DE 1982',
    location: 'BAHÍA AGRADABLE / FITZROY',
    title: 'EL DÍA MÁS NEGRO DE LA FLOTA BRITÁNICA',
    situation: 'Descubrís dos grandes buques logísticos de desembarco británicos (Sir Galahad y Sir Tristram) atestados de tropas enemigas en Bahía Agradable.',
    choices: [
      {
        label: 'Lanzar tus bombas al centro del Sir Galahad a ras de los mástiles.',
        reaction: '¡Golpe histórico! Explosiones masivas incendian el buque. Bajas catastróficas para la Task Force.',
        changes: { impactoGuerra: +40, pericia: +25, coraje: +20 },
        promotedToRankIndex: 4, // Primer Teniente
        soundEffect: 'alert'
      },
      {
        label: 'Ametrallar las lanchas de desembarco LSL que intentan alcanzar la costa.',
        reaction: 'Desbaratás la cabeza de playa enemiga antes de que puedan emplazar su artillería.',
        changes: { pericia: +20, coraje: +15, impactoGuerra: +20 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'aire-piloto-4',
    stepNumber: 4,
    date: '13 DE JUNIO DE 1982',
    location: 'ATLÁNTICO SUR / RETORNO A BASE',
    title: 'REGRESO CON EL COMBUSTIBLE EN CERO',
    situation: 'Tu aguja de combustible marca cero (combustible de reserva agotado). El avión reabastecedor Hércules KC-130 te espera a 200 km en medio de un temporal de nieve.',
    choices: [
      {
        label: 'Enganchar la lanza de reabastecimiento en la canasta del Hércules al primer intento en la niebla.',
        reaction: '¡Proeza aeronáutica! Salvaste el caza y lográs aterrizar en Río Grande ovacionado por los mecánicos.',
        changes: { pericia: +30, liderazgo: +20, coraje: +15 },
        soundEffect: 'confirm'
      },
      {
        label: 'Eyectarte sobre aguas heladas esperando rescate por helicóptero.',
        reaction: 'El agua antártica te congela en minutos. Tu resistencia física define si sobrevivís.',
        changes: { salud: -35, coraje: +10 },
        fatalText: 'No sobreviviste a las aguas a -3°C del Atlántico Sur tras eyectarte de tu A-4 Skyhawk.'
      }
    ]
  }
];

// ============================================================================
// 3. CAMPAÑA DE JEFE DE ESCUADRILLA (CAPITÁN / MAYOR)
// ============================================================================
export const AIRE_LIDER_CAMPAIGN: CampaignStep[] = [
  {
    id: 'aire-lider-1',
    stepNumber: 1,
    date: '1 DE MAYO DE 1982',
    location: 'BAM SAN JULIÁN (ESCUADRILLA TRUCO)',
    title: 'PLANIFICACIÓN DEL ATAQUE COLECTIVO',
    situation: 'Sos Capitán y líder de una escuadrilla de 4 cazas Dagger. Tenés que definir la ruta de aproximación táctica para el primer ataque contra la flota inglesa.',
    choices: [
      {
        label: 'Planificar vuelo en escalón derecho a 10 metros del agua con radio-silencio absoluto.',
        reaction: 'Formación impecable. Tus 4 aviones burlan la cortina de radares de los buques piquete.',
        changes: { liderazgo: +20, pericia: +20, impactoGuerra: +20 },
        soundEffect: 'confirm'
      },
      {
        label: 'Dividir la escuadrilla en dos parejas para atacar simultáneamente desde el norte y sur.',
        reaction: 'Pinza táctica que desorienta los directores de tiro británicos.',
        changes: { pericia: +25, liderazgo: +15, impactoGuerra: +25 },
        soundEffect: 'confirm'
      },
      {
        label: 'Subir a altura media para que el radar propio detecte antes los portaaviones.',
        reaction: 'Los radares Sea Dart ingleses disparan a 40 km. Dos de tus numerales reciben metralla.',
        changes: { liderazgo: -25, impactoGuerra: -20, coraje: +5 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'aire-lider-2',
    stepNumber: 2,
    date: '25 DE MAYO DE 1982',
    location: 'NORTE DE ISLA BORBÓN',
    title: 'EL ATAQUE AL DESTRUCTOR HMS COVENTRY',
    situation: 'El destructor HMS Coventry y la fragata HMS Broadsword forman la trampa de misiles antiaéreos más letal de la Royal Navy. Tu escuadrilla recibe la orden de liquidarlos.',
    choices: [
      {
        label: 'Ordenar a tus numerales atacar al Coventry coordinando el lanzamiento de bombas en dos olas.',
        reaction: '¡HISTÓRICO! Tres bombas de 1.000 libras estallan en el Coventry. El destructor se da vuelta y se hunde en 20 minutos.',
        changes: { impactoGuerra: +40, liderazgo: +30, pericia: +25, coraje: +25 },
        medalAwarded: 'Cruz La Nación Argentina al Heroico Valor en Combate',
        soundEffect: 'alert'
      },
      {
        label: 'Ponerte como blanco señuelo para que tus pilotos ataquen sin recibir fuego.',
        reaction: 'Tu numeral impacta al buque mientras tu avión absorbe metralla de cañón de 20mm.',
        changes: { coraje: +35, liderazgo: +35, salud: -30, impactoGuerra: +30 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'aire-lider-3',
    stepNumber: 3,
    date: '30 DE MAYO DE 1982',
    location: 'ESTE DE MALVINAS (ALCANCE MÁXIMO)',
    title: 'EL ATAQUE AL PORTAAVIONES HMS INVINCIBLE',
    situation: 'Misión conjunta con los Super Étendard de la Armada. Tu escuadrilla de A-4C debe seguir la estela del misil Exocet para bombardear el portaaviones HMS Invincible.',
    choices: [
      {
        label: 'Guiar a los cazas a través de la columna de humo del Exocet y soltar las bombas sobre la cubierta.',
        reaction: '¡Hazaña legendaria! Bombas impactan en la estructura del portaaviones enemigo.',
        changes: { impactoGuerra: +45, coraje: +30, pericia: +25, liderazgo: +30 },
        promotedToRankIndex: 6, // Mayor
        soundEffect: 'alert'
      },
      {
        label: 'Ordenar abortar a los numerales al detectar una patrulla de 4 Sea Harrier en combate aéreo.',
        reaction: 'Salvás la vida de tus pilotos, pero el portaaviones enemigo escapa ileso.',
        changes: { liderazgo: +15, coraje: -15, impactoGuerra: -20 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'aire-lider-4',
    stepNumber: 4,
    date: '14 DE JUNIO DE 1982',
    location: 'BAM RÍO GRANDE (DEBRIEFING FINAL)',
    title: 'EL RECONOCIMIENTO A LOS HALCONES',
    situation: 'Termina el conflicto. Formás a todos los pilotos y mecánicos de tu escuadrón frente al hangar con las banderas argentinas en alto.',
    choices: [
      {
        label: '"Combatieron como gigantes. El mundo entero conoció el coraje de la aviación argentina".',
        reaction: 'Abrazo fraternal entre lágrimas y aplausos. La Fuerza Aérea escribió su página más gloriosa.',
        changes: { liderazgo: +35, coraje: +25, impactoGuerra: +15 },
        soundEffect: 'confirm'
      },
      {
        label: 'Rendir homenaje de rodillas a los camaradas caídos en las aguas del Atlántico Sur.',
        reaction: 'Silencio solemne. Honor eterno a los 55 héroes de la Fuerza Aérea Argentina.',
        changes: { liderazgo: +30, coraje: +20 },
        soundEffect: 'confirm'
      }
    ]
  }
];

// ============================================================================
// 4. CAMPAÑA DE ALTO MANDO AÉREO (BRIGADIER / BRIGADIER GENERAL)
// ============================================================================
export const AIRE_ALTO_MANDO_CAMPAIGN: CampaignStep[] = [
  {
    id: 'aire-gral-1',
    stepNumber: 1,
    date: '15 DE ABRIL DE 1982',
    location: 'COMANDO DE LA FUERZA AÉREA SUR (COMODORO RIVADAVIA)',
    title: 'DESPLIEGUE ESTRATÉGICO DE LA FUERZA AÉREA SUR (FAS)',
    situation: 'Sos Brigadier y Comandante de la FAS. Tenés que distribuir tus 120 aviones de combate en las bases patagónicas (Río Gallegos, San Julián, Río Grande, Trelew).',
    choices: [
      {
        label: 'Concentrar los A-4 y Dagger en Río Grande y San Julián para maximizar el tiempo sobre el blanco.',
        reaction: 'Decisión óptima: reducís la distancia de vuelo al mínimo permitiendo más combustible en combate.',
        changes: { pericia: +25, liderazgo: +20, impactoGuerra: +25 },
        soundEffect: 'confirm'
      },
      {
        label: 'Dispersar los cazas en aeródromos civiles de tierra para evitar que bombardeos británicos los destruyan en tierra.',
        reaction: 'Protegés los aviones al 100%, pero la logística de rearme y combustible se vuelve lenta.',
        changes: { salud: +20, pericia: +10, liderazgo: +10 },
        soundEffect: 'confirm'
      },
      {
        label: 'Enviar escuadrones de Mirage III a Puerto Argentino para operar directamente desde las islas.',
        reaction: 'La pista de 1250m de Puerto Argentino es corta para los Mirage: riesgo altísimo de despiste.',
        changes: { impactoGuerra: -15, pericia: -15, liderazgo: -10 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'aire-gral-2',
    stepNumber: 2,
    date: '21 DE MAYO DE 1982',
    location: 'PUESTO DE MANDO FAS (OPERACIÓN SAN CARLOS)',
    title: 'LA GRAN OFENSIVA AÉREA CONTRA EL DESEMBARCO',
    situation: 'La flota británica desembarca tropas en el Estrecho de San Carlos. Tus oficiales te proponen lanzar ataques continuos en olas masivas durante todo el día.',
    choices: [
      {
        label: 'Lanzar todas las escuadrillas disponibles en olas sucesivas cada 20 minutos con bombas rasantes.',
        reaction: '¡Hundimiento masivo de buques de guerra británicos! La prensa mundial bautiza el estrecho como "Bomb Alley".',
        changes: { impactoGuerra: +40, liderazgo: +30, pericia: +25 },
        soundEffect: 'confirm'
      },
      {
        label: 'Reservar el 50% de los cazas para defender las ciudades petroleras del continente ante ataques de Vulcan.',
        reaction: 'Decisión prudente, pero le das aire a la Task Force para consolidar su cabeza de playa en tierra.',
        changes: { impactoGuerra: -20, liderazgo: -15, salud: +10 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'aire-gral-3',
    stepNumber: 3,
    date: '6 DE JUNIO DE 1982',
    location: 'PUENTE AÉREO NOCTURNO (C-130 HÉRCULES)',
    title: 'MANTENER ABIERTO EL PUENTE AÉREO HACIA LA CAPITAL',
    situation: 'El cerco aéreo naval británico sobre Puerto Argentino es total. La guarnición en Malvinas exige munición de cañón y sangre para los heridos.',
    choices: [
      {
        label: 'Autorizar vuelos nocturnos de los Hércules C-130 rozando las olas en absoluto silencio de radar.',
        reaction: '¡Los "Chanchas" C-130 rompen el bloqueo noche tras noche! Aterrizan en pista a oscuras y salvan vidas.',
        changes: { impactoGuerra: +35, liderazgo: +30, pericia: +20 },
        soundEffect: 'confirm'
      },
      {
        label: 'Suspender los vuelos de Hércules por el peligro extremo de patrullas Sea Harrier nocturnas.',
        reaction: 'Cero aviones de transporte perdidos, pero el ejército en las islas queda desabastecido.',
        changes: { impactoGuerra: -30, liderazgo: -25, coraje: -15 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'aire-gral-4',
    stepNumber: 4,
    date: '14 DE JUNIO DE 1982',
    location: 'ESTADO MAYOR CONJUNTO (BUENOS AIRES)',
    title: 'EL BALANCE ESTRATÉGICO DE LA FUERZA AÉREA',
    situation: 'Se decreta el cese al fuego en tierra. Tus subordinados te piden la orden final para la aviación militar argentina.',
    choices: [
      {
        label: '"Nuestros pilotos quebraron la soberbia de la mayor potencia naval europea. La causa Malvinas es eterna".',
        reaction: 'Tu liderazgo consagra el legado histórico de la Fuerza Aérea Argentina para todas las generaciones.',
        changes: { liderazgo: +35, coraje: +25, impactoGuerra: +20 },
        soundEffect: 'confirm'
      }
    ]
  }
];

export function getAireCampaignByTier(tier: RankTier): CampaignStep[] {
  switch (tier) {
    case 'tropa':
      return AIRE_TROPA_CAMPAIGN;
    case 'suboficial':
      return AIRE_TROPA_CAMPAIGN; // O Tropa/Suboficial técnico
    case 'oficial':
      return AIRE_PILOTO_CAMPAIGN;
    case 'alto_mando':
      return AIRE_ALTO_MANDO_CAMPAIGN;
    default:
      return AIRE_PILOTO_CAMPAIGN;
  }
}

export const AIRE_CAMPAIGN = AIRE_PILOTO_CAMPAIGN;
