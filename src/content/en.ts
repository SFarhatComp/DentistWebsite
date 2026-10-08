import type { Dict } from "./fr"

/** English texts. Same structure as fr.ts; see the syntax notes there. */
export const en: Dict = {
  lang: "en",
  locale: "en_CA",

  common: {
    skip: "Skip to content",
    book: "Book an appointment",
    seeSlots: "See open times",
    requestSlot: "Request an appointment",
    call: "Call",
    callNumber: "Call 514 863-7805",
    urgent: "Emergency?",
    menu: "Menu",
    close: "Close the menu",
    switchLang: "Français",
    switchLangShort: "FR",
    switchLangLabel: "French version of this page",
    home: "Home",
    breadcrumb: "Breadcrumb",
    mainNav: "Main navigation",
    openingPill: "Opening October 12, 2026 · New patients welcome",
    signature: "Nothing more. Nothing less.",
    hoursLine: "Monday and Tuesday 10 a.m. to 6 p.m. · Wednesday 3 p.m. to 8 p.m.",
    hoursLong:
      "Monday and Tuesday, 10 a.m. to 6 p.m.; Wednesday, 3 p.m. to 8 p.m.; closed Thursday to Sunday and on statutory holidays",
    hoursRows: [
      ["Monday", "10 a.m. to 6 p.m."],
      ["Tuesday", "10 a.m. to 6 p.m."],
      ["Wednesday", "3 p.m. to 8 p.m."],
      ["Thursday to Sunday", "Closed"],
    ],
    holidays: "Closed on statutory holidays.",
    addressLine: "728 Fleury Street East, Montréal",
    addressFull: "728 Fleury Street East, Montréal, Quebec H2C 1P1",
    floor: "Second floor",
    families: {
      prevenir: "Prevent",
      reparer: "Repair",
      remplacer: "Replace",
      aligner: "Align and enhance",
    },
    servicePage: {
      whenToConsult: "When to see us",
      steps: "How it works",
      options: "The options",
      goodToKnow: "Good to know",
      faq: "Frequently asked questions",
      related: "Related services",
      sources: "Sources",
      disclaimer:
        "The information on this page is general. Only an exam can tell what is right for your situation.",
      asideTitle: "An exam first",
      asideText: "Every treatment starts with an exam and a clear explanation. Then you decide.",
    },
    relatedPages: {
      firstVisit: "First visit",
      method: "The De Facto method",
      lab: "The lab",
      emergency: "Dental emergency",
    },
    learnMore: "Learn more",
    back: "Back",
    newTab: "(new tab)",
  },

  nav: [
    { key: "firstVisit", label: "First visit" },
    { key: "services", label: "Services" },
    { key: "method", label: "The method" },
    { key: "lab", label: "Lab" },
    { key: "about", label: "About" },
    { key: "contact", label: "Contact" },
  ],

  footer: {
    identity: "Studio Dentaire De Facto · Dr Bader Ramdani, general dentist",
    linksTitle: "Links",
    links: [
      { key: "services", label: "Services" },
      { key: "emergency", label: "Emergency" },
      { key: "booking", label: "Book an appointment" },
      { key: "faq", label: "Frequently asked questions" },
      { key: "privacy", label: "Privacy" },
      { key: "terms", label: "Terms of use" },
      { key: "accessibility", label: "Accessibility" },
    ],
    privacyOfficer:
      "Person in charge of the protection of personal information: Dr Bader Ramdani, general dentist · {email} · {tel}",
    disclaimer: "The information on this site is general and does not replace a dental exam.",
    contactTitle: "Contact us",
    hoursTitle: "Hours",
  },

  /** Titles (60 characters max) and descriptions (155 max) */
  meta: {
    home: {
      title: "Dentist in Ahuntsic, Montréal · Studio Dentaire De Facto",
      description:
        "Dental studio at 728 Fleury Street East, Ahuntsic. One-hour full exam, on-site lab, CDCP and RAMQ accepted. Book your appointment online.",
    },
    firstVisit: {
      title: "First visit to the dentist in Ahuntsic · De Facto",
      description:
        "A full exam of about one hour, in six steps, and a written report. What to bring, coverage and how to book at Studio De Facto.",
    },
    services: {
      title: "Dental services in Ahuntsic · Studio Dentaire De Facto",
      description:
        "Exams, cleanings, fillings, crowns, dentures, emergencies and more. Services of a general dentist on Fleury Street East in Montréal.",
    },
    method: {
      title: "The De Facto method: understand before treating",
      description:
        "A path in five stages and three nested plans, with the status quo always explained. You understand your mouth before you decide.",
    },
    lab: {
      title: "Dental lab inside the studio · Ahuntsic",
      description:
        "Crowns and dentures designed and made on site, in the Studio De Facto lab on Fleury Street East in Montréal.",
    },
    about: {
      title: "About Studio Dentaire De Facto · Ahuntsic",
      description:
        "An independent dental studio on Fleury Street East, run by Dr Bader Ramdani, general dentist.",
    },
    contact: {
      title: "Contact, hours, access · Dentist on Fleury Street East",
      description:
        "728 Fleury Street East, Montréal. Monday and Tuesday 10 a.m. to 6 p.m., Wednesday 3 p.m. to 8 p.m. Parking, bus 140, Sauvé and Henri-Bourassa metro.",
    },
    booking: {
      title: "Book an appointment online · Studio Dentaire De Facto",
      description:
        "Choose a time in our online schedule. The studio calls you back to confirm. New patients welcome in Ahuntsic.",
      descriptionNoOnline:
        "Request an appointment online and the studio calls you back to set the time. New patients welcome on Fleury Street East in Ahuntsic.",
    },
    faq: {
      title: "Frequently asked questions · Studio De Facto, Ahuntsic",
      description:
        "Exam length, CDCP, RAMQ, insurance, payment, emergencies, parking: answers to the questions we hear most often.",
    },
    emergency: {
      title: "Dental emergency in Ahuntsic · Same-day appointments",
      description:
        "Pain, broken tooth, swelling: call 514 863-7805. A same-day emergency appointment may be possible during our hours.",
    },
    newPatient: {
      title: "New patients in Ahuntsic · One-hour full exam",
      description:
        "A dental studio accepting new patients on Fleury Street East. One-hour exam and a written report. Book online.",
    },
    dentures: {
      title: "Dentures in Ahuntsic · On-site dental lab",
      description:
        "Partial or complete dentures, repairs, implant-supported dentures: a lab inside the studio. CDCP and RAMQ accepted.",
    },
    emergencyLanding: {
      title: "Emergency dentist in Ahuntsic · Same day",
      description:
        "Pain or a broken tooth? Same-day emergency appointment possible during our hours. Call 514 863-7805.",
    },
    privacy: {
      title: "Privacy policy · Studio Dentaire De Facto",
      description:
        "What information the site collects, why, where it is processed and how to exercise your rights. Person in charge: Dr Bader Ramdani, general dentist.",
    },
    terms: {
      title: "Terms of use · Studio Dentaire De Facto",
      description: "The terms that govern the use of the studiodefacto.ca website.",
    },
    accessibility: {
      title: "Accessibility · Studio Dentaire De Facto",
      description:
        "Accessibility of the website and the studio: what is in place, its limits and how to reach us if you need help.",
    },
    thanks: {
      title: "Thank you · Studio Dentaire De Facto",
      description: "Your request has been sent to Studio Dentaire De Facto.",
    },
  },

  home: {
    eyebrow: "Dentist in Ahuntsic",
    h1Lines: ["Take your time.", "So do we."],
    lede:
      "A dental studio where you are welcomed as if into a home. Dr Bader Ramdani, general dentist, and the studio team welcome you at 728 Fleury Street East, in Montréal.",
    heroAlt: "The studio office, where we sit down to talk about the treatment plan",
    reel: [
      { n: "I", label: "The office" },
      { n: "II", label: "The treatment rooms" },
      { n: "III", label: "The workshop" },
    ],
    bookingBar: {
      title: "Book",
      motifLabel: "Reason",
      dayLabel: "Day",
      momentLabel: "Time of day",
      motifs: [
        { value: "examen", label: "Full exam (new patient)" },
        { value: "nettoyage", label: "Cleaning" },
        { value: "prothese", label: "Denture" },
        { value: "reparer", label: "Repair a tooth" },
        { value: "autre", label: "Other" },
        { value: "urgence", label: "Emergency" },
      ],
      days: [
        { value: "lundi", label: "Monday" },
        { value: "mardi", label: "Tuesday" },
        { value: "mercredi", label: "Wednesday" },
      ],
      moments: [
        { value: "matin", label: "Morning" },
        { value: "apres-midi", label: "Afternoon" },
        { value: "soir", label: "Evening (Wednesday only)" },
      ],
      any: "No preference",
      urgentMessage: "For an emergency, call {tel}.",
      note: "The studio calls you back to confirm the exact time.",
    },
    firstVisit: {
      eyebrow: "Your first visit",
      title: "In three steps",
      steps: [
        {
          title: "You book.",
          text: "Online, in a few clicks, or at {tel}. The studio calls you back to confirm.",
        },
        {
          title: "We examine you, without rushing.",
          text: "A full exam takes about one hour. We look at your whole mouth, not just the tooth that bothers you.",
        },
        {
          title: "We explain, you decide.",
          text: "You receive a written report, the possible options and what happens if nothing is done. The decision is yours.",
        },
      ],
      link: "All about the first visit",
    },
    rooms: {
      eyebrow: "The studio, room by room",
      title: "A house, room by room",
      items: [
        {
          n: "I",
          image: "planification",
          title: "The office.",
          text: "We sit at a table to talk about your health and your treatment plan. Not in the chair, not in a hurry.",
          alt: "The planning office, with its table and chairs",
        },
        {
          n: "II",
          image: "salle-1",
          title: "The treatment rooms.",
          text: "Two bright rooms, equipped for exams, prevention and treatments.",
          alt: "A bright treatment room",
        },
        {
          n: "III",
          image: "laboratoire",
          title: "The workshop.",
          text: "The digital design room and the lab, where we make crowns, dentures, night guards and whitening trays.",
          alt: "The studio lab",
        },
      ],
      link: "Visit the studio",
    },
    services: {
      eyebrow: "Services",
      title: "Our range of care",
      intro: "The services of a general dentist, in four groups.",
      urgentTitle: "Dental emergency",
      urgentText: "Same-day appointment possible during our hours.",
      link: "All services",
    },
    method: {
      eyebrow: "The De Facto method",
      title: "We don't build on sand.",
      text: "Before repairing, we make sure your mouth is healthy. Before you decide, we make sure you have understood. Each plan is presented to you in three versions, from comprehensive to simple, and we always tell you what happens if nothing is done.",
      link: "Discover the De Facto method",
    },
    lab: {
      eyebrow: "A lab inside the studio",
      title: "Made a few steps from the chair",
      text: "Your crowns, dentures, night guards and whitening trays are designed and made right here, a few steps from the chair. Adjustments are done on site, and the dentist can speak directly with the person who makes your piece.",
      link: "See the lab",
      alt: "A ceramic crown being finished",
    },
    coverage: {
      eyebrow: "Coverage and payment",
      title: "What we accept",
      items: [
        { title: "CDCP", text: "Canadian Dental Care Plan accepted." },
        {
          title: "RAMQ",
          text: "Children under 10 and people receiving last-resort financial assistance, for covered services.",
        },
        { title: "Private insurance", text: "Accepted." },
        { title: "Payment", text: "Cash, debit, credit card." },
      ],
    },
    practical: {
      eyebrow: "Practical information",
      title: "At 728 Fleury Street East",
      parking: "Street parking and private parking.",
      bus: "Bus 140 stops in front of the studio.",
      link: "Directions and access",
    },
    final: {
      lines: ["Understand first.", "Then treat."],
    },
  },

  firstVisit: {
    eyebrow: "First visit",
    h1: "Your first visit to the dentist, in Ahuntsic",
    intro:
      "A first visit at Studio De Facto is a real check-up. We take the time to listen to you, examine your whole mouth and explain what we see. You leave knowing where you stand, with no obligation to start treatment.",
    heroAlt: "The office where we go over the written report, seated at a table",
    twoVisits: {
      title: "A full check-up, in two visits",
      items: [
        {
          title: "The exam (about one hour).",
          text: "We listen to your needs, review your health, and examine your teeth, gums and whole mouth. X-rays are taken only if they are useful. The cleaning can be done at the same visit, depending on your needs; the visit then lasts about an hour and a half.",
        },
        {
          title: "The explanation, in the office.",
          text: "We sit at a table to go over your written report together: what is going well, what needs attention, the possible options and their costs. You decide what comes next, at your own pace.",
        },
      ],
    },
    sixSteps: {
      title: "What happens during the exam, in six steps",
      items: [
        { title: "You tell us.", text: "Why you are coming, what bothers you, what you would like." },
        {
          title: "Your health.",
          text: "Your medications, medical conditions and allergies. Many of them affect the mouth.",
        },
        {
          title: "The mouth exam.",
          text: "Teeth, gums, jaw, tongue, cheeks and bite. We also note what is normal: it is your starting point.",
        },
        {
          title: "Tools, as needed.",
          text: "X-rays, photos or a digital impression, only when they provide an answer.",
        },
        { title: "The summary.", text: "What is active, what is stable, what can wait." },
        { title: "The plan.", text: "What we suggest, in what order, and why." },
      ],
      roomAlt: "A treatment room at the studio",
    },
    bring: {
      title: "What to bring",
      minTitle: "At a minimum",
      min: [
        "Your health insurance card (RAMQ)",
        "Your Canadian Dental Care Plan (CDCP) card, if you are enrolled",
        "Your private dental insurance card, if you have one",
        "The list of your medications (or the containers)",
        "Any other useful health information: medical conditions, allergies, recent surgeries",
      ],
      idealTitle: "If possible",
      ideal: [
        "Your previous dental record",
        "Your dental X-rays taken in the last 2 years",
        "Your panoramic X-ray taken in the last 5 years",
      ],
      note: "Your previous X-rays may avoid having to take new ones. You can ask your former clinic for a copy of your record; it is your right.",
    },
    coverage: {
      title: "Coverage and payment",
      items: [
        "**Canadian Dental Care Plan (CDCP):** accepted. Bring your card. To find out if you are eligible: [Canadian Dental Care Plan](https://www.canada.ca/en/services/benefits/dental/dental-care-plan.html).",
        "**RAMQ:** many services are covered for children under 10 and for people receiving financial assistance who have a claim booklet. [See the services covered by RAMQ](https://www.ramq.gouv.qc.ca/en/citizens/health-insurance/dental-services).",
        "**Private insurance:** accepted.",
        "**Payment:** cash, debit or credit card.",
      ],
      estimate: "Before any treatment, you receive a written cost estimate.",
    },
    goodToKnow: {
      title: "Good to know",
      items: [
        {
          title: "Access",
          text: "The studio is on the second floor, with stairs at the entrance. It is not wheelchair accessible. If stairs are difficult for you, call us before you come.",
        },
        {
          title: "Afraid of the dentist?",
          text: "Let us know when you book. We explain each step before doing it, and you can ask for a break at any time.",
        },
        {
          title: "Cancellation",
          text: "Let us know at least 24 hours in advance, ideally 48 hours. A second missed appointment without notice leads to a $50 fee, a third to a $100 fee. After several missed appointments, the studio may end your follow-up, with notice, and send your record to the clinic of your choice.",
        },
        {
          title: "Health questionnaire",
          text: "You fill it out at the studio when you arrive. Your answers are added to your record. A secure online questionnaire will be offered later.",
        },
      ],
    },
    final: { title: "Ready for your first visit?", or: "or" },
  },

  servicesIndex: {
    eyebrow: "Services",
    h1: "Dental services in Ahuntsic",
    intro:
      "Studio De Facto offers the services of a general dentist: prevent, repair, replace and align. Every treatment starts with an exam and a clear explanation. When your situation calls for a dental specialist, we refer you to a colleague and remain your point of contact.",
    heroAlt: "A treatment room at the studio",
    familyImages: {
      prevenir: { image: "salle-1", alt: "Treatment room" },
      reparer: { image: "couronne-macro", alt: "Ceramic crown" },
      remplacer: { image: "laboratoire", alt: "The lab" },
      aligner: { image: "cadcam", alt: "The digital design room" },
    },
    urgent: {
      title: "Dental emergency",
      text: "Pain, broken tooth, swelling? Same-day appointment possible during our hours. Call {tel}.",
      link: "What to do in an emergency",
    },
  },

  emergency: {
    eyebrow: "Emergency",
    h1: "Dental emergency in Ahuntsic",
    banner:
      "Pain, broken tooth, swelling? Call {tel}. A same-day emergency appointment is possible during our opening hours.",
    how: {
      title: "How it works",
      callOnly: "Call us at {tel} during our opening hours.",
      steps: [
        "Call us or fill out the emergency request form below.",
        "A receptionist calls you back to understand the situation and give you a time.",
        "Come only after this phone confirmation. Without confirmation, we cannot be sure a dentist will be available to see you.",
      ],
    },
    fees: {
      title: "Our fees, upfront",
      text: "Regular price of a basic emergency appointment: $61 for the emergency exam, plus $44 if an X-ray of the tooth (periapical, one image) is needed. Depending on what we find, additional fees may apply for care given during the visit. We explain them to you before we start.",
      rows: [
        ["Emergency exam", "$61"],
        ["X-ray of the tooth (periapical, one image), if needed", "$44"],
      ],
    },
    when: {
      title: "When to call",
      items: [
        "Severe tooth pain, or pain that wakes you up",
        "A tooth that is broken, cracked or knocked loose after a blow",
        "Swelling of the gum or face",
        "A crown, filling or denture that is broken or has come off",
        "Bleeding after an extraction",
      ],
      hours: "Hours to reach the studio: Monday and Tuesday, 10 a.m. to 6 p.m.; Wednesday, 3 p.m. to 8 p.m.",
    },
    afterHours: {
      title: "Outside our hours",
      text: "If you have signs of an infection spreading in the body (fever, chills, facial swelling that is getting worse, difficulty swallowing or breathing, extreme tiredness), go to a hospital emergency room right away or call 911. For a health question, call Info-Santé 811.",
    },
    formTitle: "Emergency request",
    formIntro: "The form is read during our opening hours. If the pain is severe, call instead.",
    formUnavailable:
      "The emergency request form is not in service yet. Call {tel} during our opening hours.",
    faq: [
      {
        q: "Do you see emergencies for people who are not patients of the studio?",
        a: "Yes, depending on our availability that day.",
      },
      {
        q: "Can you prescribe something over the phone?",
        a: "No. An assessment is needed to know what to do.",
      },
    ],
    related: ["canal", "extraction", "reparation"],
  },

  method: {
    eyebrow: "The method",
    h1: "The De Facto method: understand before treating",
    intro:
      "At Studio De Facto, our goal is not for you to accept a treatment. Our goal is for you to understand your mouth. A patient who understands their situation can make a better-informed decision, and decides for themselves. One sentence sums up the way we work: we don't build on sand.",
    heroAlt: "The planning office",
    stages: {
      title: "A path in five stages",
      note: "A stage is a group of goals, never a level of severity. It is not like the stages of a disease.",
      hint: "Choose a stage to read its description.",
      items: [
        {
          n: "0",
          name: "Understand",
          text: "The full exam and, if needed, additional tests. We establish the starting picture.",
        },
        {
          n: "1",
          name: "Stabilize",
          text: "First, we control infection and inflammation: active cavities, diseased gums, infected teeth.",
        },
        {
          n: "2",
          name: "Restore function",
          text: "We repair what is needed to chew well and be comfortable, working with your mouth as it is today.",
        },
        {
          n: "3",
          name: "Maintain",
          text: "Prevention and follow-up. This stage begins at the first appointment and never ends.",
        },
        { n: "4", name: "Rebuild and enhance", text: "A broader transformation, if that is your goal." },
      ],
      stageLabel: "Stage",
      footnote:
        "Stages 2 and 4 are two possible paths after stage 1; both lead to maintenance. Stage 4 is neither required nor above stage 2. An emergency is treated separately, at any time.",
    },
    checks: {
      title: "Four checks before moving forward",
      items: [
        ["Do we understand enough?", "end of stage 0"],
        ["Are active diseases under control?", "end of stage 1"],
        ["Are the foundations reliable?", "before each restoration, tooth by tooth"],
        ["Are we ready for a broader transformation?", "before stage 4"],
      ],
      note: "When a check does not pass, we postpone the next step. It is not a failure: your mouth sets the pace.",
    },
    plans: {
      title: "Three plans, and the status quo",
      intro: "For each situation, we present three nested plans:",
      items: [
        { k: "A", name: "Smile", text: "a full reconstruction." },
        { k: "B", name: "Essential", text: "what is needed, tooth by tooth." },
        { k: "C", name: "Stability", text: "control the disease and keep what can be kept." },
      ],
      nested:
        "Plan C is contained in plan B, and plan B in plan A. The stabilization is the same in all three: you choose how far to rebuild, never the quality of care.",
      statusQuo:
        "We also always present the status quo: what can stay stable, what may change, the signs to watch for and the follow-up schedule. Without judgment.",
    },
    outcome: {
      title: "What you will know at the end of the exam",
      items: [
        ["The findings", "what is going well, and what is not."],
        ["The priorities", "what is urgent, what can wait, what is optional."],
        ["The decisions", "the options, their benefits, their limits and their costs."],
        ["The direction", "the order of the steps and the suggested follow-up."],
      ],
      note: "The plan is explained to you in the office, seated at a table, never in the chair. You receive a written report.",
    },
    final: { title: "Start with stage 0." },
  },

  lab: {
    eyebrow: "Lab",
    h1: "A dental lab inside the studio, in Ahuntsic",
    intro:
      "At Studio De Facto, your crowns, dentures, night guards and whitening trays are designed and made a few steps from the chair. The dentist and the lab team look at your case, your shade and your bite together. Try-ins and adjustments are done on site.",
    heroAlt: "The studio lab, wide view",
    benefits: {
      title: "What this means for you",
      items: [
        {
          title: "We see you in person.",
          text: "The shade of a crown or the shape of a complete denture is checked in your mouth, not only on a photo.",
        },
        { title: "Adjustments are done here.", text: "A touch-up does not require sending the piece elsewhere." },
        {
          title: "One team.",
          text: "The people who plan your treatment speak directly with the people who make the piece.",
        },
      ],
    },
    steps: {
      title: "From digital to finished, in four steps",
      items: [
        {
          title: "The digital impression.",
          text: "A scanner in the mouth replaces impression paste for most pieces.",
          image: "cadcam",
          alt: "The digital design room",
        },
        {
          title: "The design.",
          text: "The piece is designed on the computer, on a model of your mouth.",
          image: "cadcam-nuit",
          alt: "The design station, in the evening",
        },
        {
          title: "Fabrication.",
          text: "Milling of zirconia, pressing of ceramic or 3D printing, depending on the piece.",
          image: "laboratoire-cure",
          alt: "A lab machine in operation",
        },
        {
          title: "Finishing by hand.",
          text: "Staining, glazing, polishing and a check before placement.",
          image: "couronne-macro",
          alt: "A ceramic crown being finished",
        },
      ],
    },
    made: {
      title: "What we make here",
      items: [
        "Zirconia or ceramic crowns and bridges",
        "Ceramic veneers",
        "Complete and partial dentures (the metal framework of partials is cast by a partner lab)",
        "Night guards for teeth grinding (bruxism) and whitening trays",
        "Guides and models to plan treatments",
      ],
    },
    equipment: {
      title: "The equipment",
      text: "Intraoral scanner, Exocad design software, Formlabs printer, VHF milling machine and Ivoclar furnaces.",
    },
    team: {
      title: "The lab team",
      text: "The lab is under the responsibility of a dental prosthesis and appliance technologist, a member of the Ordre des technologues en prothèses et appareils dentaires du Québec.",
    },
    galleryTitle: "The workshop in pictures",
    gallery: [
      { image: "laboratoire-droit", alt: "The lab, right side" },
      { image: "laboratoire-poste", alt: "A lab workstation" },
      { image: "cadcam-nuit", alt: "The digital design room, in the evening" },
    ],
    final: { title: "Need a crown or a denture?", text: "Start with an exam." },
  },

  about: {
    eyebrow: "About",
    h1: "About Studio Dentaire De Facto",
    intro:
      "Studio Dentaire De Facto is an independent studio on Fleury Street East, in Ahuntsic. We are not part of any chain. We designed the space to take our time: an office to talk, bright rooms to provide care, a lab to make what you need.",
    heroAlt: "The studio front at 728 Fleury Street East",
    rooms: {
      title: "The studio, room by room",
      hint: "Scroll",
      items: [
        {
          image: "entree",
          title: "The front.",
          text: "At 728 Fleury Street East, upstairs.",
          alt: "The front of the studio and the entrance stairs",
        },
        {
          image: "attente",
          title: "The waiting room.",
          text: "A living room rather than a waiting room, with coffee.",
          alt: "The waiting room, set up like a living room",
        },
        {
          image: "couloir",
          title: "The hallway.",
          text: "The hallway leading to the rooms is a small art gallery.",
          alt: "The hallway and its artwork",
        },
        {
          image: "planification",
          title: "The office.",
          text: "For questionnaires and explaining the treatment plan, seated at a table.",
          alt: "The planning office",
        },
        { image: "salle-1", title: "Room 1.", text: "A treatment room.", alt: "Treatment room 1" },
        { image: "salle-2", title: "Room 2.", text: "A treatment room.", alt: "Treatment room 2" },
        {
          image: "cadcam",
          title: "The CAD-CAM room.",
          text: "Where pieces are designed on the computer.",
          alt: "The digital design room",
        },
        { image: "laboratoire", title: "The lab.", text: "Where they are made.", alt: "The lab" },
      ],
    },
    dentist: {
      title: "The dentist",
      text: "Dr Bader Ramdani, general dentist. Graduated in dental medicine from Université Laval in 2021, member of the Ordre des dentistes du Québec. He sees patients in French and in English.",
    },
    team: {
      title: "The studio team",
      text: "The studio team welcomes you, calls you to confirm your appointments, helps you with your insurance and supports you from one visit to the next.",
    },
    infection: {
      title: "Infection prevention",
      text: "Instruments are cleaned and sterilized after each patient, and surfaces are disinfected between appointments, according to the standards in force in Quebec.",
    },
    community: {
      title: "In the community",
      text: "The studio gives free oral health workshops with local community organizations.",
    },
    final: { title: "Come and see the studio." },
  },

  contact: {
    eyebrow: "Contact",
    h1: "Contact and directions",
    intro: "Everything you need on the day of your appointment: address, hours, bus, metro and parking.",
    heroAlt: "The studio front at 728 Fleury Street East",
    details: {
      title: "Contact information",
      address: "Address",
      phone: "Phone",
      email: "Email",
      hours: "Hours",
    },
    map: {
      title: "Map",
      show: "Show the map",
      directions: "Directions in Google Maps",
      consent:
        "The map is provided by Google, which sets cookies. It loads only if you click “Show the map”.",
      iframeTitle: "Google map of 728 Fleury Street East",
      alt: "The studio front, seen from Fleury Street East",
    },
    getting: {
      title: "Getting to the studio",
      items: [
        {
          title: "By bus",
          text: "Line 140 Fleury stops across from the studio. It connects to Sauvé metro station and runs along Fleury Street to Montréal-Nord.",
        },
        { title: "By metro", text: "Sauvé and Henri-Bourassa stations (orange line)." },
        { title: "By car", text: "About 10 minutes from highways 15 and 40." },
        {
          title: "Parking",
          text: "On the street, and private parking behind the building, with the entrance on Saint-Hubert Street.",
        },
      ],
    },
    areas: {
      title: "From your neighbourhood",
      items: [
        ["Ahuntsic", "on Fleury Street East, close to the shops of the Promenade Fleury."],
        ["Montréal-Nord", "line 140 follows Fleury Street to the studio."],
        ["Villeray", "take the orange line to Sauvé, then line 140."],
        ["Saint-Michel", "take Saint-Michel Boulevard to Fleury Street, where line 140 runs."],
        ["Cartierville", "take Henri-Bourassa Boulevard or Highway 15."],
        [
          "South Laval (Pont-Viau, Laval-des-Rapides)",
          "take the orange line to Henri-Bourassa, or Highway 15 or the Viau Bridge.",
        ],
      ],
    },
    access: {
      title: "Accessibility",
      text: "The studio is on the second floor. Stairs lead to the entrance. The studio is not wheelchair accessible. Call us if stairs are a problem for you: we will help you find a solution.",
    },
    formTitle: "Write to us",
    formUrgent: "For an emergency, call {tel}; this form is not monitored at all times.",
  },

  booking: {
    eyebrow: "Appointments",
    h1: "Book an appointment at Studio De Facto",
    intro:
      "Choose the reason for your visit, then an open time. The studio calls you back to confirm the time and answer your questions. Would you rather talk to someone? Call {tel}.",
    introNoOnline:
      "Leave us your contact information and the reason for your visit. The studio calls you back to set the time and answer your questions. Would you rather talk to someone? Call {tel}.",
    online: {
      title: "The online schedule",
      text: "The schedule opens in a new tab, on the studio's Google booking page.",
      button: "Open the online schedule",
      privacy:
        "Google stores the name, phone number and email entered in the schedule, outside Quebec. See our [privacy policy](page:privacy).",
    },
    request: {
      title: "Request an appointment",
      titleAlt: "Would you rather we call you back?",
      text: "Leave your contact information and preferences. The studio calls you back during opening hours to set the time.",
    },
    motifs: {
      title: "Reasons for a visit and how long they take",
      head: ["Reason", "Length", "Online"],
      rows: [
        ["Full exam (new patient)", "60 min", "Yes"],
        ["Full exam and cleaning (new patient)", "90 min", "Yes"],
        ["Cleaning (studio patient)", "60 min", "Yes"],
        ["Focused consultation (denture, esthetics, second opinion)", "30 min", "Yes"],
        ["Emergency", "30 min", "No: call 514 863-7805"],
        ["Repair a tooth or a denture", "Depends on the case", "No: call, so we can assess properly"],
      ],
    },
    urgentNotice: "For an emergency, call {tel}. Emergencies cannot be booked online.",
    after:
      "After your request, the studio team will call you to confirm your appointment and tell you what to bring. To cancel or reschedule, call {tel}.",
  },

  faq: {
    eyebrow: "Frequently asked questions",
    h1: "Frequently asked questions",
    intro: "The questions new patients ask us most often. Can't find yours? Call {tel}.",
    groups: [
      {
        title: "Appointments",
        items: [
          { q: "Do you accept new patients?", a: "Yes. [Book online](page:booking) or call {tel}." },
          {
            q: "How long is the first appointment?",
            a: "The full exam takes about one hour. The plan is then explained in the office.",
          },
          {
            q: "Are you open evenings or weekends?",
            a: "Wednesday until 8 p.m. The studio is closed Thursday to Sunday.",
          },
          {
            q: "How do I cancel or reschedule an appointment?",
            a: "Call {tel} at least 24 hours in advance, ideally 48 hours. Fees apply starting with the second missed appointment without notice.",
          },
        ],
      },
      {
        title: "Coverage and costs",
        items: [
          {
            q: "Do you accept the Canadian Dental Care Plan (CDCP)?",
            a: "Yes. Bring your card to your first visit.",
          },
          {
            q: "Does RAMQ cover dental care?",
            a: "For children under 10 and for people receiving financial assistance who have a claim booklet, many services are covered.",
          },
          { q: "Do you accept my private insurance?", a: "Yes. Bring your insurance card." },
          { q: "What payment methods do you accept?", a: "Cash, debit and credit card." },
          {
            q: "Will I know the price before a treatment?",
            a: "Yes. You receive a written estimate before we start, and you decide.",
          },
        ],
      },
      {
        title: "Care",
        items: [
          {
            q: "I'm afraid of the dentist. What do you do?",
            a: "We explain each step before doing it, and you can ask for a break at any time. Let us know when you book.",
          },
          {
            q: "Will I have to start treatment after the exam?",
            a: "No. You receive the information and the options, including what happens if nothing is done.",
          },
          {
            q: "Do you do implants?",
            a: "We assess, we refer you to a colleague for placement, then we make the crown or denture and do the follow-up. [Implants: assessment and referral](svc:implants).",
          },
          {
            q: "Do you see emergencies?",
            a: "Yes, the same day if possible, during our hours. Call first; please do not come in without confirmation. [Dental emergency](page:emergency).",
          },
        ],
      },
      {
        title: "Access",
        items: [
          {
            q: "Is there parking?",
            a: "Yes: on the street, and private parking behind the building, with the entrance on Saint-Hubert Street.",
          },
          {
            q: "Is the studio wheelchair accessible?",
            a: "No. It is on the second floor, with stairs at the entrance.",
          },
        ],
      },
    ],
  },

  landings: {
    infoTitle: "Practical information",
    faqTitle: "Frequently asked questions",
    coverageLine: "Canadian Dental Care Plan (CDCP), RAMQ and private insurance accepted",
    newPatient: {
      eyebrow: "New patients",
      h1: "A dentist in Ahuntsic accepting new patients",
      text: "A full exam of about one hour, a written report and a clear explanation of your options. You decide what comes next.",
      points: ["Exam of about one hour", "Written report provided", "Lab inside the studio"],
      heroImage: "planification",
      heroAlt: "The office where we go over the written report",
      motif: "examen",
      learnMore: "examen",
      offer: {
        title: "Opening offer for new adult patients",
        regularLabel: "Regular price",
        regular: "$513",
        openingLabel: "Opening price",
        opening: "$289",
        includesTitle: "Includes",
        includes:
          "Full exam ($197), panoramic X-ray ($110), polishing ($81), 30-minute scaling ($125) and a written report, over two visits. Intraoral X-rays are included in the price of the full exam.",
        extra:
          "Also included at no charge: the full gum exam and, if needed, the exam of crowns, bridges or dentures (regular price $148 each).",
        excludesTitle: "Does not include",
        excludes: "Scaling beyond 30 minutes and the treatments recommended after the check-up.",
        validity: "For the first 100 adults, until January 1, 2027.",
      },
      faq: [0, 1],
    },
    dentures: {
      eyebrow: "Dentures",
      h1: "Dentures in Ahuntsic, with an on-site lab",
      text: "Partial or complete denture, repair or implant-supported denture: try-ins and adjustments are done in the studio, with our lab.",
      points: ["Lab inside the studio", "Denture repair", "CDCP accepted"],
      heroImage: "laboratoire",
      heroAlt: "The studio lab",
      motif: "prothese",
      broken: "Broken denture? Call {tel}",
      learnMore: "complete",
      faqItems: [
        {
          q: "How many appointments does a new denture take?",
          a: "Several: impressions, try-ins and adjustments. You are given the schedule at the exam.",
        },
        {
          q: "Do you repair broken dentures?",
          a: "Yes, with our on-site lab. Call for an appointment.",
        },
      ],
    },
    emergency: {
      eyebrow: "Dental emergency",
      h1: "Dental emergency in Ahuntsic: same-day appointments",
      text: "Pain, broken tooth or swelling? Call us. A receptionist assesses your situation and gives you a time, the same day if possible.",
      formButton: "Emergency request by form",
      boxTitle: "Before you come",
      box: [
        "Basic regular price: emergency exam $61, plus $44 if an X-ray of the tooth is needed.",
        "Additional fees may apply depending on the care given during the visit; we explain them to you before we start.",
        "Please do not come in without phone confirmation.",
      ],
    },
  },

  forms: {
    required: "required",
    optional: "optional",
    name: "First and last name",
    phone: "Phone",
    email: "Email",
    firstVisit: "First visit to the studio?",
    yes: "Yes",
    no: "No",
    coverage: "Coverage",
    coverageOptions: ["Canadian Dental Care Plan (CDCP)", "RAMQ", "Private insurance", "None", "I don't know"],
    motif: "Reason",
    day: "Preferred day",
    moment: "Preferred time of day",
    subject: "Subject",
    subjects: ["Information", "Insurance and CDCP", "Copy of my record", "Other"],
    message: "Message",
    noHealth: "Do not enter any health information in this form. We will talk about it by phone or at the studio.",
    noHealthBooking: "Do not describe your health here; we will talk about it during the call.",
    situation: "Type of situation",
    situations: ["Pain", "Broken tooth", "Swelling", "Denture", "Other"],
    urgentConsent:
      "I understand that minimum fees apply to an emergency appointment, that additional fees may apply, and that I must wait for the confirmation call before coming in.",
    privacyNote: "The information you send is used only to handle your request. [Privacy policy](page:privacy).",
    encrypted: "Your request is encrypted in your browser before it is sent; only the studio can read it.",
    honeypot: "Do not fill in this field",
    send: "Send",
    sendRequest: "Send my request",
    sending: "Sending…",
    error: "Sending did not work. Try again in a few minutes or call {tel}.",
    errorFields: "Check the required fields, then send again.",
  },

  thanks: {
    eyebrow: "Thank you",
    titles: {
      rendezvous: "Your request has been sent.",
      contact: "Your message has been sent.",
      urgence: "Your emergency request has been sent.",
    },
    texts: {
      rendezvous:
        "The studio team will call you during our opening hours to confirm your appointment and tell you what to bring. To cancel or reschedule, call {tel}. Address: 728 Fleury Street East, Montréal, second floor.",
      contact: "We will reply during our opening hours. For an emergency, call {tel}.",
      urgence:
        "Thank you. A receptionist will call you back during our opening hours. If your situation gets worse, call {tel}. Please do not come in without phone confirmation.",
    },
    back: "Back to home",
  },

  notFound: {
    title: "Page not found",
    text: "This address does not exist or has changed. The main pages are available from the menu.",
    back: "Back to home",
  },

  privacy: {
    eyebrow: "Privacy",
    h1: "Privacy policy",
    updated: "Last updated: October 7, 2026",
    sections: [
      {
        title: "Who is responsible",
        paras: [
          "Studio Dentaire De Facto, 728 Fleury Street East, Montréal, Quebec H2C 1P1, is responsible for the personal information collected by this site.",
          "Person in charge of the protection of personal information: Dr Bader Ramdani, general dentist, owner of the studio. Email: {email}. Phone: {tel}.",
        ],
      },
      {
        title: "The laws that apply",
        paras: [
          "Health information added to your dental record is governed by the Act respecting health and social services information. Other personal information, such as the contact information you send through the site, is governed by the Act respecting the protection of personal information in the private sector.",
        ],
      },
      {
        title: "What the site collects, and why",
        list: [
          "**Appointment request:** name, phone number, email, whether it is your first visit, type of coverage, preferred day and time of day. To call you back and set the appointment.",
          "**Contact form:** name, email, phone number, subject and message. To answer your request.",
          "**Emergency request:** name, phone number, email (optional) and type of situation. This information is encrypted in your browser before it is sent, and only the studio can read it.",
          "**Online schedule:** if you book through the online schedule, Google's booking page collects your name, phone number and email.",
        ],
        paras: [
          "Our forms do not ask for any health information. Please do not enter any: we will talk about it by phone or at the studio.",
        ],
      },
      {
        title: "Where your information goes",
        paras: [
          "Forms are not stored on the site. They are sent directly, by email encrypted in transit, to the studio's mailbox hosted by Google Workspace.",
        ],
        list: [
          "**Netlify** (website hosting, United States): receives the technical data of each visit (IP address, browser) and passes the forms through without storing them.",
          "**Google** (studio email, online schedule and map, servers in Canada and outside Canada): receives the requests sent to the studio and the bookings made in the online schedule.",
          "**Cloudflare** (domain name and audience measurement, servers in several countries): counts visits without cookies and without individual profiles.",
        ],
        paras2: [
          "Before entrusting information to a provider located outside Quebec, the studio assesses the privacy factors and governs the transfer by contract.",
        ],
      },
      {
        title: "Cookies",
        paras: [
          "The site does not set any advertising or analytics cookies. Cloudflare's audience measurement works without cookies.",
          "The Google map on the Contact page sets Google cookies: it loads only if you click “Show the map”.",
        ],
      },
      {
        title: "How long we keep it",
        paras: [
          "A request that does not lead to an appointment is deleted from the studio's mailbox no later than 6 months after it is received. A request that leads to an appointment is added to your record, which is kept according to the rules of the Ordre des dentistes du Québec.",
        ],
      },
      {
        title: "Your rights",
        paras: [
          "You can ask to see your information, have it corrected, withdraw your consent or receive a copy of your record. Write to the person in charge of the protection of personal information at {email}. We reply within 30 days.",
          "You can also file a complaint with the [Commission d'accès à l'information du Québec](https://www.cai.gouv.qc.ca/english).",
        ],
      },
      {
        title: "Security and incidents",
        paras: [
          "The site uses an encrypted connection (HTTPS) and security headers. Access to the studio's accounts is limited to the people who need it for their work. In the event of a confidentiality incident, the studio records it in its register and, if there is a risk of serious injury, notifies the people concerned and the Commission d'accès à l'information du Québec.",
        ],
      },
    ],
  },

  terms: {
    eyebrow: "Terms",
    h1: "Terms of use",
    updated: "Last updated: October 7, 2026",
    sections: [
      {
        title: "Purpose of the site",
        paras: [
          "The studiodefacto.ca website presents Studio Dentaire De Facto and the services of Dr Bader Ramdani, general dentist. By using it, you accept these terms.",
        ],
      },
      {
        title: "General information",
        paras: [
          "The information on the site is general. It does not replace a dental exam and is not professional advice about your situation. Only an exam can tell what is right for you.",
          "A request sent through the site is not an appointment until the studio has confirmed it by phone.",
        ],
      },
      {
        title: "Emergencies",
        paras: [
          "The forms are not monitored at all times. For an emergency, call {tel} during our hours. Outside our hours, if there are signs of a spreading infection, go to a hospital emergency room or call 911. For a health question, call Info-Santé 811.",
        ],
      },
      {
        title: "Prices",
        paras: [
          "The prices shown are those in effect when published, with their conditions. You receive a written estimate before any treatment.",
        ],
      },
      {
        title: "Intellectual property",
        paras: [
          "The texts, photos and logos on the site belong to Studio Dentaire De Facto. Any reproduction requires written permission.",
        ],
      },
      {
        title: "External links",
        paras: [
          "The site links to public websites (RAMQ, Canadian Dental Care Plan, Google Maps). The studio is not responsible for their content.",
        ],
      },
      {
        title: "Governing law",
        paras: ["These terms are governed by the laws of Quebec."],
      },
    ],
  },

  accessibility: {
    eyebrow: "Accessibility",
    h1: "Accessibility",
    updated: "Last updated: October 7, 2026",
    sections: [
      {
        title: "The website",
        paras: ["The site aims for level AA of the Web Content Accessibility Guidelines (WCAG 2.1)."],
        list: [
          "Body text of at least 16 pixels, with checked contrast.",
          "Full keyboard navigation, with a link to skip directly to the content.",
          "Photos described with alternative text.",
          "Reduced animations if your device asks for it.",
          "Content readable even without JavaScript.",
        ],
      },
      {
        title: "The studio",
        paras: [
          "The studio is on the second floor. Stairs lead to the entrance and the studio is not wheelchair accessible. Call us if stairs are a problem for you: we will help you find a solution.",
          "Dr Bader Ramdani, general dentist, sees patients in French and in English.",
        ],
      },
      {
        title: "Report a problem",
        paras: [
          "Is a page hard to read or use? Write to us at {email} or call {tel}. We will fix the problem or give you the information another way.",
        ],
      },
    ],
  },
}
