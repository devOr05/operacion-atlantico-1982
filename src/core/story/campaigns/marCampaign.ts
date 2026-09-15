import { type CampaignStep } from './tierraCampaign';

export const MAR_CAMPAIGN: CampaignStep[] = [
  {
    id: 'mar-1',
    stepNumber: 1,
    date: '28 DE ABRIL DE 1982',
    location: 'BASE AERONAVAL COMANDANTE ESPORA / RÍO GRANDE',
    title: 'LA SEGUNDA ESCUADRILLA AERONAVAL',
    situation: 'Tenés asignado uno de los únicos cinco cazas Super Étendard y cinco misiles antibuque AM-39 Exocet del país. Cada proyectil es un tesoro nacional.',
    choices: [
      {
        label: 'Dedicar horas extras a calibrar la computadora de tiro y la interfaz francesa.',
        reaction: 'Conocés el sistema al milímetro. La precisión será quirúrgica.',
        changes: { pericia: +25, salud: +5 },
        soundEffect: 'confirm'
      },
      {
        label: 'Entrenar el reabastecimiento en vuelo en noche cerrada y silencio de radio.',
        reaction: 'Capacidad de volar a 1.000 kilómetros mar adentro sin ser detectado.',
        changes: { coraje: +20, pericia: +15 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'mar-2',
    stepNumber: 2,
    date: '4 DE MAYO DE 1982',
    location: '100 MILLAS AL SUR DE MALVINAS',
    title: 'EL IMPACTO EN EL HMS SHEFFIELD',
    situation: 'Un avión de patrulla Neptuno detecta un blanco naval Type 42. Volás a 15 metros de las olas. Encendés el radar solo 3 segundos.',
    choices: [
      {
        label: 'Enganchar el blanco en el radar Agave, transferir datos al Exocet y disparar.',
        reaction: '¡MISIL LANZADO! El Exocet vuela a ras del mar e impacta en el Sheffield.',
        changes: { pericia: +30, coraje: +25, impactoGuerra: +35 },
        promotedToRankIndex: 5, // Teniente de Navío
        medalAwarded: 'Cruz de la Nación Argentina al Heroico Valor en Combate',
        soundEffect: 'alert'
      },
      {
        label: 'Asegurar una ruta de escape rasante evitando los misiles Sea Dart de escolta.',
        reaction: 'Regreso perfecto a Río Grande. El mundo asiste al inicio de una nueva era naval.',
        changes: { liderazgo: +25, pericia: +20, salud: +10 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'mar-3',
    stepNumber: 3,
    date: '15 DE MAYO DE 1982',
    location: 'PORTAAVIONES ARA 25 DE MAYO',
    title: 'EL DILEMA DEL PORTAAVIONES',
    situation: 'El Grupo de Tareas Naval argentino analiza lanzar una oleada de cazas A-4Q embarcados desde el portaaviones 25 de Mayo. El viento es escaso.',
    choices: [
      {
        label: 'Acelerar a máxima máquina en demanda de viento y autorizar el despegue aeronaval.',
        reaction: '¡Golpe naval por sorpresa! Los cazas navales atacan a la escolta enemiga.',
        changes: { liderazgo: +30, coraje: +25, impactoGuerra: +30 },
        promotedToRankIndex: 6, // Capitán de Corbeta
        soundEffect: 'confirm'
      },
      {
        label: 'Preservar al portaaviones y concentrar los ataques desde bases de tierra.',
        reaction: 'Maniobra prudente que preserva la nave capital de la flota intacta.',
        changes: { pericia: +25, liderazgo: +15, salud: +10 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'mar-4',
    stepNumber: 4,
    date: '25 DE MAYO DE 1982',
    location: 'NOROESTE DEL ARCHIPIÉLAGO',
    title: 'LA CACERÍA DEL ATLANTIC CONVEYOR',
    situation: 'En el día patrio, salís en pareja de Super Étendard. En el horizonte de radar aparece un gran convoy inglés con helicópteros pesados y repuestos.',
    choices: [
      {
        label: 'Disparo simultáneo de dos misiles Exocet con telemetría compartida.',
        reaction: '¡IMPACTO DIRECTO! El Atlantic Conveyor arde y se hunde con 10 helicópteros.',
        changes: { pericia: +35, coraje: +30, impactoGuerra: +40 },
        promotedToRankIndex: 7, // Capitán de Fragata
        medalAwarded: 'Héroe de la Victoria Aeronaval del 25 de Mayo',
        soundEffect: 'alert'
      },
      {
        label: 'Lanzar señuelos chaff para desviar los helicópteros Sea King de la escolta.',
        reaction: 'Garantizás la supervivencia de la escuadrilla y cegás el radar enemigo.',
        changes: { liderazgo: +25, salud: +15, pericia: +20 },
        soundEffect: 'confirm'
      }
    ]
  },
  {
    id: 'mar-5',
    stepNumber: 5,
    date: '6 DE JUNIO DE 1982',
    location: 'ESTADO MAYOR NAVAL',
    title: 'ASCENSO A CONTRAALMIRANTE',
    situation: 'Por tus hazañas de combate, la Armada te nombra Comandante de Operaciones Navales. La flota inglesa está agotada y con averías.',
    choices: [
      {
        label: 'Zarpar con la Flota de Mar y submarinos Tipo 209 para un combate naval total.',
        reaction: '¡Batalla naval del Atlántico Sur! Neutralizás los suministros de la flota británica.',
        changes: { liderazgo: +35, coraje: +35, impactoGuerra: +45 },
        promotedToRankIndex: 9, // CONTRAALMIRANTE
        soundEffect: 'confirm'
      },
      {
        label: 'Montar la batería costera "Exocet de tierra" ITB para defender Puerto Argentino.',
        reaction: '¡Ingenio argentino! La batería improvisada daña al destructor HMS Glamorgan.',
        changes: { pericia: +35, liderazgo: +30, impactoGuerra: +35 },
        promotedToRankIndex: 8, // Capitán de Navío
        soundEffect: 'alert'
      }
    ]
  },
  {
    id: 'mar-6',
    stepNumber: 6,
    date: '13 DE JUNIO DE 1982',
    location: 'ALTO MANDO NAVAL - ATLÁNTICO SUR',
    title: 'ALMIRANTE DE LA FLOTA: EL TRIUNFO NAVAL',
    situation: 'Como Almirante al mando de todas las fuerzas navales, dictás el movimiento definitivo sobre la flota británica.',
    choices: [
      {
        label: 'Operación Tenaza: forzar el repliegue definitivo de los portaaviones británicos.',
        reaction: '¡VICTORIA NAVAL TOTAL! Londres se ve forzada a negociar el armisticio.',
        changes: { liderazgo: +45, pericia: +40, impactoGuerra: +55 },
        promotedToRankIndex: 10, // ALMIRANTE MÁXIMO
        soundEffect: 'confirm'
      },
      {
        label: 'Imponer una zona de exclusión naval argentina con apoyo de submarinos.',
        reaction: 'Soberanía consolidada y reconocimiento internacional a la destreza naval.',
        changes: { liderazgo: +40, pericia: +35, impactoGuerra: +40 },
        soundEffect: 'confirm'
      }
    ]
  }
];
