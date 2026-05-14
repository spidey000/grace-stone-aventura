const crystalSound = '/audio/fx/crystal-unlock.mp3';

const oceanograficBaseStations = [
  {
    id: '00',
    routeOrder: 0,
    minMode: 'short',
    shortName: 'Acceso',
    title: 'La señal del océano',
    area: 'Acceso / entrada',
    routeHint: 'Empieza en la entrada o en un punto tranquilo antes de cruzar el primer túnel.',
    adultHint: 'Si hay cola o ruido, escucha el audio antes de entrar y confirma ya dentro.',
    childAction: 'Mira alrededor y busca la primera señal de vida marina.',
    story:
      '{username}, ¡cambio y fuera! Aquí el Dr. Smolder Bravestone. Mi brújula de explorador —la misma que me guió por las junglas de Borneo y las cumbres del Himalaya— acaba de encenderse aquí en Valencia. Algo está haciendo eco bajo el océano, una señal que no debería estar ahí. Necesito un explorador o exploradora valiente a mi lado. ¿Estás listo para la misión? Cuando toques ese botón, nuestra aventura comienza. ¡Vamos juntos!',
    reward: { name: 'Cristal de la Entrada', sound: crystalSound, color: '#0e8277' },
    duration: '2 min',
    color: '#0e8277',
    optional: false,
    sources: [
      'https://www.oceanografic.org/',
      'https://www.oceanografic.org/planifica-tu-visita/plano-del-acuario/',
    ],
    challenge: {
      type: 'confirm',
      prompt: 'Toca cuando estéis listos para empezar la misión.',
      success: 'Misión activada. Primer cristal recuperado.',
      hint: 'Respira hondo, ponte los auriculares y mira el primer tanque con calma.',
    },
    backupChallenge: {
      type: 'confirm',
      prompt: 'Si la entrada está llena, confirma desde un lateral tranquilo.',
      success: 'Inicio flexible activado. La aventura sigue.',
    },
  },
  {
    id: '01',
    routeOrder: 1,
    minMode: 'normal',
    shortName: 'Mediterráneo',
    title: 'El mar que tenemos cerca',
    area: 'Mediterráneo',
    routeHint: 'Avanza hacia la zona mediterránea siguiendo el recorrido natural del acuario.',
    adultHint: 'Sirve cualquier pez, pulpo, planta o tortuga visible; no dependas de una especie concreta.',
    childAction: 'Busca un animal o planta del mar cercano.',
    story:
      '{username}, mira este mar. El Mediterráneo parece tranquilo y corriente, pero no te dejes engañar: bajo esta superficie se esconden tesoros increíbles. Peces que se camuflan entre las rocas, pulpos que cambian de color en un abrir y cerrar de ojos, y plantas marinas como la posidonia, que llevan milenios creando bosques submarinos. Los grandes exploradores saben que el secreto está en mirar despacio, en observar cada detalle. ¿Ves algo moverse? Prepárate, porque juntos vamos a descubrir lo que el Mediterráneo guarda.',
    reward: { name: 'Cristal Mediterráneo', sound: crystalSound, color: '#2e9f89' },
    duration: '5-8 min',
    color: '#2e9f89',
    optional: false,
    sources: [
      'https://www.oceanografic.org/habitat/mediterraneo/',
      'https://www.oceanografic.org/especie/posidonia/',
    ],
    challenge: {
      type: 'familyVote',
      prompt: 'Elegid en familia qué pista habéis visto mejor.',
      options: ['Un pez', 'Una planta marina', 'Una roca o escondite'],
      answer: '*',
      success: 'Pista mediterránea guardada. El cristal se ilumina.',
      hint: 'No busques algo perfecto. Elige lo que veas con más claridad.',
    },
    backupChallenge: {
      type: 'confirm',
      prompt: 'Si no distinguís especies, confirma cuando hayáis observado el tanque durante diez segundos.',
      success: 'Observación mediterránea aceptada.',
    },
    riddle: {
      type: 'chain',
      guardian: {
        name: 'Pulpo Mediterráneo',
        intro: '¡Alerta, explorador! El Pulpo Mediterráneo, el maestro del camuflaje, ha dispersado su pieza del mapa en 3 fragmentos por todo el tanque. Este guardián no se rinde fácilmente. Solo un explorador con ojos de lince y paciencia de verdadero aventurero podrá reconstruirla. ¿Aceptas el desafío, {username}?',
      },
      steps: [
        {
          text: 'Mira dentro del tanque mediterráneo. ¿Qué ves moverse entre las rocas?',
          answer: 'Un pulpo',
          options: ['Un pulpo', 'Un pez plano', 'Una planta'],
          hint: 'Busca algo con tentáculos que cambia de color.',
        },
        {
          text: 'Ese animal que cambia de color... ¿tiene tentáculos o aletas?',
          answer: 'Tentáculos',
          options: ['Tentáculos', 'Aletas', 'Patas'],
          hint: 'Mira bien sus brazos. No son aletas de pez.',
        },
        {
          text: '¿Cómo se llama este animal marino que tiene 8 tentáculos?',
          answer: 'Pulpo',
          options: ['Pulpo', 'Medusa', 'Estrella de mar'],
          hint: 'Tiene 8 brazos y es muy inteligente.',
        },
      ],
      finalSuccess: '¡Misión cumplida, {username}! Has reconstruido la Pieza del Mapa Mediterráneo. El Pulpo, impresionado por tu astucia, te entrega el fragmento. Un guardián menos, un paso más cerca del tesoro. ¡Sigue así, explorador!',
      keyObject: {
        id: 'mapa-mediterraneo',
        name: 'Pieza del Mapa — Mediterráneo',
        icon: '🐙',
        description: 'Una pieza del mapa del arrecife. Tiene dibujado un pulpo.',
      },
    },
  },
  {
    id: '02',
    routeOrder: 2,
    minMode: 'normal',
    shortName: 'Humedales',
    title: 'El aviario secreto',
    area: 'Humedales / Aviario',
    routeHint: 'Continúa hacia el aviario y las zonas de humedal.',
    adultHint: 'Si el aviario está cerrado o saturado, usa el reto alternativo y sigue hacia tortugas.',
    childAction: 'Busca un ave, una tortuga o un animal que viva entre agua y tierra.',
    story:
      '{username}, bienvenido a los humedales. Mira a tu alrededor: esto no es solo agua ni solo tierra — es un mundo fronterizo, un lugar mágico donde dos reinos se encuentran. Aquí viven aves que caminan sobre el agua con sus patas largas, tortugas que se asolean en las rocas y criaturas que necesitan ambos mundos para sobrevivir. En mis expediciones por los pantanos de Florida y los deltas del Nilo, aprendí que los humedales guardan los secretos mejor que cualquier jungla. Vamos a explorarlos juntos, paso a paso. ¿Qué ves? ¿Agua? ¿Tierra? ¿O las dos cosas?',
    reward: { name: 'Cristal de los Humedales', sound: crystalSound, color: '#5aa86b' },
    duration: '5-8 min',
    color: '#5aa86b',
    optional: false,
    sources: ['https://www.oceanografic.org/habitat/humedales/'],
    challenge: {
      type: 'choice',
      prompt: '¿Qué tipo de vida has encontrado aquí?',
      options: ['Un ave', 'Una tortuga', 'Un animal del agua'],
      answer: '*',
      success: 'Humedal explorado. El cristal verde despierta.',
      hint: 'Mira arriba, al agua y a las orillas. Los humedales tienen pistas en todas partes.',
    },
    backupChallenge: {
      type: 'confirm',
      prompt: 'Si no podéis entrar bien, confirma cuando paséis por la zona.',
      success: 'Ruta de humedales registrada.',
    },
    riddle: {
      type: 'chain',
      guardian: {
        name: 'Garza de los Humedales',
        intro: '¡Silencio, explorador! La Garza Guardiana vigila desde la orilla. Con su mirada aguda y su pico afilado, ha roto su pieza del mapa en 3 fragmentos para proteger el secreto de los humedales. Solo un explorador que demuestre respeto por ambos mundos —el agua y la tierra— podrá ganarse su confianza. ¿Crees tener lo que hace falta, {username}?',
      },
      steps: [
        {
          text: 'Mira a tu alrededor en los humedales. ¿Ves más agua o más tierra?',
          answer: 'Las dos cosas',
          options: ['Agua', 'Tierra', 'Las dos cosas'],
          hint: 'Los humedales son mitad agua, mitad tierra.',
        },
        {
          text: 'Busca un animal que viva entre el agua y la tierra. ¿Qué tiene?',
          answer: 'Plumas',
          options: ['Plumas', 'Escamas', 'Pelo'],
          hint: 'Mira las aves que caminan por la orilla.',
        },
        {
          text: '¿Cómo se llama un ave que vive en los humedales?',
          answer: 'Garza',
          options: ['Garza', 'Águila', 'Loro'],
          hint: 'Busca un ave alta y delgada cerca del agua.',
        },
      ],
      finalSuccess: '¡Increíble, {username}! Has reconstruido la Pieza del Mapa de los Humedales. La Garza inclina su cabeza en señal de respeto y te entrega el fragmento. Cada vez estamos más cerca del corazón del océano. ¡No aflojes ahora!',
      keyObject: {
        id: 'mapa-humedales',
        name: 'Pieza del Mapa — Humedales',
        icon: '🪶',
        description: 'Una pieza del mapa del arrecife. Tiene dibujada una garza.',
      },
    },
  },
  {
    id: '03',
    routeOrder: 3,
    minMode: 'normal',
    shortName: 'Tortugas',
    title: 'Guardianas de caparazón',
    area: 'Tortugas mediterráneas / conservación',
    routeHint: 'Sigue el flujo hacia la zona de tortugas y conservación si está accesible.',
    adultHint: 'La pregunta es observacional; no hace falta leer carteles largos.',
    childAction: 'Observa una tortuga o busca una señal de conservación.',
    story:
      '{username}, acércate despacio. Mira a esas tortugas. Parecen lentas, ¿verdad? Pero llevan viajando por el planeta mucho más tiempo que cualquier ser humano. Son como los dinosaurios que sobrevivieron. Su caparazón no es solo una casa: es una armadura, un escudo, un archivo de millones de años de historia. En mis viajes por las islas Galápagos, las tortugas me enseñaron que la paciencia es la mejor herramienta de un explorador. ¿Te fijas en cómo se mueven? Vamos a observarlas juntos y descubrir qué secretos esconden bajo ese caparazón.',
    reward: { name: 'Cristal de Caparazón', sound: crystalSound, color: '#8aa64b' },
    duration: '4-7 min',
    color: '#8aa64b',
    optional: false,
    sources: [
      'https://www.oceanografic.org/especie/tortuga-boba/',
      'https://www.oceanografic.org/especie/tortuga-mediterranea/',
    ],
    challenge: {
      type: 'choice',
      prompt: '¿Qué parte parece proteger mejor a una tortuga?',
      options: ['El caparazón', 'Las aletas', 'La cola'],
      answer: 'El caparazón',
      success: 'Caparazón identificado. Cristal de conservación recuperado.',
      hint: 'Busca la parte dura que cubre su espalda.',
    },
    backupChallenge: {
      type: 'confirm',
      prompt: 'Si no ves tortugas, confirma cuando encuentres un cartel o una señal de conservación.',
      success: 'Conservación registrada. La misión continúa.',
    },
    riddle: {
      type: 'chain',
      guardian: {
        name: 'Tortuga Boba',
        intro: 'La Tortuga Boba, la viajera más antigua del Mediterráneo, ha roto su pieza del mapa en 3 fragmentos y los ha escondido bajo su caparazón. Esta guardiana no se deja engañar por exploradores impacientes. Solo quien se detenga, observe con calma y respete su ritmo milenario podrá unir los fragmentos. ¿Estás listo para moverte a su velocidad, {username}?',
      },
      steps: [
        {
          text: 'Mira a la tortuga. ¿Qué parte de su cuerpo es más grande?',
          answer: 'El caparazón',
          options: ['El caparazón', 'La cabeza', 'Las aletas'],
          hint: 'Es la casa que lleva a la espalda.',
        },
        {
          text: 'Esa parte tan grande que ves... ¿para qué sirve?',
          answer: 'Para protegerla',
          options: ['Para protegerla', 'Para nadar más rápido', 'Para volar'],
          hint: 'Es dura y la cubre como un escudo.',
        },
        {
          text: '¿Cómo se llama la casa que la tortuga lleva a la espalda?',
          answer: 'Caparazón',
          options: ['Caparazón', 'Nido', 'Ala'],
          hint: 'Es su armadura natural.',
        },
      ],
      finalSuccess: '¡Lo lograste, {username}! La Tortuga Boba reconoce tu paciencia y te entrega la Pieza del Mapa de las Tortugas. Su caparazón guardaba el secreto, y tú lo mereces. ¡Sigue adelante, explorador!',
      keyObject: {
        id: 'mapa-tortugas',
        name: 'Pieza del Mapa — Tortugas',
        icon: '🐢',
        description: 'Una pieza del mapa del arrecife. Tiene dibujada una tortuga con su caparazón.',
      },
    },
  },
  {
    id: '04',
    routeOrder: 4,
    minMode: 'normal',
    shortName: 'Templados',
    title: 'La costa de las focas',
    area: 'Templados / focas',
    routeHint: 'Avanza hacia la zona templada y busca mamíferos marinos o animales de aguas frías.',
    adultHint: 'Si las focas no están visibles, el reto alternativo evita bloquear la ruta.',
    childAction: 'Busca un animal que salga a respirar aire.',
    story:
      '{username}, estamos entrando en aguas templadas. Aquí el frío y la corriente crean un desafío constante, y solo los animales más resistentes prosperan. Mira a las focas: son mamíferos, como nosotros, que decidieron conquistar el océano sin renunciar al aire. Viven entre dos mundos, saltando de las rocas al agua con una agilidad que cualquier explorador envidiaría. En mis expediciones al Ártico, vi focas que nadaban bajo el hielo durante horas sin perderse. ¿Sabes cómo lo hacen? Vamos a descubrirlo juntos. Busca una foca y dime: ¿está en el agua o fuera?',
    reward: { name: 'Cristal Templado', sound: crystalSound, color: '#4f94a3' },
    duration: '5-8 min',
    color: '#4f94a3',
    optional: false,
    sources: ['https://www.oceanografic.org/habitat/templados-y-tropicales/'],
    challenge: {
      type: 'choice',
      prompt: 'Si ves una foca, ¿qué necesita hacer para respirar?',
      options: ['Salir a tomar aire', 'Respirar por branquias', 'No respirar'],
      answer: 'Salir a tomar aire',
      success: 'Mamífero localizado. Cristal templado desbloqueado.',
      hint: 'Las focas son mamíferos, como nosotros. Respiran aire.',
    },
    backupChallenge: {
      type: 'confirm',
      prompt: 'Si no ves focas, busca cualquier animal de la zona templada y confirma.',
      success: 'Zona templada observada.',
    },
    riddle: {
      type: 'chain',
      guardian: {
        name: 'Foca de Aguas Frías',
        intro: '¡Atención, equipo! La Foca de Aguas Frías nada entre dos mundos con una destreza impresionante. Ha roto su pieza del mapa en 3 fragmentos y los ha escondido entre las rocas y las corrientes. Solo los exploradores más pacientes, aquellos que sepan observar tanto el agua como la tierra, podrán encontrarlos. ¿Aceptas el reto, {username}?',
      },
      steps: [
        {
          text: 'Busca un animal en la zona templada. ¿Está en el agua o fuera?',
          answer: '*',
          options: ['En el agua', 'Fuera del agua', 'Las dos'],
          hint: 'Mira dentro y fuera del tanque.',
        },
        {
          text: 'Mira cómo respira. ¿Sale a la superficie o tiene branquias?',
          answer: 'Sale a la superficie',
          options: ['Sale a la superficie', 'Tiene branquias', 'No respira'],
          hint: 'Los mamíferos marinos necesitan salir a tomar aire.',
        },
        {
          text: '¿Qué animal de esta zona respira aire como nosotros?',
          answer: 'Foca',
          options: ['Foca', 'Pez', 'Cangrejo'],
          hint: 'Busca un animal con cuerpo alargado y bigotes.',
        },
      ],
      finalSuccess: '¡Excelente trabajo, {username}! Has reconstruido la Pieza del Mapa Templado. La foca te mira con confianza — te has ganado su respeto. Y el siguiente guardián nos espera. ¡Vamos allá!',
      keyObject: {
        id: 'mapa-templados',
        name: 'Pieza del Mapa — Templados',
        icon: '💧',
        description: 'Una pieza del mapa del arrecife. Tiene dibujada una foca.',
      },
    },
  },
  {
    id: '05',
    routeOrder: 5,
    minMode: 'short',
    shortName: 'Tropicales',
    title: 'El arcoíris del océano',
    area: 'Templados / Tropicales',
    routeHint: 'Continúa hacia las aguas cálidas y los peces de colores.',
    adultHint: 'Estación fiable: funciona aunque haya gente porque los colores se ven desde lejos.',
    childAction: 'Señala el pez más colorido que veas.',
    story:
      '{username}, mira esto: parece que un arcoíris explotó bajo el agua. Los peces tropicales son los artistas del océano. Cada color cuenta una historia: el naranja advierte, el azul seduce, el amarillo se esconde entre los corales. En las expediciones que hice por la Gran Barrera de Coral, aprendí que los colores no son solo belleza: son lenguaje, supervivencia, territorio. Y hoy, tú y yo vamos a descifrar ese lenguaje. ¿Cuál es el color más brillante que ves? Señálalo, porque ese pez tiene algo que decirnos.',
    reward: { name: 'Cristal Tropical', sound: crystalSound, color: '#f2b84b' },
    duration: '6-10 min',
    color: '#f2b84b',
    optional: false,
    sources: ['https://www.oceanografic.org/habitat/templados-y-tropicales/'],
    challenge: {
      type: 'familyVote',
      prompt: 'Elegid el color más brillante que hayáis visto.',
      options: ['Naranja o amarillo', 'Azul o verde', 'Blanco o plateado'],
      answer: '*',
      success: 'Color tropical registrado. El cristal brilla como el sol.',
      hint: 'Busca peces pequeños cerca de corales o formas que parezcan escondites.',
    },
    backupChallenge: {
      type: 'confirm',
      prompt: 'Si hay demasiada gente, confirma cuando hayas visto al menos un color brillante.',
      success: 'Arcoíris del océano registrado.',
    },
    riddle: {
      type: 'steps',
      guardian: {
        name: 'Peces de Colores',
        intro: 'Los Peces de Colores han mezclado su pieza del mapa con los destellos del arrecife. Cientos de destellos, cientos de colores, y solo un fragmento verdadero. Solo un explorador con mirada entrenada —alguien que sepa distinguir un destello de una señal— podrá separar los fragmentos y reconstruir la pieza. ¿Tienes lo que hay que tener, {username}?',
      },
      steps: [
        {
          text: 'Mira el tanque de los peces tropicales. ¿Qué color ves más?',
          answer: '*',
          options: ['Naranja y amarillo', 'Azul y verde', 'Rojo y rosa'],
          hint: 'No hay respuesta mala. Elige el color que más veas.',
        },
        {
          text: 'Ahora busca el pez más pequeño. ¿De qué color es?',
          answer: '*',
          options: ['Amarillo brillante', 'Azul eléctrico', 'Plateado'],
          hint: 'Los peces pequeños suelen tener colores muy vivos.',
        },
        {
          text: '¿Qué crees que comen para tener colores tan bonitos?',
          answer: '*',
          options: ['Algas y plancton', 'Otros peces', 'No lo sé'],
          hint: 'Piensa en lo que hay en un arrecife de coral.',
        },
      ],
      finalSuccess: '¡Espectacular, {username}! Has reconstruido la Pieza del Mapa Tropical. Los colores del arrecife ahora brillan para ti. Cada fragmento recuperado nos acerca al Ojo del Océano. ¡No pares!',
      keyObject: {
        id: 'mapa-tropicales',
        name: 'Pieza del Mapa — Tropicales',
        icon: '🪸',
        description: 'Una pieza del mapa del arrecife. Tiene dibujados peces de colores.',
      },
    },
  },
  {
    id: '06',
    routeOrder: 6,
    minMode: 'normal',
    shortName: 'Leones marinos',
    title: 'El rugido de las islas',
    area: 'Islas Continentales / leones marinos',
    routeHint: 'Sal a la zona de islas y observa desde la barandilla.',
    adultHint: 'Evita esperar un show. Basta con verlos moverse, descansar o salir a respirar.',
    childAction: 'Imita durante tres segundos cómo se mueve o suena un león marino.',
    story:
      '{username}, ¿oyes ese rugido? Los leones marinos son los dueños de las islas. Mira cómo se mueven: en el agua son torpedos, en tierra son acróbatas. Son mamíferos como nosotros, pero adaptados a un mundo líquido. En mis viajes por las costas de la Patagonia, vi colonias enteras llenar una isla de vida y sonido. Trabajan en equipo, se protegen entre ellos, y cuando rugen, todo el océano los escucha. Hoy tú y yo somos equipo también. ¿Vamos a observar qué están haciendo?',
    reward: { name: 'Cristal de las Islas', sound: crystalSound, color: '#7dbe57' },
    duration: '5-8 min',
    color: '#7dbe57',
    optional: false,
    sources: ['https://www.oceanografic.org/habitat/islas/'],
    challenge: {
      type: 'choice',
      prompt: '¿Dónde lo has visto ahora?',
      options: ['En el agua', 'En tierra', 'Moviéndose entre los dos sitios'],
      answer: '*',
      success: 'León marino localizado. Cristal de islas recuperado.',
      hint: 'Mira las rocas y el agua. Pueden descansar o nadar.',
    },
    backupChallenge: {
      type: 'confirm',
      prompt: 'Si no se ven bien, confirma al pasar por la zona de islas.',
      success: 'Islas registradas. Seguimos adelante.',
    },
    riddle: {
      type: 'chain',
      guardian: {
        name: 'León Marino',
        intro: '¡Escucha ese rugido! El León Marino, rey de las rocas, ha roto su pieza del mapa en 3 fragmentos y los ha escondido entre las olas. No se los dará a cualquiera: solo un explorador valiente, que no tema al rugido ni al agua, podrá reunirlos. ¿Eres ese explorador, {username}?',
      },
      steps: [
        {
          text: 'Mira al león marino. ¿Está en el agua o en tierra?',
          answer: '*',
          options: ['En el agua', 'En tierra', 'Los dos sitios'],
          hint: 'Mira a su alrededor. Puede estar descansando o nadando.',
        },
        {
          text: 'Fíjate en lo que hace. ¿Está quieto, nadando o rugiendo?',
          answer: '*',
          options: ['Quieto', 'Nadando', 'Rugiendo'],
          hint: 'Observa su cuerpo. Los leones marinos se mueven de muchas formas.',
        },
        {
          text: 'Los leones marinos, las focas y las belugas son... ¿mamíferos o peces?',
          answer: 'Mamíferos',
          options: ['Mamíferos', 'Peces', 'Aves'],
          hint: 'Respiran aire y tienen pelo. Como nosotros.',
        },
      ],
      finalSuccess: '¡Ruge conmigo, {username}! Has reconstruido la Pieza del Mapa de las Islas. El León Marino reconoce tu valentía y te entrega el fragmento entre rugidos de respeto. ¡Qué equipo somos!',
      keyObject: {
        id: 'mapa-islas',
        name: 'Pieza del Mapa — Islas',
        icon: '🦭',
        description: 'Una pieza del mapa del arrecife. Tiene dibujado un león marino.',
      },
    },
  },
  {
    id: '07',
    routeOrder: 7,
    minMode: 'complete',
    shortName: 'Tortugas gigantes',
    title: 'Gigantes tranquilas',
    area: 'Islas Oceánicas / tortugas gigantes',
    routeHint: 'Continúa por la zona de islas oceánicas si está visible en el recorrido.',
    adultHint: 'Si la zona está cerrada o no se distinguen las tortugas, usa salto seguro.',
    childAction: 'Busca una tortuga grande y observa si se mueve rápido o despacio.',
    story:
      '{username}, detente un momento. Frente a nosotros hay un gigante tranquilo. Las tortugas gigantes de Aldabra son los animales más longevos del planeta — pueden vivir más de cien años. En las islas Seychelles, donde estas tortugas vagan libres, aprendí que la verdadera aventura no siempre es velocidad: a veces es saber esperar, observar, respirar. Su caparazón guarda historias de siglos. Vamos a sentarnos un momento y observar. ¿Se mueve rápido o despacio? Fíjate bien.',
    reward: { name: 'Cristal de las Islas Oceánicas', sound: crystalSound, color: '#9c8f4f' },
    duration: '4-7 min',
    color: '#9c8f4f',
    optional: true,
    sources: [
      'https://www.oceanografic.org/habitat/islas/',
      'https://www.oceanografic.org/especie/tortugas-de-aldabra/',
    ],
    challenge: {
      type: 'choice',
      prompt: '¿Cómo se mueve una tortuga gigante?',
      options: ['Despacio', 'Rapidísimo', 'Volando'],
      answer: 'Despacio',
      success: 'Paciencia detectada. Cristal de islas oceánicas conseguido.',
      hint: 'Mira sus patas y su caparazón. Su fuerza está en la calma.',
    },
    backupChallenge: {
      type: 'confirm',
      prompt: 'Si esta zona no está disponible, confirma y Bravestone guardará la pista como opcional.',
      success: 'Estación opcional saltada sin perder la historia.',
    },
    riddle: {
      type: 'chain',
      guardian: {
        name: 'Tortuga Gigante de Aldabra',
        intro: 'La Tortuga Gigante de Aldabra es la más paciente del océano. Ha vivido más que cualquier explorador y ha visto imperios subir y caer. Rompió su pieza del mapa en 3 fragmentos y esperará —tranquila, sin prisa— a que demuestres tu calma. En el mundo de la aventura, la paciencia es un superpoder. ¿Tienes ese poder, {username}?',
      },
      steps: [
        {
          text: 'Mira la tortuga gigante. ¿Se mueve rápido o despacio?',
          answer: 'Despacio',
          options: ['Despacio', 'Rápido', 'No se mueve'],
          hint: 'Son animales pacientes y tranquilos.',
        },
        {
          text: '¿Qué parte de su cuerpo usa para caminar?',
          answer: 'Sus patas',
          options: ['Sus patas', 'Su caparazón', 'Su cola'],
          hint: 'Mira lo que toca el suelo.',
        },
        {
          text: '¿Sabes de qué isla vienen estas tortugas gigantes?',
          answer: 'Aldabra',
          options: ['Aldabra', 'Hawái', 'Madagascar'],
          hint: 'Busca un cartel que diga su nombre.',
        },
      ],
      finalSuccess: '¡Maravilloso, {username}! La Tortuga Gigante asiente lentamente y te entrega la Pieza del Mapa de las Islas Oceánicas. La paciencia siempre tiene recompensa, y esta es tuya. ¡Sigue así, explorador paciente!',
      keyObject: {
        id: 'mapa-islas-oceanicas',
        name: 'Pieza del Mapa — Islas Oceánicas',
        icon: '🐢',
        description: 'Una pieza del mapa del arrecife. Tiene dibujada una tortuga gigante.',
      },
    },
  },
  {
    id: '08',
    routeOrder: 8,
    minMode: 'complete',
    shortName: 'Mar Rojo',
    title: 'La pausa del arrecife',
    area: 'Mar Rojo / Cine 4D',
    routeHint: 'Usa esta zona como pausa o transición si encaja con el recorrido.',
    adultHint: 'No depende de ver el Cine 4D. Es una estación opcional de descanso.',
    childAction: 'Busca una imagen, color o sonido que parezca de arrecife.',
    story:
      '{username}, bienvenido al Mar Rojo — uno de los mares más famosos del mundo por sus arrecifes. Fíjate en los colores: el rojo de los corales, el azul profundo del agua, el naranja de los peces payaso. Este es un lugar para detenerse, respirar y prepararse. En todas las grandes expediciones hay pausas, momentos para recargar energías y observar el mapa. Esta es nuestra pausa. ¿Qué colores ves alrededor? Tómate tu tiempo, explorador, porque el viaje continúa.',
    reward: { name: 'Cristal del Arrecife', sound: crystalSound, color: '#d65a4a' },
    duration: '3-10 min',
    color: '#d65a4a',
    optional: true,
    sources: ['https://www.oceanografic.org/planifica-tu-visita/plano-del-acuario/'],
    challenge: {
      type: 'observe',
      prompt: 'Observa una señal de arrecife y confirma cuando estés listo.',
      success: 'Pausa de arrecife completada.',
      hint: 'Un color, una pantalla, una forma o un sonido sirven como pista.',
    },
    backupChallenge: {
      type: 'confirm',
      prompt: 'Si no pasáis por esta zona, confirma para seguir la ruta principal.',
      success: 'Bonus opcional saltado. La misión continúa.',
    },
    riddle: {
      type: 'chain',
      guardian: {
        name: 'Coral Rojo',
        intro: 'El Coral Rojo guarda el fragmento más colorido de todo el mapa. Lo rompió en 3 pedazos y los mezcló con los destellos del arrecife. Solo quienes sepan apreciar la belleza de los colores —los verdaderos artistas de la exploración— podrán unir los fragmentos. ¿Tienes buen ojo para el color, {username}?',
      },
      steps: [
        {
          text: 'Observa los colores del Mar Rojo. ¿Qué color predomina?',
          answer: '*',
          options: ['Rojo y naranja', 'Azul y turquesa', 'Verde y marrón'],
          hint: 'El agua aquí tiene fama por su color.',
        },
        {
          text: 'Busca una forma de coral. ¿A qué se parece?',
          answer: '*',
          options: ['A un abanico', 'A un cerebro', 'A un árbol'],
          hint: 'Los corales tienen formas muy variadas.',
        },
        {
          text: '¿Por qué crees que se llama Mar Rojo?',
          answer: '*',
          options: ['Por el color del agua', 'Por las algas rojas', 'No lo sé'],
          hint: 'A veces el nombre viene de algo que vive en él.',
        },
      ],
      finalSuccess: '¡Qué colores, {username}! Has reconstruido la Pieza del Mapa del Arrecife. El Coral Rojo revela sus tonos más brillantes solo para ti. Vamos, que la aventura nos espera.',
      keyObject: {
        id: 'mapa-arrecife',
        name: 'Pieza del Mapa — Arrecife',
        icon: '🪸',
        description: 'Una pieza del mapa del arrecife. Tiene dibujado un coral rojo.',
      },
    },
  },
  {
    id: '09',
    routeOrder: 9,
    minMode: 'short',
    shortName: 'Delfines',
    title: 'El salto azul',
    area: 'Delfinario / delfines',
    routeHint: 'Avanza hacia el delfinario sin depender de que haya presentación.',
    adultHint: 'Si coincide un show, perfecto. Si no, basta con observar el tanque o saltar con backup.',
    childAction: 'Observa un movimiento de delfín o imagina cómo usaría el sonido bajo el agua.',
    story:
      '{username}, los delfines están aquí. Mira cómo se deslizan: son los acróbatas del océano. Pero lo que realmente los hace especiales no es cómo saltan, sino cómo se comunican. Usan clics, silbidos y ecos para crear un mapa invisible del mundo bajo el agua. En mis expediciones, he visto delfines guiar a barcos perdidos y protegerse entre ellos con una inteligencia que pocos animales igualan. Hoy vamos a aprender su lenguaje. ¿Sabes cómo se llama el sistema de sonido que usan para ver bajo el agua? Vamos a descubrirlo juntos.',
    reward: { name: 'Cristal del Salto Azul', sound: crystalSound, color: '#2b7fd3' },
    duration: '5-15 min',
    color: '#2b7fd3',
    optional: false,
    sources: [
      'https://www.oceanografic.org/delfinario/',
      'https://www.oceanografic.org/especie/delfin-mular/',
      'https://www.oceanografic.org/planifica-tu-visita/hoy-en-el-acuario/',
    ],
    challenge: {
      type: 'choice',
      prompt: '¿Qué usan los delfines para orientarse bajo el agua?',
      options: ['El sonido', 'Una linterna', 'Un mapa de papel'],
      answer: 'El sonido',
      success: 'Sonido registrado. Cristal del Salto Azul conseguido.',
      hint: 'Los clics rebotan y vuelven, como un eco.',
    },
    backupChallenge: {
      type: 'confirm',
      prompt: 'Si el delfinario está lleno o cerrado, confirma aquí. La historia sigue.',
      success: 'Delfinario saltado sin romper la ruta.',
    },
    riddle: {
      type: 'chain',
      guardian: {
        name: 'Delfín Mular',
        intro: '¡Escucha! ¿Oyes esos clics? El Delfín Mular, el más inteligente del océano, ha escondido su pieza del mapa en 3 clics secretos. Solo quien entienda su lenguaje —quien pueda descifrar los ecos y los silbidos— podrá encontrarlos. Este no es un desafío para cualquiera, {username}. Necesito a un explorador con la mente afilada y los oídos bien abiertos. ¿Estás listo?',
      },
      steps: [
        {
          text: 'Mira cómo se mueve el delfín. ¿Qué usa para nadar tan rápido?',
          answer: 'Su cola',
          options: ['Su cola', 'Sus aletas laterales', 'Su cabeza'],
          hint: 'Mira la parte de atrás de su cuerpo.',
        },
        {
          text: 'Los delfines no ven bien bajo el agua. ¿Qué usan para orientarse?',
          answer: 'El sonido',
          options: ['El sonido', 'La luz', 'El olfato'],
          hint: 'Hacen clics que rebotan en los objetos.',
        },
        {
          text: '¿Cómo se llama ese sistema de sonido que usan los delfines?',
          answer: 'Ecolocalización',
          options: ['Ecolocalización', 'Navegación', 'Telepatía'],
          hint: 'Empieza por "eco" y significa localizar con sonido.',
        },
      ],
      finalSuccess: '¡Increíble, {username}! Has descifrado el lenguaje del Delfín Mular. La Pieza del Mapa de los Delfines es tuya. Y el delfín te saluda con un clic de aprobación — eres parte de la manada ahora.',
      keyObject: {
        id: 'mapa-delfines',
        name: 'Pieza del Mapa — Delfines',
        icon: '🐬',
        description: 'Una pieza del mapa del arrecife. Tiene dibujado un delfín saltando.',
      },
    },
  },
  {
    id: '10',
    routeOrder: 10,
    minMode: 'complete',
    shortName: 'Flamencos',
    title: 'El color escondido',
    area: 'Flamencos',
    routeHint: 'Si la ruta pasa junto a los flamencos, observa sin desviarte.',
    adultHint: 'Es una estación breve. No debe causar rodeos.',
    childAction: 'Busca un color rosa o una pata larga.',
    story:
      '{username}, mira a esas elegantes aves rosadas. Los flamencos parecen sacados de un sueño, pero su color tiene una explicación científica: comen gambitas y algas que contienen pigmentos, y esos pigmentos tiñen sus plumas de rosa. En los humedales de África, vi flamencos cubrir el horizonte como una nube rosada. La ciencia está escondida hasta en el detalle más bonito. ¿Sabes sobre cuántas patas suelen descansar? Observa bien y me cuentas.',
    reward: { name: 'Cristal Rosa', sound: crystalSound, color: '#e98ca8' },
    duration: '2-4 min',
    color: '#e98ca8',
    optional: true,
    sources: ['https://www.oceanografic.org/planifica-tu-visita/plano-del-acuario/'],
    challenge: {
      type: 'observe',
      prompt: 'Confirma cuando hayas visto un flamenco o una pista de color rosa.',
      success: 'Color rosa detectado. Cristal bonus conseguido.',
      hint: 'Mira las patas, el cuello y las plumas.',
    },
    backupChallenge: {
      type: 'confirm',
      prompt: 'Si no pasáis por los flamencos, confirma para continuar.',
      success: 'Bonus de flamencos saltado.',
    },
    riddle: {
      type: 'steps',
      guardian: {
        name: 'Flamenco Rosa',
        intro: 'El Flamenco Rosa es el guardián más elegante del humedal. Rompió su pieza del mapa en 3 fragmentos de color y los escondió entre sus plumas. Solo quien aprecie los detalles más sutiles —un tono de rosa, la curva de un cuello, la posición de una pata— podrá encontrarlos. ¿Eres observador, {username}? Demuéstralo.',
      },
      steps: [
        {
          text: 'Mira los flamencos. ¿De qué color son?',
          answer: '*',
          options: ['Rosa y blanco', 'Gris y marrón', 'Azul y verde'],
          hint: 'Mira bien sus plumas. Tienen un color muy famoso.',
        },
        {
          text: 'Fíjate en sus patas. ¿Sobre cuántas están de pie?',
          answer: '*',
          options: ['Una pata', 'Dos patas', 'Tres patas'],
          hint: 'A veces descansan sobre una pata.',
        },
        {
          text: '¿Qué crees que comen para tener ese color rosa?',
          answer: '*',
          options: ['Gambitas y algas', 'Fruta', 'No lo sé'],
          hint: 'Su color viene de pequeños crustáceos que comen.',
        },
      ],
      finalSuccess: '¡Precioso trabajo, {username}! El Flamenco Rosa extiende sus alas y te entrega la Pieza del Mapa de los Flamencos. El rosa ahora brilla para ti. ¡Sigue así!',
      keyObject: {
        id: 'mapa-flamencos',
        name: 'Pieza del Mapa — Flamencos',
        icon: '🦩',
        description: 'Una pieza del mapa del arrecife. Tiene dibujado un flamenco rosa.',
      },
    },
  },
  {
    id: '11',
    routeOrder: 11,
    minMode: 'short',
    shortName: 'Pingüinos',
    title: 'Los científicos del hielo',
    area: 'Antártico / pingüinos',
    routeHint: 'Sigue hacia la zona fría de pingüinos.',
    adultHint: 'Reto muy estable: basta con observar movimiento o color.',
    childAction: 'Mira cómo se mueven en el agua y fuera de ella.',
    story:
      '{username}, ¡bienvenido al Antártico! Estos pingüinos son de los exploradores más increíbles del planeta. No vuelan por el aire, pero mira cómo vuelan bajo el agua: sus alas se convierten en aletas y se disparan como torpedos. Sus cuerpos están diseñados para el frío extremo, para deslizarse sobre el hielo y para bucear a profundidades que ningún ser humano podría alcanzar sin equipo. En mis expediciones polares, los pingüinos me enseñaron que la verdadera fuerza está en adaptarse al entorno. ¿Ves cómo se mueven? Vamos a observarlos dentro y fuera del agua.',
    reward: { name: 'Cristal Antártico', sound: crystalSound, color: '#8fd3ff' },
    duration: '5-8 min',
    color: '#8fd3ff',
    optional: false,
    sources: [
      'https://www.oceanografic.org/habitat/antartico/',
      'https://www.oceanografic.org/especie/pinguino-juanito/',
      'https://www.oceanografic.org/especie/pinguino-rey/',
    ],
    challenge: {
      type: 'choice',
      prompt: '¿Qué hacen mejor los pingüinos?',
      options: ['Nadar', 'Volar como un águila', 'Tocar la trompeta'],
      answer: 'Nadar',
      success: 'Movimiento antártico identificado. Cristal Antártico conseguido.',
      hint: 'Mira cómo entran al agua. Allí se mueven mucho mejor.',
    },
    backupChallenge: {
      type: 'confirm',
      prompt: 'Si hay mucha gente, confirma cuando hayas visto un pingüino desde lejos.',
      success: 'Pingüino observado desde zona segura.',
    },
    riddle: {
      type: 'chain',
      guardian: {
        name: 'Pingüino Juanito',
        intro: '¡Prepárate para el frío! El Pingüino Juanito, el más veloz bajo el agua, ha roto su pieza del mapa en 3 fragmentos de hielo. Están escondidos en las corrientes más frías del tanque. Solo un explorador que lo vea nadar y entienda su mundo helado podrá fundirlos y recuperar la pieza. ¿Tienes el valor para sumergirte en esta aventura, {username}?',
      },
      steps: [
        {
          text: 'Mira cómo se mueve el pingüino en el agua. ¿Parece que vuela?',
          answer: 'Sí',
          options: ['Sí', 'No', 'No sé'],
          hint: 'Mira sus aletas. Se mueven como alas en el agua.',
        },
        {
          text: 'Ahora míralo fuera del agua. ¿Camina o se desliza?',
          answer: 'Camina',
          options: ['Camina', 'Se desliza', 'Salta'],
          hint: 'Sus patas son cortas y van de lado a lado.',
        },
        {
          text: 'Los pingüinos tienen plumas, pico y ponen huevos. ¿Son aves o peces?',
          answer: 'Aves',
          options: ['Aves', 'Peces', 'Mamíferos'],
          hint: 'Aunque no vuelan, tienen plumas como los pájaros.',
        },
      ],
      finalSuccess: '¡Fantástico, {username}! El Pingüino Juanito te saluda desde el hielo y te entrega la Pieza del Mapa Antártico. Un hábitat más conquistado. El tesoro final se acerca. ¡No te detengas!',
      keyObject: {
        id: 'mapa-antartico',
        name: 'Pieza del Mapa — Antártico',
        icon: '🐧',
        description: 'Una pieza del mapa del arrecife. Tiene dibujado un pingüino.',
      },
    },
  },
  {
    id: '12',
    routeOrder: 12,
    minMode: 'normal',
    shortName: 'Belugas',
    title: 'Las ballenas blancas',
    area: 'Ártico / belugas',
    routeHint: 'Entra al iglú y observa desde arriba o desde el nivel submarino.',
    adultHint: 'Usa preguntas observacionales. No depender de identificar a cada beluga por nombre.',
    childAction: 'Saluda a una beluga y observa su color.',
    story:
      '{username}, baja la voz... estamos en territorio ártico. Mira esas belugas: blancas como el hielo, silenciosas como la nieve. Son los canarios del mar, porque cantan y silban bajo el agua creando una sinfonía invisible. Kylu, la cría que nació aquí, es la prueba de que la vida florece hasta en los lugares más fríos. En mis viajes al Ártico canadiense, las belugas me rodeaban cantando, guiándome a través de aguas que ningún mapa registra. Hoy, tú y yo vamos a escuchar su canción. ¿Estás listo para descubrir el secreto de las ballenas blancas?',
    reward: { name: 'Cristal Ártico', sound: crystalSound, color: '#bfefff' },
    duration: '6-10 min',
    color: '#bfefff',
    optional: false,
    sources: [
      'https://www.oceanografic.org/habitat/artico/',
      'https://www.oceanografic.org/especie/belugas/',
      'https://www.oceanografic.org/especie/kylu-la-cria-de-beluga/',
      'https://www.oceanografic.org/especie/plombir-y-miranda-las-dos-belugas-rescatadas-de-ucrania/',
    ],
    challenge: {
      type: 'choice',
      prompt: '¿De qué color es una beluga adulta?',
      options: ['Blanco', 'Rojo brillante', 'Verde oscuro'],
      answer: 'Blanco',
      success: 'Pista ártica guardada. Cristal Ártico conseguido.',
      hint: 'Su color ayuda a camuflarse en zonas heladas.',
    },
    backupChallenge: {
      type: 'confirm',
      prompt: 'Si las belugas no están visibles, confirma cuando hayas visto el tanque ártico.',
      success: 'Tanque ártico registrado.',
    },
    riddle: {
      type: 'chain',
      guardian: {
        name: 'Kylu',
        intro: 'Kylu, la cría de beluga que nació aquí en el Oceanogràfic, es la guardiana más joven de todo el océano. Pero no te dejes engañar por su juventud: ha roto su pieza del mapa en 3 cantos submarinos, y solo quien sepa escuchar con atención —quien pueda oír más allá del silencio— podrá reunirlos. ¿Tienes buen oído, explorador? ¿Puedes escuchar el canto de la beluga?',
      },
      steps: [
        {
          text: 'Mira a Kylu. ¿De qué color es su piel?',
          answer: 'Blanco',
          options: ['Blanco', 'Gris', 'Azul'],
          hint: 'Se camufla con el hielo.',
        },
        {
          text: 'Fíjate en su cabeza. ¿Tiene una aleta en la espalda?',
          answer: 'No',
          options: ['Sí', 'No', 'No se ve'],
          hint: 'Mira desde arriba su lomo.',
        },
        {
          text: 'Kylu hace muchos sonidos. ¿Cómo llaman a las belugas por eso?',
          answer: 'Canarios del mar',
          options: ['Canarios del mar', 'Sirenas del océano', 'Guitarras del hielo'],
          hint: 'Como un pájaro que canta, pero en el agua.',
        },
      ],
      finalSuccess: '¡Lo lograste, {username}! Kylu canta feliz al entregarte la Pieza del Mapa de las Belugas. Su canto submarino ahora es tuyo. Casi hemos completado el mapa. ¡Vamos por las últimas piezas!',
      keyObject: {
        id: 'mapa-belugas',
        name: 'Pieza del Mapa — Beluga',
        icon: '🐋',
        description: 'Una pieza del mapa del arrecife. Tiene dibujada una beluga blanca.',
      },
    },
  },
  {
    id: '13',
    routeOrder: 13,
    minMode: 'complete',
    shortName: 'Cocodrilos',
    title: 'El abuelo del tiempo',
    area: 'Cocodrilario',
    routeHint: 'Continúa al lago vivo de cocodrilos.',
    adultHint: 'Suelen estar quietos. Eso también sirve para el reto.',
    childAction: 'Cuenta hasta cinco mirando al cocodrilo sin moverte.',
    story:
      '{username}, míralo bien. Ese cocodrilo es un fósil viviente. Sus ancestros caminaron junto a los dinosaurios, y él sigue aquí, casi sin cambios, después de millones de años. Sus escamas son como placas de armadura, su mandíbula es una trampa mortal, y su paciencia... su paciencia es legendaria. En las expediciones por el Nilo, aprendí que el cocodrilo es el maestro de la espera: puede quedarse inmóvil durante horas, días, hasta que llega el momento perfecto. Hoy, tú y yo vamos a demostrarle que también sabemos esperar. ¿Cuánto tiempo puedes quedarte quieto mirándolo?',
    reward: { name: 'Cristal de Escamas Antiguas', sound: crystalSound, color: '#647b36' },
    duration: '4-7 min',
    color: '#647b36',
    optional: false,
    sources: [
      'https://www.oceanografic.org/habitat/cocodrilario/',
      'https://www.oceanografic.org/especie/cocodrilo-hociquifino-africano/',
    ],
    challenge: {
      type: 'choice',
      prompt: '¿Qué parte le protege como una armadura?',
      options: ['Sus escamas', 'Sus pestañas', 'Sus bigotes'],
      answer: 'Sus escamas',
      success: 'Armadura identificada. Cristal antiguo desbloqueado.',
      hint: 'Mira la piel: está cubierta de placas duras.',
    },
    backupChallenge: {
      type: 'confirm',
      prompt: 'Si no se ve bien, confirma tras observar el lago durante unos segundos.',
      success: 'Cocodrilario observado.',
    },
    riddle: {
      type: 'chain',
      guardian: {
        name: 'Cocodrilo Hociquifino',
        intro: 'El Cocodrilo Hociquifino vive aquí desde antes de que existiera el acuario. Es el guardián más antiguo de todos. Rompió su pieza del mapa en 3 escamas antiguas y las escondió en el lodo del tiempo. No se las dará a un explorador impaciente. Solo quien demuestre la misma calma milenaria que él —quien pueda esperar sin moverse— recibirá el fragmento. ¿Tienes esa paciencia, {username}?',
      },
      steps: [
        {
          text: 'Mira al cocodrilo. ¿Qué ves que cubre todo su cuerpo?',
          answer: 'Escamas',
          options: ['Escamas', 'Pelo', 'Plumas'],
          hint: 'Son duras y parecen placas de armadura.',
        },
        {
          text: '¿Está quieto o se mueve?',
          answer: '*',
          options: ['Quieto', 'Se mueve', 'No se ve'],
          hint: 'Los cocodrilos son pacientes. Pueden estar quietos mucho tiempo.',
        },
        {
          text: 'Los cocodrilos vivieron con los dinosaurios. ¿Cuántos años llevan en la Tierra?',
          answer: 'Millones de años',
          options: ['Millones de años', 'Cien años', 'Mil años'],
          hint: 'Son mucho más antiguos que los humanos.',
        },
      ],
      finalSuccess: '¡Asombroso, {username}! El Cocodrilo Hociquifino asiente lentamente —un gesto de respeto milenario— y te entrega la Pieza del Mapa del Cocodrilario. Tu paciencia te ha hecho más fuerte. ¡Solo nos quedan dos piezas!',
      keyObject: {
        id: 'mapa-cocodrilos',
        name: 'Pieza del Mapa — Cocodrilo',
        icon: '🐊',
        description: 'Una pieza del mapa del arrecife. Tiene dibujado un cocodrilo con escamas.',
      },
    },
  },
  {
    id: '14',
    routeOrder: 14,
    minMode: 'short',
    shortName: 'Tiburones',
    title: 'La puerta de las profundidades',
    area: 'Océanos / túnel de tiburones',
    routeHint: 'Termina el recorrido marino en el túnel de Océanos.',
    adultHint: 'Buen cierre por impacto visual. Si está saturado, mirar desde la entrada también sirve.',
    childAction: 'Pasa por el túnel y señala un tiburón o una raya.',
    story:
      '{username}, estamos en el túnel de los tiburones. Mira hacia arriba: esos son los guardianes del equilibrio del océano. Llevan más de 400 millones de años en la Tierra —mucho antes que los dinosaurios. No tienen huesos, sino cartílago, como tus orejas. No son monstruos: son máquinas de supervivencia perfectas, peces antiguos que mantienen el océano en armonía. En mis buceos por la Gran Barrera de Coral, los tiburones siempre aparecían cuando el arrecife estaba sano. Su presencia es una señal de que todo está en orden. Vamos a observarlos con respeto y aprender de los dueños de las profundidades.',
    reward: { name: 'Cristal de las Profundidades', sound: crystalSound, color: '#123f63' },
    duration: '8-12 min',
    color: '#123f63',
    optional: false,
    sources: [
      'https://www.oceanografic.org/habitat/oceanos/',
      'https://www.oceanografic.org/especie/tiburon-toro/',
      'https://www.oceanografic.org/especie/tiburon-cebra/',
    ],
    challenge: {
      type: 'choice',
      prompt: '¿Qué son los tiburones?',
      options: ['Peces', 'Mamíferos', 'Aves'],
      answer: 'Peces',
      success: 'Clave de las profundidades conseguida.',
      hint: 'A diferencia de delfines y belugas, los tiburones son peces.',
    },
    backupChallenge: {
      type: 'confirm',
      prompt: 'Si el túnel está lleno, confirma cuando hayas visto un tiburón desde cualquier punto.',
      success: 'Profundidades registradas.',
    },
    riddle: {
      type: 'chain',
      guardian: {
        name: 'Tiburón Toro',
        intro: 'El Tiburón Toro, guardián de las profundidades, ha roto la penúltima pieza del mapa en 3 fragmentos de cartílago. Es el guardián más poderoso de todos, y no entregará su pieza a cualquiera. Solo un explorador que demuestre verdadero valor —alguien que entienda que el tiburón no es un monstruo, sino un aliado— podrá reconstruirla. Este es un desafío de altura, {username}. ¿Estás preparado para enfrentar las profundidades?',
      },
      steps: [
        {
          text: 'Mira el tiburón. ¿Tiene huesos como nosotros?',
          answer: 'No',
          options: ['Sí', 'No', 'Algunos sí'],
          hint: 'Su cuerpo está hecho de un material más flexible.',
        },
        {
          text: '¿Qué parte de tu cuerpo se parece al material del tiburón?',
          answer: 'La oreja',
          options: ['La oreja', 'El hueso', 'La uña'],
          hint: 'Tócate la punta de la oreja. Es flexible.',
        },
        {
          text: '¿Cómo se llama ese material flexible que tienen los tiburones?',
          answer: 'Cartílago',
          options: ['Cartílago', 'Hueso', 'Goma'],
          hint: 'Empieza por "cartí" y no es hueso.',
        },
      ],
      finalSuccess: '¡Misión cumplida, {username}! Has reconstruido la Pieza del Mapa de las Profundidades. El Tiburón Toro reconoce tu valentía y te entrega el fragmento. ¡Todas las piezas están listas! Ha llegado el momento de revelar el Mapa del Arrecife.',
      keyObject: {
        id: 'mapa-tiburones',
        name: 'Pieza del Mapa — Tiburones',
        icon: '🦈',
        description: 'Una pieza del mapa del arrecife. Tiene dibujado un tiburón.',
      },
    },
  },
  {
    id: '15',
    routeOrder: 15,
    minMode: 'short',
    shortName: 'Final',
    title: 'Explorador Honorífico',
    area: 'Salida o zona tranquila posterior',
    routeHint: 'Busca un sitio tranquilo después de Océanos para cerrar la aventura.',
    adultHint: 'Momento de foto familiar con la insignia.',
    childAction: 'Cuéntale a la familia cuál ha sido tu animal favorito.',
    story:
      '{username}, has recorrido el océano entero a mi lado —el Dr. Smolder Bravestone— y juntos hemos enfrentado cada desafío. Hemos conocido pulpos camuflados, garzas vigilantes, tortugas milenarias, focas escurridizas, peces de colores, leones marinos rugientes, tortugas gigantes, corales rojos, delfines parlantes, flamencos elegantes, pingüinos veloces, belugas cantarinas, cocodrilos pacientes y tiburones poderosos. ¡Y has recuperado las 14 piezas del Mapa del Arrecife! Cada guardián confió en ti, cada desafío te hizo más fuerte. Ahora el mapa te espera para revelar su secreto final. Coloca las piezas, {username}, y descubre el Ojo del Océano. ¡Esta es tu victoria!',
    reward: { name: 'Insignia de Explorador Honorífico', sound: crystalSound, color: '#7a4fd1' },
    duration: '2-3 min',
    color: '#7a4fd1',
    optional: false,
    sources: ['https://www.oceanografic.org/'],
    challenge: {
      type: 'confirm',
      prompt: 'Toca para colocar las piezas en el Mapa del Arrecife.',
      success: 'Has completado el Mapa del Arrecife. El Ojo del Océano está frente a ti.',
      hint: 'Este es el gran final. Coloca cada pieza donde corresponde.',
    },
    backupChallenge: {
      type: 'confirm',
      prompt: 'Si necesitáis cerrar rápido, toca aquí para terminar la misión.',
      success: 'Misión cerrada con éxito.',
    },
    isTreasure: true,
    treasure: {
      type: 'map',
      title: 'El Mapa del Arrecife',
      message: '¡Has revelado el Ojo del Océano! El verdadero tesoro eres tú, explorador.',
      requiredObjects: [
        'mapa-mediterraneo',
        'mapa-humedales',
        'mapa-tortugas',
        'mapa-templados',
        'mapa-tropicales',
        'mapa-islas',
        'mapa-islas-oceanicas',
        'mapa-arrecife',
        'mapa-delfines',
        'mapa-flamencos',
        'mapa-antartico',
        'mapa-belugas',
        'mapa-cocodrilos',
        'mapa-tiburones',
      ],
    },
  },
];

function makeBonusRiddle(station, suffix, guardianName, icon, objectName, facts) {
  const [first, second, third] = facts;
  const objectId = `mapa-${station.shortName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-')}-${suffix}`;

  return {
    type: 'chain',
    guardian: {
      name: guardianName,
      intro: `${guardianName} guarda otra pista de ${station.area}. Para conseguirla, observa la zona con calma y completa las tres señales.`,
    },
    steps: [
      {
        text: first.text,
        answer: first.answer,
        options: first.options,
        hint: first.hint,
      },
      {
        text: second.text,
        answer: second.answer,
        options: second.options,
        hint: second.hint,
      },
      {
        text: third.text,
        answer: third.answer,
        options: third.options,
        hint: third.hint,
      },
    ],
    finalSuccess: `Nueva pista conseguida: ${objectName}. ${guardianName} añade su fragmento al mapa del océano.`,
    keyObject: {
      id: objectId,
      name: objectName,
      icon,
      description: `Una pieza adicional del mapa vinculada a ${station.area}.`,
    },
  };
}

const extraRiddleSpecs = {
  '00': [
    ['acceso-tiburones', 'Tiburón Cabeza de Pala', '🦈', 'Pieza del Mapa — Acceso Tiburones', [
      { text: 'En el Edificio de Acceso, busca un tiburón con la cabeza ancha. ¿A qué se parece?', answer: 'A una pala', options: ['A una pala', 'A una estrella', 'A una pluma'], hint: 'Su nombre oficial habla de una cabeza de pala.' },
      { text: '¿Qué otros animales marinos pueden verse en esta entrada?', answer: '*', options: ['Tortugas marinas', 'Medusas', 'Tiburones'], hint: 'Cualquiera de esas pistas sirve en el edificio de acceso.' },
      { text: 'La columna inmersiva de agua hace que parezca que estás...', answer: 'Bajo el agua', options: ['Bajo el agua', 'En una montaña', 'En el desierto'], hint: 'Mira arriba y alrededor: todo invita a entrar en el océano.' },
    ]],
  ],
  '01': [
    ['posidonia', 'Posidonia Guardiana', '🌿', 'Pieza del Mapa — Posidonia', [
      { text: 'Busca la posidonia. ¿Es una planta marina o una roca?', answer: 'Una planta marina', options: ['Una planta marina', 'Una roca', 'Un pez'], hint: 'Tiene hojas y forma praderas submarinas.' },
      { text: '¿Qué crea la posidonia bajo el agua?', answer: 'Praderas', options: ['Praderas', 'Nubes', 'Montañas'], hint: 'Son como campos verdes en el fondo del mar.' },
      { text: '¿Por qué es importante para los animales pequeños?', answer: 'Les da refugio', options: ['Les da refugio', 'Los empuja', 'Los seca'], hint: 'Muchos animales se esconden entre sus hojas.' },
    ]],
    ['raya', 'Raya Mosaico', '◇', 'Pieza del Mapa — Raya Mosaico', [
      { text: 'Busca una raya. ¿Su cuerpo parece plano o redondo como una pelota?', answer: 'Plano', options: ['Plano', 'Redondo', 'Cuadrado'], hint: 'Las rayas parecen deslizarse pegadas al fondo.' },
      { text: '¿Dónde suele camuflarse una raya?', answer: 'En el fondo', options: ['En el fondo', 'En el techo', 'En una rama'], hint: 'Mira cerca de la arena o las rocas.' },
      { text: 'Si ves dibujos en su piel, ¿qué palabra encaja mejor?', answer: 'Mosaico', options: ['Mosaico', 'Rayas de tigre', 'Lunares gigantes'], hint: 'La tabla menciona la raya mosaico.' },
    ]],
  ],
  '02': [
    ['aviario', 'Ibis Escarlata', '🪶', 'Pieza del Mapa — Aviario', [
      { text: 'En el aviario, busca un ave muy llamativa. ¿Qué color puede destacar?', answer: 'Rojo', options: ['Rojo', 'Azul eléctrico', 'Negro entero'], hint: 'El ibis escarlata destaca por su color rojo.' },
      { text: '¿Qué usan las aves para cubrir su cuerpo?', answer: 'Plumas', options: ['Plumas', 'Escamas', 'Conchas'], hint: 'Mira sus alas y cuello.' },
      { text: '¿Qué forma tienen muchas aves de humedal para buscar comida?', answer: '*', options: ['Pico largo', 'Patas largas', 'Cuello largo'], hint: 'Cualquiera de esas señales ayuda en humedales.' },
    ]],
    ['galapago', 'Galápago del Humedal', '🐢', 'Pieza del Mapa — Galápago', [
      { text: 'Busca un galápago. ¿Vive más cerca del agua o de la nieve?', answer: 'Del agua', options: ['Del agua', 'De la nieve', 'Del fuego'], hint: 'Los galápagos son tortugas de agua dulce.' },
      { text: '¿Qué lleva para protegerse?', answer: 'Caparazón', options: ['Caparazón', 'Plumas', 'Melena'], hint: 'Es una armadura dura.' },
      { text: 'Los humedales mezclan...', answer: 'Agua y tierra', options: ['Agua y tierra', 'Hielo y lava', 'Arena y nieve'], hint: 'Es un lugar fronterizo entre dos mundos.' },
    ]],
  ],
  '03': [
    ['conservacion', 'Jara de Cartagena', '🌱', 'Pieza del Mapa — Conservación', [
      { text: 'Esta zona habla de proteger especies. ¿Qué palabra encaja mejor?', answer: 'Conservación', options: ['Conservación', 'Carrera', 'Ruido'], hint: 'Busca señales de cuidado y recuperación.' },
      { text: '¿Qué necesita una tortuga mediterránea para vivir segura?', answer: '*', options: ['Refugio', 'Alimento', 'Espacio tranquilo'], hint: 'Todas son necesidades reales.' },
      { text: 'Si una especie tiene pocos ejemplares, debemos...', answer: 'Protegerla', options: ['Protegerla', 'Molestarla', 'Ignorarla'], hint: 'La misión es cuidar la vida.' },
    ]],
  ],
  '04': [
    ['kelp', 'Bosque de Kelp', '🌊', 'Pieza del Mapa — Kelp', [
      { text: 'En mares templados, ¿qué tipo de agua esperas?', answer: 'Más fría', options: ['Más fría', 'Hirviendo', 'Sin agua'], hint: 'Templado no es tropical.' },
      { text: 'Busca una señal del bosque de kelp. ¿A qué se parece el kelp?', answer: 'A plantas largas', options: ['A plantas largas', 'A piedras redondas', 'A nubes'], hint: 'Forma bosques submarinos.' },
      { text: '¿Qué animales pueden esconderse en un bosque submarino?', answer: '*', options: ['Peces', 'Tiburones pequeños', 'Crustáceos'], hint: 'Los bosques dan refugio a muchas especies.' },
    ]],
  ],
  '05': [
    ['sala-oval', 'Medusa Invertida', '🪼', 'Pieza del Mapa — Sala Oval', [
      { text: 'En la Sala Oval, busca una medusa invertida. ¿Dónde puede estar orientada?', answer: 'Hacia arriba', options: ['Hacia arriba', 'Corriendo', 'Volando'], hint: 'Invertida significa colocada al revés de lo esperado.' },
      { text: '¿Qué estructura viva aparece junto a esta sala?', answer: 'Arrecife', options: ['Arrecife', 'Bosque seco', 'Montaña'], hint: 'La tabla habla de arrecife vivo.' },
      { text: 'Un arrecife ofrece a los peces...', answer: 'Refugio', options: ['Refugio', 'Zapatos', 'Sombreros'], hint: 'Los peces se esconden y viven entre sus formas.' },
    ]],
    ['pez-globo', 'Pez Globo', '🐡', 'Pieza del Mapa — Pez Globo', [
      { text: 'Busca el pez globo. ¿Qué puede hacer para defenderse?', answer: 'Inflarse', options: ['Inflarse', 'Cantar', 'Caminar'], hint: 'Su nombre da la pista.' },
      { text: '¿Qué pez azul famoso aparece en tropicales?', answer: 'Pez cirujano azul', options: ['Pez cirujano azul', 'Pez luna', 'Caballito'], hint: 'La tabla lo menciona junto a los peces tropicales.' },
      { text: 'El pez payaso suele vivir cerca de...', answer: 'Anémonas', options: ['Anémonas', 'Pingüinos', 'Cocodrilos'], hint: 'Es su refugio clásico en el arrecife.' },
    ]],
  ],
  '08': [
    ['experiencias', 'Auditorio Mar Rojo', '🎬', 'Pieza del Mapa — Experiencias', [
      { text: 'El Mar Rojo puede ser paso hacia una experiencia. ¿Cuál aparece en la tabla?', answer: 'Cine 4D', options: ['Cine 4D', 'Teleférico', 'Tren polar'], hint: 'Dura unos 13 minutos.' },
      { text: 'Otra experiencia usa realidad...', answer: 'Mixta', options: ['Mixta', 'Dormida', 'Invisible'], hint: 'La tabla la llama inmersión o realidad mixta.' },
      { text: 'Si una experiencia requiere entrada aparte, conviene...', answer: 'Planificarla', options: ['Planificarla', 'Ignorar horarios', 'Llegar tarde'], hint: 'Algunas no permiten acceso tardío.' },
    ]],
  ],
  '09': [
    ['agora', 'Ágora del Mar', '🔊', 'Pieza del Mapa — Ágora', [
      { text: 'El delfinario también es un espacio...', answer: 'Educativo', options: ['Educativo', 'Subterráneo secreto', 'De nieve'], hint: 'La tabla habla de espacio educativo y científico.' },
      { text: '¿Qué tipo de comportamientos se observan?', answer: 'Naturales', options: ['Naturales', 'Robóticos', 'De juguete'], hint: 'La idea es aprender observando.' },
      { text: 'Para un pase con asiento conviene llegar...', answer: 'Con tiempo', options: ['Con tiempo', 'Después del final', 'Sin mirar horarios'], hint: 'La duración incluye asiento y pase.' },
    ]],
  ],
  '11': [
    ['pinguino-rey', 'Pingüino Rey', '🐧', 'Pieza del Mapa — Pingüino Rey', [
      { text: 'Además del pingüino Juanito, la tabla menciona al...', answer: 'Pingüino Rey', options: ['Pingüino Rey', 'Pez payaso', 'Ibis'], hint: 'Su nombre suena a corona.' },
      { text: 'Los pingüinos viven en la zona...', answer: 'Antártica', options: ['Antártica', 'Tropical', 'Desértica'], hint: 'Es la zona fría del recorrido.' },
      { text: 'Aunque son aves, bajo el agua parecen...', answer: 'Volar', options: ['Volar', 'Dormir', 'Excavar'], hint: 'Usan las alas como aletas.' },
    ]],
  ],
  '12': [
    ['aves-articas', 'Frailecillo Coletudo', '🪽', 'Pieza del Mapa — Aves Árticas', [
      { text: 'En el Ártico no solo hay belugas. ¿Qué otro tipo de animal menciona la tabla?', answer: 'Aves', options: ['Aves', 'Leones', 'Jirafas'], hint: 'Arao, eider y frailecillo son aves.' },
      { text: 'El iglú ártico tiene...', answer: 'Dos niveles', options: ['Dos niveles', 'Diez plantas', 'Una pista de lava'], hint: 'La tabla menciona un iglú de dos niveles.' },
      { text: 'Las belugas son famosas por sus...', answer: 'Sonidos', options: ['Sonidos', 'Plumas', 'Caparazones'], hint: 'Las llaman canarios del mar.' },
    ]],
  ],
  '14': [
    ['pez-sierra', 'Pez Sierra', '🪚', 'Pieza del Mapa — Pez Sierra', [
      { text: 'En Océanos, busca un animal con una forma parecida a una sierra. ¿Cuál es?', answer: 'Pez sierra', options: ['Pez sierra', 'Pez payaso', 'Medusa luna'], hint: 'Su nombre describe su hocico.' },
      { text: 'El túnel de Océanos mide aproximadamente...', answer: '35 m', options: ['35 m', '3 m', '350 km'], hint: 'La tabla indica 35 metros.' },
      { text: 'La tabla menciona una adición reciente: peces...', answer: 'Luna', options: ['Luna', 'Rey', 'Globo'], hint: 'Su nombre recuerda al satélite de la Tierra.' },
    ]],
  ],
};

const insertedStations = {
  '02': [
    {
      id: '02B',
      routeOrder: 2.5,
      minMode: 'normal',
      shortName: 'Lago Vivo',
      title: 'El lago que respira',
      area: 'Lago Vivo + Flamencos europeos',
      routeHint: 'Al pasar por el lago exterior, observa aves, anfibios o señales de vida en el agua.',
      adultHint: 'Estación breve y flexible; si no distinguís especies, basta con observar el lago.',
      childAction: 'Busca un ave acuática o una pista de flamencos europeos.',
      story: '{username}, este lago parece tranquilo, pero está lleno de señales. Aves que se posan, anfibios escondidos y flamencos que colorean el recorrido nos recuerdan que el agua dulce también forma parte del gran mapa del océano.',
      reward: { name: 'Cristal del Lago Vivo', sound: crystalSound, color: '#4f9f7a' },
      duration: '15-20 min',
      color: '#4f9f7a',
      optional: false,
      sources: ['https://www.oceanografic.org/planifica-tu-visita/plano-del-acuario/'],
      challenge: {
        type: 'observe',
        prompt: 'Observa el lago y confirma cuando hayas encontrado una pista de vida.',
        success: 'Lago Vivo registrado.',
        hint: 'Sirven aves, ranas, plantas o flamencos visibles desde el recorrido.',
      },
      backupChallenge: {
        type: 'confirm',
        prompt: 'Si no podéis parar, confirma al pasar junto al lago.',
        success: 'Paso por Lago Vivo guardado.',
      },
      riddles: [],
    },
  ],
  '05': [
    {
      id: '05B',
      routeOrder: 5.5,
      minMode: 'normal',
      shortName: 'Misterios',
      title: 'Los acuarios joya',
      area: 'Misterios del Mar',
      routeHint: 'Busca los acuarios pequeños tipo joya y observa criaturas raras de cerca.',
      adultHint: 'Funciona bien como parada corta porque los acuarios concentran detalles visibles.',
      childAction: 'Elige el animal más extraño que veas.',
      story: '{username}, hemos llegado a los Misterios del Mar. Aquí el océano guarda criaturas pequeñas y sorprendentes: caballitos, anguilas jardineras, camarones mantis y peces que parecen hojas o cofres vivientes.',
      reward: { name: 'Cristal de los Misterios', sound: crystalSound, color: '#7a5ccf' },
      duration: '10-15 min',
      color: '#7a5ccf',
      optional: false,
      sources: ['https://www.oceanografic.org/habitat/misterios-del-mar/'],
      challenge: {
        type: 'familyVote',
        prompt: 'Elegid la criatura más misteriosa que habéis visto.',
        options: ['Caballito de mar', 'Camarón mantis', 'Pez extraño'],
        answer: '*',
        success: 'Misterio observado.',
        hint: 'No hace falta acertar una especie exacta; elegid la que más os sorprenda.',
      },
      backupChallenge: {
        type: 'confirm',
        prompt: 'Si la zona está llena, confirma tras mirar un acuario joya.',
        success: 'Misterios del Mar registrados.',
      },
      riddles: [],
    },
  ],
};

const insertedRiddleSpecs = {
  '02B': [
    ['lago-aves', 'Cormorán del Lago', '🪶', 'Pieza del Mapa — Lago Vivo', [
      { text: 'En el Lago Vivo, ¿qué animal puedes buscar primero?', answer: '*', options: ['Un ave', 'Una rana', 'Un flamenco'], hint: 'La tabla menciona cormorán, focha, rana y flamencos.' },
      { text: 'La rana común vive entre...', answer: 'Agua y tierra', options: ['Agua y tierra', 'Hielo y fuego', 'Nubes y rocas'], hint: 'Es un anfibio.' },
      { text: 'Los flamencos europeos destacan por sus patas...', answer: 'Largas', options: ['Largas', 'Invisibles', 'Con ruedas'], hint: 'Mira su silueta.' },
    ]],
    ['lago-flamencos', 'Flamenco Europeo', '🦩', 'Pieza del Mapa — Flamenco Europeo', [
      { text: '¿Qué color buscas para localizar flamencos?', answer: 'Rosa', options: ['Rosa', 'Verde oscuro', 'Azul'], hint: 'Aunque el tono varía, el rosa es su pista clásica.' },
      { text: '¿Qué forma tiene su cuello?', answer: 'Largo y curvado', options: ['Largo y curvado', 'Corto y cuadrado', 'Plano'], hint: 'Su cuello dibuja una curva elegante.' },
      { text: 'En el lago, las aves suelen caminar por...', answer: 'La orilla', options: ['La orilla', 'El techo', 'Un túnel'], hint: 'Mira donde se juntan agua y tierra.' },
    ]],
  ],
  '05B': [
    ['caballito', 'Caballito de Mar', '♞', 'Pieza del Mapa — Caballito de Mar', [
      { text: 'Busca un caballito de mar. ¿Su forma recuerda a qué animal terrestre?', answer: 'Caballo', options: ['Caballo', 'Elefante', 'Gato'], hint: 'Su nombre lo dice.' },
      { text: '¿Qué parte usa para agarrarse?', answer: 'La cola', options: ['La cola', 'Las alas', 'Las patas'], hint: 'Su cola puede sujetarse a plantas o corales.' },
      { text: '¿Se mueve rápido o con calma?', answer: 'Con calma', options: ['Con calma', 'Rapidísimo', 'Volando'], hint: 'Observa su movimiento lento.' },
    ]],
    ['mantis', 'Camarón Mantis', '🦐', 'Pieza del Mapa — Camarón Mantis', [
      { text: 'El camarón mantis es famoso por sus golpes. ¿Qué parte usa?', answer: 'Sus patas delanteras', options: ['Sus patas delanteras', 'Su pico', 'Sus plumas'], hint: 'Son como pequeños brazos de combate.' },
      { text: '¿Qué tipo de animal es?', answer: 'Crustáceo', options: ['Crustáceo', 'Ave', 'Mamífero'], hint: 'Como cangrejos y camarones.' },
      { text: 'En Misterios del Mar, los acuarios son pequeños como...', answer: 'Joyas', options: ['Joyas', 'Montañas', 'Piscinas gigantes'], hint: 'La tabla los llama acuarios joya.' },
    ]],
    ['pez-hoja', 'Pez Hoja', '🍃', 'Pieza del Mapa — Pez Hoja', [
      { text: 'El pez hoja se camufla pareciéndose a...', answer: 'Una hoja', options: ['Una hoja', 'Una rueda', 'Una estrella'], hint: 'Su nombre es literal.' },
      { text: '¿Para qué sirve camuflarse?', answer: 'Para esconderse', options: ['Para esconderse', 'Para hacer ruido', 'Para secarse'], hint: 'Es una defensa y una estrategia de caza.' },
      { text: 'Si un animal parece objeto, debes mirar...', answer: 'Despacio', options: ['Despacio', 'Sin mirar', 'Corriendo'], hint: 'Los misterios requieren observación lenta.' },
    ]],
  ],
};

const supplementalRiddleSpecs = {
  '00': [
    ['acceso-medusas', 'Medusa de Cristal', '🪼', 'Pieza del Mapa — Acceso Medusas', [
      { text: 'En la entrada, busca animales que parecen flotar sin huesos. ¿Qué son?', answer: 'Medusas', options: ['Medusas', 'Focas', 'Pingüinos'], hint: 'Tienen forma de campana y tentáculos.' },
      { text: '¿Cómo se mueven las medusas?', answer: 'Flotando', options: ['Flotando', 'Corriendo', 'Saltando por rocas'], hint: 'Parecen bailar dentro del agua.' },
      { text: 'Si ves la playa interior, ¿qué mundo anuncia?', answer: 'El océano', options: ['El océano', 'La montaña', 'El espacio'], hint: 'Arena, agua y vida marina son la puerta de la misión.' },
    ]],
    ['acceso-tortuga', 'Tortuga Marina de Entrada', '🐢', 'Pieza del Mapa — Acceso Tortugas', [
      { text: 'Busca una tortuga marina. ¿Qué usa para nadar?', answer: 'Aletas', options: ['Aletas', 'Alas', 'Patas con ruedas'], hint: 'Sus patas parecen remos.' },
      { text: '¿Qué protege la espalda de una tortuga?', answer: 'Caparazón', options: ['Caparazón', 'Plumas', 'Bigotes'], hint: 'Es una armadura natural.' },
      { text: 'Cuando una tortuga sube a respirar, necesita...', answer: 'Aire', options: ['Aire', 'Arena mágica', 'Fuego'], hint: 'Las tortugas marinas respiran aire.' },
    ]],
  ],
  '02B': [
    ['lago-rana', 'Rana Común', '🐸', 'Pieza del Mapa — Rana del Lago', [
      { text: 'La rana común vive entre dos mundos. ¿Cuáles?', answer: 'Agua y tierra', options: ['Agua y tierra', 'Hielo y desierto', 'Aire y fuego'], hint: 'Es un anfibio.' },
      { text: '¿Qué puede hacer una rana para moverse rápido?', answer: 'Saltar', options: ['Saltar', 'Volar como avión', 'Rodar'], hint: 'Mira sus patas traseras.' },
      { text: 'En un lago vivo, una rana indica que hay...', answer: 'Vida', options: ['Vida', 'Nieve', 'Ruido de motor'], hint: 'Los anfibios son señales de ecosistema.' },
    ]],
  ],
  '03': [
    ['tortuga-mediterranea', 'Tortuga Mediterránea', '🐢', 'Pieza del Mapa — Tortuga Mediterránea', [
      { text: 'La tortuga mediterránea vive en tierra. ¿Qué la protege?', answer: 'Caparazón', options: ['Caparazón', 'Aletas gigantes', 'Plumas'], hint: 'Mira su espalda dura.' },
      { text: '¿Conviene tocarla o observarla con respeto?', answer: 'Observarla con respeto', options: ['Observarla con respeto', 'Tocarla', 'Asustarla'], hint: 'Los exploradores cuidan a los animales.' },
      { text: 'Si una especie está amenazada, la misión es...', answer: 'Protegerla', options: ['Protegerla', 'Molestarla', 'Olvidarla'], hint: 'Aquí la palabra clave es conservación.' },
    ]],
  ],
  '04': [
    ['morena-templada', 'Morena de la Roca', '〰️', 'Pieza del Mapa — Morena', [
      { text: 'Busca un animal alargado que se esconde entre rocas. ¿Qué forma tiene?', answer: 'Alargada', options: ['Alargada', 'Redonda', 'Cuadrada'], hint: 'Parece una serpiente marina.' },
      { text: '¿Dónde se refugian muchos animales de mares templados?', answer: 'Entre rocas', options: ['Entre rocas', 'En árboles secos', 'En el cielo'], hint: 'Mira grietas y huecos.' },
      { text: 'Para encontrar animales escondidos hay que mirar...', answer: 'Despacio', options: ['Despacio', 'Sin mirar', 'Corriendo'], hint: 'El camuflaje exige paciencia.' },
    ]],
  ],
  '06': [
    ['islas-aldabra', 'Tortuga de Aldabra', '🐢', 'Pieza del Mapa — Aldabra', [
      { text: 'En las islas también hay tortugas gigantes. ¿Cómo se mueven?', answer: 'Despacio', options: ['Despacio', 'Rapidísimo', 'Volando'], hint: 'Son fuertes y tranquilas.' },
      { text: '¿Qué isla aparece en su nombre?', answer: 'Aldabra', options: ['Aldabra', 'Islandia', 'Marte'], hint: 'La tabla menciona tortugas de Aldabra.' },
      { text: 'Una tortuga gigante enseña al explorador...', answer: 'Paciencia', options: ['Paciencia', 'Prisa', 'Ruido'], hint: 'Su poder es la calma.' },
    ]],
    ['ganso-hawai', 'Ganso de Hawái', '🪶', 'Pieza del Mapa — Ganso de Hawái', [
      { text: 'El ganso de Hawái es un...', answer: 'Ave', options: ['Ave', 'Pez', 'Reptil'], hint: 'Tiene plumas y pico.' },
      { text: '¿Qué unidad temática ayuda a entender las islas?', answer: 'Maquetas', options: ['Maquetas', 'Cohetes', 'Submarinos de juguete'], hint: 'La tabla habla de maquetas realistas.' },
      { text: 'Las islas son mundos rodeados de...', answer: 'Agua', options: ['Agua', 'Fuego', 'Cristal'], hint: 'Piensa en tierra en medio del océano.' },
    ]],
  ],
  '07': [
    ['aldabra-capazon', 'Caparazón Centenario', '🛡️', 'Pieza del Mapa — Caparazón Gigante', [
      { text: 'El caparazón de una tortuga gigante parece...', answer: 'Una armadura', options: ['Una armadura', 'Una nube', 'Un ala'], hint: 'Es duro y la protege.' },
      { text: '¿Una tortuga gigante vive pocos días o muchísimos años?', answer: 'Muchísimos años', options: ['Muchísimos años', 'Pocos días', 'Una hora'], hint: 'Algunas superan un siglo.' },
      { text: 'Para observarla bien conviene estar...', answer: 'Tranquilo', options: ['Tranquilo', 'Gritando', 'Saltando encima'], hint: 'La calma es parte de la misión.' },
    ]],
    ['aldabra-islas', 'Guardiana de las Seychelles', '🏝️', 'Pieza del Mapa — Islas Seychelles', [
      { text: 'Las tortugas de Aldabra vienen de un mundo de...', answer: 'Islas', options: ['Islas', 'Volcanes de hielo', 'Ciudades'], hint: 'Aldabra está en las Seychelles.' },
      { text: '¿Qué necesitan las islas para que vivan animales únicos?', answer: 'Cuidado', options: ['Cuidado', 'Basura', 'Ruido'], hint: 'Los ecosistemas insulares son delicados.' },
      { text: 'Si un animal vive muchos años, guarda muchas...', answer: 'Historias', options: ['Historias', 'Ruedas', 'Linternas'], hint: 'Bravestone lo ve como memoria viva.' },
    ]],
  ],
  '08': [
    ['backstage-arca', 'Puerta de Backstage', '🔑', 'Pieza del Mapa — Experiencias de Conservación', [
      { text: 'El Backstage Tour dura mucho más que una parada normal. ¿Cuánto indica la tabla?', answer: '75 min', options: ['75 min', '5 min', 'Una semana'], hint: 'Es una visita larga entre bastidores.' },
      { text: 'ARCA del Mar habla de rescate y cuidado. ¿Qué palabra encaja?', answer: 'Conservación', options: ['Conservación', 'Carrera', 'Fiesta'], hint: 'ARCA está ligada al cuidado de animales.' },
      { text: 'Para estas experiencias se pide calzado...', answer: 'Cerrado', options: ['Cerrado', 'De playa', 'Invisible'], hint: 'La tabla lo marca como restricción.' },
    ]],
    ['manos-lago-guiado', 'Guía del Lago Vivo', '🧭', 'Pieza del Mapa — Experiencias Guiadas', [
      { text: 'El mar en tus manos incluye un acuario de...', answer: 'Contacto', options: ['Contacto', 'Hielo', 'Arena seca'], hint: 'Es una experiencia para descubrir tocando con cuidado.' },
      { text: '¿Qué experiencia guiada está adaptada a movilidad reducida y carritos?', answer: 'Lago Vivo guiado', options: ['Lago Vivo guiado', 'Backstage Tour', 'Realidad Mixta'], hint: 'La tabla lo indica como accesible.' },
      { text: 'Si una experiencia tiene edad mínima, los exploradores deben...', answer: 'Comprobarla antes', options: ['Comprobarla antes', 'Llegar tarde', 'Entrar sin mirar'], hint: 'Algunas empiezan en 4, 6 u 8 años.' },
    ]],
  ],
  '09': [
    ['delfin-mular', 'Delfín Mular Científico', '🐬', 'Pieza del Mapa — Delfín Mular', [
      { text: 'El delfín mular es un...', answer: 'Mamífero', options: ['Mamífero', 'Pez', 'Ave'], hint: 'Respira aire como nosotros.' },
      { text: 'En el Ágora del Mar se observan comportamientos...', answer: 'Naturales', options: ['Naturales', 'Robóticos', 'Inventados'], hint: 'La tabla destaca la observación natural.' },
      { text: 'Un espacio educativo sirve para...', answer: 'Aprender', options: ['Aprender', 'Correr sin mirar', 'Dormir de pie'], hint: 'Bravestone quiere ciencia y respeto.' },
    ]],
  ],
  '10': [
    ['flamenco-patas', 'Pata Larga Rosa', '🦩', 'Pieza del Mapa — Patas de Flamenco', [
      { text: '¿Qué parte del flamenco es muy larga?', answer: 'Las patas', options: ['Las patas', 'Las orejas', 'La cola de pez'], hint: 'Mira cómo camina en el agua.' },
      { text: '¿Qué forma tiene su cuello?', answer: 'Curvada', options: ['Curvada', 'Cuadrada', 'En zigzag de metal'], hint: 'Dibuja una S suave.' },
      { text: 'Los flamencos suelen vivir cerca de...', answer: 'Humedales', options: ['Humedales', 'Cuevas secas', 'Montañas nevadas'], hint: 'Buscan agua poco profunda.' },
    ]],
    ['flamenco-color', 'Pluma Rosa', '🪶', 'Pieza del Mapa — Color Flamenco', [
      { text: 'El color rosa del flamenco viene de lo que...', answer: 'Come', options: ['Come', 'Sueña', 'Escucha'], hint: 'Alimentos con pigmentos tiñen sus plumas.' },
      { text: '¿Qué alimentos ayudan a ese color?', answer: 'Gambitas y algas', options: ['Gambitas y algas', 'Chocolate', 'Pan seco'], hint: 'La historia lo cuenta.' },
      { text: 'Si ves plumas rosas, has encontrado una pista de...', answer: 'Flamenco', options: ['Flamenco', 'Beluga', 'Tiburón'], hint: 'Es el guardián rosado.' },
    ]],
  ],
  '11': [
    ['pinguino-hielo', 'Hielo Antártico', '🧊', 'Pieza del Mapa — Hielo Antártico', [
      { text: 'El pingüino Juanito y el Rey viven en una zona...', answer: 'Fría', options: ['Fría', 'Tropical', 'Desértica'], hint: 'Estamos en el Antártico.' },
      { text: '¿Qué les ayuda a moverse bajo el agua?', answer: 'Aletas', options: ['Aletas', 'Manos', 'Alas de avión'], hint: 'Sus alas funcionan como aletas.' },
      { text: 'Cuando nadan rápido parecen...', answer: 'Torpedos', options: ['Torpedos', 'Caracoles', 'Globos'], hint: 'Bravestone los describe como veloces bajo el agua.' },
    ]],
  ],
  '12': [
    ['kylu-cria', 'Kylu, Cría de Beluga', '🐋', 'Pieza del Mapa — Kylu', [
      { text: 'Kylu es una cría de...', answer: 'Beluga', options: ['Beluga', 'Tiburón', 'Pingüino'], hint: 'La tabla menciona a Kylu en el Ártico.' },
      { text: 'Las belugas viven en aguas...', answer: 'Frías', options: ['Frías', 'Hirviendo', 'Sin agua'], hint: 'El hábitat es ártico.' },
      { text: 'El iglú ártico se puede explorar en...', answer: 'Dos niveles', options: ['Dos niveles', 'Una sola roca', 'Diez túneles secretos'], hint: 'La tabla menciona dos niveles.' },
    ]],
  ],
  '13': [
    ['cocodrilo-nido', 'Nido del Cocodrilario', '🥚', 'Pieza del Mapa — Nido Antiguo', [
      { text: 'El cocodrilario incluye zona de reproducción y...', answer: 'Anidamiento', options: ['Anidamiento', 'Patinaje', 'Vuelo'], hint: 'Los huevos necesitan nido.' },
      { text: '¿De dónde nacen los cocodrilos?', answer: 'Huevos', options: ['Huevos', 'Conchas de caracol', 'Flores'], hint: 'Son reptiles.' },
      { text: 'Para proteger un nido hay que mantener...', answer: 'Distancia', options: ['Distancia', 'Ruido', 'Prisa'], hint: 'Observar sin molestar.' },
    ]],
    ['cocodrilo-hocico', 'Hocico Fino Africano', '🐊', 'Pieza del Mapa — Hocico Fino', [
      { text: 'Este cocodrilo se llama hociquifino por su...', answer: 'Hocico', options: ['Hocico', 'Ala', 'Pluma'], hint: 'El nombre da la pista.' },
      { text: '¿Su piel parece blanda o cubierta de placas?', answer: 'Cubierta de placas', options: ['Cubierta de placas', 'Blanda como nube', 'Con plumas'], hint: 'Son escamas duras.' },
      { text: 'Un cocodrilo espera con mucha...', answer: 'Paciencia', options: ['Paciencia', 'Música', 'Prisa'], hint: 'Es el maestro de la espera.' },
    ]],
  ],
  '14': [
    ['tortuga-verde', 'Tortuga Verde de Océanos', '🐢', 'Pieza del Mapa — Tortuga Verde', [
      { text: 'En Océanos también puede aparecer una tortuga...', answer: 'Verde', options: ['Verde', 'Rey', 'De fuego'], hint: 'La tabla menciona tortuga verde.' },
      { text: 'Comparte el gran tanque con tiburones y...', answer: 'Rayas', options: ['Rayas', 'Flamencos', 'Ranas'], hint: 'Pez sierra y pez guitarra son parientes de rayas.' },
      { text: 'El tanque enorme de Océanos tiene miles de metros cúbicos. ¿Es grande o pequeño?', answer: 'Grande', options: ['Grande', 'Pequeño', 'Seco'], hint: 'La tabla indica 6.000 m³.' },
    ]],
  ],
};

function applyMultipleRiddles(station) {
  const baseRiddles = station.riddles || (station.riddle ? [station.riddle] : []);
  const specs = [
    ...(extraRiddleSpecs[station.id] || []),
    ...(insertedRiddleSpecs[station.id] || []),
    ...(supplementalRiddleSpecs[station.id] || []),
  ];
  const extraRiddles = specs.map(([suffix, guardian, icon, objectName, facts]) =>
    makeBonusRiddle(station, suffix, guardian, icon, objectName, facts)
  );
  const riddles = [...baseRiddles, ...extraRiddles].map((riddle) => ({ ...riddle, type: 'chain' }));
  if (!riddles.length) return station;
  return { ...station, riddle: riddles[0], riddles };
}

function withInsertedStations(stations) {
  return stations.flatMap((station) => [
    applyMultipleRiddles(station),
    ...(insertedStations[station.id] || []).map(applyMultipleRiddles),
  ]);
}

function collectRequiredObjects(stations) {
  return stations.flatMap((station) => (station.riddles || (station.riddle ? [station.riddle] : []))
    .map((riddle) => riddle.keyObject?.id)
    .filter(Boolean));
}

export const oceanograficStations = withInsertedStations(oceanograficBaseStations).map((station) => {
  if (!station.isTreasure) return station;
  const requiredObjects = collectRequiredObjects(withInsertedStations(oceanograficBaseStations).filter((s) => !s.isTreasure));
  return {
    ...station,
    treasure: {
      ...station.treasure,
      requiredObjects,
    },
  };
});
