export interface CampaignStep {
  id: string;
  stepNumber: number;
  date: string;
  location: string;
  title: string;
  situation: string;
  choices: {
    label: string;
    reaction: string;
    changes: {
      coraje?: number;
      salud?: number;
      pericia?: number;
      liderazgo?: number;
      impactoGuerra?: number;
    };
    promotedToRankIndex?: number;
    medalAwarded?: string;
    soundEffect?: 'confirm' | 'alert' | 'radio';
  }[];
}

export const TIERRA_CAMPAIGN: CampaignStep[] = [
  {
    id: 'tierra-1',
    stepNumber: 1,
    date: '10 DE ABRIL DE 1982',
    location: 'PUERTO BELGRANO / PALOMAR',
    title: 'LA CONVOCATORIA MILITAR',
    situation: 'Llega la orden de despliegue al sur. Tenés que preparar tu equipo antes de abordar el avión Hércules C-130 rumbo a las islas.',
    choices: [
      {
        label: 'Guardar abrigo extra, guantes y raciones secas.',
        reaction: 'Priorizás la supervivencia en el frío. La turba malvinense no perdona.',
        changes: { salud: +15, pericia: +5 },
        soundEffect: 'confirm'
      },
      {
        label: 'Cargar munición pesada extra y cargadores de FAL.',
        reaction: 'Espíritu combativo de pura cepa. Tu pelotón te mira con respeto.',
        changes: { coraje: +15, pericia: +10, salud: -5 },
        soundEffect: 'confirm'
      },
      {
        label: 'Llevar cartas de tu familia, una radio portátil y un rosario.',
        reaction: 'Mantenés la moral alta y la calma para no quebrar en el frente.',
        changes: { liderazgo: +15, coraje: +10 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'tierra-2',
    stepNumber: 2,
    date: '16 DE ABRIL DE 1982',
    location: 'MONTE LONGDON (ISLA SOLEDAD)',
    title: 'EL POZO DE ZORRO',
    situation: 'El viento polar sopla a 70 km/h. La turba se inunda con agua helada. Tu compañero de pozo está temblando y deprimido.',
    choices: [
      {
        label: 'Cavar drenajes de piedra y aislar el piso con turba seca juntos.',
        reaction: 'El pozo resiste el temporal. Evitás el pie de trinchera.',
        changes: { salud: +10, liderazgo: +10, pericia: +10 },
        soundEffect: 'confirm'
      },
      {
        label: 'Compartir tu poncho de agua y tu ración caliente con él.',
        reaction: 'Gesto de hermandad que forja un lazo inquebrantable de trinchera.',
        changes: { liderazgo: +20, coraje: +10, salud: -5 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'tierra-3',
    stepNumber: 3,
    date: '1 DE MAYO DE 1982',
    location: 'PUERTO ARGENTINO / CERCANÍAS',
    title: 'EL BAUTISMO DE FUEGO',
    situation: '04:40 hs. Un estruendo brutal sacude la tierra: un bombardero Vulcan y fragatas británicas inician el cañoneo de saturación naval.',
    choices: [
      {
        label: 'Mantener la disciplina de fuego bajo el bombardeo y calmar a la tropa.',
        reaction: 'Impasible como el acero. Evitás que tu sección entre en pánico.',
        changes: { coraje: +20, liderazgo: +15, impactoGuerra: +5 },
        promotedToRankIndex: 3, // Subteniente / Cabo distinguido
        soundEffect: 'alert'
      },
      {
        label: 'Correr bajo las esquirlas para asistir a un soldado herido.',
        reaction: 'Te jugás la vida arrastrando al camarada hasta el puesto de socorro.',
        changes: { coraje: +25, salud: -10, liderazgo: +15 },
        medalAwarded: 'Mención al Mérito en el Bautismo de Fuego',
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'tierra-4',
    stepNumber: 4,
    date: '8 DE MAYO DE 1982',
    location: 'POSICIONES DE ARTILLERÍA - CERRO ZAPADOR',
    title: 'EL CAÑÓN OTO MELARA 105MM',
    situation: 'La artillería naval británica dispara desde el horizonte. Se solicita voluntario para alimentar la pieza de 105mm y devolver el fuego.',
    choices: [
      {
        label: 'Apuntar y disparar en contrabatería con cálculos matemáticos precisos.',
        reaction: 'Impacto cerca de una fragata Type 21 que la obliga a alejarse mar adentro.',
        changes: { pericia: +20, impactoGuerra: +15, coraje: +10 },
        soundEffect: 'confirm'
      },
      {
        label: 'Cubrir el polvorín con sacos de arena bajo fuego naval directo.',
        reaction: 'Salvaste la reserva de munición de toda la compañía.',
        changes: { coraje: +20, salud: -5, liderazgo: +10 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'tierra-5',
    stepNumber: 5,
    date: '14 DE MAYO DE 1982',
    location: 'PUERTO ARGENTINO',
    title: 'LA BÚSQUEDA DE PROVISIONES',
    situation: 'El racionamiento es crítico. La comida del rancho llega congelada. Se detecta un depósito secundario en el pueblo.',
    choices: [
      {
        label: 'Organizar una patrulla nocturna y conseguir víveres para todo el pelotón.',
        reaction: 'Comida caliente para tus hombres. Tu liderazgo se consolida como indiscutido.',
        changes: { salud: +15, liderazgo: +20, pericia: +10 },
        soundEffect: 'confirm'
      },
      {
        label: 'Aceptar el racionamiento estricto y dar tu porción a los soldados más jóvenes.',
        reaction: 'Ejemplo moral intachable que tus hombres jamás olvidarán.',
        changes: { coraje: +20, liderazgo: +15, salud: -10 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'tierra-6',
    stepNumber: 6,
    date: '21 DE MAYO DE 1982',
    location: 'ALTURAS DE SAN CARLOS',
    title: 'EL DESEMBARCO BRITÁNICO',
    situation: 'Las lanchas de desembarco inglesas entran en San Carlos. Tu posición elevada tiene ángulo de tiro con ametralladora pesada 12,7mm.',
    choices: [
      {
        label: 'Abrir fuego concentrado contra los helicópteros Sea King de asalto.',
        reaction: 'Derribás un helicóptero de transporte. El desembarco inglés se desorganiza.',
        changes: { pericia: +20, coraje: +15, impactoGuerra: +20 },
        promotedToRankIndex: 4, // Teniente Primero / Sargento
        soundEffect: 'alert'
      },
      {
        label: 'Retardar el repliegue cubriendo a la sección de conscriptos.',
        reaction: 'Salvaste a 28 conscriptos de ser embolsados por los comandos Royal Marines.',
        changes: { liderazgo: +25, coraje: +15, salud: -5 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'tierra-7',
    stepNumber: 7,
    date: '28 DE MAYO DE 1982',
    location: 'PRADERA DEL GANSO (GOOSE GREEN)',
    title: 'LA BATALLA DE DARWIN',
    situation: 'El Batallón 2 PARA británico ataca de frente. La turba está inundada. Tu superior cae herido en combate.',
    choices: [
      {
        label: 'Asumir el mando de la sección y contraatacar por el flanco derecho.',
        reaction: 'Tu osado contraataque frena en seco el avance del 2 PARA británico.',
        changes: { liderazgo: +25, coraje: +25, impactoGuerra: +20 },
        promotedToRankIndex: 5, // Capitán de Campo
        medalAwarded: 'Cruz La Nación Argentina al Heroico Valor en Combate',
        soundEffect: 'alert'
      },
      {
        label: 'Dirigir el fuego de los cañones antiaéreos Rheinmetall de 20mm a cota cero.',
        reaction: 'El fuego rasante barre las posiciones enemigas sobre la colina.',
        changes: { pericia: +25, impactoGuerra: +25, coraje: +15 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'tierra-8',
    stepNumber: 8,
    date: '3 DE JUNIO DE 1982',
    location: 'MONTE DOS HERMANAS',
    title: 'INFILTRACIÓN DE COMANDOS',
    situation: 'En plena noche con nevisca, detectás sombras moviéndose entre los peñascos. Son comandos británicos del SAS.',
    choices: [
      {
        label: 'Esperar a que se acerquen a 15 metros y abrir fuego cruzado de sorpresa.',
        reaction: 'Emboscada letal. El comando inglés huye dejando material sensible y radios.',
        changes: { pericia: +25, coraje: +20, impactoGuerra: +20 },
        soundEffect: 'alert'
      },
      {
        label: 'Lanzar granadas de fusil y solicitar apoyo de morteros de 81mm.',
        reaction: 'Los morteros saturan la quebrada. Posición consolidada.',
        changes: { liderazgo: +15, pericia: +20, salud: +5 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'tierra-9',
    stepNumber: 9,
    date: '8 DE JUNIO DE 1982',
    location: 'BAHÍA AGRADABLE / FITZROY',
    title: 'EL DÍA MÁS NEGRO DE LA FLOTA',
    situation: 'La Fuerza Aérea acaba de bombardear los buques ingleses Sir Galahad y Sir Tristram. Quedan tropas enemigas aisladas en la playa.',
    choices: [
      {
        label: 'Coordinar con el Estado Mayor un ataque terrestre envolvente inmediato.',
        reaction: 'Impedís que los británicos consoliden el avance sur hacia la capital.',
        changes: { liderazgo: +20, pericia: +20, impactoGuerra: +25 },
        promotedToRankIndex: 6, // Mayor
        soundEffect: 'confirm'
      },
      {
        label: 'Mantener las alturas y asegurar la línea logística de munición pesada.',
        reaction: 'Las posiciones defensivas quedan reforzadas con artillería.',
        changes: { pericia: +15, salud: +10, impactoGuerra: +10 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'tierra-10',
    stepNumber: 10,
    date: '11 DE JUNIO DE 1982',
    location: 'MONTE LONGDON (COMBATE NOCTURNO)',
    title: 'LA NOCHE DE LAS BAYONETAS',
    situation: '23:30 hs. El 3 PARA asalta la cumbre en oscuridad total con visores nocturnos. El combate se transforma en cuerpo a cuerpo en los pozos.',
    choices: [
      {
        label: 'Calar bayoneta en el fusil FAL y encabezar la defensa del peñón peñón por peñón.',
        reaction: 'Choque legendario. Tu resistencia frena la ola británica durante 8 horas.',
        changes: { coraje: +35, salud: -15, impactoGuerra: +25 },
        promotedToRankIndex: 7, // Teniente Coronel
        medalAwarded: 'Medalla al Valor en Combate',
        soundEffect: 'alert'
      },
      {
        label: 'Solicitar concentración de artillería propia sobre las propias coordenadas.',
        reaction: 'Decisión extrema que quiebra el asalto inglés sobre las rocas.',
        changes: { coraje: +30, liderazgo: +25, impactoGuerra: +30 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'tierra-11',
    stepNumber: 11,
    date: '12 DE JUNIO DE 1982',
    location: 'WIRELESS RIDGE / TUMBLEDOWN',
    title: 'LA DECISIÓN DEL ESTADO MAYOR',
    situation: 'Tu pericia y liderazgo en combate te elevan al Mando Superior. Como jefe de operaciones terrestres, definís la estrategia final.',
    choices: [
      {
        label: 'Lanzar un contraataque masivo con la reserva blindada Panhard y el Batallón 5.',
        reaction: '¡Golpe audaz! El contraataque frena la ofensiva británica y recupera crestas.',
        changes: { liderazgo: +30, pericia: +30, impactoGuerra: +35 },
        promotedToRankIndex: 9, // GENERAL DE BRIGADA
        soundEffect: 'confirm'
      },
      {
        label: 'Atrincherar el cerrojo urbano de Puerto Argentino convirtiéndolo en fortaleza.',
        reaction: 'Imponés una defensa elástica que agota la munición de la infantería británica.',
        changes: { pericia: +25, salud: +10, impactoGuerra: +25 },
        promotedToRankIndex: 8, // Coronel
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'tierra-12',
    stepNumber: 12,
    date: '14 DE JUNIO DE 1982',
    location: 'PUERTO ARGENTINO',
    title: 'LA HORA CERO: EL DESTINO DE LA GUERRA',
    situation: 'Las tropas británicas están al límite de combustible y munición. Londres y la ONU observan la resistencia encarnizada.',
    choices: [
      {
        label: 'Exigir un Cese del Fuego en la ONU con Soberanía Compartida y Retiro Mutuo.',
        reaction: '¡ÉXITO HISTÓRICO! Tu resistencia en los montes obligó a un armisticio soberano.',
        changes: { impactoGuerra: +40, liderazgo: +35 },
        promotedToRankIndex: 10, // GENERAL DE DIVISIÓN
        soundEffect: 'confirm'
      },
      {
        label: 'Proteger la vida de todos tus soldados con honor y bandera en alto.',
        reaction: 'Regresás al continente con la frente alta, respetado por propios y enemigos.',
        changes: { liderazgo: +30, coraje: +20, salud: +15 },
        soundEffect: 'confirm'
      }
    ]
  }
];
