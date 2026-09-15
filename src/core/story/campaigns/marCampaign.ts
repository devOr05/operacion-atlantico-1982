import { type CampaignStep } from './tierraCampaign';

export const MAR_CAMPAIGN: CampaignStep[] = [
  {
    id: 'mar-1',
    stepNumber: 1,
    date: '28 DE ABRIL DE 1982',
    location: 'BASE AERONAVAL RÍO GRANDE',
    title: 'LA SEGUNDA ESCUADRILLA Y EL EXOCET',
    situation: 'Disponés de uno de los únicos cinco cazas Super Étendard y cinco misiles AM-39 Exocet del país. Cada misil es un secreto de estado custodiado día y noche.',
    choices: [
      {
        label: 'Calibrar la interfaz electrónica de tiro junto a los ingenieros de la Armada.',
        reaction: 'Conocés el sistema al milímetro. La telemetría francesa queda lista.',
        changes: { pericia: +20, salud: +5 },
        soundEffect: 'confirm'
      },
      {
        label: 'Realizar vuelos nocturnos en temporal sin reabastecimiento previo.',
        reaction: 'El hielo en las alas casi provoca una tragedia sobre el Canal de Beagle.',
        changes: { salud: -25, pericia: -10 },
        soundEffect: 'alert',
        fatalText: 'Tu Super Étendard se precipitó al mar durante un vuelo de prueba nocturno con engelamiento severo.'
      }
    ]
  },
  {
    id: 'mar-2',
    stepNumber: 2,
    date: '4 DE MAYO DE 1982',
    location: '100 MILLAS AL SUR DE MALVINAS',
    title: 'EL ATAQUE AL HMS SHEFFIELD',
    situation: 'Un avión de patrulla Neptuno detecta al destructor Sheffield. Volás a 15 metros del mar. Encendés el radar Agave solo 3 segundos.',
    choices: [
      {
        label: 'Fijar el eco en el radar, transferir coordenadas al Exocet y disparar en rasante.',
        reaction: '¡MISIL EN EL AIRE! El proyectil impacta en el centro del Sheffield causándole la muerte.',
        changes: { pericia: +25, coraje: +20, impactoGuerra: +30 },
        promotedToRankIndex: 5, // Teniente de Navío
        medalAwarded: 'Cruz de la Nación Argentina al Heroico Valor en Combate',
        soundEffect: 'alert'
      },
      {
        label: 'Trepar a 1000 metros para confirmar visualmente el blanco antes de disparar.',
        reaction: '¡ERROR CRÍTICO! Los radares británicos te enganchan y disparan misiles Sea Dart.',
        changes: { coraje: +10, salud: -40, pericia: -20 },
        soundEffect: 'alert',
        fatalText: 'Fuiste derribado por un misil antiaéreo Sea Dart al romper el silencio de radar y trepar sobre la flota británica.'
      }
    ]
  },
  {
    id: 'mar-3',
    stepNumber: 3,
    date: '15 DE MAYO DE 1982',
    location: 'PORTAAVIONES ARA 25 DE MAYO',
    title: 'EL PORTAAVIONES EN EL ATLÁNTICO SUR',
    situation: 'El portaaviones argentino analiza lanzar un ataque con cazas A-4Q sobre la flota inglesa. Hay calma chicha y falta viento para el despegue con bombas.',
    choices: [
      {
        label: 'Preservar al portaaviones de los submarinos nucleares ingleses y operar desde tierra.',
        reaction: 'Decisión estratégica inteligente. El portaaviones y su escolta quedan a salvo.',
        changes: { pericia: +15, liderazgo: +15, salud: +5 },
        promotedToRankIndex: 6, // Capitán de Corbeta
        soundEffect: 'confirm'
      },
      {
        label: 'Forzar el despegue de los cazas con catapultas al límite del peso máximo.',
        reaction: 'Un caza cae al agua por falta de sustentación; el portaaviones debe virar de emergencia.',
        changes: { salud: -20, liderazgo: -15, impactoGuerra: -10 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'mar-4',
    stepNumber: 4,
    date: '25 DE MAYO DE 1982',
    location: 'ATLÁNTICO SUR (NORTE DE SOLEDAD)',
    title: 'EL HUNDIMIENTO DEL ATLANTIC CONVEYOR',
    situation: 'Día de la Patria. En el radar aparece un buque inglés gigante con helicópteros pesados Chinook y material de asalto.',
    choices: [
      {
        label: 'Lanzamiento simultáneo de dos misiles Exocet con vuelo a ras de las olas.',
        reaction: '¡IMPACTO BRUTAL! El Atlantic Conveyor arde y se hunde con 10 helicópteros.',
        changes: { pericia: +30, coraje: +25, impactoGuerra: +35 },
        promotedToRankIndex: 7, // Capitán de Fragata
        medalAwarded: 'Héroe de la Victoria Aeronaval del 25 de Mayo',
        soundEffect: 'confirm'
      },
      {
        label: 'Lanzar un solo misil y guardar el otro para el regreso.',
        reaction: 'El misil roza la estructura pero no logra hundir al buque de transporte.',
        changes: { impactoGuerra: +10, pericia: +10 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'mar-5',
    stepNumber: 5,
    date: '8 DE JUNIO DE 1982',
    location: 'ESTADO MAYOR DE LA ARMADA',
    title: 'ASCENSO A CONTRAALMIRANTE',
    situation: 'Por tu impecable hoja de servicios, sos nombrado Comandante de Operaciones Navales. La flota inglesa está averiada y con poco combustible.',
    choices: [
      {
        label: 'Instalar la batería costera ITB "Exocet de tierra" en Puerto Argentino.',
        reaction: '¡Hazaña de la ingeniería argentina! La batería improvisada daña al HMS Glamorgan.',
        changes: { pericia: +30, liderazgo: +25, impactoGuerra: +25 },
        promotedToRankIndex: 9, // Contraalmirante
        soundEffect: 'confirm'
      },
      {
        label: 'Ordenar el repliegue de las unidades navales y no disputar el mar.',
        reaction: 'Las tropas en tierra quedan indefensas ante el cañoneo nocturno británico.',
        changes: { liderazgo: -20, coraje: -15, impactoGuerra: -20 },
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'mar-6',
    stepNumber: 6,
    date: '12 DE JUNIO DE 1982',
    location: 'COMANDO GENERAL NAVAL',
    title: 'ALMIRANTE DE LA FLOTA: EL DESTINO FINAL',
    situation: 'Como Almirante supremo, dictás el movimiento definitivo sobre la Fuerza de Tareas británica.',
    choices: [
      {
        label: 'Operación Tenaza con submarinos y destructores: forzar la retirada británica.',
        reaction: '¡VICTORIA NAVAL TOTAL! La Royal Navy se retira del archipiélago sin combustible.',
        changes: { liderazgo: +40, pericia: +35, impactoGuerra: +40 },
        promotedToRankIndex: 10, // ALMIRANTE DE LA FLOTA
        soundEffect: 'confirm'
      },
      {
        label: 'Aceptar el bloqueo naval inglés y replegar la flota a bases continentales.',
        reaction: 'La pérdida de control marítimo sella la caída de Puerto Argentino.',
        changes: { liderazgo: -15, impactoGuerra: -30 },
        soundEffect: 'alert'
      }
    ]
  }
];
