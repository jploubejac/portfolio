window.__ACADEMIC_DATA__ = {
  courses: [
    {
      id: "energy",
      title: "Energy for Connected Objects",
      meta: "Gaël Loubet | CM: 5h | TP: 5h30",
      description: "Optimisation énergétique et protocoles radio.",
      tags: ["GNU Radio", "Waveform"],
      details: {
        context: "Le module « Energy for Connected Objects » s’inscrit dans le domaine « Systèmes communicants pour l’IoT » et aborde les problématiques énergétiques des objets connectés autonomes.<br><br>Il couvre :<ul><li>Les principes de stockage de l’énergie (batteries, supercondensateurs, piles à combustible).</li><li>Les techniques de récupération d’énergie ambiante (lumière, mouvement, chaleur, ondes électromagnétiques).</li><li>Les méthodes de transfert d’énergie sans fil (inductif, capacitif, radiatif).</li><li>La conception d’objets connectés autonomes, incluant la modélisation énergétique et l’optimisation matérielle/logicielle.</li></ul>Les travaux pratiques ont permis d’étudier un système de récupération et de transfert d’énergie électromagnétique pour alimenter une LED. On a caractérisé des redresseurs RF, choisi des antennes adaptées, et conçu une rectenna pour maximiser l’efficacité énergétique.",
        technique: "<b>Stockage de l’énergie</b><br>Les objets connectés nécessitent des solutions de stockage adaptées à leurs contraintes (autonomie, taille, environnement). Plusieurs technologies ont été étudiées :<ul><li><b>Batteries</b> :<ul><li><i>Primaires</i> : Non rechargeables, haute densité d’énergie, mais durée de vie limitée.</li><li><i>Secondaires</i> (lithium-ion, nickel-métal hydrure) : Rechargeables, mais sensibles aux cycles de charge/décharge et à la température.</li></ul></li><li><b>Supercondensateurs</b> :<ul><li><i>Avantages</i> : Charge/décharge rapide, longue durée de vie (millions de cycles), haute densité de puissance.</li><li><i>Inconvénients</i> : Faible densité d’énergie, tension non constante (nécessite un régulateur).</li></ul></li><li><b>Diagrammes de Ragone</b> : Ces diagrammes permettent de comparer les technologies selon leur densité d’énergie (Wh/kg) et leur densité de puissance (W/kg). Par exemple, les supercondensateurs sont idéaux pour des applications nécessitant des pics de puissance, tandis que les batteries lithium-ion conviennent mieux pour un stockage prolongé.</li></ul><br><b>Récupération d’énergie ambiante (Energy Harvesting)</b><br>Cette technique consiste à convertir l’énergie disponible dans l’environnement en électricité utilisable. Quatre sources principales ont été étudiées :<ul><li><b>Lumière</b> :<ul><li><i>Cellules photovoltaïques</i> : Conversion de la lumière en courant continu via l’effet photovoltaïque. L’efficacité dépend des matériaux (silicium monocristallin : 26,7 %, GaAs : 29,1 %).</li><li><i>Applications</i> : Capteurs solaires pour objets connectés en extérieur ou intérieur.</li></ul></li><li><b>Mouvement</b> :<ul><li><i>Transducteurs piézoélectriques</i> : Génèrent une tension sous contrainte mécanique.</li><li><i>Transducteurs électromagnétiques</i> : Similaires à des dynamos miniatures, adaptés aux vibrations ou mouvements.</li></ul></li><li><b>Chaleur</b> :<ul><li><i>Transducteurs thermoélectriques</i> : Basés sur l’effet Seebeck, nécessitent un gradient de température.</li></ul></li><li><b>Ondes électromagnétiques</b> :<ul><li><i>Rectennas</i> : Antennes couplées à des redresseurs pour convertir les ondes RF (Wi-Fi, GSM) en courant continu. La puissance récupérable est de l’ordre du µW au mW/cm³, selon l’environnement.</li></ul></li></ul><br><b>Transfert d’énergie sans fil (Wireless Power Transfer)</b><br>Trois méthodes principales ont été abordées :<ul><li><b>Transfert inductif</b> : Utilisé pour des courtes distances (ex. : recharge de smartphones). Basé sur le couplage magnétique entre deux bobines.</li><li><b>Transfert capacitif</b> : Moins courant, adapté à des applications spécifiques.</li><li><b>Transfert radiatif</b> : Basé sur la transmission d’ondes électromagnétiques (RF, micro-ondes) et leur conversion en courant continu via une rectenna.</li></ul><br><b>Conception d’objets connectés autonomes</b><br>Pour concevoir un objet connecté autonome, plusieurs aspects ont été étudiés :<ul><li><b>Optimisation matérielle</b> : Choix de microcontrôleurs basse consommation (STM32L, ESP32). Utilisation de convertisseurs DC-DC pour adapter la tension aux besoins du système.</li><li><b>Optimisation logicielle</b> :<ul><li><i>Duty cycling</i> : Activation des composants uniquement lorsque nécessaire.</li><li><i>Protocoles de communication basse consommation</i> : LoRaWAN, BLE, Zigbee.</li></ul></li><li><b>Stratégies énergétiques</b> :<ul><li><i>« Direct consumption »</i> : Alimentation directe de la charge.</li><li><i>« Store then use »</i> : Stockage de l’énergie dans un supercondensateur avant utilisation.</li></ul></li></ul><br><b>Travaux pratiques</b><br>Les TP ont permis de :<ul><li><b>Caractériser une LED rouge (SML-D12U1WT8)</b> : Puissance requise : 36 mW en nominal (1,8 V, 20 mA), 18 mW à 50 % de luminosité, 9 mW à 25 %. Énergie pour 1 seconde : 36 mJ.</li><li><b>Étudier la stratégie « Store then use »</b> : Utilisation d’un circuit de gestion d’énergie (bq25504) et d’un convertisseur DC-DC (TPS63031). Seuils de tension : 2,2 V (désactivation), 5,25 V (activation). Supercondensateurs testés : 100 µF à 22 mF (avec pertes variables).</li><li><b>Caractériser des redresseurs RF</b> : Balayage en fréquence (800–950 MHz et 2,4–2,5 GHz) pour identifier la fréquence optimale. Mesure de l’efficacité : η = (P_DC_out) / (P_RF_in) = (U² / R) / (P_RF_in)</li><li><b>Choisir une antenne adaptée</b> :<ul><li>868 MHz : Antenne patch (gain +9 dBi) ou dipôle imprimé (gain +2,6 dBi).</li><li>2,45 GHz : Antenne cornet (gain +11 dBi) ou bow-tie modifié (gain +2,5 dBi).</li></ul></li><li><b>Concevoir une rectenna</b> : Association d’une antenne et d’un redresseur pour maximiser l’efficacité de conversion. Test de la distance maximale de transfert d’énergie sans fil en respectant les réglementations.</li></ul>",
        analyse: "Ce module est essentiel pour aborder les défis énergétiques des objets connectés dans le cadre de l’IoT et des systèmes embarqués. Il permet de concevoir des dispositifs autonomes pour des applications variées (surveillance environnementale, santé connectée, villes intelligentes). et d’intégrer des solutions énergétiques durables, combinant récupération d’énergie, transfert sans fil et optimisation de la consommation. Ce module permet aussi de développer une vision systémique en intégrant des contraintes matérielles, logicielles et environnementales pour optimiser la consommation énergétique.<br><br>Pendant les travaux pratiques, j’ai particulièrement apprécié l’approche expérimentale qui nous a permis de caractériser les redresseurs RF. Grâce à des balayages de fréquence et de charge, j’ai pu mieux comprendre les compromis entre efficacité, distance et puissance utile. L’utilisation d’outils comme GNU Radio et l’USRP a rendu les concepts théoriques de propagation électromagnétique bien plus concrets et accessibles.<br><br>Un autre aspect qui m’a marqué est l’étude de cas pratiques, comme celui des parcomètres solaires installés à Nottingham. Cet exemple a clairement montré à quel point il est crucial de prendre en compte les conditions locales, comme l’ensoleillement limité dans cette région, pour éviter des échecs lors du déploiement de systèmes énergétiques. Cela m’a fait réaliser l’importance de l’adaptation au contexte réel dans la conception de solutions techniques.<br><br>Certaines notions, comme la comparaison des dispositifs non linéaires (diodes, transistors CMOS) et des topologies de circuits, relèvent davantage de l’électronique analogique et de la physique des semi-conducteurs. Bien que passionnantes, ces parties étaient moins alignées avec mes centres d’intérêt personnels.",
        competences: [
          { name: "Know how to harvest/transfer, store and manage power for connected objects, and how to increase the power efficiency", grade: "3", comment: "J’ai bien compris les technologies de stockage et les méthodes de récupération d’énergie. Les TP m’ont aidé à appliquer ces concepts." },
          { name: "Be able to optimize the power consumption of connected objects", grade: "3", comment: "J’ai appris à utiliser des stratégies comme le « store then use » et à choisir des supercondensateurs adaptés." },
          { name: "Be able to design and implement an energy autonomous and battery-free connected object", grade: "2", comment: "Les TP m’ont permis d’étudier un système de récupération d’énergie, mais je n’ai pas encore conçu un objet connecté complet (avec capteurs et communication)." }
        ]
      }
    },
    {
      id: "cloud",
      title: "Cloud and edge computing",
      meta: "Sami Yangui | CM: 5h | TP: 15h",
      description: "Architectures cloud, virtualisation et orchestration.",
      tags: ["Python", "OpenStack", "Docker", "VirtualBox", "Kubernetes"],
      details: {
        context: "Introduction au Cloud et Edge Computing, architectures distribuées.",
        technique: "Déploiement avec Docker et Kubernetes, gestion avec OpenStack.",
        analyse: "Capacité à déployer des services scalables.",
        competences: [
          { name: "Virtualisation", grade: "A", comment: "Maîtrise des concepts." },
          { name: "Orchestration", grade: "B", comment: "Bonne pratique sur Kubernetes." }
        ]
      }
    },
    {
      id: "cours3",
      title: "Cours 3",
      meta: "Prof | CM: h | TP: h",
      description: "Résumé du cours.",
      tags: [],
      details: {
        context: "Description du contexte...",
        technique: "Détails techniques...",
        analyse: "Analyse personnelle...",
        competences: [
          { name: "Compétence test", grade: "C", comment: "Commentaire test" }
        ]
      }
    }
  ]
};