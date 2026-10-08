/**
 * Textes du site, en français (document « Contenu du site studiodefacto.ca »,
 * réponses du 6 et du 7 octobre 2026 intégrées).
 *
 * Syntaxe des textes riches (voir src/components/Rich.tsx) :
 *   {tel}                 numéro du studio, cliquable
 *   {email}               info@studiodefacto.ca, cliquable
 *   [texte](page:clé)     lien vers une page (clés : src/lib/route-table.json)
 *   [texte](svc:clé)      lien vers une fiche de service
 *   [texte](https://…)    lien externe (nouvel onglet)
 *
 * Toute modification de texte est une modification de publicité : garder une
 * copie de chaque version publiée pendant 5 ans (Code de déontologie, 3.09.11).
 */
export const fr = {
  lang: "fr",
  locale: "fr_CA",

  common: {
    skip: "Aller au contenu",
    book: "Prendre rendez-vous",
    seeSlots: "Voir les plages libres",
    requestSlot: "Demander un rendez-vous",
    call: "Appeler",
    callNumber: "Appeler le 514 863-7805",
    urgent: "Urgence ?",
    menu: "Menu",
    close: "Fermer le menu",
    switchLang: "English",
    switchLangShort: "EN",
    switchLangLabel: "Version anglaise de cette page",
    home: "Accueil",
    breadcrumb: "Fil d'Ariane",
    mainNav: "Navigation principale",
    openingPill: "Ouverture le 12 octobre 2026 · Nouveaux patients bienvenus",
    signature: "Ni plus. Ni moins.",
    hoursLine: "Lundi et mardi 10 h à 18 h · Mercredi 15 h à 20 h",
    hoursLong: "lundi et mardi, 10 h à 18 h ; mercredi, 15 h à 20 h ; fermé du jeudi au dimanche et les jours fériés",
    hoursRows: [
      ["Lundi", "10 h à 18 h"],
      ["Mardi", "10 h à 18 h"],
      ["Mercredi", "15 h à 20 h"],
      ["Jeudi au dimanche", "Fermé"],
    ],
    holidays: "Fermé les jours fériés.",
    addressLine: "728, rue Fleury Est, Montréal",
    addressFull: "728, rue Fleury Est, Montréal (Québec) H2C 1P1",
    floor: "1er étage",
    families: {
      prevenir: "Prévenir",
      reparer: "Réparer",
      remplacer: "Remplacer",
      aligner: "Aligner et embellir",
    },
    servicePage: {
      whenToConsult: "Quand consulter",
      steps: "Comment ça se passe",
      options: "Les options",
      goodToKnow: "Bon à savoir",
      faq: "Questions fréquentes",
      related: "Services liés",
      sources: "Sources",
      disclaimer:
        "L'information de cette page est générale. Seul un examen permet de savoir ce qui convient à votre situation.",
      asideTitle: "Un examen d'abord",
      asideText: "Chaque traitement commence par un examen et une explication claire. Vous décidez ensuite.",
    },
    relatedPages: {
      firstVisit: "Première visite",
      method: "La méthode De Facto",
      lab: "Le laboratoire",
      emergency: "Urgence dentaire",
    },
    learnMore: "En savoir plus",
    back: "Retour",
    newTab: "(nouvel onglet)",
  },

  nav: [
    { key: "firstVisit", label: "Première visite" },
    { key: "services", label: "Services" },
    { key: "method", label: "La méthode" },
    { key: "lab", label: "Laboratoire" },
    { key: "about", label: "À propos" },
    { key: "contact", label: "Contact" },
  ],

  footer: {
    identity: "Studio Dentaire De Facto · Dr Bader Ramdani, dentiste généraliste",
    linksTitle: "Liens",
    links: [
      { key: "services", label: "Services" },
      { key: "emergency", label: "Urgence" },
      { key: "booking", label: "Prendre rendez-vous" },
      { key: "faq", label: "Questions fréquentes" },
      { key: "privacy", label: "Confidentialité" },
      { key: "terms", label: "Conditions d'utilisation" },
      { key: "accessibility", label: "Accessibilité" },
    ],
    privacyOfficer:
      "Responsable de la protection des renseignements personnels : Dr Bader Ramdani, dentiste généraliste · {email} · {tel}",
    disclaimer: "L'information de ce site est générale et ne remplace pas un examen dentaire.",
    contactTitle: "Nous joindre",
    hoursTitle: "Heures",
  },

  /** Titres (60 caractères au plus) et descriptions (155 au plus) */
  meta: {
    home: {
      title: "Dentiste à Ahuntsic, Montréal · Studio Dentaire De Facto",
      description:
        "Studio dentaire au 728, rue Fleury Est, Ahuntsic. Examen complet d'une heure, laboratoire sur place, RCSD et RAMQ acceptés. Prenez rendez-vous en ligne.",
    },
    firstVisit: {
      title: "Première visite chez le dentiste à Ahuntsic · De Facto",
      description:
        "Examen complet d'environ une heure, en six temps, et un rapport écrit. Ce qu'il faut apporter, la couverture et comment réserver au Studio De Facto.",
    },
    services: {
      title: "Services dentaires à Ahuntsic · Studio Dentaire De Facto",
      description:
        "Examens, nettoyages, obturations, couronnes, prothèses, urgences et plus. Services d'un dentiste généraliste, rue Fleury Est à Montréal.",
    },
    method: {
      title: "La méthode De Facto : comprendre avant de traiter",
      description:
        "Un parcours en cinq stades et trois plans emboîtés, avec le statu quo toujours présenté. Vous comprenez votre bouche avant de décider.",
    },
    lab: {
      title: "Laboratoire dentaire intégré au studio · Ahuntsic",
      description:
        "Couronnes et prothèses conçues et fabriquées sur place, dans le laboratoire du Studio De Facto, rue Fleury Est à Montréal.",
    },
    about: {
      title: "À propos du Studio Dentaire De Facto · Ahuntsic",
      description:
        "Un studio dentaire indépendant de la rue Fleury Est, dirigé par le Dr Bader Ramdani, dentiste généraliste.",
    },
    contact: {
      title: "Contact, heures et accès · Dentiste rue Fleury Est",
      description:
        "728, rue Fleury Est, Montréal. Lundi et mardi 10 h à 18 h, mercredi 15 h à 20 h. Stationnement, autobus 140, métro Sauvé et Henri-Bourassa.",
    },
    booking: {
      title: "Prendre rendez-vous en ligne · Studio Dentaire De Facto",
      description:
        "Choisissez une plage dans notre horaire en ligne. Le studio vous rappelle pour confirmer. Nouveaux patients bienvenus à Ahuntsic.",
      descriptionNoOnline:
        "Demandez un rendez-vous en ligne : le studio vous rappelle pour fixer l'heure. Nouveaux patients bienvenus, rue Fleury Est à Ahuntsic.",
    },
    faq: {
      title: "Questions fréquentes · Studio Dentaire De Facto, Ahuntsic",
      description:
        "Durée de l'examen, RCSD, RAMQ, assurances, paiement, urgences, stationnement : les réponses aux questions qu'on nous pose le plus.",
    },
    emergency: {
      title: "Urgence dentaire à Ahuntsic · Rendez-vous le jour même",
      description:
        "Douleur, dent cassée, enflure : appelez le 514 863-7805. Rendez-vous d'urgence possible le jour même pendant nos heures.",
    },
    newPatient: {
      title: "Nouveau patient à Ahuntsic · Examen complet d'une heure",
      description:
        "Studio dentaire qui accepte les nouveaux patients, rue Fleury Est. Examen d'une heure et rapport écrit. Réservez en ligne.",
    },
    dentures: {
      title: "Prothèse dentaire à Ahuntsic · Laboratoire sur place",
      description:
        "Prothèse partielle ou complète, réparation, prothèse sur implants : laboratoire dans le studio, RCSD et RAMQ acceptés.",
    },
    emergencyLanding: {
      title: "Dentiste d'urgence à Ahuntsic · Le jour même",
      description:
        "Douleur ou dent cassée ? Rendez-vous d'urgence le jour même pendant nos heures. Appelez le 514 863-7805.",
    },
    privacy: {
      title: "Politique de confidentialité · Studio Dentaire De Facto",
      description:
        "Quels renseignements le site recueille, pourquoi, où ils sont traités et comment exercer vos droits. Responsable : Dr Bader Ramdani, dentiste généraliste.",
    },
    terms: {
      title: "Conditions d'utilisation · Studio Dentaire De Facto",
      description: "Les conditions qui encadrent l'utilisation du site studiodefacto.ca.",
    },
    accessibility: {
      title: "Accessibilité · Studio Dentaire De Facto",
      description:
        "L'accessibilité du site et du studio : ce qui est en place, ses limites et comment nous joindre si vous avez besoin d'aide.",
    },
    thanks: {
      title: "Merci · Studio Dentaire De Facto",
      description: "Votre demande a bien été envoyée au Studio Dentaire De Facto.",
    },
  },

  home: {
    eyebrow: "Dentiste à Ahuntsic",
    h1Lines: ["Prenez le temps.", "Nous aussi."],
    lede:
      "Un studio dentaire où l'on vous reçoit comme dans une maison. Le Dr Bader Ramdani, dentiste généraliste, et l'équipe du studio vous accueillent au 728, rue Fleury Est, à Montréal.",
    heroAlt: "Le bureau du studio, où l'on s'assoit pour parler du plan de traitement",
    reel: [
      { n: "I", label: "Le bureau" },
      { n: "II", label: "Les salles de soins" },
      { n: "III", label: "L'atelier" },
    ],
    bookingBar: {
      title: "Réserver",
      motifLabel: "Motif",
      dayLabel: "Jour",
      momentLabel: "Moment",
      motifs: [
        { value: "examen", label: "Examen complet (nouveau patient)" },
        { value: "nettoyage", label: "Nettoyage" },
        { value: "prothese", label: "Prothèse" },
        { value: "reparer", label: "Réparer une dent" },
        { value: "autre", label: "Autre" },
        { value: "urgence", label: "Urgence" },
      ],
      days: [
        { value: "lundi", label: "Lundi" },
        { value: "mardi", label: "Mardi" },
        { value: "mercredi", label: "Mercredi" },
      ],
      moments: [
        { value: "matin", label: "Matin" },
        { value: "apres-midi", label: "Après-midi" },
        { value: "soir", label: "Soir (mercredi seulement)" },
      ],
      any: "Peu importe",
      urgentMessage: "Pour une urgence, appelez le {tel}.",
      note: "Le studio vous rappelle pour confirmer l'heure exacte.",
    },
    firstVisit: {
      eyebrow: "Votre première visite",
      title: "En trois temps",
      steps: [
        {
          title: "Vous réservez.",
          text: "En ligne, en quelques clics, ou au {tel}. Le studio vous rappelle pour confirmer.",
        },
        {
          title: "On vous examine, sans se presser.",
          text: "Un examen complet dure environ une heure. On regarde toute la bouche, pas seulement la dent qui dérange.",
        },
        {
          title: "On vous explique, vous décidez.",
          text: "Vous recevez un rapport écrit, les options possibles et ce qui arrive si l'on ne fait rien. La décision vous appartient.",
        },
      ],
      link: "Tout savoir sur la première visite",
    },
    rooms: {
      eyebrow: "Le studio, pièce par pièce",
      title: "Une maison, en plan-séquence",
      items: [
        {
          n: "I",
          image: "planification",
          title: "Le bureau.",
          text: "On s'assoit à une table pour parler de votre santé et de votre plan de traitement. Pas dans le fauteuil, pas en vitesse.",
          alt: "Le bureau de planification, avec sa table et ses chaises",
        },
        {
          n: "II",
          image: "salle-1",
          title: "Les salles de soins.",
          text: "Deux salles lumineuses, équipées pour l'examen, la prévention et les traitements.",
          alt: "Une salle de soins lumineuse",
        },
        {
          n: "III",
          image: "laboratoire",
          title: "L'atelier.",
          text: "La salle de conception numérique et le laboratoire, où l'on fabrique couronnes, prothèses et gouttières.",
          alt: "Le laboratoire du studio",
        },
      ],
      link: "Visiter le studio",
    },
    services: {
      eyebrow: "Les services",
      title: "La carte des soins",
      intro: "Les services d'un dentiste généraliste, en quatre familles.",
      urgentTitle: "Urgence dentaire",
      urgentText: "Rendez-vous possible le jour même pendant nos heures.",
      link: "Tous les services",
    },
    method: {
      eyebrow: "La méthode De Facto",
      title: "On ne bâtit pas sur du sable.",
      text: "Avant de réparer, on s'assure que la bouche est saine. Avant de décider, on s'assure que vous avez compris. Chaque plan vous est présenté en trois versions, de la plus complète à la plus simple, et on vous dit toujours ce qui arrive si l'on ne fait rien.",
      link: "Découvrir la méthode De Facto",
    },
    lab: {
      eyebrow: "Un laboratoire dans le studio",
      title: "Fabriqué à quelques pas du fauteuil",
      text: "Vos couronnes, vos prothèses et vos gouttières sont conçues et fabriquées ici même, à quelques pas du fauteuil. Les ajustements se font sur place, et le dentiste peut parler directement à la personne qui fabrique votre pièce.",
      link: "Voir le laboratoire",
      alt: "Une couronne en céramique en cours de finition",
    },
    coverage: {
      eyebrow: "Couverture et paiement",
      title: "Ce que nous acceptons",
      items: [
        { title: "RCSD", text: "Régime canadien de soins dentaires accepté." },
        {
          title: "RAMQ",
          text: "Enfants de moins de 10 ans et personnes prestataires d'une aide financière de dernier recours, selon les services couverts.",
        },
        { title: "Assurances privées", text: "Acceptées." },
        { title: "Paiement", text: "Comptant, débit, carte de crédit." },
      ],
    },
    practical: {
      eyebrow: "Infos pratiques",
      title: "Au 728, rue Fleury Est",
      parking: "Stationnement dans la rue et stationnement privé.",
      bus: "Autobus 140 devant le studio.",
      link: "Itinéraire et accès",
    },
    final: {
      lines: ["Comprendre d'abord.", "Traiter ensuite."],
    },
  },

  firstVisit: {
    eyebrow: "Première visite",
    h1: "Votre première visite chez le dentiste, à Ahuntsic",
    intro:
      "Une première visite au Studio De Facto, c'est un vrai bilan. On prend le temps de vous écouter, d'examiner toute votre bouche et de vous expliquer ce qu'on voit. Vous repartez en sachant où vous en êtes, sans obligation de commencer un traitement.",
    heroAlt: "Le bureau où l'on revoit le rapport écrit, assis à une table",
    twoVisits: {
      title: "Un bilan complet, en deux visites",
      items: [
        {
          title: "L'examen (environ une heure).",
          text: "On écoute vos besoins, on revoit votre santé, on examine les dents, les gencives et toute la bouche. Des radiographies sont prises seulement si elles sont utiles. Le nettoyage peut se faire pendant la même visite, selon vos besoins ; la visite dure alors environ 1 h 30.",
        },
        {
          title: "L'explication, au bureau.",
          text: "On s'assoit à une table pour revoir ensemble votre rapport écrit : ce qui va bien, ce qui demande de l'attention, les options possibles et leurs coûts. Vous décidez de la suite, à votre rythme.",
        },
      ],
    },
    sixSteps: {
      title: "Ce qui se passe pendant l'examen, en six temps",
      items: [
        { title: "Vous nous racontez.", text: "Pourquoi vous venez, ce qui vous dérange, ce que vous souhaitez." },
        { title: "Votre santé.", text: "Vos médicaments, vos conditions médicales, vos allergies. Plusieurs ont un effet sur la bouche." },
        {
          title: "L'examen de la bouche.",
          text: "Les dents, les gencives, la mâchoire, la langue, les joues, l'occlusion. On note aussi ce qui est normal : c'est votre point de départ.",
        },
        {
          title: "Les outils, selon le besoin.",
          text: "Radiographies, photos ou empreinte numérique, seulement quand ils apportent une réponse.",
        },
        { title: "La synthèse.", text: "Ce qui est actif, ce qui est stable, ce qui peut attendre." },
        { title: "Le plan.", text: "Ce qu'on vous propose, dans quel ordre, et pourquoi." },
      ],
      roomAlt: "Une salle de soins du studio",
    },
    bring: {
      title: "Quoi apporter",
      minTitle: "Au minimum",
      min: [
        "Votre carte d'assurance maladie (RAMQ)",
        "Votre carte du Régime canadien de soins dentaires (RCSD), si vous êtes inscrit",
        "Votre carte d'assurance dentaire privée, s'il y a lieu",
        "La liste de vos médicaments (ou les contenants)",
        "Toute autre information de santé utile : conditions médicales, allergies, chirurgies récentes",
      ],
      idealTitle: "Idéalement",
      ideal: [
        "Votre ancien dossier dentaire",
        "Vos radiographies dentaires de moins de 2 ans",
        "Votre radiographie panoramique de moins de 5 ans",
      ],
      note: "Vos anciennes radiographies peuvent éviter d'en reprendre. Vous pouvez demander une copie de votre dossier à votre ancienne clinique ; c'est votre droit.",
    },
    coverage: {
      title: "Couverture et paiement",
      items: [
        "**RCSD :** accepté. Apportez votre carte. Pour savoir si vous êtes admissible : [Régime canadien de soins dentaires](https://www.canada.ca/fr/services/prestations/dentaire/regime-soins-dentaires.html).",
        "**RAMQ :** plusieurs services sont couverts pour les enfants de moins de 10 ans et pour les prestataires d'un programme d'aide financière qui ont un carnet de réclamation. [Voir les services couverts par la RAMQ](https://www.ramq.gouv.qc.ca/fr/citoyens/assurance-maladie/soins-dentaires).",
        "**Assurances privées :** acceptées.",
        "**Paiement :** comptant, débit ou carte de crédit.",
      ],
      estimate: "Avant tout traitement, vous recevez une estimation écrite des coûts.",
    },
    goodToKnow: {
      title: "Bon à savoir",
      items: [
        {
          title: "Accès",
          text: "Le studio est au 1er étage, avec un escalier à l'entrée. Il n'est pas accessible en fauteuil roulant. Si vous avez de la difficulté avec les marches, appelez-nous avant de venir.",
        },
        {
          title: "Vous avez peur du dentiste ?",
          text: "Dites-le-nous en réservant. On explique chaque geste avant de le faire, et vous pouvez demander une pause en tout temps.",
        },
        {
          title: "Annulation",
          text: "Avisez-nous au moins 24 heures à l'avance, idéalement 48 heures. Un 2e rendez-vous manqué sans avis entraîne des frais de 50 $, un 3e des frais de 100 $. Après plusieurs rendez-vous manqués, le studio peut mettre fin au suivi, avec un préavis, et transmettre votre dossier à la clinique de votre choix.",
        },
        {
          title: "Questionnaire de santé",
          text: "Vous le remplissez au studio, à votre arrivée. Vos réponses sont versées à votre dossier. Un questionnaire en ligne sécurisé sera offert plus tard.",
        },
      ],
    },
    final: { title: "Prêt pour votre première visite ?", or: "ou" },
  },

  servicesIndex: {
    eyebrow: "Services",
    h1: "Services dentaires à Ahuntsic",
    intro:
      "Le Studio De Facto offre les services d'un dentiste généraliste : prévenir, réparer, remplacer et aligner. Chaque traitement commence par un examen et une explication claire. Quand votre situation demande un dentiste spécialiste, nous vous dirigeons vers un collègue et nous restons votre point de contact.",
    heroAlt: "Une salle de soins du studio",
    familyImages: {
      prevenir: { image: "salle-1", alt: "Salle de soins" },
      reparer: { image: "couronne-macro", alt: "Couronne en céramique" },
      remplacer: { image: "laboratoire", alt: "Le laboratoire" },
      aligner: { image: "cadcam", alt: "La salle de conception numérique" },
    },
    urgent: {
      title: "Urgence dentaire",
      text: "Douleur, dent cassée, enflure ? Rendez-vous possible le jour même pendant nos heures. Appelez le {tel}.",
      link: "Que faire en cas d'urgence",
    },
  },

  emergency: {
    eyebrow: "Urgence",
    h1: "Urgence dentaire à Ahuntsic",
    banner:
      "Douleur, dent cassée, enflure ? Appelez le {tel}. Un rendez-vous d'urgence est possible le jour même, pendant nos heures d'ouverture.",
    how: {
      title: "Comment ça fonctionne",
      /** Première étape quand le formulaire chiffré n'est pas encore en service */
      callOnly: "Appelez-nous au {tel} pendant nos heures d'ouverture.",
      steps: [
        "Appelez-nous ou remplissez le formulaire de demande d'urgence ci-dessous.",
        "Une secrétaire vous rappelle pour comprendre la situation et vous donner une heure.",
        "Venez seulement après cette confirmation téléphonique. Sans confirmation, nous ne pouvons pas garantir qu'un dentiste sera disponible pour vous recevoir.",
      ],
    },
    fees: {
      title: "Les frais, en toute transparence",
      text: "Prix régulier d'un rendez-vous d'urgence de base : 61 $ pour l'examen d'urgence, plus 44 $ si une radiographie de la dent (périapicale, un cliché) est nécessaire. Selon ce que l'on trouve, des frais supplémentaires peuvent s'ajouter pour les soins faits pendant la visite. On vous les explique avant de commencer.",
      rows: [
        ["Examen d'urgence", "61 $"],
        ["Radiographie de la dent (périapicale, un cliché), au besoin", "44 $"],
      ],
    },
    when: {
      title: "Situations pour lesquelles appeler",
      items: [
        "Douleur dentaire forte ou qui vous réveille",
        "Dent cassée, fêlée ou délogée après un coup",
        "Enflure de la gencive ou du visage",
        "Couronne, obturation ou prothèse cassée ou décollée",
        "Saignement après une extraction",
      ],
      hours: "Heures pour joindre le studio : lundi et mardi, 10 h à 18 h ; mercredi, 15 h à 20 h.",
    },
    afterHours: {
      title: "Hors de nos heures",
      text: "Si vous avez des signes d'une infection qui se répand dans le corps (fièvre, frissons, enflure du visage qui augmente, difficulté à avaler ou à respirer, grande fatigue), rendez-vous sans attendre à l'urgence d'un hôpital ou composez le 911. Pour une question de santé, Info-Santé répond au 811.",
    },
    formTitle: "Demande d'urgence",
    formIntro: "Le formulaire est lu pendant nos heures d'ouverture. Si la douleur est forte, appelez plutôt.",
    formUnavailable:
      "Le formulaire de demande d'urgence n'est pas encore en service. Appelez le {tel} pendant nos heures d'ouverture.",
    faq: [
      {
        q: "Recevez-vous les urgences de personnes qui ne sont pas patientes du studio ?",
        a: "Oui, selon nos disponibilités du jour.",
      },
      {
        q: "Pouvez-vous me prescrire quelque chose au téléphone ?",
        a: "Non. Une évaluation est nécessaire pour savoir quoi faire.",
      },
    ],
    related: ["canal", "extraction", "reparation"],
  },

  method: {
    eyebrow: "La méthode",
    h1: "La méthode De Facto : comprendre avant de traiter",
    intro:
      "Au Studio De Facto, notre but n'est pas que vous acceptiez un traitement. Notre but est que vous compreniez votre bouche. Un patient qui comprend sa situation décide mieux, et décide pour lui-même. Une seule phrase résume notre façon de travailler : on ne bâtit pas sur du sable.",
    heroAlt: "Le bureau de planification",
    stages: {
      title: "Un parcours en cinq stades",
      note: "Un stade est une famille d'objectifs, jamais un niveau de gravité. Il ne se compare pas aux stades d'une maladie.",
      hint: "Choisissez un stade pour lire sa description.",
      items: [
        { n: "0", name: "Comprendre", text: "L'examen complet et, au besoin, des examens complémentaires. On établit le portrait de départ." },
        { n: "1", name: "Stabiliser", text: "On contrôle d'abord les infections et l'inflammation : caries actives, gencives malades, dents infectées." },
        {
          n: "2",
          name: "Restaurer la fonction",
          text: "On répare ce qui est nécessaire pour bien mâcher et être confortable, dans le cadre actuel de votre bouche.",
        },
        { n: "3", name: "Maintenir", text: "La prévention et le suivi. Ce stade commence dès le premier rendez-vous et ne se termine jamais." },
        { n: "4", name: "Réhabiliter et embellir", text: "Une transformation plus globale, si c'est votre objectif." },
      ],
      stageLabel: "Stade",
      footnote:
        "Les stades 2 et 4 sont deux chemins possibles après le stade 1 ; ils mènent tous deux au maintien. Le stade 4 n'est ni obligatoire, ni supérieur au stade 2. Une urgence se traite à part, à tout moment.",
    },
    checks: {
      title: "Quatre vérifications avant d'avancer",
      items: [
        ["Avons-nous assez compris ?", "fin du stade 0"],
        ["Les maladies actives sont-elles contrôlées ?", "fin du stade 1"],
        ["Les fondations sont-elles fiables ?", "avant chaque restauration, dent par dent"],
        ["Sommes-nous prêts pour une transformation globale ?", "avant le stade 4"],
      ],
      note: "Quand une vérification ne passe pas, on reporte l'étape suivante. Ce n'est pas un échec : c'est la bouche qui donne le rythme.",
    },
    plans: {
      title: "Trois plans, et le statu quo",
      intro: "Pour chaque situation, on vous présente trois plans emboîtés :",
      items: [
        { k: "A", name: "Sourire", text: "la reconstruction la plus complète." },
        { k: "B", name: "Essentiel", text: "ce qui est nécessaire, dent par dent." },
        { k: "C", name: "Stabilité", text: "contrôler la maladie et garder ce qui peut l'être." },
      ],
      nested:
        "Le plan C est contenu dans le B, et le B dans le A. La stabilisation est la même dans les trois : vous choisissez jusqu'où reconstruire, jamais la qualité des soins.",
      statusQuo:
        "On vous présente aussi toujours le statu quo : ce qui peut rester stable, ce qui risque d'évoluer, les signes à surveiller et le calendrier de suivi. Sans jugement.",
    },
    outcome: {
      title: "Ce que vous saurez à la fin de l'examen",
      items: [
        ["Le constat", "ce qui va bien, et ce qui ne va pas."],
        ["Les priorités", "ce qui est urgent, ce qui peut attendre, ce qui est facultatif."],
        ["Les décisions", "les options, leurs avantages, leurs limites et leurs coûts."],
        ["La direction", "l'ordre des étapes et le suivi proposé."],
      ],
      note: "Le plan vous est expliqué au bureau, assis à une table, jamais dans le fauteuil. Vous recevez un rapport écrit.",
    },
    final: { title: "Commencez par le stade 0." },
  },

  lab: {
    eyebrow: "Laboratoire",
    h1: "Un laboratoire dentaire dans le studio, à Ahuntsic",
    intro:
      "Au Studio De Facto, vos couronnes, vos prothèses et vos gouttières sont conçues et fabriquées à quelques pas du fauteuil. Le dentiste et l'équipe du laboratoire regardent ensemble votre cas, votre teinte et votre morsure. Les essais et les ajustements se font sur place.",
    heroAlt: "Le laboratoire du studio, plan large",
    benefits: {
      title: "Ce que cela change pour vous",
      items: [
        {
          title: "On vous voit en personne.",
          text: "La teinte d'une couronne ou la forme d'un dentier se vérifient dans votre bouche, pas seulement sur une photo.",
        },
        { title: "Les ajustements se font ici.", text: "Une retouche ne demande pas d'envoyer la pièce ailleurs." },
        {
          title: "Une seule équipe.",
          text: "Ceux qui planifient votre traitement parlent directement à ceux qui fabriquent la pièce.",
        },
      ],
    },
    steps: {
      title: "Du numérique au fini, en quatre étapes",
      items: [
        {
          title: "L'empreinte numérique.",
          text: "Un scanner dans la bouche remplace la pâte pour la plupart des pièces.",
          image: "cadcam",
          alt: "La salle de conception numérique",
        },
        {
          title: "La conception.",
          text: "La pièce est dessinée à l'ordinateur, sur le modèle de votre bouche.",
          image: "cadcam-nuit",
          alt: "Le poste de conception, le soir",
        },
        {
          title: "La fabrication.",
          text: "Fraisage de la zircone, pressage de la céramique ou impression 3D, selon la pièce.",
          image: "laboratoire-cure",
          alt: "Un appareil du laboratoire en fonctionnement",
        },
        {
          title: "La finition à la main.",
          text: "Maquillage, glaçage, polissage et contrôle avant la pose.",
          image: "couronne-macro",
          alt: "Une couronne en céramique en cours de finition",
        },
      ],
    },
    made: {
      title: "Ce que nous fabriquons ici",
      items: [
        "Couronnes et ponts en zircone ou en céramique",
        "Facettes en céramique",
        "Prothèses complètes et partielles (le châssis métallique des partielles est coulé par un laboratoire partenaire)",
        "Gouttières pour le bruxisme et gouttières de blanchiment",
        "Guides et modèles pour planifier les traitements",
      ],
    },
    equipment: {
      title: "L'équipement",
      text: "Scanner intra-oral, conception Exocad, imprimante Formlabs, fraiseuse VHF et fours Ivoclar.",
    },
    team: {
      title: "L'équipe du laboratoire",
      text: "Le laboratoire est sous la responsabilité d'un technologue en prothèses et appareils dentaires, membre de l'Ordre des technologues en prothèses et appareils dentaires du Québec.",
    },
    galleryTitle: "L'atelier en images",
    gallery: [
      { image: "laboratoire-droit", alt: "Le laboratoire, côté droit" },
      { image: "laboratoire-poste", alt: "Un poste de travail du laboratoire" },
      { image: "cadcam-nuit", alt: "La salle de conception numérique, le soir" },
    ],
    final: { title: "Une couronne ou une prothèse à faire ?", text: "Commencez par un examen." },
  },

  about: {
    eyebrow: "À propos",
    h1: "À propos du Studio Dentaire De Facto",
    intro:
      "Le Studio Dentaire De Facto est un studio indépendant, sur la rue Fleury Est, dans Ahuntsic. Nous ne faisons partie d'aucune chaîne. Nous avons conçu le lieu pour prendre le temps : un bureau pour parler, des salles lumineuses pour soigner, un laboratoire pour fabriquer.",
    heroAlt: "La façade du studio au 728, rue Fleury Est",
    rooms: {
      title: "Le studio, pièce par pièce",
      hint: "Faites défiler",
      items: [
        { image: "entree", title: "La façade.", text: "Au 728, rue Fleury Est, à l'étage.", alt: "La façade et l'escalier d'entrée du studio" },
        {
          image: "attente",
          title: "La salle d'attente.",
          text: "Un salon plutôt qu'une salle d'attente, avec un café.",
          alt: "La salle d'attente aménagée comme un salon",
        },
        {
          image: "couloir",
          title: "Le couloir.",
          text: "Le couloir qui mène aux salles est une petite galerie d'art.",
          alt: "Le couloir et ses œuvres d'art",
        },
        {
          image: "planification",
          title: "Le bureau.",
          text: "Pour les questionnaires et l'explication du plan de traitement, assis à une table.",
          alt: "Le bureau de planification",
        },
        { image: "salle-1", title: "Salle 1.", text: "Une salle de soins.", alt: "La salle de soins 1" },
        { image: "salle-2", title: "Salle 2.", text: "Une salle de soins.", alt: "La salle de soins 2" },
        {
          image: "cadcam",
          title: "La salle CAD-CAM.",
          text: "Où l'on conçoit les pièces à l'ordinateur.",
          alt: "La salle de conception numérique",
        },
        { image: "laboratoire", title: "Le laboratoire.", text: "Où on les fabrique.", alt: "Le laboratoire" },
      ],
    },
    dentist: {
      title: "Le dentiste",
      text: "Dr Bader Ramdani, dentiste généraliste. Diplômé en médecine dentaire de l'Université Laval en 2021, membre de l'Ordre des dentistes du Québec. Il reçoit ses patients en français et en anglais.",
    },
    team: {
      title: "L'équipe du studio",
      text: "L'équipe du studio vous accueille, vous rappelle pour confirmer vos rendez-vous, vous aide avec vos assurances et vous accompagne d'une visite à l'autre.",
    },
    infection: {
      title: "Prévention des infections",
      text: "Les instruments sont nettoyés et stérilisés après chaque patient, et les surfaces désinfectées entre chaque rendez-vous, selon les normes en vigueur au Québec.",
    },
    community: {
      title: "Dans la communauté",
      text: "Le studio donne des ateliers gratuits de santé buccodentaire avec des organismes du quartier.",
    },
    final: { title: "Venez voir le studio." },
  },

  contact: {
    eyebrow: "Contact",
    h1: "Nous joindre et venir au studio",
    intro: "Tout ce qui sert le jour du rendez-vous : adresse, heures, autobus, métro et stationnement.",
    heroAlt: "La façade du studio au 728, rue Fleury Est",
    details: {
      title: "Coordonnées",
      address: "Adresse",
      phone: "Téléphone",
      email: "Courriel",
      hours: "Heures",
    },
    map: {
      title: "Carte",
      show: "Afficher la carte",
      directions: "Itinéraire dans Google Maps",
      consent:
        "La carte est fournie par Google, qui dépose des témoins. Elle se charge seulement si vous cliquez sur « Afficher la carte ».",
      iframeTitle: "Carte Google du 728, rue Fleury Est",
      alt: "La façade du studio, vue de la rue Fleury Est",
    },
    getting: {
      title: "Venir au studio",
      items: [
        {
          title: "En autobus",
          text: "La ligne 140 Fleury s'arrête en face du studio. Elle relie la station de métro Sauvé et dessert la rue Fleury jusqu'à Montréal-Nord.",
        },
        { title: "En métro", text: "Stations Sauvé et Henri-Bourassa (ligne orange)." },
        { title: "En voiture", text: "À environ 10 minutes des autoroutes 15 et 40." },
        {
          title: "Stationnement",
          text: "Dans la rue, et stationnement privé à l'arrière du bâtiment, avec entrée par la rue Saint-Hubert.",
        },
      ],
    },
    areas: {
      title: "Depuis votre quartier",
      items: [
        ["Ahuntsic", "sur la rue Fleury Est, à deux pas des commerces de la promenade Fleury."],
        ["Montréal-Nord", "la ligne 140 suit la rue Fleury jusqu'au studio."],
        ["Villeray", "par la ligne orange jusqu'à Sauvé, puis la ligne 140."],
        ["Saint-Michel", "par le boulevard Saint-Michel jusqu'à la rue Fleury, où passe la ligne 140."],
        ["Cartierville", "par le boulevard Henri-Bourassa ou l'autoroute 15."],
        [
          "Sud de Laval (Pont-Viau, Laval-des-Rapides)",
          "par la ligne orange jusqu'à Henri-Bourassa, ou par l'autoroute 15 ou le pont Viau.",
        ],
      ],
    },
    access: {
      title: "Accessibilité",
      text: "Le studio est au 1er étage. Un escalier mène à l'entrée. Le studio n'est pas accessible en fauteuil roulant. Appelez-nous si les marches vous posent problème : nous vous aiderons à trouver une solution.",
    },
    formTitle: "Écrivez-nous",
    formUrgent: "Pour une urgence, appelez le {tel} ; ce formulaire n'est pas lu en continu.",
  },

  booking: {
    eyebrow: "Rendez-vous",
    h1: "Prendre rendez-vous au Studio De Facto",
    intro:
      "Choisissez le motif de votre visite, puis une plage libre. Le studio vous rappelle pour confirmer l'heure et répondre à vos questions. Vous préférez parler à quelqu'un ? Appelez le {tel}.",
    /** Sans horaire en ligne (NEXT_PUBLIC_BOOKING_URL vide) */
    introNoOnline:
      "Laissez-nous vos coordonnées et le motif de votre visite. Le studio vous rappelle pour fixer l'heure et répondre à vos questions. Vous préférez parler à quelqu'un ? Appelez le {tel}.",
    online: {
      title: "L'horaire en ligne",
      text: "L'horaire s'ouvre dans un nouvel onglet, sur la page de réservation Google du studio.",
      button: "Ouvrir l'horaire en ligne",
      privacy:
        "Google héberge les nom, téléphone et courriel saisis dans l'horaire, à l'extérieur du Québec. Voir notre [politique de confidentialité](page:privacy).",
    },
    request: {
      title: "Demander un rendez-vous",
      titleAlt: "Vous préférez qu'on vous rappelle ?",
      text: "Laissez vos coordonnées et vos préférences. Le studio vous rappelle pendant ses heures d'ouverture pour fixer l'heure.",
    },
    motifs: {
      title: "Les motifs et leur durée",
      head: ["Motif", "Durée", "En ligne"],
      rows: [
        ["Examen complet (nouveau patient)", "60 min", "Oui"],
        ["Examen complet et nettoyage (nouveau patient)", "90 min", "Oui"],
        ["Nettoyage (patient du studio)", "60 min", "Oui"],
        ["Consultation ciblée (prothèse, esthétique, deuxième avis)", "30 min", "Oui"],
        ["Urgence", "30 min", "Non : appelez le 514 863-7805"],
        ["Réparer une dent ou une prothèse", "Selon le cas", "Non : appelez, pour bien évaluer"],
      ],
    },
    urgentNotice: "Pour une urgence, appelez le {tel}. Les urgences ne se réservent pas en ligne.",
    after:
      "Après votre demande, l'équipe du studio vous appellera pour confirmer votre rendez-vous et vous dire quoi apporter. Pour annuler ou déplacer, appelez le {tel}.",
  },

  faq: {
    eyebrow: "Questions fréquentes",
    h1: "Questions fréquentes",
    intro: "Les questions qu'un nouveau patient nous pose le plus souvent. Vous n'y trouvez pas la vôtre ? Appelez le {tel}.",
    groups: [
      {
        title: "Rendez-vous",
        items: [
          { q: "Acceptez-vous les nouveaux patients ?", a: "Oui. [Réservez en ligne](page:booking) ou appelez le {tel}." },
          {
            q: "Combien de temps dure le premier rendez-vous ?",
            a: "L'examen complet dure environ une heure. L'explication du plan se fait ensuite au bureau.",
          },
          {
            q: "Êtes-vous ouverts le soir ou la fin de semaine ?",
            a: "Le mercredi jusqu'à 20 h. Le studio est fermé du jeudi au dimanche.",
          },
          {
            q: "Comment annuler ou déplacer un rendez-vous ?",
            a: "Appelez le {tel} au moins 24 heures à l'avance, idéalement 48 heures. Des frais s'appliquent à partir du 2e rendez-vous manqué sans avis.",
          },
        ],
      },
      {
        title: "Couverture et coûts",
        items: [
          {
            q: "Acceptez-vous le Régime canadien de soins dentaires (RCSD) ?",
            a: "Oui. Apportez votre carte à la première visite.",
          },
          {
            q: "La RAMQ couvre-t-elle les soins dentaires ?",
            a: "Pour les enfants de moins de 10 ans et les prestataires d'un programme d'aide financière avec carnet de réclamation, plusieurs services sont couverts.",
          },
          { q: "Acceptez-vous mon assurance privée ?", a: "Oui. Apportez votre carte d'assurance." },
          { q: "Quels modes de paiement acceptez-vous ?", a: "Comptant, débit et carte de crédit." },
          {
            q: "Saurai-je le prix avant un traitement ?",
            a: "Oui. Vous recevez une estimation écrite avant de commencer, et vous décidez.",
          },
        ],
      },
      {
        title: "Soins",
        items: [
          {
            q: "J'ai peur du dentiste. Que faites-vous ?",
            a: "On explique chaque geste avant de le faire, et vous pouvez demander une pause en tout temps. Dites-le-nous en réservant.",
          },
          {
            q: "Est-ce que je serai obligé de faire un traitement après l'examen ?",
            a: "Non. Vous recevez l'information et les options, y compris ce qui arrive si l'on ne fait rien.",
          },
          {
            q: "Faites-vous les implants ?",
            a: "Nous évaluons, nous référons à un collègue pour la pose, puis nous faisons la couronne ou la prothèse et le suivi. [Implants : évaluation et référence](svc:implants).",
          },
          {
            q: "Recevez-vous les urgences ?",
            a: "Oui, le jour même si possible, pendant nos heures. Appelez d'abord ; ne vous présentez pas sans confirmation. [Urgence dentaire](page:emergency).",
          },
        ],
      },
      {
        title: "Accès",
        items: [
          {
            q: "Y a-t-il du stationnement ?",
            a: "Oui : dans la rue, et un stationnement privé à l'arrière du bâtiment, avec entrée par la rue Saint-Hubert.",
          },
          {
            q: "Le studio est-il accessible en fauteuil roulant ?",
            a: "Non. Il est au 1er étage, avec un escalier à l'entrée.",
          },
        ],
      },
    ],
  },

  landings: {
    infoTitle: "Infos pratiques",
    faqTitle: "Questions fréquentes",
    coverageLine: "RCSD, RAMQ et assurances privées acceptés",
    newPatient: {
      eyebrow: "Nouveaux patients",
      h1: "Dentiste à Ahuntsic qui accepte les nouveaux patients",
      text: "Un examen complet d'environ une heure, un rapport écrit et une explication claire de vos options. Vous décidez de la suite.",
      points: ["Examen d'environ une heure", "Rapport écrit remis", "Laboratoire dans le studio"],
      heroImage: "planification",
      heroAlt: "Le bureau où l'on revoit le rapport écrit",
      motif: "examen",
      learnMore: "examen",
      offer: {
        title: "Offre d'ouverture pour les nouveaux patients adultes",
        regularLabel: "Prix régulier",
        regular: "513 $",
        openingLabel: "Prix d'ouverture",
        opening: "289 $",
        includesTitle: "Comprend",
        includes:
          "Examen complet (197 $), radiographie panoramique (110 $), polissage (81 $), détartrage de 30 minutes (125 $) et rapport écrit, en deux visites. Les radiographies intrabuccales sont comprises dans le prix de l'examen complet.",
        extra:
          "Offert en plus : l'examen complet des gencives et, au besoin, des couronnes, ponts ou prothèses (prix régulier de 148 $ chacun).",
        excludesTitle: "Ne comprend pas",
        excludes: "Le détartrage au-delà de 30 minutes et les traitements recommandés après le bilan.",
        validity: "Pour les 100 premiers adultes, jusqu'au 1er janvier 2027.",
      },
      faq: [0, 1],
    },
    dentures: {
      eyebrow: "Prothèses dentaires",
      h1: "Prothèse dentaire à Ahuntsic, avec laboratoire sur place",
      text: "Prothèse partielle ou complète, réparation ou prothèse sur implants : les essais et les ajustements se font dans le studio, avec notre laboratoire.",
      points: ["Laboratoire dans le studio", "Réparation de prothèse", "RCSD accepté"],
      heroImage: "laboratoire",
      heroAlt: "Le laboratoire du studio",
      motif: "prothese",
      broken: "Prothèse cassée ? Appelez le {tel}",
      learnMore: "complete",
      faqItems: [
        {
          q: "Combien de rendez-vous faut-il pour une nouvelle prothèse ?",
          a: "Plusieurs : empreintes, essais et ajustements. Le calendrier vous est donné à l'examen.",
        },
        {
          q: "Réparez-vous les prothèses cassées ?",
          a: "Oui, avec notre laboratoire sur place. Appelez pour un rendez-vous.",
        },
      ],
    },
    emergency: {
      eyebrow: "Urgence dentaire",
      h1: "Urgence dentaire à Ahuntsic : rendez-vous le jour même",
      text: "Douleur, dent cassée ou enflure ? Appelez-nous. Une secrétaire évalue votre situation et vous donne une heure, le jour même si possible.",
      formButton: "Demande d'urgence par formulaire",
      boxTitle: "Avant de venir",
      box: [
        "Prix régulier de base : examen d'urgence 61 $, plus 44 $ si une radiographie de la dent est nécessaire.",
        "Des frais supplémentaires peuvent s'ajouter selon les soins faits pendant la visite ; on vous les explique avant de commencer.",
        "Ne vous présentez pas sans confirmation téléphonique.",
      ],
    },
  },

  forms: {
    required: "obligatoire",
    optional: "facultatif",
    name: "Prénom et nom",
    phone: "Téléphone",
    email: "Courriel",
    firstVisit: "Première visite au studio ?",
    yes: "Oui",
    no: "Non",
    coverage: "Couverture",
    coverageOptions: ["RCSD", "RAMQ", "Assurance privée", "Aucune", "Je ne sais pas"],
    motif: "Motif",
    day: "Jour souhaité",
    moment: "Moment souhaité",
    subject: "Sujet",
    subjects: ["Renseignement", "Assurances et RCSD", "Copie de dossier", "Autre"],
    message: "Message",
    noHealth: "N'inscrivez pas de renseignements de santé dans ce formulaire. Nous en parlerons au téléphone ou au studio.",
    noHealthBooking: "Ne décrivez pas votre état de santé ici ; nous en parlerons lors de l'appel.",
    situation: "Type de situation",
    situations: ["Douleur", "Dent cassée", "Enflure", "Prothèse", "Autre"],
    urgentConsent:
      "Je comprends que des frais minimaux s'appliquent à un rendez-vous d'urgence, que des frais supplémentaires peuvent s'ajouter, et que je dois attendre l'appel de confirmation avant de me présenter.",
    privacyNote: "Les renseignements transmis servent uniquement à traiter votre demande. [Politique de confidentialité](page:privacy).",
    encrypted: "Votre demande est chiffrée dans votre navigateur avant l'envoi ; seul le studio peut la lire.",
    honeypot: "Ne pas remplir ce champ",
    send: "Envoyer",
    sendRequest: "Envoyer ma demande",
    sending: "Envoi…",
    error:
      "L'envoi n'a pas fonctionné. Réessayez dans quelques minutes ou appelez le {tel}.",
    errorFields: "Vérifiez les champs obligatoires, puis envoyez de nouveau.",
  },

  thanks: {
    eyebrow: "Merci",
    titles: {
      rendezvous: "Votre demande est envoyée.",
      contact: "Votre message est envoyé.",
      urgence: "Votre demande d'urgence est envoyée.",
    },
    texts: {
      rendezvous:
        "L'équipe du studio vous appellera pendant nos heures d'ouverture pour confirmer votre rendez-vous et vous dire quoi apporter. Pour annuler ou déplacer, appelez le {tel}. Adresse : 728, rue Fleury Est, Montréal, 1er étage.",
      contact: "Nous vous répondrons pendant nos heures d'ouverture. Pour une urgence, appelez le {tel}.",
      urgence:
        "Merci. Une secrétaire vous rappellera pendant nos heures d'ouverture. Si votre situation s'aggrave, appelez le {tel}. Ne vous présentez pas sans confirmation téléphonique.",
    },
    back: "Retour à l'accueil",
  },

  notFound: {
    title: "Page introuvable",
    text: "Cette adresse n'existe pas ou a changé. Les pages principales sont accessibles par le menu.",
    back: "Retour à l'accueil",
  },

  privacy: {
    eyebrow: "Confidentialité",
    h1: "Politique de confidentialité",
    updated: "Dernière mise à jour : 7 octobre 2026",
    sections: [
      {
        title: "Qui est responsable",
        paras: [
          "Le Studio Dentaire De Facto, 728, rue Fleury Est, Montréal (Québec) H2C 1P1, est responsable des renseignements personnels recueillis par ce site.",
          "Responsable de la protection des renseignements personnels : Dr Bader Ramdani, dentiste généraliste, propriétaire du studio. Courriel : {email}. Téléphone : {tel}.",
        ],
      },
      {
        title: "Les lois qui s'appliquent",
        paras: [
          "Les renseignements de santé versés à votre dossier dentaire relèvent de la Loi sur les renseignements de santé et de services sociaux. Les autres renseignements personnels, comme vos coordonnées transmises par le site, relèvent de la Loi sur la protection des renseignements personnels dans le secteur privé.",
        ],
      },
      {
        title: "Ce que le site recueille, et pourquoi",
        list: [
          "**Demande de rendez-vous :** nom, téléphone, courriel, première visite ou non, type de couverture, jour et moment souhaités. Pour vous rappeler et fixer le rendez-vous.",
          "**Formulaire de contact :** nom, courriel, téléphone, sujet et message. Pour répondre à votre demande.",
          "**Demande d'urgence :** nom, téléphone, courriel (facultatif) et type de situation. Ces renseignements sont chiffrés dans votre navigateur avant l'envoi, et seul le studio peut les lire.",
          "**Horaire en ligne :** si vous réservez par l'horaire en ligne, la page de réservation de Google recueille vos nom, téléphone et courriel.",
        ],
        paras: [
          "Nos formulaires ne demandent aucun renseignement de santé. Ne les y inscrivez pas : nous en parlerons au téléphone ou au studio.",
        ],
      },
      {
        title: "Où vont vos renseignements",
        paras: [
          "Les formulaires ne sont pas conservés sur le site. Ils sont envoyés directement, par courriel chiffré en transit, à la boîte du studio hébergée par Google Workspace.",
        ],
        list: [
          "**Netlify** (hébergement du site, États-Unis) : reçoit les données techniques de chaque visite (adresse IP, navigateur) et fait transiter les formulaires sans les conserver.",
          "**Google** (courriel du studio, horaire en ligne et carte, serveurs au Canada et à l'extérieur du Canada) : reçoit les demandes envoyées au studio et les réservations faites dans l'horaire en ligne.",
          "**Cloudflare** (nom de domaine et mesure d'audience, serveurs dans plusieurs pays) : mesure le nombre de visites sans témoin et sans profil individuel.",
        ],
        paras2: [
          "Avant de confier des renseignements à un fournisseur situé à l'extérieur du Québec, le studio évalue les facteurs relatifs à la vie privée et encadre le transfert par contrat.",
        ],
      },
      {
        title: "Témoins (cookies)",
        paras: [
          "Le site ne dépose aucun témoin publicitaire ni de mesure. La mesure d'audience de Cloudflare fonctionne sans témoin.",
          "La carte Google de la page Contact dépose des témoins de Google : elle se charge seulement si vous cliquez sur « Afficher la carte ».",
        ],
      },
      {
        title: "Combien de temps nous les gardons",
        paras: [
          "Une demande qui ne mène pas à un rendez-vous est supprimée de la boîte du studio au plus tard 6 mois après sa réception. Une demande qui mène à un rendez-vous est versée à votre dossier, conservé selon les règles de l'Ordre des dentistes du Québec.",
        ],
      },
      {
        title: "Vos droits",
        paras: [
          "Vous pouvez demander à consulter vos renseignements, à les faire corriger, à retirer votre consentement ou à recevoir une copie de votre dossier. Écrivez au responsable de la protection des renseignements personnels à {email}. Nous répondons dans un délai de 30 jours.",
          "Vous pouvez aussi porter plainte à la [Commission d'accès à l'information du Québec](https://www.cai.gouv.qc.ca).",
        ],
      },
      {
        title: "Sécurité et incidents",
        paras: [
          "Le site utilise une connexion chiffrée (HTTPS) et des en-têtes de sécurité. L'accès aux comptes du studio est réservé aux personnes qui en ont besoin pour leur travail. En cas d'incident de confidentialité, le studio le consigne à son registre et, s'il présente un risque de préjudice sérieux, avise les personnes concernées et la Commission d'accès à l'information.",
        ],
      },
    ],
  },

  terms: {
    eyebrow: "Conditions",
    h1: "Conditions d'utilisation",
    updated: "Dernière mise à jour : 7 octobre 2026",
    sections: [
      {
        title: "Objet du site",
        paras: [
          "Le site studiodefacto.ca présente le Studio Dentaire De Facto et les services du Dr Bader Ramdani, dentiste généraliste. En l'utilisant, vous acceptez les présentes conditions.",
        ],
      },
      {
        title: "Information générale",
        paras: [
          "L'information du site est générale. Elle ne remplace pas un examen dentaire et ne constitue pas un avis professionnel sur votre situation. Seul un examen permet de savoir ce qui vous convient.",
          "Une demande envoyée par le site ne constitue pas un rendez-vous tant que le studio ne l'a pas confirmée par téléphone.",
        ],
      },
      {
        title: "Urgences",
        paras: [
          "Les formulaires ne sont pas lus en continu. Pour une urgence, appelez le {tel} pendant nos heures. Hors de nos heures, en présence de signes d'infection qui se répand, rendez-vous à l'urgence d'un hôpital ou composez le 911. Info-Santé répond au 811.",
        ],
      },
      {
        title: "Prix",
        paras: [
          "Les prix affichés sont ceux en vigueur au moment de leur publication, avec leurs conditions. Une estimation écrite vous est remise avant tout traitement.",
        ],
      },
      {
        title: "Propriété intellectuelle",
        paras: [
          "Les textes, photos et logos du site appartiennent au Studio Dentaire De Facto. Toute reproduction demande une autorisation écrite.",
        ],
      },
      {
        title: "Liens externes",
        paras: [
          "Le site renvoie à des sites publics (RAMQ, Régime canadien de soins dentaires, Google Maps). Le studio n'est pas responsable de leur contenu.",
        ],
      },
      {
        title: "Droit applicable",
        paras: ["Les présentes conditions sont régies par les lois du Québec."],
      },
    ],
  },

  accessibility: {
    eyebrow: "Accessibilité",
    h1: "Accessibilité",
    updated: "Dernière mise à jour : 7 octobre 2026",
    sections: [
      {
        title: "Le site",
        paras: [
          "Le site vise le niveau AA des Règles pour l'accessibilité des contenus Web (WCAG 2.1).",
        ],
        list: [
          "Texte courant d'au moins 16 pixels et contrastes vérifiés.",
          "Navigation complète au clavier, avec un lien pour aller directement au contenu.",
          "Photos décrites par un texte de remplacement.",
          "Animations réduites si votre appareil le demande.",
          "Contenu lisible même sans JavaScript.",
        ],
      },
      {
        title: "Le studio",
        paras: [
          "Le studio est au 1er étage. Un escalier mène à l'entrée et le studio n'est pas accessible en fauteuil roulant. Appelez-nous si les marches vous posent problème : nous vous aiderons à trouver une solution.",
          "Le Dr Bader Ramdani, dentiste généraliste, reçoit ses patients en français et en anglais.",
        ],
      },
      {
        title: "Nous signaler un problème",
        paras: [
          "Une page est difficile à lire ou à utiliser ? Écrivez-nous à {email} ou appelez le {tel}. Nous corrigerons le problème ou vous donnerons l'information autrement.",
        ],
      },
    ],
  },
}

export type Dict = typeof fr
