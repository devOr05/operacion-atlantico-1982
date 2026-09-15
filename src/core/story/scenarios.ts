export interface ChoiceOutcome {
  text: string;
  teletypeResponse: string;
  changes: {
    morale?: number;
    fuel?: number;
    ordnance?: number;
    logistics?: number;
    diplomacy?: number;
  };
  radioSpeakerId: string;
  audioEffect?: 'radio' | 'alert' | 'confirm';
  historicalNote: string;
  nextNodeId?: string;
  nextScenarioId?: string;
}

export interface ScenarioChoice {
  id: string;
  label: string;
  requiresResource?: {
    resource: 'fuel' | 'ordnance' | 'logistics';
    min: number;
  };
  outcome: ChoiceOutcome;
}

export interface Scenario {
  id: string;
  date: string;
  time: string;
  title: string;
  codeName: string;
  nodeId: string;
  speakerId: string;
  incomingTransmission: string[];
  weather: 'TEMPORAL FUERTE - MAR 7' | 'NIEBLA CERRADA' | 'TEMPERATURA -8°C - VIENTO POLAR' | 'DESPEJADO EN ALTURA';
  choices: ScenarioChoice[];
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'mision-1-san-carlos',
    date: '21 DE MAYO DE 1982',
    time: '08:42 HS',
    title: 'EL DESEMBARCO EN SAN CARLOS',
    codeName: 'OPERACIÓN CALLEJÓN DE LAS BOMBAS',
    nodeId: 'san-carlos',
    speakerId: 'crippa',
    weather: 'NIEBLA CERRADA',
    incomingTransmission: [
      'CRAC... SQUELCH... COMANDO CENTRAL, AQUÍ LECHUZA EN RECONOCIMIENTO.',
      'CONFIRMO CONTACTO VISUAL CON LA FLOTA BRITÁNICA EN EL INTERIOR DEL ESTRECHO.',
      'AVISTO NO MENOS DE DOCE BUQUES DE GUERRA Y TRANSPORTES ANFIBIOS INICIANDO CABEZA DE PLAYA.',
      'ME DISPARARON UN MISIL SUPERFICIE-AIRE SEA CAT Y FUEGO PESADO DE ARTILLERÍA.',
      'ESTÁN DESEMBARCANDO TROPAS. SI NO ATACAMOS AHORA, SE CONSOLIDARÁN EN TIERRA.',
      'ESPERO ÓRDENES INMEDIATAS. CAMBIO.'
    ],
    choices: [
      {
        id: 'c1-ataque-rasante',
        label: 'AUTORIZAR ATAQUE A BAJA COTA DE ESCUADRILLAS A-4 Y DAGGER',
        requiresResource: { resource: 'fuel', min: 25 },
        outcome: {
          text: 'Las escuadrillas de la Fuerza Aérea y la Armada vuelan a 15 metros del mar, pasando por encima de los mástiles de las fragatas británicas bajo un infierno antiaéreo.',
          teletypeResponse: 'DESPACHO URGENTE: BOMBAS IMPACTAN EN TRES FRAGATAS ENEMIGAS. DAÑOS CRÍTICOS EN LA CABEZA DE PLAYA. PERDIMOS DOS CAZAS A-4, PERO LA FLOTA BRITÁNICA QUEDA CONMOCIONADA.',
          changes: { morale: +18, fuel: -25, ordnance: -20, diplomacy: +10 },
          radioSpeakerId: 'crippa',
          audioEffect: 'alert',
          historicalNote: 'El 21 de mayo es conocido en la Royal Navy como "Viernes Negro" por el coraje de los pilotos argentinos volando a ras del agua en San Carlos.',
          nextScenarioId: 'mision-2-exocet'
        }
      },
      {
        id: 'c1-conservar-cazas',
        label: 'PRESERVAR FUERZA AÉREA Y CONCENTRAR BATERÍAS TERRESTRES',
        outcome: {
          text: 'Se deniega la salida masiva de cazas para no exponer el combustible crítico. Se ordena a la artillería de campaña hostigar el canal.',
          teletypeResponse: 'INFORME DE SITUACIÓN: EL ENEMIGO CONSOLIDA SU DESEMBARCO EN TIERRA SIN BAJAS NAVALES MAYORES. NUESTROS SOLDADOS EN GOOSE GREEN Y DARWIN QUEDAN AMENAZADOS POR LA ESPALDA.',
          changes: { morale: -15, fuel: 0, ordnance: -5, logistics: -15, diplomacy: -10 },
          radioSpeakerId: 'silva',
          audioEffect: 'radio',
          historicalNote: 'Al no disputar el desembarco anfibio, las fuerzas terrestres británicas pudieron establecer su base logística sin interferencia en San Carlos.',
          nextScenarioId: 'mision-2-exocet'
        }
      },
      {
        id: 'c1-ataque-quirurgico',
        label: 'LANZAR ATAQUE QUIRÚRGICO DE RECONOCIMIENTO ARMADO CON MB-339',
        outcome: {
          text: 'Crippa encara en solitario a una fragata inglesa con cohetes y cañón de 30mm, esquivando el fuego cruzado y reportando la posición exacta de los buques capitales.',
          teletypeResponse: 'REPORTE MILITAR: EL TENIENTE CRIPPA DAÑA EL RADAR DE LA FRAGATA HMS ARGONAUT Y RETORNA A PUERTO ARGENTINO CON CERO DAÑOS. MORAL POR LAS NUBES.',
          changes: { morale: +12, fuel: -10, ordnance: -5, diplomacy: +5 },
          radioSpeakerId: 'crippa',
          audioEffect: 'confirm',
          historicalNote: 'La hazaña de Owen Crippa el 21 de mayo atacando en solitario a la flota británica es una de las acciones individuales más osadas de la historia aeronaval.',
          nextScenarioId: 'mision-2-exocet'
        }
      }
    ]
  },
  {
    id: 'mision-2-exocet',
    date: '25 DE MAYO DE 1982',
    time: '14:30 HS',
    title: 'LA CACERÍA DEL ATLÁNTICO',
    codeName: 'OPERACIÓN ATAQUE AÉREO 25 DE MAYO',
    nodeId: 'rio-grande',
    speakerId: 'curilovic',
    weather: 'TEMPORAL FUERTE - MAR 7',
    incomingTransmission: [
      'CONTROL OPERACIONES... AQUÍ ESCUADRILLA SÚPER ÉTENDARD EN BASE RÍO GRANDE.',
      'UN AVIÓN EXPLORADOR NEPTUNO HA DETECTADO UN BLANCO DE GRAN TAMAÑO A 110 MILLAS AL NORESTE.',
      'PODRÍA TRATARSE DE UN PORTAAVIONES O DEL TRANSPORTE ATLANTIC CONVEYOR CON CHINOOKS Y MATERIAL DE GUERRA.',
      'DISPONEMOS DE SOLO DOS MISILES AM-39 EXOCET EN CONDICIÓN DE TIRO.',
      'EL MAR ESTÁ BRAVO CON OLAS DE 8 METROS Y VIENTO POLAR. SOLICITAMOS VECTOR DE ATAQUE.',
      '¿AUTORIZA EL LANZAMIENTO BAJO SILENCIO RADAR TOTAL? CAMBIO.'
    ],
    choices: [
      {
        id: 'c2-doble-exocet',
        label: 'LANZAMIENTO DOBLE QUIRÚRGICO CON REABASTECIMIENTO KC-130',
        requiresResource: { resource: 'ordnance', min: 30 },
        outcome: {
          text: 'Curilovic y Barraza vuelan en silencio de radio a 10 metros del agua, encienden su radar Thomson CSF por 3 segundos, fijan el blanco y disparan ambos misiles Exocet.',
          teletypeResponse: 'IMPACTO DIRECTO CONFIRMADO: EL BUQUE LOGÍSTICO ATLANTIC CONVEYOR ES ALCANZADO Y SE INCENDIA. SE DESTRUYEN DIEZ HELICÓPTEROS PESADOS DE ASALTO ENEMIGOS.',
          changes: { morale: +25, fuel: -20, ordnance: -30, diplomacy: +15 },
          radioSpeakerId: 'curilovic',
          audioEffect: 'confirm',
          historicalNote: 'El 25 de mayo de 1982 el Atlantic Conveyor fue hundido por Exocet, privando a las fuerzas terrestres británicas de sus helicópteros pesados de transporte.',
          nextScenarioId: 'mision-3-goose-green'
        }
      },
      {
        id: 'c2-un-solo-misil',
        label: 'DISPARAR UN SOLO EXOCET Y GUARDAR EL SEGUNDO PARA LA DEFENSA FINAL',
        outcome: {
          text: 'Se dispara un único proyectil mientras el segundo avión actúa de apoyo de telemetría y contramedidas electrónicas.',
          teletypeResponse: 'EL MISIL IMPACTA EN LA BANDA DE ESTRIBOR DEL OBJETIVO CAUSANDO INCENDIO MODERADO. EL SEGUNDO EXOCET PERMANECE GUARDADO EN EL BÚNKER DE RÍO GRANDE.',
          changes: { morale: +10, fuel: -15, ordnance: -15, diplomacy: +5 },
          radioSpeakerId: 'curilovic',
          audioEffect: 'radio',
          historicalNote: 'La reserva de misiles Exocet argentinos era un secreto de estado custodiado día y noche por su altísimo impacto estratégico.',
          nextScenarioId: 'mision-3-goose-green'
        }
      },
      {
        id: 'c2-cancelar-temporal',
        label: 'ABORTAR SALIDA DEBIDO AL TEMPORAL Y PROTEGER EL MATERIAL',
        outcome: {
          text: 'Se suspende la misión aeronaval para evitar perder los Super Étendard por engelamiento y falla en el reabastecimiento en vuelo con el Hércules.',
          teletypeResponse: 'MISIÓN ABORTADA: LOS CAZAS REGRESAN A BASE SIN NOVEDAD. LA FLOTA BRITÁNICA OPERA SIN SER MOLESTADA EN SU SECTOR NORTE.',
          changes: { morale: -12, fuel: -5, diplomacy: -10 },
          radioSpeakerId: 'curilovic',
          audioEffect: 'radio',
          historicalNote: 'Las condiciones meteorológicas en el Atlántico Sur eran letales; el engelamiento congelaba tomas de aire y parabrisas en segundos.',
          nextScenarioId: 'mision-3-goose-green'
        }
      }
    ]
  },
  {
    id: 'mision-3-goose-green',
    date: '28 DE MAYO DE 1982',
    time: '19:15 HS',
    title: 'EL CERCO DE PRADERA DEL GANSO',
    codeName: 'BATALLA DE GOOSE GREEN / DARWIN',
    nodeId: 'goose-green',
    speakerId: 'silva',
    weather: 'TEMPERATURA -8°C - VIENTO POLAR',
    incomingTransmission: [
      'PRIORIDAD ABSOLUTA... RADIO PUERTO ARGENTINO RETRANSMITIENDO MENSAJE DE DARWIN.',
      'EL BATALLÓN 2 PARA BRITÁNICO HA ROTO EL PERÍMETRO NORTE TRAS FEROZ RESISTENCIA DE LOS CONSCRIPTOS.',
      'LOS CAÑONES ANTIAÉREOS RHEINMETALL DE 20MM ESTÁN DISPARANDO EN RASANTE CONTRA LA INFANTERÍA ENEMIGA.',
      'HAY 112 POBLADORES LOCALES REFUGIADOS EN EL CENTRO COMUNITARIO.',
      'FALTA COMIDA CALIENTE, SE AGOTAN LOS PROYECTILES DE MORTERO Y LA TURBA ESTÁ INUNDADA.',
      'EL TENIENTE CORONEL PIAGGI SOLICITA APOYO AÉREO INMEDIATO O AUTORIZACIÓN DE PLAN ALTERNATIVO.'
    ],
    choices: [
      {
        id: 'c3-apoyo-pucara',
        label: 'DESPEGAR AVIONES PUCARÁ DE APOYO AÉREO CERCANO EN CONDICIONES CRÍTICAS',
        requiresResource: { resource: 'fuel', min: 15 },
        outcome: {
          text: 'Los bimotores IA-58 Pucará despegan de la pista de barro empapada, disparando cohetes sobre las colinas de Darwin para frenar el avance británico.',
          teletypeResponse: 'ATAQUE EFECTIVO: EL AVANCE DE LOS PARACAIDISTAS BRITÁNICOS SE DETIENE MOMENTÁNEAMENTE. CAE EL COMANDANTE DEL 2 PARA BRITÁNICO, TNTE. CNEL. H. JONES.',
          changes: { morale: +15, fuel: -15, ordnance: -15, logistics: -10 },
          radioSpeakerId: 'silva',
          audioEffect: 'alert',
          historicalNote: 'En Goose Green, la resistencia argentina con fuego antiaéreo y el accionar de los Pucará frenaron a los paracaidistas británicos durante más de 30 horas continuas.',
          nextScenarioId: 'mision-4-monte-longdon'
        }
      },
      {
        id: 'c3-tregua-humanitaria',
        label: 'NEGOCIAR TREGUA HUMANITARIA PARA PROTEGER CIVILES Y HERIDOS',
        outcome: {
          text: 'Se abre un canal de radio con el mando británico para acordar el cese del fuego en el sector civil de Goose Green y la atención médica de los heridos de ambos bandos.',
          teletypeResponse: 'ACUERDO LOGRADO: SE SALVAGUARDAN LAS VIDAS DE LOS HERIDOS Y POBLADORES. LA PRENSA INTERNACIONAL DESTACA EL COMPORTAMIENTO PROFESIONAL DE LA GUARNICIÓN.',
          changes: { morale: -5, logistics: +10, diplomacy: +25 },
          radioSpeakerId: 'diplomatico',
          audioEffect: 'confirm',
          historicalNote: 'La rendición de Goose Green se llevó a cabo con mutuo respeto militar y permitió salvar cientos de vidas en el hospital de campaña.',
          nextScenarioId: 'mision-4-monte-longdon'
        }
      }
    ]
  },
  {
    id: 'mision-4-monte-longdon',
    date: '11 DE JUNIO DE 1982',
    time: '23:45 HS',
    title: 'LA NOCHE DE LAS BAYONETAS',
    codeName: 'DEFENSA DE LAS ALTURAS - MONTE LONGDON',
    nodeId: 'monte-longdon',
    speakerId: 'baldini',
    weather: 'TEMPERATURA -8°C - VIENTO POLAR',
    incomingTransmission: [
      'CRAC... SQUELCH... COMANDO... AQUÍ CÓNDOR-7 EN MONTE LONGDON.',
      'NOCHE CERRADA. EL 3 PARA BRITÁNICO ESTÁ AVANZANDO ENTRE LOS PEÑASCOS A CUERPO A CUERPO.',
      'TIENEN VISORES NOCTURNOS INFRARROJOS. ESTAMOS PELEANDO A BAYONETA Y FUSIL FAL.',
      'LA ARTILLERÍA DE FRAGATAS DESDE EL MAR NO DEJA DE CAER SOBRE NUESTRAS CABEZAS.',
      'MIS CONSCRIPTOS ESTÁN AGUANTANDO EL POZO DE ZORRO PERO SE NOS ACABAN LAS CINTAS DE AMETRALLADORA MAG.',
      '¡SOLICITO CONCENTRACIÓN DE FUEGO DE LOS CAÑONES OTO MELARA DE 105MM DE PUERTO ARGENTINO SOBRE MI POSICIÓN!'
    ],
    choices: [
      {
        id: 'c4-fuego-propio',
        label: 'AUTORIZAR FUEGO DE BARRERA DE ARTILLERÍA DE 105MM SOBRE LAS CRESTAS',
        requiresResource: { resource: 'ordnance', min: 20 },
        outcome: {
          text: 'El Grupo de Artillería 3 dispara salvas coordinadas sobre las crestas rocosas de Longdon. Los proyectiles caen entre las posiciones quebrando el asalto británico.',
          teletypeResponse: 'RADIO CÓNDOR-7: ¡IMPACTO JUSTO SOBRE LA LÍNEA ENEMIGA! EL ASALTO BRITÁNICO QUEDA EMPANTANADO EN LAS ROCAS. SE MANTIENE LA CUMBRE HASTA EL AMANECER.',
          changes: { morale: +20, ordnance: -25, logistics: -15, diplomacy: +10 },
          radioSpeakerId: 'baldini',
          audioEffect: 'alert',
          historicalNote: 'El combate de Monte Longdon fue el choque de infantería más sangriento y feroz de la guerra, peleado peñón por peñón en la oscuridad helada.',
          nextScenarioId: 'mision-5-desenlace'
        }
      },
      {
        id: 'c4-repliegue-tactico',
        label: 'ORDENAR REPLIEGUE TÁCTICO A WIRELESS RIDGE Y SALVAR A LOS HOMBRES',
        outcome: {
          text: 'El Subteniente Baldini y sus tiradores ejecutan un repliegue bajo fuego de cobertura, reagrupándose en la última línea defensiva ante Puerto Argentino.',
          teletypeResponse: 'PARTE DE GUERRA: LAS FUERZAS RETROCEDEN DE FORMA ORDENADA LLEVANDO A SUS HERIDOS. SE ESTABLECE UN NUEVO CERROJO DEFENSIVO.',
          changes: { morale: -8, logistics: +5, diplomacy: +15 },
          radioSpeakerId: 'baldini',
          audioEffect: 'radio',
          historicalNote: 'Muchos oficiales y conscriptos resistieron hasta el último cartucho en Longdon antes de replegarse para evitar ser cercados.',
          nextScenarioId: 'mision-5-desenlace'
        }
      }
    ]
  },
  {
    id: 'mision-5-desenlace',
    date: '14 DE JUNIO DE 1982',
    time: '12:00 HS',
    title: 'EL DÍA FINAL: EL JUICIO DE LA HISTORIA',
    codeName: 'INFORME FINAL DE CAMPAÑA',
    nodeId: 'pto-argentino',
    speakerId: 'diplomatico',
    weather: 'DESPEJADO EN ALTURA',
    incomingTransmission: [
      'TRANSMISIÓN EN BANDA DIPLOMÁTICA CIFRADA.',
      'EL CONFLICTO ARMADO EN LAS ISLAS LLEGA A SU TÉRMINO MILITAR TRAS 74 DÍAS DE COMBATE.',
      'TODAS LAS ÓRDENES Y DESPACHOS EMITIDOS DESDE ESTA CONSOLA HAN MARCADO EL DESTINO DE LOS COMBATIENTES.',
      'EL MUNDO RECONOCE EL VALOR DE NUESTROS PILOTOS, SOLDADOS Y MARINOS EN CONDICIONES EXTREMAS.',
      'ESTADO MAYOR GENERAL: PROCEDA A IMPRIMIR LA EVALUACIÓN HISTÓRICA FINAL.'
    ],
    choices: [
      {
        id: 'c5-concluir',
        label: 'TRANSMITIR PARTE FINAL Y ACCEDER AL MEMORIAL HISTÓRICO',
        outcome: {
          text: 'Se transmite el último radiograma a las unidades en tierra, aire y mar.',
          teletypeResponse: 'MENSAJE FINAL: A LOS VETERANOS Y CAÍDOS EN MALVINAS. HONOR Y GLORIA ETERNA. REGISTRO OFICIAL ALMACENADO EN MEMORIA.',
          changes: {},
          radioSpeakerId: 'diplomatico',
          audioEffect: 'confirm',
          historicalNote: 'La Guerra de Malvinas dejó una huella imborrable en la memoria del pueblo argentino y transformó la doctrina aeronaval moderna.'
        }
      }
    ]
  }
];
