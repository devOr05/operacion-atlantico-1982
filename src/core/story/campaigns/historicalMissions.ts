import type { CampaignStep } from './campaignTypes';
import type { MilitaryBranch } from '../militaryRanks';

export interface HistoricalMission {
  id: string;
  title: string;
  subtitle: string;
  protagonist: string;
  nickname?: string;
  rankTitle: string;
  initialRankIndex: number;
  branch: MilitaryBranch;
  date: string;
  location: string;
  difficulty: 'DESAFIANTE' | 'EXTREMA' | 'HERÓICA';
  quote: string;
  quoteAuthor: string;
  briefing: string;
  badge: string;
  steps: CampaignStep[];
}

export const HISTORICAL_MISSIONS: HistoricalMission[] = [
  {
    id: 'ara-san-luis',
    title: '44 Días de Silencio',
    subtitle: 'El Submarino ARA San Luis bajo fuego antisubmarino',
    protagonist: 'Fernando Azcueta',
    nickname: 'Comandante',
    rankTitle: 'Capitán de Fragata',
    initialRankIndex: 5,
    branch: 'mar',
    date: '1 de Mayo de 1982',
    location: 'Mar Argentino / Zona de Exclusión',
    difficulty: 'EXTREMA',
    quote: 'Los pings del sonar activo inglés rebotaban en el casco de acero como martillazos en una campana...',
    quoteAuthor: 'Tripulación del ARA San Luis (S-32)',
    briefing: 'Operás en solitario en las profundidades del Atlántico Sur. Rodeado por fragatas y helicópteros Sea King británicos armados con torpedos antisubmarinos y cargas de profundidad. Tu computadora de tiro de torpedos Ferranti presenta fallas críticas.',
    badge: '⚓',
    steps: [
      {
        id: 'sl-1',
        stepNumber: 1,
        date: '01/05/1982',
        location: 'Mar Argentino Septentrional',
        title: 'CONTACTO DE SONAR Y FALLA EN EL SISTEMA DE TIRO',
        situation: 'El operador del sonar pasivo detecta rumor hidrofónico de dos buques de superficie ingleses (una fragata Type 21 y un destructor). Maniobrás a cota de periscopio para disparar el primer torpedo filoguiado SST-4, pero la computadora de cálculo de tiro rechaza la alimentación automática por un cable invertido.',
        choices: [
          {
            label: 'Calcular el disparo manualmente con tablas náuticas y lanzar el SST-4 en modo de emergencia.',
            reaction: 'El torpedo sale siseando del tubo 1. Sentís la tensión en la sala de mando mientras el cable se desenrolla en el agua.',
            changes: { pericia: 15, coraje: 10, impactoGuerra: 15, salud: 0 },
            soundEffect: 'radio'
          },
          {
            label: 'No arriesgar el torpedo defectuoso; descender a 80 metros y esperar a que el blanco se acerque más.',
            reaction: 'El submarino se sumerge en silencio. Minimizás la firma acústica pero perdés la ventaja del periscopio.',
            changes: { liderazgo: 10, pericia: 5, impactoGuerra: 5, salud: 0 },
            soundEffect: 'confirm'
          },
          {
            label: 'Ordenar zafarrancho de combate y disparar dos torpedos Mk-37 antisubmarinos secundarios.',
            reaction: 'Los tubos se inundan ruidosamente. El sonar británico detecta la apertura de compuertas.',
            changes: { coraje: 15, salud: -10, impactoGuerra: 10 },
            soundEffect: 'alert'
          }
        ]
      },
      {
        id: 'sl-2',
        stepNumber: 2,
        date: '08/05/1982',
        location: 'Zona de Exclusión Marítima',
        title: 'EL CORTE DEL CABLE Y EL ATAQUE ENEMIGO',
        situation: 'A los 3 minutos del disparo, el cable de guiado del SST-4 se corta inexplicablemente en las turbulencias marinas. De inmediato, helicópteros Sea King de la Royal Navy arrojan sonoboyas y un torpedo ligero británico entra al agua buscándote.',
        choices: [
          {
            label: 'Descender a máxima profundidad, posarse en el lecho marino (bottoming) y apagar todos los motores auxiliares.',
            reaction: 'El casco roza la arena del fondo. Silencio absoluto en el submarino. Escuchan pasar el torpedo inglés a menos de cien metros por encima.',
            changes: { coraje: 20, pericia: 15, salud: 5, liderazgo: 15 },
            soundEffect: 'confirm'
          },
          {
            label: 'Lanzar señuelos acústicos y dar avante toda en zigzag para escapar hacia aguas abiertas.',
            reaction: 'Las hélices cavitan ruidosamente. Una carga de profundidad estalla cerca sacudiendo los mamparos y cortando luces de emergencia.',
            changes: { coraje: 10, salud: -25, impactoGuerra: 5 },
            soundEffect: 'alert'
          },
          {
            label: 'Maniobrar a media agua y preparar un contratorpedo hacia la marcación del eco enemigo.',
            reaction: 'La tripulación responde con disciplina heroica bajo una lluvia de esquirlas sonoras.',
            changes: { pericia: 10, coraje: 15, liderazgo: 10, salud: -10 },
            soundEffect: 'radio'
          }
        ]
      },
      {
        id: 'sl-3',
        stepNumber: 3,
        date: '19/05/1982',
        location: 'Cercanías de Bahía San Carlos',
        title: 'EL TERCER ATAQUE Y LA MISIÓN CUMPLIDA',
        situation: 'Con las baterías al límite, el aire viciado y tras soportar más de 20 horas continuas de bombardeo acústico enemigo, el sonar reporta un nuevo convoy logístico inglés. Es la última oportunidad antes de que los acumuladores eléctricos se agoten por completo.',
        choices: [
          {
            label: 'Disparar el último torpedo SST-4 compensando la desviación a pulso antes de ordenar la navegación evasiva hacia la base.',
            reaction: 'Impacto acústico registrado a la distancia. El ARA San Luis burla el cerco naval británico más sofisticado del mundo y emprende el regreso intacto.',
            changes: { coraje: 25, pericia: 20, impactoGuerra: 25, liderazgo: 20 },
            medalAwarded: 'Cruz de la Nación Argentina al Heroico Valor en Combate',
            soundEffect: 'confirm'
          },
          {
            label: 'Priorizar salvar la nave y a los 35 tripulantes navegando a mínima velocidad entre las restingas costeras.',
            reaction: 'La pericia marinera de Azcueta y sus hombres burla a tres fragatas inglesas. El submarino regresa a puerto como leyenda viva.',
            changes: { liderazgo: 25, salud: 20, pericia: 15, impactoGuerra: 15 },
            medalAwarded: 'Medalla al Valor en Combate',
            soundEffect: 'confirm'
          }
        ]
      }
    ]
  },
  {
    id: 'owen-crippa',
    title: 'Vuelo en Solitario hacia el Enjambre',
    subtitle: 'El Ataque del Teniente Crippa en San Carlos',
    protagonist: 'Owen Guillermo Crippa',
    nickname: 'Lechuza',
    rankTitle: 'Teniente de Navío',
    initialRankIndex: 4,
    branch: 'aire',
    date: '21 de Mayo de 1982',
    location: 'Estrecho de San Carlos',
    difficulty: 'HERÓICA',
    quote: 'Pasé tan cerca de los mástiles de la fragata que pude ver los rostros desencajados de los artilleros británicos...',
    quoteAuthor: 'Teniente Owen Crippa (Armada Argentina)',
    briefing: 'A bordo de un reactor ligero de entrenamiento y ataque Aermacchi MB-339 (4-A-115) despegás en misión de reconocimiento en soledad. Al doblar sobre el estrecho de San Carlos, descubrís de golpe a toda la flota expedicionaria británica desembarcando tropas.',
    badge: '✈️',
    steps: [
      {
        id: 'oc-1',
        stepNumber: 1,
        date: '21/05/1982 10:15 Hs',
        location: 'Entrada Norte de San Carlos',
        title: 'DESCUBRIMIENTO DE LA FLOTA ENEMIGA',
        situation: 'Volás a ras de los cerros a 30 metros de altura. Al superar una cresta divisás una docena de buques ingleses fondeados. La sorpresa es total para ambos bandos. Una fragata HMS Argonaut está justo enfrente con sus piezas antiaéreas cargadas.',
        choices: [
          {
            label: '¡Ataque inmediato! Bajar la nariz, apuntar al centro de la HMS Argonaut y descargar ráfagas de 30mm y cohetes Zuni.',
            reaction: 'Apretás el disparador. Los cañones DEFA de 30mm y los cohetes barren la superestructura y antenas del buque inglés.',
            changes: { coraje: 25, pericia: 20, impactoGuerra: 20, salud: -5 },
            soundEffect: 'alert'
          },
          {
            label: 'Virar bruscamente pegado a los cerros para intentar escapar y dar la alarma de radio.',
            reaction: 'Una andanada de misiles Sea Cat cruza tu plano. Los cañones de 20mm navales ingleses te saturan la trayectoria.',
            changes: { coraje: -5, salud: -15, pericia: 5 },
            soundEffect: 'alert'
          }
        ]
      },
      {
        id: 'oc-2',
        stepNumber: 2,
        date: '21/05/1982 10:18 Hs',
        location: 'Sobre la Cubierta de la HMS Argonaut',
        title: 'ROZANDO LOS MÁSTILES ENTRE MISILES',
        situation: 'Tras el impacto de tus cohetes, pasás a escasos dos metros de la arboladura del buque enemigo. Las demás fragatas comienzan a disparar artillería cruzada. Volás entre las naves británicas, lo que impide que usen sus misiles mayores por miedo a impactarse entre ellos.',
        choices: [
          {
            label: 'Mantener vuelo a ras del agua zigzagueando entre los buques para usar sus propios cascos como escudo.',
            reaction: 'Maniobra brillante: los ingleses no pueden disparar torpedos ni misiles pesados sin pegarle a sus propios barcos.',
            changes: { pericia: 25, coraje: 20, salud: 0, liderazgo: 10 },
            soundEffect: 'confirm'
          },
          {
            label: 'Trepar bruscamente hacia las nubes bajas para romper la línea de visión de los artilleros.',
            reaction: 'El Aermacchi pierde velocidad al trepar y una esquirla de metralla astilla parte de la cúpula de tu cabina.',
            changes: { coraje: 10, salud: -20, pericia: 5 },
            soundEffect: 'alert'
          }
        ]
      },
      {
        id: 'oc-3',
        stepNumber: 3,
        date: '21/05/1982 10:22 Hs',
        location: 'Escape rasante hacia Puerto Argentino',
        title: 'LA LIBRETA DE RODILLERA',
        situation: 'Lográs salir del callejón del estrecho rozando las olas. Con la mano derecha empuñás la palanca y con la izquierda sacás una birome para anotar en la carta de tu rodillera la posición exacta de cada buque, fragata y transporte británico que viste.',
        choices: [
          {
            label: 'Dibujar minuciosamente el croquis táctico de la flota y transmitir las coordenadas de bombardeo a la FAS continental.',
            reaction: 'Tu informe permitió a las escuadrillas de A-4B y Dagger lanzar la histórica ofensiva que hundiría y averiaría a gran parte de la flota inglesa.',
            changes: { pericia: 25, coraje: 20, impactoGuerra: 35, liderazgo: 25 },
            medalAwarded: 'Cruz de la Nación Argentina al Heroico Valor en Combate',
            soundEffect: 'radio'
          },
          {
            label: 'Acelerar a fondo sin distracciones para asegurar el aterrizaje del avión averiado en la pista de Puerto Argentino.',
            reaction: 'Aterrizás a salvo con el avión agujereado por esquirlas. El comando recibe tu informe con aplausos de pie.',
            changes: { salud: 15, pericia: 15, impactoGuerra: 15, liderazgo: 15 },
            medalAwarded: 'Medalla La Nación Argentina al Valor en Combate',
            soundEffect: 'confirm'
          }
        ]
      }
    ]
  },
  {
    id: 'poltronieri-longdon',
    title: 'Váyanse ustedes, yo me quedo',
    subtitle: 'La Ametralladora Legendaria de Oscar Poltronieri',
    protagonist: 'Oscar Ismael Poltronieri',
    nickname: 'Poltro',
    rankTitle: 'Soldado Conscripto',
    initialRankIndex: 0,
    branch: 'tierra',
    date: '11 de Junio de 1982',
    location: 'Monte Longdon / Cerro Dos Hermanas',
    difficulty: 'HERÓICA',
    quote: '¡Váyanse ustedes que tienen hijos y familia, yo me quedo a cubrir la retirada!',
    quoteAuthor: 'Soldado Oscar Poltronieri (RI 6 / RI 7)',
    briefing: 'En la noche polar más helada y sangrienta de la guerra, los paracaidistas británicos del 3 Para avanzan con visores nocturnos infrarrojos y cohetes LAW. Tu sección se ve superada en número. Con tu ametralladora MAG 7.62 mm decidís hacer frente solo para salvar a tus compañeros.',
    badge: '🪖',
    steps: [
      {
        id: 'op-1',
        stepNumber: 1,
        date: '11/06/1982 23:00 Hs',
        location: 'Cresta de Monte Longdon',
        title: 'EL ASALTO NOCTURNO DEL 3 PARA',
        situation: 'Comienza el ataque británico con artillería pesada y fuego concentrado. Tus camaradas de pozo están heridos o sin munición. El suboficial ordena el repliegue de la sección hacia la siguiente línea.',
        choices: [
          {
            label: '"¡Váyanse ustedes! Yo me quedo con la MAG". Emplazar la ametralladora sobre la roca y abrir fuego de cobertura.',
            reaction: 'Ráfagas trazantes de 7.62 mm barren la pendiente helada. El avance de la compañía británica se detiene en seco.',
            changes: { coraje: 30, liderazgo: 25, impactoGuerra: 20, salud: -5 },
            soundEffect: 'alert'
          },
          {
            label: 'Cargar la ametralladora y a un soldado herido al hombro e iniciar el repliegue con el grupo.',
            reaction: 'El peso te hace lento. Un mortero estalla cerca arrojándote contra la turba húmeda.',
            changes: { salud: -15, coraje: 10, liderazgo: 15 },
            soundEffect: 'alert'
          }
        ]
      },
      {
        id: 'op-2',
        stepNumber: 2,
        date: '12/06/1982 02:30 Hs',
        location: 'Pendiente de Dos Hermanas',
        title: 'EL JUEGO DEL ENGAÑO EN LA NIEBLA',
        situation: 'Quedás completamente solo en la posición. Disparás ráfagas cortas de tres disparos para no recalentar el cañón de la MAG. Los ingleses creen que hay un pelotón entero defendiendo el monte y concentran fuego de morteros sobre tu nido.',
        choices: [
          {
            label: 'Disparar una cinta, levantar la ametralladora caliente y correr 40 metros hacia otra roca para disparar desde otro ángulo.',
            reaction: '¡Táctica magistral! Los morteros ingleses pulverizan la roca vacía mientras vos abrís fuego desde su flanco.',
            changes: { pericia: 25, coraje: 25, liderazgo: 15, salud: 0 },
            soundEffect: 'confirm'
          },
          {
            label: 'Mantenerte atrincherado en el pozo profundo aguantando el bombardeo inglés hasta el último cartucho.',
            reaction: 'La onda expansiva te sacude el cuerpo y te zumban los oídos, pero la ametralladora no deja de rugir.',
            changes: { coraje: 20, salud: -20, impactoGuerra: 15 },
            soundEffect: 'alert'
          }
        ]
      },
      {
        id: 'op-3',
        stepNumber: 3,
        date: '12/06/1982 06:00 Hs',
        location: 'Llegada a Puerto Argentino',
        title: 'EL REGRESO DEL FANTASMA',
        situation: 'Amanece en las islas. Agotaste todas las cintas de munición. Tus compañeros ya llegaron a salvo a la capital dándote por muerto. Caminás solo por el barro con tu fusil y la MAG vacía al hombro cuando tus camaradas te ven llegar.',
        choices: [
          {
            label: 'Reincorporarte a la línea defensiva en las afueras de Puerto Argentino y pedir más munición para la MAG.',
            reaction: 'Tus compañeros rompen en llanto y te abrazan. Tu hazaña salvó la vida de más de cien soldados argentinos.',
            changes: { coraje: 30, liderazgo: 30, impactoGuerra: 30, pericia: 20 },
            medalAwarded: 'Cruz de la Nación Argentina al Heroico Valor en Combate',
            soundEffect: 'confirm'
          }
        ]
      }
    ]
  },
  {
    id: 'operacion-invincible',
    title: 'Operación Invencible',
    subtitle: 'El Ataque Conjunto al Portaaviones HMS Invincible',
    protagonist: 'Ernesto Ureta y Gerardo Isaac',
    nickname: 'Escuadrilla Zapa',
    rankTitle: 'Primer Teniente',
    initialRankIndex: 4,
    branch: 'aire',
    date: '30 de Mayo de 1982',
    location: 'Atlántico Sur (100 millas al este de Malvinas)',
    difficulty: 'EXTREMA',
    quote: 'Seguimos la estela del Exocet... y de golpe entre la bruma apareció la enorme silueta del portaaviones.',
    quoteAuthor: 'Mayor Gerardo Isaac (Fuerza Aérea Argentina)',
    briefing: 'La misión más ambiciosa de la guerra aeronaval moderna. Dos Super Étendard de la Armada (con el último misil Exocet) y cuatro cazas A-4C Skyhawk de la Fuerza Aérea vuelan cientos de kilómetros mar adentro con doble reabastecimiento en vuelo en silencio absoluto de radar.',
    badge: '✈️',
    steps: [
      {
        id: 'inv-1',
        stepNumber: 1,
        date: '30/05/1982 12:30 Hs',
        location: 'Pleno Océano Atlántico',
        title: 'EL REABASTECIMIENTO CRÍTICO EN SILENCIO DE RADIO',
        situation: 'Encuentro a ciegas sobre el océano con los dos aviones cisterna Hércules KC-130. El mar está embravecido y hay hielo en las mangueras de combustible. Si una lanza no acopla, la misión debe abortarse.',
        choices: [
          {
            label: 'Mantener pulso firme a centímetros de la turbulencia del Hércules hasta lograr el acople perfecto de la lanza.',
            reaction: '¡Enganche confirmado! Los tanques se llenan hasta el tope. Los cazas quedan listos para la fase de penetración.',
            changes: { pericia: 20, coraje: 15, liderazgo: 10, salud: 0 },
            soundEffect: 'confirm'
          },
          {
            label: 'Acelerar para forzar el acople rápido antes de entrar en el banco de niebla.',
            reaction: 'La turbulencia dobla levemente la puntera de la lanza, pero el combustible fluye a presión.',
            changes: { pericia: 10, coraje: 15, salud: -5 },
            soundEffect: 'radio'
          }
        ]
      },
      {
        id: 'inv-2',
        stepNumber: 2,
        date: '30/05/1982 14:20 Hs',
        location: 'Aproximación Rasante a 10 metros del mar',
        title: 'EL DISPARO DEL EXOCET Y EL BARRIDO DE SEA DART',
        situation: 'Los Super Étendard trepan unos segundos, encienden radar Agave, enganchan el blanco mayor y disparan el Exocet AM-39 antes de virar. Los cuatro A-4C siguen la estela blanca del misil a máxima potencia. De pronto, misiles antiaéreos Sea Dart perforan las nubes: tus numerales Castillo y Vázquez son alcanzados.',
        choices: [
          {
            label: '¡Apretar los dientes, no romper formación y lanzarse a fondo a través del humo hacia la silueta humeante del buque!',
            reaction: 'Ureta e Isaac cruzan la cortina de fuego antiaéreo disparando cañones de 20mm y arrojando sus bombas sobre el Invincible.',
            changes: { coraje: 30, pericia: 25, impactoGuerra: 35, salud: -10 },
            soundEffect: 'alert'
          },
          {
            label: 'Realizar maniobra evasiva lateral para esquivar los misiles y soltar bombas desde mayor distancia.',
            reaction: 'Tus bombas caen cerca del buque levantando olas gigantescas mientras esquivás el fuego de las fragatas escolta.',
            changes: { pericia: 15, coraje: 15, impactoGuerra: 15, salud: 0 },
            soundEffect: 'radio'
          }
        ]
      },
      {
        id: 'inv-3',
        stepNumber: 3,
        date: '30/05/1982 16:30 Hs',
        location: 'Regreso a Río Grande',
        title: 'EL ENCUENTRO EN EL CIELO',
        situation: 'Con las reservas de combustible marcando cero y los aviones perforados por metralla, Ureta e Isaac logran encontrar nuevamente al Hércules salvador para el reabastecimiento de retorno. Los dos cazas aterrizan en Río Grande exhaustos tras consumar una de las páginas más audaces de la aviación militar mundial.',
        choices: [
          {
            label: 'Aterrizar con honores y rendir homenaje en el hangar a los compañeros caídos Castillo y Vázquez.',
            reaction: 'Toda la base llora y celebra el coraje inquebrantable de los pilotos argentinos.',
            changes: { liderazgo: 30, coraje: 25, pericia: 20, impactoGuerra: 25 },
            medalAwarded: 'Cruz de la Nación Argentina al Heroico Valor en Combate',
            soundEffect: 'confirm'
          }
        ]
      }
    ]
  },
  {
    id: 'ara-santa-fe',
    title: 'La Agonía del Santa Fe',
    subtitle: 'El Submarino ARA Santa Fe en Georgias del Sur',
    protagonist: 'Horacio Bicain',
    nickname: 'Comandante',
    rankTitle: 'Capitán de Corbeta',
    initialRankIndex: 4,
    branch: 'mar',
    date: '25 de Abril de 1982',
    location: 'Bahía Cumberland / Grytviken (Georgias del Sur)',
    difficulty: 'EXTREMA',
    quote: 'Si no podemos sumergirnos, ¡suban a la torreta con los fusiles y ametralladoras!',
    quoteAuthor: 'Tripulación del ARA Santa Fe (S-21)',
    briefing: 'Un veterano submarino de la Segunda Guerra Mundial navegó miles de millas con fallas mecánicas para desembarcar infantes y víveres en Grytviken. Al intentar salir de la bahía es emboscado por helicópteros Wessex, Wasp y Lynx con misiles AS-12 y cargas de profundidad.',
    badge: '⚓',
    steps: [
      {
        id: 'sf-1',
        stepNumber: 1,
        date: '25/04/1982 06:30 Hs',
        location: 'Salida de Bahía Cumberland',
        title: 'EL ATAQUE DESDE EL AIRE',
        situation: 'Navegando en superficie por averías en los tanques de lastre, un helicóptero Wessex arroja dos cargas de profundidad que dañan los sistemas eléctricos e inundan compartimentos. Inmediatamente helicópteros Wasp disparan misiles guiados AS-12 contra la vela.',
        choices: [
          {
            label: 'Ordenar al personal subir a la vela con fusiles FAL y una ametralladora para responder el fuego antiaéreo en superficie.',
            reaction: 'Los marineros abren fuego nutrido desde la torreta. Un misil enemigo desvía su impacto en el alerón.',
            changes: { coraje: 25, liderazgo: 20, salud: -15, impactoGuerra: 10 },
            soundEffect: 'alert'
          },
          {
            label: 'Intentar una inmersión de emergencia a ciegas a pesar de las vías de agua en popa.',
            reaction: 'El submarino se hunde de popa peligrosamente y el agua salada amenaza las baterías generando gas cloro.',
            changes: { coraje: 15, salud: -25, pericia: 5 },
            soundEffect: 'alert'
          }
        ]
      },
      {
        id: 'sf-2',
        stepNumber: 2,
        date: '25/04/1982 07:45 Hs',
        location: 'Muelle de Grytviken',
        title: 'ENCALLAR PARA SALVAR A LA DOTACIÓN',
        situation: 'Con el timón averiado, sin periscopio y con el Suboficial Artuso gravemente herido en las bombas de achique, la nave está en riesgo inminente de hundirse en aguas a cero grados.',
        choices: [
          {
            label: 'Gobernar a motor diesel restante y encallar el submarino en las rocas del muelle de la antigua factoría ballenera.',
            reaction: '¡Impacto firme en la costa! La maniobra de Bicain salva la vida de casi toda la tripulación, desembarcando armados.',
            changes: { liderazgo: 30, pericia: 20, coraje: 20, salud: 10 },
            medalAwarded: 'Medalla al Valor en Combate',
            soundEffect: 'confirm'
          },
          {
            label: 'Abrir las válvulas de fondo en aguas abiertas y ordenar abandono del buque en balsas neumáticas bajo fuego.',
            reaction: 'La tripulación sufre principio de congelamiento en el agua helada antes de alcanzar la costa.',
            changes: { coraje: 15, salud: -20, liderazgo: 10 },
            soundEffect: 'radio'
          }
        ]
      }
    ]
  },
  {
    id: 'bim5-tumbledown',
    title: 'La Última Línea',
    subtitle: 'El Batallón de Infantería de Marina 5 en Monte Tumbledown',
    protagonist: 'Carlos Daniel Vázquez',
    nickname: 'Teniente',
    rankTitle: 'Teniente de Corbeta',
    initialRankIndex: 3,
    branch: 'tierra',
    date: '13 de Junio de 1982',
    location: 'Monte Tumbledown',
    difficulty: 'HERÓICA',
    quote: '¡Fuego sobre nuestra propia posición! ¡Nos están desbordando!',
    quoteAuthor: 'Teniente Carlos Vázquez (BIM 5 - Compañía Nácar)',
    briefing: 'La 4ª Sección de la Compañía Nácar del BIM 5 resiste el asalto final nocturno de los Guardias Escoceses (Scots Guards). Combates feroces a bayoneta calada y granadas a escasos metros en la turba helada bajo bengalas británicas.',
    badge: '🪖',
    steps: [
      {
        id: 'td-1',
        stepNumber: 1,
        date: '13/06/1982 22:30 Hs',
        location: 'Cresta Occidental de Tumbledown',
        title: 'EL ASALTO DE LOS SCOTS GUARDS',
        situation: 'Oleadas de infantes británicos de élite atacan la posición con bayonetas y misiles antitanque Milan contra los nidos de roca. Tus conscriptos y suboficiales responden con ametralladoras MAG y fusiles FAL.',
        choices: [
          {
            label: 'Organizar focos de resistencia cruzados e iluminar la pendiente con granadas de fósforo y bengalas.',
            reaction: 'La trampa de fuego desarma el avance británico y obliga a los Guardias Escoceses a replegarse con numerosas bajas.',
            changes: { pericia: 20, liderazgo: 25, coraje: 20, impactoGuerra: 20 },
            soundEffect: 'alert'
          },
          {
            label: 'Liderar un contraataque cuerpo a cuerpo a punta de bayoneta para desalojar la cresta norte.',
            reaction: 'Combate brutal en la oscuridad. El valor de tus hombres contiene la línea pero el saldo de heridos es alto.',
            changes: { coraje: 30, salud: -20, liderazgo: 20, pericia: 15 },
            soundEffect: 'alert'
          }
        ]
      },
      {
        id: 'td-2',
        stepNumber: 2,
        date: '14/06/1982 04:00 Hs',
        location: 'Puesto de Comando 4ª Sección',
        title: 'FUEGO SOBRE NUESTRA POSICIÓN',
        situation: 'Sin munición en las ametralladoras y con los ingleses encima de los pozos, Vázquez toma el auricular de radio de campaña con la batería de artillería de 105 mm de la Armada y el Ejército.',
        choices: [
          {
            label: '"¡Abran fuego de artillería sobre mis propias coordenadas ahora mismo!"',
            reaction: 'Los proyectiles de 105 mm caen como un trueno sobre el monte pulverizando las líneas de asalto enemigas.',
            changes: { coraje: 35, liderazgo: 30, impactoGuerra: 30, salud: -15 },
            medalAwarded: 'Cruz de la Nación Argentina al Heroico Valor en Combate',
            soundEffect: 'radio'
          },
          {
            label: 'Ordenar el repliegue táctico escalonado de los sobrevivientes hacia Sapper Hill arrastrando a los heridos.',
            reaction: 'Repliegue con honor y orden militar perfecto. Los propios oficiales británicos rinden honores a la resistencia del BIM 5.',
            changes: { liderazgo: 25, salud: 10, pericia: 15, impactoGuerra: 15 },
            medalAwarded: 'Medalla La Nación Argentina al Valor en Combate',
            soundEffect: 'confirm'
          }
        ]
      }
    ]
  },
  {
    id: 'itb-glamorgan',
    title: 'La Trampa del Glamorgan',
    subtitle: 'La Batería Costera ITB improvisada con Exocet',
    protagonist: 'Julio Pérez',
    nickname: 'El Ingeniero',
    rankTitle: 'Capitán de Navío',
    initialRankIndex: 6,
    branch: 'mar',
    date: '12 de Junio de 1982',
    location: 'Camino a Moody Brook / Puerto Argentino',
    difficulty: 'DESAFIANTE',
    quote: 'Decían que era imposible disparar un Exocet naval desde un camión de tierra. No nos conocían.',
    quoteAuthor: 'Dotación de la Batería ITB (Instalación de Tiro Berreta)',
    briefing: 'Un equipo de ingenieros de la Armada desmontó dos contenedores de misiles Exocet del destructor ARA Seguí, los voló en un C-130 y armó un lanzador casero montado sobre un carretón de camión ("La ITB"). Cada noche acechan al destructor HMS Glamorgan que bombardea la capital.',
    badge: '⚓',
    steps: [
      {
        id: 'itb-1',
        stepNumber: 1,
        date: '12/06/1982 02:45 Hs',
        location: 'Posición Oculta en Puerto Argentino',
        title: 'EL ACECHO EN EL RADAR RASIT',
        situation: 'El radar móvil del Ejército detecta la silueta del HMS Glamorgan navegando a 18 nudos para retirarse hacia el este antes del amanecer. La ventana de tiro es de apenas 90 segundos antes de que salga del alcance útil del Exocet.',
        choices: [
          {
            label: 'Alinear manualmente el carretón con gatos hidráulicos y calibrar el girocompás con un cable de señal casero.',
            reaction: 'Los condensadores cargan a 400 Hz. El misil adquiere los datos de telemetría sin fallas.',
            changes: { pericia: 25, coraje: 15, impactoGuerra: 20 },
            soundEffect: 'confirm'
          },
          {
            label: 'Esperar a que el buque haga su viraje previsto para tener un perfil de radar más amplio.',
            reaction: 'El Glamorgan inicia el giro. El eco en pantalla aumenta de intensidad.',
            changes: { pericia: 15, liderazgo: 15, impactoGuerra: 10 },
            soundEffect: 'radio'
          }
        ]
      },
      {
        id: 'itb-2',
        stepNumber: 2,
        date: '12/06/1982 03:15 Hs',
        location: 'Fogonazo en la noche malvinense',
        title: '¡LANZAMIENTO CONFIRMADO!',
        situation: 'Presionás el botón de disparo manual. Un estruendo brutal ilumina toda la bahía mientras el motor cohete del Exocet se enciende, dejando atrás la rampa de camión y volando al ras de las olas a Mach 0.9 hacia el buque inglés.',
        choices: [
          {
            label: 'Desconectar cables rápidamente y ordenar dispersión inmediata del camión antes de la contrabatería británica.',
            reaction: '¡Impacto directo registrado en el hangar del HMS Glamorgan! El buque arde y queda inutilizado por el resto del conflicto.',
            changes: { pericia: 25, coraje: 25, impactoGuerra: 35, liderazgo: 25 },
            medalAwarded: 'Cruz de la Nación Argentina al Heroico Valor en Combate',
            soundEffect: 'confirm'
          }
        ]
      }
    ]
  },
  {
    id: 'callejon-bombas',
    title: 'El Callejón de las Bombas',
    subtitle: 'Ataques Rasantes en San Carlos de Carballo y Rinke',
    protagonist: 'Pablo Carballo y Carlos Rinke',
    nickname: 'Cruz',
    rankTitle: 'Capitán',
    initialRankIndex: 4,
    branch: 'aire',
    date: '25 de Mayo de 1982',
    location: 'Estrecho de San Carlos',
    difficulty: 'HERÓICA',
    quote: 'El mar salpicaba el parabrisas... veíamos las fragatas de frente disparándonos con todo lo que tenían.',
    quoteAuthor: 'Comodoro Pablo Carballo (Fuerza Aérea Argentina)',
    briefing: 'Día de la Patria. Tu escuadrilla de A-4B Skyhawk despega desde Río Gallegos con tres bombas de 250 kg. El objetivo: atacar al destructor HMS Coventry y a la fragata HMS Broadsword que forman un piquete de radar mortal protegiendo el desembarco británico.',
    badge: '✈️',
    steps: [
      {
        id: 'cb-1',
        stepNumber: 1,
        date: '25/05/1982 15:10 Hs',
        location: 'Aproximación a San Carlos',
        title: 'A CINCO METROS DE LAS OLAS',
        situation: 'Volás a casi 900 km/h pegado al mar embravecido para no ser detectado por el radar inglés. Una ola levanta espuma que choca contra el parabrisas. A lo lejos divisás los dos buques británicos disparando misiles Sea Cat y cañones de proa de 4.5 pulgadas.',
        choices: [
          {
            label: 'Mantener la rasante a 5 metros y disparar tus dos cañones Colt de 20 mm para silenciar a los artilleros británicos.',
            reaction: 'Tus proyectiles de 20 mm impactan en la cubierta de la fragata mientras esquivás por metros una antena.',
            changes: { pericia: 25, coraje: 25, impactoGuerra: 25, salud: -5 },
            soundEffect: 'alert'
          },
          {
            label: 'Saltar a 100 metros para tener mejor ángulo de caída de las tres bombas MK-17.',
            reaction: 'Un misil antiaéreo estalla cerca de tu ala sacudiendo el timón de dirección pero mantenés el control.',
            changes: { coraje: 20, salud: -15, impactoGuerra: 20 },
            soundEffect: 'alert'
          }
        ]
      },
      {
        id: 'cb-2',
        stepNumber: 2,
        date: '25/05/1982 15:25 Hs',
        location: 'Sobre el HMS Coventry / Broadsword',
        title: 'EL LANZAMIENTO MORTAL',
        situation: 'Llegás a distancia de lanzamiento. La fragata Broadsword llena el visor de puntería. Presionás el botón de lanzamiento de bombas justo un segundo antes de cruzarla rozando su mástil.',
        choices: [
          {
            label: 'Soltar bombas, iniciar viraje violento a ras de los acantilados y comprobar si tu numeral Rinke sigue detrás.',
            reaction: '¡Las bombas entran limpias en el buque! La fragata queda fuera de combate y el Coventry es hundido minutos después.',
            changes: { pericia: 30, coraje: 25, impactoGuerra: 35, liderazgo: 25 },
            medalAwarded: 'Cruz de la Nación Argentina al Heroico Valor en Combate',
            soundEffect: 'confirm'
          }
        ]
      }
    ]
  }
];

export function getHistoricalMissionById(id: string): HistoricalMission | undefined {
  return HISTORICAL_MISSIONS.find((m) => m.id === id);
}
