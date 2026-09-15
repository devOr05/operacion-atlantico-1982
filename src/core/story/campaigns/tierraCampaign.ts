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
    fatalText?: string;
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
        label: 'Guardar abrigo térmico extra, guantes de lana y raciones secas.',
        reaction: 'Priorizás la resistencia al frío. La turba malvinense congela en minutos.',
        changes: { salud: +10, pericia: +5 },
        soundEffect: 'confirm'
      },
      {
        label: 'Cargar munición pesada y cajas de cargadores de FAL dejando el abrigo.',
        reaction: 'Mucho poder de fuego pero el viento polar te hiela los huesos desde el primer día.',
        changes: { coraje: +15, pericia: +10, salud: -20 },
        soundEffect: 'alert'
      },
      {
        label: 'Llevar cartas de tu familia, una radio portátil y un rosario.',
        reaction: 'Mantenés la moral alta, aunque el peso de la mochila te agota en la marcha.',
        changes: { liderazgo: +10, coraje: +10, salud: -5 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'tierra-2',
    stepNumber: 2,
    date: '18 DE ABRIL DE 1982',
    location: 'MONTE LONGDON (ISLA SOLEDAD)',
    title: 'EL POZO DE ZORRO EN LA TURBA',
    situation: 'El viento polar sopla a 80 km/h. El agua gélida inunda el fondo del pozo. Tu compañero tiene las manos moradas y tiembla sin parar.',
    choices: [
      {
        label: 'Cavar canaletas de desagüe con piedras y turnarse para vigilar sin dormir en el barro.',
        reaction: 'Trabajo duro bajo la nevisca. Salvan los pies de la gangrena por trinchera.',
        changes: { salud: +5, pericia: +10, liderazgo: +10 },
        soundEffect: 'confirm'
      },
      {
        label: 'Quedarse inmóvil dentro del pozo tapado con el poncho esperando el amanecer.',
        reaction: 'El agua helada te cala hasta los huesos. Sufrís principio de hipotermia severa.',
        changes: { salud: -25, coraje: -10 },
        soundEffect: 'alert',
        fatalText: 'No lograste sobrevivir a las temperaturas extremas de -12°C en el pozo de zorro; sucumbiste por hipotermia en Monte Longdon.'
      }
    ]
  },
  {
    id: 'tierra-3',
    stepNumber: 3,
    date: '1 DE MAYO DE 1982',
    location: 'PUERTO ARGENTINO / CERCANÍAS',
    title: 'EL BAUTISMO DE FUEGO',
    situation: '04:40 hs. Un estruendo desgarrador sacude el suelo: un bombardero Vulcan y fragatas británicas inician un cañoneo de saturación naval masivo.',
    choices: [
      {
        label: 'Pegarse al suelo en el pozo, mantener la calma de la sección y reportar por radio.',
        reaction: 'Temple de acero. Las esquirlas vuelan por encima pero tu sección no se desbanda.',
        changes: { coraje: +15, liderazgo: +10, impactoGuerra: +5 },
        promotedToRankIndex: 1, // Cabo
        soundEffect: 'alert'
      },
      {
        label: 'Correr a campo abierto bajo el fuego para intentar rescatar a un herido.',
        reaction: '¡Heroísmo extremo! Una lluvia de esquirlas de 4.5 pulgadas estalla a metros tuyo.',
        changes: { coraje: +25, salud: -35, liderazgo: +15, impactoGuerra: +5 },
        medalAwarded: 'Mención al Valor en el Bautismo de Fuego',
        soundEffect: 'alert',
        fatalText: 'Una esquirla de artillería naval británica te alcanzó en el pecho mientras corrías a salvar a tu camarada el 1 de mayo.'
      },
      {
        label: 'Presa del pánico, abandonar la posición y huir hacia las casas del pueblo.',
        reaction: 'El pánico te quiebra. Tus compañeros te miran con desprecio.',
        changes: { coraje: -35, liderazgo: -25, salud: +5 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'tierra-4',
    stepNumber: 4,
    date: '10 DE MAYO DE 1982',
    location: 'CERRO ZAPADOR (BATERÍA DE ARTILLERÍA)',
    title: 'CONTRABATERÍA DE 105MM',
    situation: 'Desde el horizonte marino, una fragata inglesa bombardea las alturas cada noche. Se pide voluntario para operar el cañón Oto Melara bajo fuego.',
    choices: [
      {
        label: 'Calcular la distancia con el telémetro y disparar tres salvas rápidas de 105mm.',
        reaction: '¡Impacto muy próximo al buque inglés! La fragata cesa el fuego y se repliega.',
        changes: { pericia: +20, impactoGuerra: +15, coraje: +10 },
        promotedToRankIndex: 3, // Subteniente
        soundEffect: 'confirm'
      },
      {
        label: 'Asegurar las trincheras de munición y mantener la guardia pasiva.',
        reaction: 'Evitás bajas innecesarias, aunque el hostigamiento inglés continúa.',
        changes: { salud: +5, pericia: +5 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'tierra-5',
    stepNumber: 5,
    date: '21 DE MAYO DE 1982',
    location: 'ALTURAS DE SAN CARLOS',
    title: 'EL DESEMBARCO BRITÁNICO',
    situation: 'Las tropas de desembarco Royal Marines y paracaidistas entran con lanchas y helicópteros en el estrecho. La superioridad enemiga es aplastante.',
    choices: [
      {
        label: 'Abrir fuego sostenido con ametralladora MAG 7,62mm retardando la cabeza de playa.',
        reaction: 'Derribás a tiradores enemigos y cubrís la retirada de tu pelotón.',
        changes: { coraje: +20, salud: -25, pericia: +15, impactoGuerra: +15 },
        promotedToRankIndex: 4, // Teniente Primero
        soundEffect: 'alert',
        fatalText: 'Fuiste alcanzado por fuego concentrado de morteros británicos durante el desembarco en San Carlos el 21 de mayo.'
      },
      {
        label: 'Efectuar un repliegue táctico organizado hacia las alturas de Dos Hermanas.',
        reaction: 'Salvaste la vida de 25 conscriptos que estaban a punto de ser cercados.',
        changes: { liderazgo: +20, salud: +5, coraje: +5 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'tierra-6',
    stepNumber: 6,
    date: '28 DE MAYO DE 1982',
    location: 'PRADERA DEL GANSO (DARWIN)',
    title: 'EL CERCO DE GOOSE GREEN',
    situation: 'El 2 PARA británico cerca la posición. Tu oficial a cargo cae en combate. El barro y la niebla impiden ver a más de 20 metros.',
    choices: [
      {
        label: 'Asumir el mando del pelotón y dirigir el fuego de los cañones antiaéreos en rasante.',
        reaction: '¡Golpe demoledor! Los cañones de 20mm frenan en seco la embestida enemiga.',
        changes: { liderazgo: +25, coraje: +20, impactoGuerra: +20 },
        promotedToRankIndex: 5, // Capitán
        medalAwarded: 'Cruz La Nación Argentina al Heroico Valor en Combate',
        soundEffect: 'confirm'
      },
      {
        label: 'Ordenar a los soldados atrincherarse y racionar los últimos proyectiles.',
        reaction: 'Resistencia estoica. Los hombres aguantan pero el cerco se estrecha.',
        changes: { salud: -15, liderazgo: +10 },
        soundEffect: 'confirm'
      },
      {
        label: 'Arrojar las armas y entregarse de inmediato ante el primer avance.',
        reaction: 'Sos capturado sin disparar un tiro. Tus camaradas pagan el precio.',
        changes: { coraje: -30, liderazgo: -30, impactoGuerra: -20 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'tierra-7',
    stepNumber: 7,
    date: '11 DE JUNIO DE 1982',
    location: 'MONTE LONGDON (NOCHE HELADA)',
    title: 'LA NOCHE DE LAS BAYONETAS',
    situation: '23:30 hs. El 3 PARA británico ataca la cresta rocosa en oscuridad con visores térmicos. El combate se transforma en cuerpo a cuerpo en los peñones.',
    choices: [
      {
        label: 'Calar bayoneta en el fusil FAL y liderar la defensa peñón por peñón en la niebla.',
        reaction: '¡Choque titánico! Luchás cuerpo a cuerpo bajo el fuego cruzado durante 6 horas.',
        changes: { coraje: +30, salud: -35, impactoGuerra: +20 },
        promotedToRankIndex: 7, // Teniente Coronel
        medalAwarded: 'Medalla al Valor en Combate',
        soundEffect: 'alert',
        fatalText: 'Caíste en combate cuerpo a cuerpo defendiendo el peñón de Monte Longdon en la noche del 11 de junio.'
      },
      {
        label: 'Solicitar por radio fuego de artillería propia de 105mm sobre la propia cumbre.',
        reaction: 'Medida extrema y desesperada: la artillería argentina frena la ola británica.',
        changes: { liderazgo: +25, coraje: +25, salud: -20, impactoGuerra: +25 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'tierra-8',
    stepNumber: 8,
    date: '13 DE JUNIO DE 1982',
    location: 'COMANDO GENERAL PUERTO ARGENTINO',
    title: 'LA HORA DE LOS GENERALES',
    situation: 'Tu valor te llevó a la cúpula militar. Las líneas británicas están exhaustas y al borde del colapso logístico. La orden que des decidirá la guerra.',
    choices: [
      {
        label: 'Lanzar el contraataque general de reserva con el Batallón 5 de Marina y blindados Panhard.',
        reaction: '¡ATAQUE HISTÓRICO! La embestida rompe el dispositivo británico en Wireless Ridge.',
        changes: { liderazgo: +30, pericia: +25, impactoGuerra: +35 },
        promotedToRankIndex: 10, // GENERAL DE DIVISIÓN
        soundEffect: 'confirm'
      },
      {
        label: 'Mantener la posición defensiva pasiva esperando una mediación de la ONU.',
        reaction: 'La munición se agota sin contraataque; las posiciones quedan aisladas.',
        changes: { coraje: -10, impactoGuerra: -10 },
        soundEffect: 'confirm'
      }
    ]
  }
];
