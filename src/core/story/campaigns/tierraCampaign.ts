import { type CampaignStep, type RankTier } from './campaignTypes';
export { type CampaignStep, type RankTier };


// ============================================================================
// 1. CAMPAÑA DE TROPA / CONSCRIPTO (SOLDADO CLASE 62/63)
// ============================================================================
export const TIERRA_TROPA_CAMPAIGN: CampaignStep[] = [
  {
    id: 'tierra-tropa-1',
    stepNumber: 1,
    date: '11 DE ABRIL DE 1982',
    location: 'BAM PALOMAR / PUERTO ARGENTINO',
    title: 'EL DESPLIEGUE EN EL POZO DE ZORRO',
    situation: 'Aterrizás en Malvinas en la bodega de un Hércules C-130. Te asignan al Regimiento 7 de Infantería. El sargento te ordena cavar tu pozo de zorro en la turba húmeda mientras arrecia el viento helado.',
    choices: [
      {
        label: 'Cavar profundo hasta topar piedra y reforzar el parapeto con turba seca.',
        reaction: 'Tus manos sangran por el frío, pero tu pozo resistirá las esquirlas de mortero.',
        changes: { salud: +10, pericia: +10, coraje: +5 },
        soundEffect: 'confirm'
      },
      {
        label: 'Cavar rápido y correr al galpón del pueblo a buscar raciones de comida caliente.',
        reaction: 'Conseguís latas de conserva, pero tu posición queda desprotegida ante bombardeos.',
        changes: { salud: +5, coraje: -10, liderazgo: -5 },
        soundEffect: 'alert'
      },
      {
        label: 'Ayudar a tu compañero de trinchera que está en shock por el frío glacial.',
        reaction: 'Le frotás los pies y comparten el poncho impermeable. Nace una hermandad indestructible.',
        changes: { liderazgo: +15, coraje: +10, salud: -5 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'tierra-tropa-2',
    stepNumber: 2,
    date: '1 DE MAYO DE 1982',
    location: 'MONTE LONGDON (ISLA SOLEDAD)',
    title: 'EL BAUTISMO DE FUEGO BAJO LAS BOMBAS',
    situation: 'Fragatas británicas cañonean la colina en plena noche y aviones Vulcan bombardean la pista. El estruendo ensordecedor hace temblar la tierra.',
    choices: [
      {
        label: 'Apretar el rosario en el fondo del pozo y mantener el dedo en el gatillo del FAL.',
        reaction: 'El polvo te asfixia, pero contenés el pánico. Sobrevivís al bombardeo intacto.',
        changes: { coraje: +15, salud: -5, pericia: +5 },
        soundEffect: 'confirm'
      },
      {
        label: 'Salir arrastrándote bajo el fuego para reconectar el cable de comunicaciones cortado.',
        reaction: '¡Hazaña de valor! Las esquirlas silban a centímetros, pero restablecés la línea con el comando.',
        changes: { coraje: +25, liderazgo: +20, salud: -25, impactoGuerra: +15 },
        medalAwarded: 'La Nación Argentina al Valor en Combate',
        soundEffect: 'alert',
        fatalText: 'Una esquirla de cañón naval de 114mm impactó directamente sobre tu posición en la ladera expuesta.'
      },
      {
        label: 'Gritar de terror e intentar huir hacia el valle desarmado.',
        reaction: 'Tus compañeros te sujetan a la fuerza. El choque psicológico te deja al borde de la corte marcial.',
        changes: { coraje: -30, salud: -10, liderazgo: -20 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'tierra-tropa-3',
    stepNumber: 3,
    date: '28 DE MAYO DE 1982',
    location: 'PRADERA DEL GANSO (DARWIN)',
    title: 'COMBATE EN CAMPO ABIERTO',
    situation: 'Los paracaidistas británicos del 2 PARA avanzan entre las ondulaciones de Darwin. Tu pelotón queda aislado con munición escasa.',
    choices: [
      {
        label: 'Fijar el bípode del FAL en una roca y disparar tiro a tiro a los destellos británicos.',
        reaction: 'Tu puntería frena a una sección enemiga y permite replegar a los heridos.',
        changes: { pericia: +15, coraje: +10, impactoGuerra: +10 },
        soundEffect: 'confirm'
      },
      {
        label: 'Alimentar la cinta de la ametralladora MAG del cabo mientras caen proyectiles de mortero.',
        reaction: 'Fuego demoledor. Tu cabo cae herido y vos continuás disparando la cinta caliente.',
        changes: { coraje: +20, salud: -15, liderazgo: +15, impactoGuerra: +15 },
        promotedToRankIndex: 1, // Ascenso a Cabo
        soundEffect: 'alert'
      },
      {
        label: 'Enterrarte en la turba fingiendo estar muerto para evitar ser blanco.',
        reaction: 'Salvaste tu pellejo en ese instante, pero la culpa te carcome el alma.',
        changes: { coraje: -25, liderazgo: -20, salud: +5 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'tierra-tropa-4',
    stepNumber: 4,
    date: '11 DE JUNIO DE 1982',
    location: 'MONTE LONGDON (CRESTA NORTE)',
    title: 'LA NOCHE DE LAS BAYONETAS',
    situation: 'En la medianoche helada a -10°C, el 3 PARA lanza el asalto final. Combate cuerpo a cuerpo en la oscuridad con bayonetas, granadas y cuchillos.',
    choices: [
      {
        label: 'Calzar la bayoneta en el FAL y saltar fuera de la trinchera al grito de ¡VIVA LA PATRIA!',
        reaction: 'Choque brutal en las sombras. Repelemos la primera ola con una bravura legendaria.',
        changes: { coraje: +30, salud: -35, liderazgo: +25, impactoGuerra: +20 },
        medalAwarded: 'Cruz al Heroico Valor en Combate',
        soundEffect: 'alert',
        fatalText: 'Caíste en combate cuerpo a cuerpo en la cima de Monte Longdon cubriendo el repliegue de tu sección.'
      },
      {
        label: 'Lanzar las últimas dos granadas FMK-3 y replegarte ordenadamente hacia Monte Dos Hermanas.',
        reaction: 'Las detonaciones frenan el avance inglés. Lográs salvar a tres camaradas heridos.',
        changes: { pericia: +15, salud: -10, liderazgo: +15, impactoGuerra: +10 },
        soundEffect: 'confirm'
      },
      {
        label: 'Rendirte inmediatamente arrojando el fusil a la nieve.',
        reaction: 'Te toman prisionero. Terminó la guerra para vos entre alambre de púas en San Carlos.',
        changes: { coraje: -30, liderazgo: -25, salud: +10 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'tierra-tropa-5',
    stepNumber: 5,
    date: '14 DE JUNIO DE 1982',
    location: 'SAPPER HILL / PUERTO ARGENTINO',
    title: 'LA ÚLTIMA LÍNEA DE DEFENSA',
    situation: 'Los británicos dominan todas las alturas. Entrás a las calles de Puerto Argentino con el cargador casi vacío mientras repican campanas en la distancia.',
    choices: [
      {
        label: 'Unirte al Batallón de Infantería de Marina 5 (BIM 5) para la última resistencia organizada.',
        reaction: 'Disparás hasta el último cartucho con disciplina intachable hasta la orden de cese al fuego.',
        changes: { coraje: +25, liderazgo: +20, impactoGuerra: +15, salud: -15 },
        soundEffect: 'confirm'
      },
      {
        label: 'Buscar una casa de civiles para pedir agua y refugiar a un soldado conscripto de 18 años.',
        reaction: 'Un acto de compasión humana en medio del derrumbe bélico.',
        changes: { liderazgo: +15, salud: +10, coraje: +5 },
        soundEffect: 'confirm'
      },
      {
        label: 'Destruir el cerrojo de tu fusil FAL contra una roca para que el enemigo no lo use.',
        reaction: 'Orgullo militar intacto: tu arma jamás caerá en manos enemigas en condiciones operativas.',
        changes: { coraje: +15, pericia: +10 },
        soundEffect: 'confirm'
      }
    ]
  }
];

// ============================================================================
// 2. CAMPAÑA DE SUBOFICIAL (CABO / SARGENTO - LIDERAZGO DE PELOTÓN)
// ============================================================================
export const TIERRA_SUBOFICIAL_CAMPAIGN: CampaignStep[] = [
  {
    id: 'tierra-sub-1',
    stepNumber: 1,
    date: '14 DE ABRIL DE 1982',
    location: 'MONTE DOS HERMANAS (ISLA SOLEDAD)',
    title: 'EMPLAZAMIENTO DEL NIDO DE AMETRALLADORA',
    situation: 'Sos Sargento a cargo de un grupo de tiradores con una ametralladora pesada MAG 7.62mm. Tenés que elegir el sector de tiro dominante para frenar una posible infiltración enemiga.',
    choices: [
      {
        label: 'Emplazar la MAG en una cresta rocosa dominante con campo de tiro cruzado de 360°.',
        reaction: 'Excelente sector de fuego, aunque la posición es vulnerable a los visores térmicos ingleses.',
        changes: { pericia: +15, liderazgo: +10, coraje: +10 },
        soundEffect: 'confirm'
      },
      {
        label: 'Enterrar la posición en una hondonada con camuflaje de turba y alambre trampa.',
        reaction: 'Invisibles para los helicópteros de reconocimiento. Posición fortificada.',
        changes: { salud: +10, pericia: +10, liderazgo: +5 },
        soundEffect: 'confirm'
      },
      {
        label: 'Obligar a los conscriptos a cargar cajones de munición día y noche sin descanso.',
        reaction: 'Acumulás 5.000 proyectiles, pero dos soldados caen enfermos con neumonía severa.',
        changes: { impactoGuerra: +10, salud: -20, liderazgo: -15 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'tierra-sub-2',
    stepNumber: 2,
    date: '2 DE MAYO DE 1982',
    location: 'CERRO DOS HERMANAS',
    title: 'DISCIPLINA BAJO EL FUEGO',
    situation: 'Durante la guardia nocturna, dos conscriptos jóvenes rompen en llanto por el congelamiento y quieren disparar al aire creyendo ver sombras.',
    choices: [
      {
        label: 'Abrazarlos con firmeza, darles tu propia bufanda y recordarles que vos respondes por ellos.',
        reaction: 'Tu templanza salva la posición del delatarse y forja lealtad eterna en tu pelotón.',
        changes: { liderazgo: +25, coraje: +15, salud: -5 },
        soundEffect: 'confirm'
      },
      {
        label: 'Sancionarlos con rigor militar para que el resto mantenga silencio de radio absoluto.',
        reaction: 'Silencio estricto, pero la moral del grupo cae en picada.',
        changes: { liderazgo: -10, pericia: +10, coraje: +5 },
        soundEffect: 'alert'
      },
      {
        label: 'Autorizar fuego de tanteo para calmar la ansiedad.',
        reaction: '¡Grave error! Los destellos delaten tu nido y una fragata inglesa ajusta cañonazos.',
        changes: { salud: -25, coraje: -15, impactoGuerra: -10 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'tierra-sub-3',
    stepNumber: 3,
    date: '8 DE JUNIO DE 1982',
    location: 'MONTE HARRIET',
    title: 'CONTRAEMBOSCADA NOCTURNA',
    situation: 'Patrullas de comandos británicos del SAS intentan infiltrar la retaguardia de tus morteros con miras de visión nocturna.',
    choices: [
      {
        label: 'Encender bengalas de fósforo y abrir fuego concentrado de MAG barra libre.',
        reaction: 'Cegás los visores infrarrojos ingleses y desbaratás la infiltración causándoles bajas.',
        changes: { pericia: +20, coraje: +15, impactoGuerra: +20 },
        soundEffect: 'confirm'
      },
      {
        label: 'Ordenar al pelotón calar bayonetas y tenderles una emboscada silenciosa entre las rocas.',
        reaction: 'Combate fiero en la niebla. Demostrás la superioridad del combate cercano criollo.',
        changes: { coraje: +25, liderazgo: +20, salud: -20, impactoGuerra: +15 },
        medalAwarded: 'Medalla al Valor en Combate',
        soundEffect: 'alert'
      },
      {
        label: 'Pedir apoyo de artillería radial sobre tus propias coordenadas de repliegue.',
        reaction: 'Peligro extremo (*danger close*). Los proyectiles de 105mm diezman al enemigo pero te aturden.',
        changes: { impactoGuerra: +20, salud: -25, coraje: +15 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'tierra-sub-4',
    stepNumber: 4,
    date: '12 DE JUNIO DE 1982',
    location: 'MONTE DOS HERMANAS (RETIRADA ESCALONADA)',
    title: 'CUBRIR LA RETIRADA DE LA COMPAÑÍA',
    situation: 'La posición es insostenible. El jefe de compañía ordena replegarse hacia Tumbledown. Alguien debe quedarse con la ametralladora para cubrir la retaguardia.',
    choices: [
      {
        label: 'Quedarte vos solo al mando de la MAG disparando ráfagas continuas hasta agotar cintas.',
        reaction: 'Acto de heroísmo supremo. Salvaste a 40 conscriptos mientras te rodeaban tres compañías del 45 Commando.',
        changes: { coraje: +35, liderazgo: +30, salud: -35, impactoGuerra: +25 },
        medalAwarded: 'Cruz La Nación Argentina al Heroico Valor en Combate',
        soundEffect: 'alert',
        fatalText: 'Cumpliste con el deber sagrado del suboficial: caíste aferrado a la manija de tu ametralladora cubriendo a tus soldados.'
      },
      {
        label: 'Organizar repliegue por saltos: dos hombres cubren mientras dos retroceden en orden.',
        reaction: 'Táctica de manual militar. Llegás a Puerto Argentino con el 90% de tu personal a salvo.',
        changes: { liderazgo: +25, pericia: +20, coraje: +10 },
        soundEffect: 'confirm'
      },
      {
        label: 'Abandonar la ametralladora pesada para correr más rápido.',
        reaction: 'Llegás ileso, pero dejás armamento vital al enemigo y perdés el respeto de tu tropa.',
        changes: { liderazgo: -30, coraje: -20, salud: +10 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'tierra-sub-5',
    stepNumber: 5,
    date: '14 DE JUNIO DE 1982',
    location: 'PUERTO ARGENTINO (ÚLTIMO RECUENTO)',
    title: 'EL HONOR DEL SUBOFICIAL',
    situation: 'Cesan los combates. Reunís a los sobrevivientes de tu grupo en el muelle bajo la nieve. Te piden un mensaje final antes de entregar las armas.',
    choices: [
      {
        label: 'Cuadrarte, saludarlos uno por uno con un abrazo y decirles: "Cumplieron como leones, la Patria no los olvida".',
        reaction: 'Lágrimas y orgullo en los ojos de los muchachos. Jamás olvidarán a su sargento.',
        changes: { liderazgo: +30, coraje: +20, impactoGuerra: +10 },
        soundEffect: 'confirm'
      },
      {
        label: 'Esconder la bandera del regimiento bajo tu chaquetilla para que nunca caiga como trofeo inglés.',
        reaction: 'Salvaste el pabellón sagrado. Regresará al continente intacto.',
        changes: { coraje: +25, liderazgo: +20, pericia: +10 },
        soundEffect: 'confirm'
      }
    ]
  }
];

// ============================================================================
// 3. CAMPAÑA DE OFICIAL DE CAMPO (TENIENTE / CAPITÁN / MAYOR)
// ============================================================================
export const TIERRA_OFICIAL_CAMPAIGN: CampaignStep[] = [
  {
    id: 'tierra-ofic-1',
    stepNumber: 1,
    date: '12 DE ABRIL DE 1982',
    location: 'PUERTO ARGENTINO (ESTADO MAYOR RI 25)',
    title: 'DISTRIBUCIÓN TÁCTICA DE LA COMPAÑÍA',
    situation: 'Sos Teniente Primero a cargo de la Compañía C. El Coronel te entrega las órdenes de operaciones para fortificar el perímetro defensivo exterior.',
    choices: [
      {
        label: 'Disponer defensa elástica en profundidad con campos minados y fuego de morteros pre-registrado.',
        reaction: 'Planteamiento táctico sobresaliente que desgastará enormemente cualquier ofensiva británica.',
        changes: { pericia: +20, liderazgo: +15, impactoGuerra: +15 },
        soundEffect: 'confirm'
      },
      {
        label: 'Priorizar el abastecimiento logístico y abrigo de tus 120 hombres antes de iniciar obras.',
        reaction: 'Cero bajas por congelamiento en tu compañía. La tropa te venera.',
        changes: { salud: +20, liderazgo: +20, coraje: +10 },
        soundEffect: 'confirm'
      },
      {
        label: 'Exigir al comando superior baterías de misiles antitanque Bantam suplementarias.',
        reaction: 'Tu insistencia te genera roces con los superiores, pero conseguís 4 lanzaderas clave.',
        changes: { impactoGuerra: +15, pericia: +10, liderazgo: +5 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'tierra-ofic-2',
    stepNumber: 2,
    date: '28 DE MAYO DE 1982',
    location: 'COLINAS DE DARWIN / GOOSE GREEN',
    title: 'EL FUEGO CRUZADO DE ARTILLERÍA',
    situation: 'El 2do Batallón de Paracaidistas inglés ataca la posición de Darwin. Tu sección de apoyo con cañones de 105mm Oto Melara recibe fuego de contrabatería.',
    choices: [
      {
        label: 'Coordinar con los aviones Pucará de la BAM Cóndor un ataque rasante con cohetes.',
        reaction: 'Los Pucará barren la ladera con coheteras de 70mm, deteniendo en seco el asalto británico.',
        changes: { pericia: +20, impactoGuerra: +25, liderazgo: +15 },
        soundEffect: 'confirm'
      },
      {
        label: 'Correr hasta el puesto de observación avanzado para reglar el tiro artillero vos mismo.',
        reaction: 'Precisión letal sobre las líneas inglesas, pero una esquirla te hiere en el hombro.',
        changes: { coraje: +25, pericia: +20, salud: -25, impactoGuerra: +20 },
        medalAwarded: 'La Nación Argentina al Heroico Valor en Combate',
        soundEffect: 'alert'
      },
      {
        label: 'Ordenar replegar las piezas de artillería a Puerto Argentino para evitar su destrucción.',
        reaction: 'Salvás los cañones, pero dejás a la infantería en Goose Green sin cobertura.',
        changes: { liderazgo: -25, impactoGuerra: -20, salud: +10 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'tierra-ofic-3',
    stepNumber: 3,
    date: '11 DE JUNIO DE 1982',
    location: 'MONTE TUMBLEDOWN / DOS HERMANAS',
    title: 'EL CONTRAATAQUE NOCTURNO',
    situation: 'Los Guardias Escoceses y Ghurkhas amenazan con quebrar el cerco. El comando te pide liderar un contraataque de choque con tus reservas.',
    choices: [
      {
        label: 'Ponerte al frente de la línea y lanzar el contraataque encabezando el avance.',
        reaction: 'Liderazgo inspirador: hacés retroceder a la Guardia Escocesa 400 metros en la oscuridad.',
        changes: { coraje: +30, liderazgo: +30, salud: -30, impactoGuerra: +25 },
        promotedToRankIndex: 6, // Mayor
        soundEffect: 'alert',
        fatalText: 'Fuiste alcanzado al frente de tus hombres liderando el contraataque en la cresta de Tumbledown.'
      },
      {
        label: 'Montar una emboscada con misiles guiados antitanque Bantam y fuego cruzado de fusileros.',
        reaction: 'Destruís nidos de ametralladoras inglesas causándoles retrasos críticos.',
        changes: { pericia: +25, liderazgo: +15, impactoGuerra: +20 },
        soundEffect: 'confirm'
      },
      {
        label: 'Informar que las reservas están exhaustas y rechazar la orden de contraataque.',
        reaction: 'Evitás bajas, pero abrís una brecha por donde los británicos alcanzan Moody Brook.',
        changes: { liderazgo: -20, coraje: -15, impactoGuerra: -25 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'tierra-ofic-4',
    stepNumber: 4,
    date: '14 DE JUNIO DE 1982',
    location: 'PUERTO ARGENTINO (DEFENSA DEL PERÍMETRO)',
    title: 'LA BATALLA FINAL POR LA CAPITAL',
    situation: 'Los ingleses están a 2 km. Tus soldados agotan los últimos cargadores. Desde el Estado Mayor te consultan si tus hombres pueden resistir un último asalto.',
    choices: [
      {
        label: '"Mi compañía combate hasta agotar la última munición. ¡No nos rendimos sin orden escrita!"',
        reaction: 'Demostración de honor castrense que los propios oficiales británicos elogiarán en sus memorias.',
        changes: { coraje: +30, liderazgo: +25, impactoGuerra: +20 },
        soundEffect: 'confirm'
      },
      {
        label: 'Coordinar con los médicos la evacuación inmediata de los conscriptos con congelamiento severo.',
        reaction: 'Salvaste la vida de 25 jóvenes que de otro modo hubiesen muerto de hipotermia.',
        changes: { liderazgo: +25, salud: +15, coraje: +10 },
        soundEffect: 'confirm'
      }
    ]
  }
];

// ============================================================================
// 4. CAMPAÑA DE ALTO MANDO (GENERAL DE BRIGADA / DIVISIÓN)
// ============================================================================
export const TIERRA_ALTO_MANDO_CAMPAIGN: CampaignStep[] = [
  {
    id: 'tierra-gral-1',
    stepNumber: 1,
    date: '15 DE ABRIL DE 1982',
    location: 'COMANDO DE LA BRIGADA X (PUERTO ARGENTINO)',
    title: 'EL PLAN ESTRATÉGICO DE DEFENSA DEL ARCHIPIÉLAGO',
    situation: 'Sos General de Brigada a cargo del Teatro de Operaciones Malvinas. El Estado Mayor Conjunto en Buenos Aires te pide definir la doctrina de despliegue.',
    choices: [
      {
        label: 'Concentrar el 80% de las fuerzas y artillería pesada en las colinas que rodean Puerto Argentino.',
        reaction: 'Fortaleza inexpugnable en la capital, aunque dejás desguarnecido el Estrecho de San Carlos.',
        changes: { pericia: +15, liderazgo: +15, impactoGuerra: +15 },
        soundEffect: 'confirm'
      },
      {
        label: 'Desplegar fuerzas móviles y blindados Panhard en San Carlos y Darwin para impedir cabezas de playa.',
        reaction: '¡Decisión visionaria! Anticipás el lugar exacto del desembarco inglés.',
        changes: { pericia: +25, impactoGuerra: +30, coraje: +15 },
        soundEffect: 'confirm'
      },
      {
        label: 'Dispersar pequeños regimientos por toda la Gran Malvina para obligar a los ingleses a dividirse.',
        reaction: 'Las fuerzas quedan aisladas sin apoyo logístico ni comunicaciones seguras.',
        changes: { impactoGuerra: -20, liderazgo: -15, pericia: -10 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'tierra-gral-2',
    stepNumber: 2,
    date: '21 DE MAYO DE 1982',
    location: 'ESTRECHO DE SAN CARLOS / PUERTO ARGENTINO',
    title: 'EL DESEMBARCO BRITÁNICO EN SAN CARLOS',
    situation: 'La flota británica inicia el desembarco en San Carlos con 4.000 soldados. El puente aéreo continental ofrece una ventana de bombarderos Canberra y aviones de ataque.',
    choices: [
      {
        label: 'Ordenar contraataque inmediato combinando infantería mecanizada con los ataques aéreos de la FAS.',
        reaction: 'Golpe demoledor a la cabeza de playa británica. La Task Force sufre pérdidas de buques gravísimas.',
        changes: { impactoGuerra: +35, liderazgo: +25, coraje: +20, pericia: +20 },
        soundEffect: 'confirm'
      },
      {
        label: 'Mantener las tropas atrincheradas en Puerto Argentino esperando el avance inglés por tierra.',
        reaction: 'Permitís que los británicos consoliden su logística y artillería en San Carlos sin oposición terrestre.',
        changes: { impactoGuerra: -20, liderazgo: -15, pericia: -10 },
        soundEffect: 'alert'
      },
      {
        label: 'Ordenar al Regimiento 12 de Mercedes cortar la ruta de avance británico en Goose Green.',
        reaction: 'Combate épico que demorará el cronograma de la corona británica por semanas.',
        changes: { impactoGuerra: +20, liderazgo: +15, coraje: +15 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'tierra-gral-3',
    stepNumber: 3,
    date: '5 DE JUNIO DE 1982',
    location: 'BAM MALVINAS (RADAR WESTINGHOUSE TPS-43)',
    title: 'LA GUERRA ELECTRÓNICA Y SUMINISTROS',
    situation: 'Los aviones británicos Vulcan atacan con misiles antirradar Shrike el radar TPS-43 de Puerto Argentino. La pista de aterrizaje está sembrada de cráteres de bombas.',
    choices: [
      {
        label: 'Apagar el radar justo cuando el misil Shrike engancha y reencenderlo a los 30 segundos.',
        reaction: '¡Jugada maestra de guerra electrónica! El misil inglés cae al mar y el radar sigue guiando a nuestros cazas.',
        changes: { pericia: +30, impactoGuerra: +25, liderazgo: +20 },
        soundEffect: 'confirm'
      },
      {
        label: 'Exigir al continente el cruce de tres Hércules C-130 nocturnos con obuses de 155mm Sofma.',
        reaction: 'Dos Hércules burlan el bloqueo a 10 metros del agua. La artillería pesada llega a tiempo a la capital.',
        changes: { impactoGuerra: +30, coraje: +20, liderazgo: +20 },
        soundEffect: 'confirm'
      },
      {
        label: 'Declarar la pista inoperable para evitar riesgos a los transportes continentales.',
        reaction: 'Se corta el cordón umbilical de suministros. La moral de las guarniciones se resiente.',
        changes: { impactoGuerra: -25, liderazgo: -20, coraje: -15 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'tierra-gral-4',
    stepNumber: 4,
    date: '13 DE JUNIO DE 1982',
    location: 'ESTADO MAYOR CONJUNTO (BUENOS AIRES Y MALVINAS)',
    title: 'EL ASALTO FINAL Y EL DILEMA DEL GENERAL',
    situation: 'Las colinas exteriores han caído. La artillería británica bate los suburbios de Puerto Argentino donde conviven 1.800 civiles malvinenses y miles de soldados.',
    choices: [
      {
        label: 'Lanzar el contraataque final de la reserva de blindados Panhard con munición perforante.',
        reaction: 'Ataque feroz que detiene el avance de la 5ta Brigada inglesa y equilibra la correlación de fuerzas.',
        changes: { coraje: +30, liderazgo: +25, impactoGuerra: +30 },
        soundEffect: 'confirm'
      },
      {
        label: 'Contactar a la Cruz Roja y ONU para negociar un alto el fuego condicional con honor militar intacto.',
        reaction: 'Lográs salvar miles de vidas evitando una masacre civil, preservando la dignidad nacional.',
        changes: { liderazgo: +30, pericia: +20, impactoGuerra: +15 },
        soundEffect: 'confirm'
      },
      {
        label: 'Resistir en las casas de la ciudad convirtiendo Puerto Argentino en un Stalingrado austral.',
        reaction: 'Baño de sangre civil y colapso de la disciplina. Críticas demoledoras en la historia militar.',
        changes: { salud: -40, liderazgo: -30, impactoGuerra: -30 },
        soundEffect: 'alert'
      }
    ]
  }
];

export function getTierraCampaignByTier(tier: RankTier): CampaignStep[] {
  switch (tier) {
    case 'tropa':
      return TIERRA_TROPA_CAMPAIGN;
    case 'suboficial':
      return TIERRA_SUBOFICIAL_CAMPAIGN;
    case 'oficial':
      return TIERRA_OFICIAL_CAMPAIGN;
    case 'alto_mando':
      return TIERRA_ALTO_MANDO_CAMPAIGN;
    default:
      return TIERRA_TROPA_CAMPAIGN;
  }
}

// Mantener exportación retrocompatible
export const TIERRA_CAMPAIGN = TIERRA_TROPA_CAMPAIGN;
