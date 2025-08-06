import React, { useState } from 'react';
import { Heart, MapPin, Clock, Users, Car, Baby, Mountain, Star, Filter, ChevronDown } from 'lucide-react';

const VacanzaGita = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');
  const [strollerOnly, setStrollerOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [likedTrips, setLikedTrips] = useState(new Set());
  const [expandedTrip, setExpandedTrip] = useState(null);
  const [activeSection, setActiveSection] = useState('tutte'); // 'tutte' o 'proposte2025'

  const trips = [
    {
      id: 1,
      title: "Alpe di Villandro",
      location: "Villandro (Parcheggio Gasser Hütte)",
      mapsDestination: "Parcheggio Gasser Hütte, Villandro, Alto Adige",
      description: "Altopiano panoramico con sentieri facili e tanti rifugi tra cui scegliere (Stöffl Hütte, Mair-in-Plun, Fasser Hütte). Perfetto per gruppi con esigenze diverse, vista meravigliosa sulle Dolomiti.",
      duration: "2h",
      difficulty: 300,
      driveTime: "30 min",
      ageFrom: 4,
      strollerFriendly: "Parzialmente",
      category: "natura",
      image: "🏔️"
    },
    {
      id: 10,
      title: "Alpe di Siusi",
      location: "Castelrotto (Cabinovia da Siusi o Compatsch)",
      mapsDestination: "Cabinovia Alpe di Siusi, Siusi allo Sciliar, Alto Adige",
      description: "L'altopiano più grande d'Europa: sentieri larghi, prati infiniti, rifugi e giochi in quota. Una meta perfetta per tutti, anche con passeggino.",
      duration: "2–3h",
      difficulty: 0,
      driveTime: "50 min",
      ageFrom: 0,
      strollerFriendly: "Sì",
      category: "natura",
      image: "🌄"
    },
    {
      id: 11,
      title: "Plose – cabinovia e sentieri",
      location: "Sant'Andrea (Bressanone)",
      mapsDestination: "Cabinovia Plose, Sant'Andrea, Bressanone, Alto Adige",
      description: "Accesso facile a sentieri panoramici e parchi giochi d'alta quota (WoodyWalk, scivoloni, zipline baby). Un classico per le famiglie.",
      duration: "2h",
      difficulty: 0,
      driveTime: "30 min",
      ageFrom: 4,
      strollerFriendly: "Sì",
      category: "famiglia",
      special: "Con bimbi 1–3 anni: zaino trekking o passeggino da trekking",
      image: "🎢"
    },
    {
      id: 12,
      title: "Sentiero della Creazione – Luson",
      location: "Luson (Parcheggio Zumis)",
      mapsDestination: "Parcheggio Zumis, Luson, Alto Adige",
      description: "Percorso tematico tra spiritualità, natura e riflessione, con 8 stazioni simboliche. Immersivo e panoramico, adatto a bimbi grandi.",
      duration: "2–3h",
      difficulty: 350,
      driveTime: "25 min",
      ageFrom: 6,
      strollerFriendly: "No",
      category: "natura",
      special: "Solo con zaino trekking",
      image: "🌿"
    },
    {
      id: 13,
      title: "Laghi Gelati – Scaleres",
      location: "Scaleres",
      mapsDestination: "Scaleres, Alto Adige",
      description: "Trekking autentico e un po' più wild verso piccoli laghi nascosti in quota. Ideale per escursionisti esperti o gruppi misti ben allenati.",
      duration: "2–3h",
      difficulty: 500,
      driveTime: "40–45 min",
      ageFrom: 8,
      strollerFriendly: "No",
      category: "natura",
      special: "Solo con zaino trekking – non adatto a bimbi piccoli",
      image: "🏔️"
    },
    {
      id: 14,
      title: "Monte Cavallo – Vipiteno",
      location: "Vipiteno (Cabinovia Rosskopf)",
      mapsDestination: "Cabinovia Rosskopf, Vipiteno, Alto Adige",
      description: "In quota sopra Vipiteno, tra malghe e sentieri facili, giochi in legno e percorsi didattici. Panorama spettacolare, molto family-friendly.",
      duration: "2–3h",
      difficulty: 0,
      driveTime: "45 min",
      ageFrom: 0,
      strollerFriendly: "Sì",
      category: "famiglia",
      image: "🐎"
    },
    {
      id: 15,
      title: "Aglsbodenalm + Cascate Burkhard",
      location: "Val Ridanna",
      mapsDestination: "Parcheggio Aglsbodenalm, Val Ridanna, Alto Adige",
      description: "Escursione immersiva tra ponticelli, ruscelli e cascate, fino alla storica malga. Per chi ama i paesaggi autentici e l'acqua.",
      duration: "2–3h",
      difficulty: 400,
      driveTime: "1h15",
      ageFrom: 6,
      strollerFriendly: "Solo nel primo tratto",
      category: "natura",
      special: "Zaino trekking necessario",
      image: "💧"
    },
    {
      id: 16,
      title: "Cascate di Riva + FlyLine",
      location: "Campo Tures",
      mapsDestination: "Cascate di Riva, Campo Tures, Alto Adige",
      description: "Itinerario alle cascate del Riva, molto scenografico, con possibilità di discesa su FlyLine. Un'esperienza indimenticabile, tra natura e adrenalina.",
      duration: "2–3h",
      difficulty: 250,
      driveTime: "50 min",
      ageFrom: 4,
      strollerFriendly: "Sì",
      category: "avventura",
      special: "Bimbi <3 anni: consigliato zaino trekking",
      image: "🌊"
    },
    {
      id: 17,
      title: "Ladurns – Malga e Mountaincarts",
      location: "Fleres (Valle Isarco)",
      mapsDestination: "Ladurns, Fleres, Valle Isarco, Alto Adige",
      description: "Trekking semplice verso la malga, poi discesa divertente con mountaincart per i più grandi. Alterna relax e adrenalina, molto amato dai ragazzi.",
      duration: "2–3h",
      difficulty: 200,
      driveTime: "1h15",
      ageFrom: 5,
      strollerFriendly: "Sì",
      category: "avventura",
      special: "Zaino trekking per i più piccoli",
      image: "🛒"
    },
    {
      id: 18,
      title: "Prati di Croda Rossa – Sesto",
      location: "Sesto (Alta Pusteria)",
      mapsDestination: "Prati di Croda Rossa, Sesto, Alto Adige",
      description: "Passeggiata tra giochi, altalene giganti, piccoli animali e vista sulle Tre Cime. Meta super family-friendly, molto curata.",
      duration: "1h30",
      difficulty: 100,
      driveTime: "1h",
      ageFrom: 0,
      strollerFriendly: "Sì",
      category: "famiglia",
      image: "🎠"
    },
    {
      id: 19,
      title: "Mondo Avventura – Racines Giovo",
      location: "Racines",
      mapsDestination: "Mondo Avventura Racines Giovo, Racines, Alto Adige",
      description: "Mini parco avventura in quota con giochi d'acqua, ponticelli, sabbia e zipline baby. Ottimo per i più piccoli e i piccolissimi.",
      duration: "1h",
      difficulty: 0,
      driveTime: "1h",
      ageFrom: 1,
      ageTo: 7,
      strollerFriendly: "Sì",
      category: "famiglia",
      image: "🎪"
    },
    {
      id: 2,
      title: "Gruppo delle Odle – Sentiero Adolf Munkel",
      location: "Val di Funes (Malga Zannes)",
      mapsDestination: "Malga Zannes, Val di Funes, Alto Adige",
      description: "Itinerario spettacolare ai piedi delle Odle, immerso nel bosco, con arrivo al Rifugio delle Odle e 'cinema all'aperto'. Uno dei percorsi più suggestivi delle Dolomiti.",
      duration: "2h30",
      difficulty: 400,
      driveTime: "50 min",
      ageFrom: 6,
      strollerFriendly: "No",
      category: "natura",
      special: "Zaino trekking consigliato",
      image: "🌲"
    },
    {
      id: 3,
      title: "Parco Avventura Funes",
      location: "Ranui (Val di Funes)",
      mapsDestination: "Parco Avventura Funes, Ranui, Val di Funes, Alto Adige",
      description: "Parco avventura immerso nel bosco, con 12 percorsi e oltre 120 stazioni tra ponti sospesi, zipline e reti. Divertimento in sicurezza per bambini e adulti.",
      duration: "2h",
      difficulty: 0,
      driveTime: "45 min",
      ageFrom: 3,
      ageTo: 14,
      strollerFriendly: "Sì",
      category: "avventura",
      image: "🌳"
    },
    {
      id: 4,
      title: "Croce di Lazfons",
      location: "Chiusa (Kaseregg)",
      mapsDestination: "Kaseregg, Chiusa, Alto Adige",
      description: "Salita verso il santuario più alto d'Europa, con panorama su Sassolungo e Catinaccio. Percorso carico di spiritualità e bellezza.",
      duration: "1h30",
      difficulty: 430,
      driveTime: "40 min",
      ageFrom: 8,
      strollerFriendly: "No",
      category: "natura",
      special: "Solo con zaino trekking",
      image: "⛪"
    },
    {
      id: 5,
      title: "Malghe di Altafossa",
      location: "Maranza – Rio di Pusteria",
      mapsDestination: "Altafossa, Maranza, Alto Adige",
      description: "Valle incantata con malghe attrezzate, giochi per bambini e sentiero facile in paesaggio da cartolina. Ideale per giornate rilassanti e pause golose.",
      duration: "2h",
      difficulty: 200,
      driveTime: "35 min",
      ageFrom: 4,
      strollerFriendly: "Parzialmente",
      category: "famiglia",
      image: "🏡"
    },
    {
      id: 6,
      title: "Kronaction + CornAction",
      location: "Issengo (Falzes)",
      mapsDestination: "Kronaction, Issengo, Falzes, Alto Adige",
      description: "Il parco avventura più grande dell'Alto Adige + labirinto nel mais a forma di scoiattolo! Una giornata intera di divertimento e sfida.",
      duration: "2–3h",
      difficulty: 0,
      driveTime: "40 min",
      ageFrom: 3,
      ageTo: 14,
      strollerFriendly: "Sì",
      category: "avventura",
      image: "🐿️"
    },
    {
      id: 7,
      title: "Acquarena – Bressanone",
      location: "Bressanone",
      mapsDestination: "Acquarena Bressanone, Via Julius Durst, Bressanone, Alto Adige",
      description: "Centro acquatico con piscine coperte, scivoli, area bimbi e zona relax. Ottima opzione per una giornata di pioggia o relax.",
      duration: "libera",
      difficulty: 0,
      driveTime: "15 min",
      ageFrom: 0,
      strollerFriendly: "Sì",
      category: "relax",
      image: "🏊"
    },
    {
      id: 8,
      title: "Lago di Anterselva",
      location: "Anterselva di Sopra",
      mapsDestination: "Parcheggio Lago di Anterselva, Anterselva di Sopra, Alto Adige",
      description: "Terzo lago naturale dell'Alto Adige, incastonato tra boschi e vette. Giro completo o relax sulle rive.",
      duration: "1h30",
      difficulty: 100,
      driveTime: "50 min",
      ageFrom: 0,
      strollerFriendly: "Parzialmente",
      category: "natura",
      image: "🏞️"
    },
    {
      id: 9,
      title: "Malga Fane – Sentiero del Latte",
      location: "Valles",
      mapsDestination: "Parcheggio Sentiero del Latte, Valles, Alto Adige",
      description: "Percorso a tema latte tra bosco e pascoli fino al villaggio alpino di Malga Fane. Divertente, educativo e molto pittoresco.",
      duration: "1h30",
      difficulty: 350,
      driveTime: "30–35 min",
      ageFrom: 4,
      strollerFriendly: "Parzialmente",
      category: "famiglia",
      image: "🥛"
    }
  ];

  // Proposte speciali 2025 - AGGIORNATE CON I NUOVI ITINERARI
  const proposte2025 = [
    {
      id: 101,
      title: "Parco del Sole – Malga Nessel – Rifugio Gitschhütte",
      location: "Maranza, Rio di Pusteria",
      mapsDestination: "Cabinovia Nesselbahn, Maranza, 39037 Rio di Pusteria BZ",
      description: "Escursione in cabinovia al Parco del Sole, un playground tematico dedicato al sole e astronomia. Scivolo gigante, ponte tibetano, trampolino elastico e panorama su 500 cime alpine. Opzione vetta per esperti (Monte Cuzzo 2.512m).",
      duration: "3h (base) - 5h30 (con vetta)",
      difficulty: 100,
      driveTime: "17 min",
      ageFrom: 0,
      strollerFriendly: "Sì",
      category: "famiglia",
      special: "Cabinovia + Parco giochi tematico",
      image: "☀️",
      details: {
        dislivello: "+100m (base) / +470m (con vetta)",
        lunghezza: "~2km (base) – ~7,5km (con vetta)",
        partenza: "ore 9:00",
        ristoro: "Nesselhütte, Rifugio Gitschhütte",
        attrazioni: [
          "Scivolo verde gigante",
          "Ponte tibetano e trono del sole",
          "Telefono del sole e meridiana umana",
          "Maxi trampolino elastico al rifugio"
        ]
      }
    },
    {
      id: 102,
      title: "Sentiero del Latte – Malga Fane",
      location: "Val di Valles, Rio di Pusteria",
      mapsDestination: "Parcheggio Sentiero del Latte, 39040 Valles BZ",
      description: "Percorso tematico sull'allevamento e lavorazione del latte fino al villaggio alpino di Malga Fane (35 baite storiche). Pannelli educativi, installazioni ludiche con mucche di legno, campanelli e binocoli lungo il sentiero.",
      duration: "1h30 (andata) - 3h A/R",
      difficulty: 350,
      driveTime: "20 min",
      ageFrom: 4,
      strollerFriendly: "No",
      category: "famiglia",
      special: "Zaino porta-bimbi consigliato - Percorso educativo",
      image: "🥛",
      details: {
        dislivello: "+350m",
        lunghezza: "~3km (solo andata)",
        partenza: "ore 9:00",
        segnaletica: "Sentiero n. 17 – simboli mucca",
        ristoro: "3 rifugi a Malga Fane",
        attrazioni: [
          "Mucche di legno interattive",
          "Pannelli informativi sul latte",
          "Villaggio alpino autentico (35 baite)",
          "Prodotti locali e degustazioni"
        ]
      }
    },
    {
      id: 103,
      title: "Sentiero PanaRaida – Monte Pana",
      location: "Santa Cristina, Val Gardena",
      mapsDestination: "46.5515,11.7178",
      description: "Sentiero tematico ad anello tra prati e boschi con vista Sassolungo. 11 stazioni gioco in legno: cinema naturale, parco acquatico, labirinto, altalena gigante, casette sugli alberi, mini funivia e biotopo Kneipp.",
      duration: "1h (cammino) - 1h30 (con soste)",
      difficulty: 66,
      driveTime: "54 min",
      ageFrom: 0,
      strollerFriendly: "Sì",
      category: "famiglia",
      special: "Ideale per trekking con passeggino - Geocache incluso",
      image: "🌲",
      details: {
        dislivello: "+66m / –66m",
        lunghezza: "2,6–3,5km (ad anello)",
        partenza: "ore 8:30 (arrivo 9:00 consigliato)",
        parcheggio: "€2/ora o €8/giorno (gratuito dopo 14:00)",
        ristoro: "Area picnic + bar al parcheggio",
        attrazioni: [
          "Cinema Natural World Heritage",
          "Parco giochi acquatico con canali",
          "Altalena gigante nel bosco",
          "Casette sugli alberi collegate",
          "Biotopo acquatico con percorso Kneipp",
          "Caccia al tesoro Geocache"
        ]
      }
    },
    {
      id: 104,
      title: "Quinzo – Rifugio Passo di Vizze & Malga Lafitz",
      location: "Val di Vizze",
      mapsDestination: "46.9869321,11.6461059",
      description: "Trekking autentico e transfrontaliero verso il Passo di Vizze e la Malga Lafitz in Austria. Panorama alpino su 500 cime, laghetti glaciali e cucina tirolese autentica. Due varianti: familiare o per esperti.",
      duration: "2h30-3h (base) - 3h30-4h (completo)",
      difficulty: 490,
      driveTime: "1h",
      ageFrom: 4,
      strollerFriendly: "Sì (variante base)",
      category: "natura",
      special: "Esperienza oltreconfine - Passeggino trekking per variante base",
      image: "⛰️",
      details: {
        dislivello: "+490m (base) / +650m (completo)",
        lunghezza: "~7,5km A/R (base) – ~10,5km (completo)",
        partenza: "ore 8:30",
        segnaletica: "Sentieri 3, 4, 7A, 524",
        ristoro: "Rifugio Passo Vizze, Malga Lafitz (Austria)",
        attrazioni: [
          "Laghetti glaciali panoramici",
          "Vista su Gran Pilastro e Zillertal",
          "Cucina tirolese autentica in Austria",
          "Pannelli informativi su confini e storia"
        ]
      }
    },
    {
      id: 105,
      title: "Giro delle Malghe di Telves",
      location: "Telves di Sopra, Racines",
      mapsDestination: "Telves di Sopra, 39040 Racines BZ",
      description: "Anello panoramico tra tre malghe autentiche: Freundalm, Kuhalm e Ochsenalm. Immersione totale nella cultura dell'alpeggio, con vista sulla Val Ridanna e paesaggi da cartolina tra pascoli e boschi.",
      duration: "3h30 (anello completo)",
      difficulty: 625,
      driveTime: "50 min",
      ageFrom: 6,
      strollerFriendly: "No",
      category: "natura",
      special: "Solo con zaino trekking - Escursione per esperti",
      image: "🐄",
      details: {
        dislivello: "+600–650m / –600–650m",
        lunghezza: "~9–10km",
        partenza: "ore 9:00",
        segnaletica: "Sentieri n. 5, 5A, 6 e Alta Via di Ridanna",
        ristoro: "Malga Freundalm (1.720m), Malga Kuhalm (1.900m), Malga Ochsenalm (1.900m)",
        attrazioni: [
          "Tre malghe tradizionali dell'Alto Adige",
          "Panorami sulla Val Ridanna",
          "Biodiversità d'alpeggio e pascoli fioriti",
          "Percorso ad anello ben segnalato"
        ]
      }
    },
    {
      id: 106,
      title: "Giro del Sass de Putia – Passo delle Erbe",
      location: "Passo delle Erbe",
      mapsDestination: "Passo delle Erbe, 39030 San Martino in Badia BZ",
      description: "Uno dei giri più scenografici delle Dolomiti nel Parco Puez-Odle. Anello modulare con 3 livelli di difficoltà: dalla Munt de Fornella family-friendly fino al giro completo con Ütia Vaciara per escursionisti esperti.",
      duration: "1h-4h (modulare)",
      difficulty: 450,
      driveTime: "1h05",
      ageFrom: 0,
      strollerFriendly: "Parzialmente",
      category: "natura",
      special: "Percorso modulare - Da facile a impegnativo",
      image: "🗻",
      details: {
        dislivello: "+100m (base) / +450m (completo)",
        lunghezza: "Variabile 2-10km",
        partenza: "ore 8:30",
        segnaletica: "Sentieri 8A → 8B → 4B → 35 (anello)",
        ristoro: "Ütia de Göma, Ütia Vaciara, Munt de Fornella",
        attrazioni: [
          "Vista panoramica su Val Badia",
          "Tre rifugi tradizionali ladini",
          "Forcella Putia (2.357m) per esperti",
          "Percorso modulabile per ogni età"
        ]
      }
    }
  ];

  const categories = [
    { id: 'all', label: 'Tutte', icon: '🎯' },
    { id: 'natura', label: 'Natura', icon: '🏔️' },
    { id: 'avventura', label: 'Avventura', icon: '🌳' },
    { id: 'famiglia', label: 'Famiglia', icon: '👨‍👩‍👧‍👦' },
    { id: 'relax', label: 'Relax', icon: '😌' }
  ];

  const filteredTrips = (activeSection === 'tutte' ? trips : proposte2025).filter(trip => {
    if (selectedFilter !== 'all' && trip.category !== selectedFilter) return false;
    
    if (selectedDifficulty !== 'all') {
      if (selectedDifficulty === 'facile' && trip.difficulty > 200) return false;
      if (selectedDifficulty === 'medio' && (trip.difficulty <= 200 || trip.difficulty > 400)) return false;
      if (selectedDifficulty === 'difficile' && trip.difficulty <= 400) return false;
    }
    
    if (selectedAge !== 'all') {
      if (selectedAge === 'bimbi' && trip.ageFrom > 3) return false;
      if (selectedAge === 'bambini' && (trip.ageFrom < 4 || trip.ageFrom > 7)) return false;
      if (selectedAge === 'ragazzi' && trip.ageFrom < 8) return false;
    }
    
    if (strollerOnly && trip.strollerFriendly !== 'Sì') return false;
    
    return true;
  });

  const toggleLike = (tripId) => {
    const newLiked = new Set(likedTrips);
    if (newLiked.has(tripId)) {
      newLiked.delete(tripId);
    } else {
      newLiked.add(tripId);
    }
    setLikedTrips(newLiked);
  };

  const handleDirections = (e, trip) => {
    e.preventDefault();
    e.stopPropagation();
    const query = encodeURIComponent(trip.mapsDestination);
    window.open(`https://www.google.com/maps/search/${query}`, '_blank');
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty === 0) return 'text-green-500';
    if (difficulty <= 200) return 'text-green-500';
    if (difficulty <= 350) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getDifficultyLabel = (difficulty) => {
    if (difficulty === 0) return 'Facile';
    if (difficulty <= 200) return 'Facile';
    if (difficulty <= 350) return 'Medio';
    return 'Difficile';
  };

  const VacanzaggioLogo = () => (
    <div className="flex items-center gap-3">
      <svg width="40" height="40" viewBox="0 0 100 100" className="flex-shrink-0">
        <path 
          d="M10 70 L25 45 L40 60 L55 35 L70 50 L85 30 L90 70 Z" 
          fill="#e74c3c"
          className="drop-shadow-sm"
        />
        <circle 
          cx="75" 
          cy="25" 
          r="8" 
          fill="#f39c12"
          className="drop-shadow-sm"
        />
        <line 
          x1="10" 
          y1="70" 
          x2="90" 
          y2="70" 
          stroke="#34495e" 
          strokeWidth="2"
        />
      </svg>
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          VACANZEGGIO
        </h1>
        <p className="text-gray-600 text-sm">Le nostre gite da non perdere!</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <VacanzaggioLogo />
            <div className="text-2xl animate-bounce">✨</div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Section Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveSection('tutte')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeSection === 'tutte'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'bg-white text-gray-700 border hover:bg-gray-50'
            }`}
          >
            🎯 Tutte le gite ({trips.length})
          </button>
          <button
            onClick={() => setActiveSection('proposte2025')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeSection === 'proposte2025'
                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                : 'bg-white text-gray-700 border hover:bg-gray-50'
            }`}
          >
            ✨ Proposte 2025 ({proposte2025.length})
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {activeSection === 'tutte' ? 'Trova la gita perfetta 🔍' : 'Le nostre proposte speciali per il 2025 🎉'}
          </h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-all"
          >
            <Filter className="w-4 h-4" />
            Filtri avanzati
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedFilter(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedFilter === category.id
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 border hover:bg-gray-50'
              }`}
            >
              <span>{category.icon}</span>
              <span className="text-sm font-medium">{category.label}</span>
            </button>
          ))}
        </div>

        {showFilters && (
          <div className="bg-white rounded-2xl p-4 shadow-lg border space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">🏔️ Difficoltà</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="all">Tutte</option>
                  <option value="facile">Facile (0-200m)</option>
                  <option value="medio">Medio (200-400m)</option>
                  <option value="difficile">Difficile (400m+)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">👧 Età bambini</label>
                <select
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="all">Tutte le età</option>
                  <option value="bimbi">Bimbi piccoli (0-3 anni)</option>
                  <option value="bambini">Bambini (4-7 anni)</option>
                  <option value="ragazzi">Ragazzi (8+ anni)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">🍼 Accessibilità</label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={strollerOnly}
                    onChange={(e) => setStrollerOnly(e.target.checked)}
                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="text-sm">Solo con passeggino</span>
                </label>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="text-sm text-gray-600">
                {filteredTrips.length} di {activeSection === 'tutte' ? trips.length : proposte2025.length} gite trovate
              </span>
              <button
                onClick={() => {
                  setSelectedFilter('all');
                  setSelectedDifficulty('all');
                  setSelectedAge('all');
                  setStrollerOnly(false);
                }}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Azzera filtri
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="space-y-4">
          {filteredTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{trip.image}</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{trip.title}</h3>
                      <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{trip.location}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleLike(trip.id)}
                    className={`p-2 rounded-full transition-all ${
                      likedTrips.has(trip.id)
                        ? 'bg-red-100 text-red-500'
                        : 'bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-500'
                    }`}
                  >
                    <Heart 
                      className={`w-5 h-5 ${likedTrips.has(trip.id) ? 'fill-current' : ''}`} 
                    />
                  </button>
                </div>

                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{trip.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Car className="w-4 h-4" />
                    <span>{trip.driveTime} da Naz</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{trip.ageFrom}+ anni{trip.ageTo ? ` (max ${trip.ageTo})` : ''}</span>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${getDifficultyColor(trip.difficulty)}`}>
                    <Mountain className="w-4 h-4" />
                    <span>{getDifficultyLabel(trip.difficulty)}</span>
                    {trip.difficulty > 0 && <span>({trip.difficulty}m)</span>}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    trip.strollerFriendly === 'Sì' 
                      ? 'bg-green-100 text-green-700' 
                      : trip.strollerFriendly === 'Parzialmente'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    <Baby className="w-3 h-3 inline mr-1" />
                    Passeggino: {trip.strollerFriendly}
                  </span>
                  {trip.special && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                      ⚠️ {trip.special}
                    </span>
                  )}
                </div>
              </div>

              <div className="px-6 pb-6">
                <button
                  onClick={() => setExpandedTrip(expandedTrip === trip.id ? null : trip.id)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {expandedTrip === trip.id ? 'Nascondi dettagli' : 'Mostra dettagli'}
                  </span>
                  <ChevronDown 
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      expandedTrip === trip.id ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {expandedTrip === trip.id && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      {trip.description}
                    </p>
                    
                    {/* Dettagli extra per Proposte 2025 */}
                    {activeSection === 'proposte2025' && trip.details && (
                      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg mb-3">
                        <h4 className="font-semibold text-gray-800 mb-2">📋 Dettagli tecnici</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                          <div>📏 <strong>Lunghezza:</strong> {trip.details.lunghezza}</div>
                          <div>📈 <strong>Dislivello:</strong> {trip.details.dislivello}</div>
                          <div>⏰ <strong>Partenza:</strong> {trip.details.partenza}</div>
                          {trip.details.parcheggio && (
                            <div>🅿️ <strong>Parcheggio:</strong> {trip.details.parcheggio}</div>
                          )}
                          {trip.details.segnaletica && (
                            <div>🪧 <strong>Segnaletica:</strong> {trip.details.segnaletica}</div>
                          )}
                          {trip.details.ristoro && (
                            <div>🍽️ <strong>Ristoro:</strong> {trip.details.ristoro}</div>
                          )}
                        </div>
                        
                        {trip.details.attrazioni && (
                          <div>
                            <h5 className="font-medium text-gray-700 mb-1">🎯 Attrazioni principali:</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {trip.details.attrazioni.map((attrazione, index) => (
                                <li key={index}>• {attrazione}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <button 
                        onClick={(e) => handleDirections(e, trip)}
                        className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                      >
                        📍 Come arrivare
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
          <div className="text-center">
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              {activeSection === 'tutte' ? 'I tuoi preferiti' : 'Le tue proposte 2025 preferite'}
            </h3>
            <div className="flex justify-center gap-6 text-sm text-gray-600">
              <div>
                <span className="font-bold text-red-600">{likedTrips.size}</span>
                <span className="ml-1">gite salvate</span>
              </div>
              <div>
                <span className="font-bold text-orange-600">{filteredTrips.length}</span>
                <span className="ml-1">gite disponibili</span>
              </div>
            </div>
            {activeSection === 'proposte2025' && (
              <div className="mt-3 text-xs text-gray-500 bg-gradient-to-r from-orange-100 to-red-100 p-3 rounded-lg">
                <p className="mb-1">✨ <strong>Proposte speciali selezionate per il Vacanzeggio 2025</strong></p>
                <p>Tutti i nuovi itinerari sono stati aggiunti con dettagli completi, informazioni tecniche e attrazioni specifiche!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacanzaGita;