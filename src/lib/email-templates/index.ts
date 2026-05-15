/**
 * Email template router for Netlify Forms notifications.
 *
 * Selects the right template based on form_name and renders the email to
 * dentist's inbox. Each form has its own template tuned for its content.
 *
 * Returns:
 * - html: rendered HTML body
 * - subject: email subject line
 * - replyTo: patient email when relevant (for direct reply)
 */

import { baseLayout, section, row, longText, checkboxList, alertBox, heading, subtitle, formatDate } from "./base"

export interface EmailTemplate {
  html: string
  subject: string
  replyTo?: string
}

export interface NetlifyPayload {
  form_name: string
  data: Record<string, string | string[] | undefined>
  created_at?: string
  site_url?: string
}

const NETLIFY_DASHBOARD = "https://app.netlify.com/projects/defactodentiste/forms"

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

function getString(data: Record<string, unknown>, key: string): string {
  const v = data[key]
  if (typeof v === "string") return v
  if (Array.isArray(v)) return v.join(", ")
  return ""
}

function isChecked(data: Record<string, unknown>, key: string): boolean {
  const v = data[key]
  return v === "1" || v === "true" || v === "on"
}

/* -------------------------------------------------------------------------- */
/* CONTACT FORM                                                                */
/* -------------------------------------------------------------------------- */

function renderContact(payload: NetlifyPayload): EmailTemplate {
  const d = payload.data
  const name = getString(d, "name")
  const email = getString(d, "email")
  const phone = getString(d, "phone")
  const subject = getString(d, "subject")
  const message = getString(d, "message")

  const subjectMap: Record<string, string> = {
    general: "Question générale",
    rdv: "Rendez-vous",
    assurance: "Assurance",
    urgence: "Urgence",
    professionnel: "Demande professionnelle",
    laboratoire: "Laboratoire",
    autre: "Autre",
  }
  const subjectLabel = subjectMap[subject] || subject

  const body = `
    ${heading("Nouvelle demande de contact")}
    ${subtitle(`Reçue le ${formatDate(payload.created_at || new Date().toISOString())}`)}

    ${section("Coordonnées", `
      ${row("Nom", name)}
      ${row("Courriel", email)}
      ${row("Téléphone", phone)}
    `)}

    ${section("Sujet", row("Catégorie", subjectLabel))}

    ${section("Message", longText("", message))}
  `

  return {
    subject: `[Contact] ${name || "Nouvelle demande"}`,
    html: baseLayout({ preheader: `${name} — ${subjectLabel}`, brandLabel: "Demande de contact", body }),
    replyTo: email,
  }
}

/* -------------------------------------------------------------------------- */
/* APPOINTMENT FORM (form principal patient)                                  */
/* -------------------------------------------------------------------------- */

function renderAppointment(payload: NetlifyPayload): EmailTemplate {
  const d = payload.data
  const firstName = getString(d, "firstName")
  const lastName = getString(d, "lastName")
  const phone = getString(d, "phone")
  const email = getString(d, "email")
  const language = getString(d, "preferredLanguage")
  const languageOther = getString(d, "preferredLanguageOther")
  const typeDemande = getString(d, "typeDemande")
  const typeDemandeOther = getString(d, "typeDemandeOther")
  const message = getString(d, "message")

  const typeMap: Record<string, string> = {
    premiere_visite: "Première visite / examen complet",
    nettoyage: "Nettoyage et suivi",
    consultation_ciblee: "Consultation ciblée",
    urgence: "Urgence dentaire",
    douleur: "Douleur",
    dent_cassee: "Dent cassée ou restauration fracturée",
    esthetique: "Esthétique",
    orthodontie: "Orthodontie / aligneurs",
    implant_couronne: "Implant / couronne / prothèse",
    laboratoire: "Laboratoire ou demande professionnelle",
    autre: "Autre",
  }

  const motifsList = [
    { key: "motif_douleur", label: "Douleur" },
    { key: "motif_sensibilite", label: "Sensibilité" },
    { key: "motif_saignement_gencives", label: "Saignement des gencives" },
    { key: "motif_mauvaise_haleine", label: "Mauvaise haleine" },
    { key: "motif_dent_mobile", label: "Dent mobile" },
    { key: "motif_fracture", label: "Fracture" },
    { key: "motif_usure", label: "Usure dentaire" },
    { key: "motif_serrement_grincement", label: "Serrement ou grincement" },
    { key: "motif_esthetique", label: "Préoccupation esthétique" },
    { key: "motif_deuxieme_avis", label: "Deuxième avis" },
    { key: "motif_suivi_traitement", label: "Suivi de traitement existant" },
    { key: "motif_autre", label: "Autre" },
  ]

  const joursList = [
    { key: "jour_lundi", label: "Lundi" },
    { key: "jour_mardi", label: "Mardi" },
    { key: "jour_mercredi", label: "Mercredi" },
    { key: "jour_jeudi", label: "Jeudi (sur RDV)" },
    { key: "jour_vendredi", label: "Vendredi (sur RDV)" },
    { key: "jour_asap", label: "Dès que possible" },
    { key: "jour_flexible", label: "Flexible" },
  ]

  const momentsList = [
    { key: "moment_matin", label: "Matin (9h-12h)" },
    { key: "moment_midi", label: "Midi (12h-14h)" },
    { key: "moment_apres_midi", label: "Après-midi (14h-18h)" },
    { key: "moment_flexible", label: "Flexible" },
  ]

  const contactList = [
    { key: "contact_telephone", label: "Téléphone" },
    { key: "contact_courriel", label: "Courriel" },
    { key: "contact_sms", label: "SMS" },
  ]

  const conditionsList = [
    { key: "condition_hypertension", label: "Hypertension artérielle" },
    { key: "condition_cardiaque", label: "Maladie cardiaque" },
    { key: "condition_souffle_valvulaire", label: "Souffle cardiaque ou problème valvulaire" },
    { key: "condition_endocardite", label: "Antécédent d'endocardite" },
    { key: "condition_diabete", label: "Diabète" },
    { key: "condition_respiratoire", label: "Asthme ou maladie respiratoire" },
    { key: "condition_apnee_sommeil", label: "Apnée du sommeil" },
    { key: "condition_foie", label: "Maladie du foie" },
    { key: "condition_renale", label: "Maladie rénale" },
    { key: "condition_coagulation", label: "Trouble de coagulation" },
    { key: "condition_anticoagulants", label: "Anticoagulants ou antiplaquettaires" },
    { key: "condition_epilepsie", label: "Épilepsie ou convulsions" },
    { key: "condition_neurologique", label: "Trouble neurologique" },
    { key: "condition_cancer", label: "Cancer (actuel ou antécédent)" },
    { key: "condition_radiotherapie", label: "Radiothérapie tête/cou" },
    { key: "condition_chimiotherapie", label: "Chimiothérapie ou immunothérapie" },
    { key: "condition_immunosuppression", label: "Immunosuppression" },
    { key: "condition_osteoporose", label: "Ostéoporose" },
    { key: "condition_bisphosphonates", label: "Bisphosphonates / anti-résorptifs" },
    { key: "condition_thyroide", label: "Trouble thyroïdien" },
    { key: "condition_reflux", label: "Reflux gastrique important" },
    { key: "condition_anxiete", label: "Anxiété importante" },
    { key: "condition_grossesse", label: "Grossesse ou allaitement" },
    { key: "condition_allergies", label: "Allergies connues" },
    { key: "condition_autre", label: "Autre condition" },
  ]

  const typeLabel = typeDemande === "autre" && typeDemandeOther ? typeDemandeOther : (typeMap[typeDemande] || typeDemande)
  const langueLabel = language === "autre" && languageOther ? languageOther : language

  // Detect if it's an urgent type
  const isUrgent = typeDemande === "urgence" || typeDemande === "douleur" || typeDemande === "dent_cassee"

  const conditionsCount = conditionsList.filter((c) => isChecked(d, c.key)).length

  const body = `
    ${isUrgent ? alertBox(`Demande potentiellement urgente — Type : ${typeLabel}`) : ""}
    ${heading("Nouvelle demande de rendez-vous")}
    ${subtitle(`Reçue le ${formatDate(payload.created_at || new Date().toISOString())}`)}

    ${section("Patient", `
      ${row("Nom", `${firstName} ${lastName}`)}
      ${row("Téléphone", phone)}
      ${row("Courriel", email)}
      ${row("Langue préférée", langueLabel)}
    `)}

    ${section("Demande", `
      ${row("Type de demande", typeLabel, { highlight: isUrgent })}
      ${checkboxList("Motifs secondaires", motifsList.map((m) => ({ ...m, selected: isChecked(d, m.key) })))}
      ${longText("Message du patient", message)}
    `)}

    ${section("Disponibilités", `
      ${checkboxList("Journées", joursList.map((j) => ({ ...j, selected: isChecked(d, j.key) })))}
      ${checkboxList("Moments", momentsList.map((m) => ({ ...m, selected: isChecked(d, m.key) })))}
      ${checkboxList("Modes de contact préférés", contactList.map((c) => ({ ...c, selected: isChecked(d, c.key) })))}
    `)}

    ${conditionsCount > 0 ? section(`Profil médical (${conditionsCount} condition${conditionsCount > 1 ? "s" : ""})`, `
      ${checkboxList("Conditions déclarées", conditionsList.map((c) => ({ ...c, selected: isChecked(d, c.key) })))}
      ${longText("Détails allergies", getString(d, "allergies_details"))}
      ${longText("Autre condition", getString(d, "other_condition_details"))}
    `) : ""}

    <div style="background:#FAF7F0; padding:14px 18px; margin-top:24px; font-family:Inter, sans-serif; font-size:12px; color:#8C837A;">
      Pour répondre directement au patient, cliquez sur Répondre dans votre messagerie — le champ <strong>Reply-To</strong> contient ${email || "(aucun courriel fourni — utilisez le téléphone)"}.
    </div>
  `

  return {
    subject: `${isUrgent ? "⚠ " : ""}[Rendez-vous] ${firstName} ${lastName} — ${typeLabel}`,
    html: baseLayout({
      preheader: `${firstName} ${lastName} — ${typeLabel}`,
      brandLabel: isUrgent ? "Demande de rendez-vous (potentiellement urgente)" : "Demande de rendez-vous",
      accentBar: isUrgent ? "red" : "default",
      body,
    }),
    replyTo: email,
  }
}

/* -------------------------------------------------------------------------- */
/* EMERGENCY FORM                                                              */
/* -------------------------------------------------------------------------- */

function renderEmergency(payload: NetlifyPayload): EmailTemplate {
  const d = payload.data
  const firstName = getString(d, "firstName")
  const lastName = getString(d, "lastName")
  const phone = getString(d, "phone")
  const email = getString(d, "email")
  const dob = getString(d, "dob")
  const symptomDuration = getString(d, "symptomDuration")

  const typesList = [
    { key: "type_douleur", label: "Douleur intense" },
    { key: "type_enflure", label: "Enflure" },
    { key: "type_abces", label: "Abcès" },
    { key: "type_fracture", label: "Dent cassée" },
    { key: "type_trauma", label: "Traumatisme" },
    { key: "type_saignement", label: "Saignement" },
    { key: "type_couronne", label: "Perte d'une couronne" },
    { key: "type_restauration", label: "Perte d'une restauration" },
    { key: "type_infection", label: "Infection suspectée" },
    { key: "type_autre", label: "Autre" },
  ]

  const critical = [
    { key: "sym_breathe", label: "Difficulté à respirer", value: getString(d, "sym_breathe") },
    { key: "sym_swallow", label: "Difficulté à avaler", value: getString(d, "sym_swallow") },
    { key: "sym_swelling", label: "Enflure importante", value: getString(d, "sym_swelling") },
    { key: "sym_fever", label: "Fièvre", value: getString(d, "sym_fever") },
    { key: "sym_night", label: "Douleur qui réveille la nuit", value: getString(d, "sym_night") },
  ]
  const criticalAlerts = critical.filter((s) => s.value === "yes")

  const body = `
    ${alertBox("⚠ DEMANDE D'URGENCE DENTAIRE — Action rapide requise")}
    ${heading("Urgence dentaire")}
    ${subtitle(`Reçue le ${formatDate(payload.created_at || new Date().toISOString())}`)}

    ${criticalAlerts.length > 0 ? `
      <div style="background:#FEF2F2; border:2px solid #B91C1C; padding:18px; margin:0 0 24px 0;">
        <div style="font-family:Inter; font-size:12px; color:#B91C1C; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:8px; font-weight:600;">Symptômes critiques signalés</div>
        <ul style="margin:0; padding:0 0 0 20px; color:#B91C1C; font-family:Inter; font-size:14px; line-height:1.6; font-weight:500;">
          ${criticalAlerts.map((s) => `<li>${s.label}</li>`).join("")}
        </ul>
        <div style="font-family:Inter; font-size:12px; color:#B91C1C; margin-top:10px; font-style:italic;">
          Si signes vitaux compromis → patient redirigé vers services d'urgence (911) ou hôpital.
        </div>
      </div>
    ` : ""}

    ${section("Patient", `
      ${row("Nom", `${firstName} ${lastName}`)}
      ${row("Téléphone", phone, { highlight: true })}
      ${row("Courriel", email)}
      ${row("Date de naissance", dob)}
    `)}

    ${section("Type d'urgence", checkboxList("", typesList.map((t) => ({ ...t, selected: isChecked(d, t.key) }))))}

    ${section("Symptômes", `
      ${critical.map((c) => row(c.label, c.value === "yes" ? "Oui" : c.value === "no" ? "Non" : "—", { highlight: c.value === "yes" })).join("")}
      ${row("Depuis combien de temps", symptomDuration)}
    `)}

    <div style="background:#FEF2F2; padding:16px 20px; margin-top:24px; border-left:4px solid #B91C1C;">
      <div style="font-family:Inter; font-size:13px; color:#1A1717; line-height:1.6;">
        <strong>Action recommandée :</strong> Appeler le patient au <a href="tel:${phone}" style="color:#B91C1C; text-decoration:underline;">${phone || "[numéro manquant]"}</a> dès que possible.
      </div>
    </div>
  `

  return {
    subject: `⚠ URGENCE — ${firstName} ${lastName}`,
    html: baseLayout({
      preheader: `URGENCE — ${firstName} ${lastName}`,
      brandLabel: "Urgence dentaire",
      accentBar: "red",
      body,
    }),
    replyTo: email,
  }
}

/* -------------------------------------------------------------------------- */
/* PARTNER ONBOARDING                                                          */
/* -------------------------------------------------------------------------- */

function renderPartnerOnboarding(payload: NetlifyPayload): EmailTemplate {
  const d = payload.data
  const name = getString(d, "dentistName")
  const title = getString(d, "professionalTitle")
  const titleOther = getString(d, "professionalTitleOther")
  const clinic = getString(d, "clinicName")
  const address = getString(d, "clinicAddress")
  const phone = getString(d, "phone")
  const email = getString(d, "email")
  const message = getString(d, "message")

  const titleMap: Record<string, string> = {
    dentiste_generaliste: "Dentiste généraliste",
    prosthodontiste: "Prosthodontiste",
    orthodontiste: "Orthodontiste",
    parodontiste: "Parodontiste",
    endodontiste: "Endodontiste",
    chirurgien_maxillo_facial: "Chirurgien maxillo-facial",
    denturologiste: "Denturologiste",
    hygieniste_dentaire: "Hygiéniste dentaire",
    gestionnaire_clinique: "Gestionnaire de clinique",
    autre: "Autre",
  }
  const titleLabel = title === "autre" && titleOther ? titleOther : (titleMap[title] || title)

  const collabList = [
    { key: "collaboration_lab_regulier", label: "Cas de laboratoire réguliers" },
    { key: "collaboration_lab_occasionnel", label: "Cas de laboratoire occasionnels" },
    { key: "collaboration_cas_esthetiques", label: "Cas esthétiques complexes" },
    { key: "collaboration_consultation", label: "Consultations cliniques" },
    { key: "collaboration_reference_clinique", label: "Références cliniques" },
    { key: "collaboration_autre", label: "Autre" },
  ]

  const servicesList = [
    { key: "service_orthodontie", label: "Orthodontie" },
    { key: "service_prostho_amovible", label: "Prosthodontie amovible" },
    { key: "service_prostho_fixe", label: "Prosthodontie fixe" },
    { key: "service_plaques_occlusales", label: "Plaques occlusales" },
    { key: "service_gouttieres", label: "Gouttières" },
    { key: "service_wax_up", label: "Wax-up" },
    { key: "service_prise_teinte", label: "Prise de teinte" },
    { key: "service_esthetique", label: "Cas esthétiques" },
    { key: "service_reparations", label: "Réparations" },
    { key: "service_emax", label: "E.max" },
    { key: "service_zircone", label: "Zircone" },
    { key: "service_impression_3d", label: "Impression 3D / Formlabs" },
    { key: "service_autre", label: "Autre" },
  ]

  const contactPrefs = [
    { key: "contact_telephone", label: "Téléphone" },
    { key: "contact_courriel", label: "Courriel" },
    { key: "contact_sms", label: "SMS" },
    { key: "contact_en_personne", label: "En personne" },
  ]

  const body = `
    ${heading("Demande de partenariat professionnel")}
    ${subtitle(`Reçue le ${formatDate(payload.created_at || new Date().toISOString())}`)}

    ${section("Professionnel", `
      ${row("Nom", name)}
      ${row("Titre", titleLabel)}
      ${row("Clinique", clinic)}
      ${row("Adresse", address)}
      ${row("Téléphone", phone)}
      ${row("Courriel", email)}
    `)}

    ${section("Collaboration recherchée", checkboxList("", collabList.map((c) => ({ ...c, selected: isChecked(d, c.key) }))))}

    ${section("Services d'intérêt", checkboxList("", servicesList.map((s) => ({ ...s, selected: isChecked(d, s.key) }))))}

    ${section("Préférence de contact", checkboxList("", contactPrefs.map((c) => ({ ...c, selected: isChecked(d, c.key) }))))}

    ${message ? section("Message", longText("", message)) : ""}
  `

  return {
    subject: `[Partenariat pro] ${name || "Nouvelle demande"} — ${clinic}`,
    html: baseLayout({
      preheader: `${name} — ${clinic}`,
      brandLabel: "Demande de partenariat professionnel",
      body,
    }),
    replyTo: email,
  }
}

/* -------------------------------------------------------------------------- */
/* LAB PRESCRIPTION                                                            */
/* -------------------------------------------------------------------------- */

function renderLabPrescription(payload: NetlifyPayload): EmailTemplate {
  const d = payload.data
  const professional = getString(d, "prescribingProfessional")
  const clinic = getString(d, "clinicName")
  const phone = getString(d, "phone")
  const email = getString(d, "email")
  const patient = getString(d, "patientName")
  const teeth = getString(d, "affectedTeeth")
  const material = getString(d, "material")
  const materialOther = getString(d, "materialOther")
  const shade = getString(d, "shade")
  const date = getString(d, "desiredDate")
  const instructions = getString(d, "clinicalInstructions")

  const materialMap: Record<string, string> = {
    zircone: "Zircone",
    emax_presse: "E.max pressé",
    emax_usine: "E.max usiné",
    resine_imprimee: "Résine imprimée",
    resine_usinee: "Résine usinée",
    pmma: "PMMA",
    composite_lab: "Composite de laboratoire",
    a_determiner: "À déterminer par le laboratoire",
    autre: "Autre",
  }
  const materialLabel = material === "autre" && materialOther ? materialOther : (materialMap[material] || material)

  const typesList = [
    { key: "type_couronne", label: "Couronne" },
    { key: "type_couronne_emax_presse", label: "Couronne e.max pressée" },
    { key: "type_couronne_emax_usine", label: "Couronne e.max usinée" },
    { key: "type_couronne_zircone", label: "Couronne zircone usinée" },
    { key: "type_pont", label: "Pont" },
    { key: "type_facette", label: "Facette" },
    { key: "type_incrustation", label: "Incrustation / onlay" },
    { key: "type_prothese_complete", label: "Prothèse complète" },
    { key: "type_prothese_partielle", label: "Prothèse partielle" },
    { key: "type_plaque_occlusale", label: "Plaque occlusale" },
    { key: "type_gouttiere", label: "Gouttière" },
    { key: "type_wax_up", label: "Wax-up diagnostique" },
    { key: "type_modele", label: "Modèle imprimé" },
    { key: "type_temporaire", label: "Restauration temporaire" },
    { key: "type_recimentation_couronne", label: "Recimentation de couronne" },
    { key: "type_recimentation_pont", label: "Recimentation de pont" },
    { key: "type_recollage_facette", label: "Recollage de facette" },
    { key: "type_reparation", label: "Réparation" },
    { key: "type_autre", label: "Autre" },
  ]

  const body = `
    ${heading("Nouvelle prescription laboratoire")}
    ${subtitle(`Reçue le ${formatDate(payload.created_at || new Date().toISOString())}`)}

    ${section("Professionnel prescripteur", `
      ${row("Nom", professional)}
      ${row("Clinique", clinic)}
      ${row("Téléphone", phone)}
      ${row("Courriel", email)}
    `)}

    ${section("Patient", row("Nom ou code", patient))}

    ${section("Détails du cas", `
      ${checkboxList("Type(s) de cas", typesList.map((t) => ({ ...t, selected: isChecked(d, t.key) })))}
      ${row("Dent(s) concernée(s)", teeth)}
      ${row("Matériau demandé", materialLabel)}
      ${row("Teinte", shade)}
      ${row("Date souhaitée", date)}
    `)}

    ${instructions ? section("Instructions cliniques", longText("", instructions)) : ""}
  `

  return {
    subject: `[Prescription lab] ${patient || "Nouveau cas"} — ${clinic}`,
    html: baseLayout({
      preheader: `Prescription de ${professional}`,
      brandLabel: "Prescription laboratoire",
      body,
    }),
    replyTo: email,
  }
}

/* -------------------------------------------------------------------------- */
/* REFERRED CASE                                                               */
/* -------------------------------------------------------------------------- */

function renderReferredCase(payload: NetlifyPayload): EmailTemplate {
  const d = payload.data
  const refProf = getString(d, "referringProfessionalName")
  const clinic = getString(d, "clinicName")
  const clinicPhone = getString(d, "clinicPhone")
  const refEmail = getString(d, "email")
  const patientName = getString(d, "patientName")
  const patientDob = getString(d, "patientDob")
  const patientPhone = getString(d, "patientPhone")
  const patientEmail = getString(d, "patientEmail")
  const patientLang = getString(d, "patientLanguage")
  const patientLangOther = getString(d, "patientLanguageOther")
  const mainReason = getString(d, "referralMainReason")
  const mainReasonOther = getString(d, "referralMainReasonOther")
  const urgency = getString(d, "urgency")
  const summary = getString(d, "clinicalSummary")
  const previous = getString(d, "previousTreatments")

  const reasonMap: Record<string, string> = {
    evaluation_complete: "Évaluation complète",
    douleur: "Douleur",
    esthetique: "Préoccupation esthétique",
    endodontie: "Endodontie",
    parodontie: "Parodontie / greffe",
    implantologie: "Implantologie",
    prosthodontie: "Prosthodontie / restauration complexe",
    deuxieme_avis: "Deuxième avis",
    laboratoire: "Service de laboratoire (teinte, réparation)",
    autre: "Autre",
  }
  const reasonLabel = mainReason === "autre" && mainReasonOther ? mainReasonOther : (reasonMap[mainReason] || mainReason)

  const langMap: Record<string, string> = {
    francais: "Français",
    anglais: "Anglais",
    francais_anglais: "Français ou anglais",
    autre: "Autre",
  }
  const langLabel = patientLang === "autre" && patientLangOther ? patientLangOther : (langMap[patientLang] || patientLang)

  const motifsList = [
    { key: "motif_secondaire_douleur", label: "Douleur" },
    { key: "motif_secondaire_sensibilite", label: "Sensibilité" },
    { key: "motif_secondaire_saignement_gencives", label: "Saignement des gencives" },
    { key: "motif_secondaire_dent_mobile", label: "Dent mobile" },
    { key: "motif_secondaire_fracture", label: "Fracture" },
    { key: "motif_secondaire_usure", label: "Usure dentaire" },
    { key: "motif_secondaire_esthetique", label: "Esthétique" },
    { key: "motif_secondaire_infection", label: "Infection suspectée" },
    { key: "motif_secondaire_autre", label: "Autre" },
  ]

  const docsList = [
    { key: "doc_photos", label: "Photos" },
    { key: "doc_radiographies", label: "Radiographies" },
    { key: "doc_stl_scan", label: "STL / scan" },
    { key: "doc_plan_traitement", label: "Plan de traitement existant" },
    { key: "doc_notes_cliniques", label: "Notes cliniques" },
    { key: "doc_autre", label: "Autre" },
  ]

  const isUrgent = urgency === "oui"

  const body = `
    ${isUrgent ? alertBox("Référence marquée URGENTE par le professionnel référent") : ""}
    ${heading("Nouvelle référence patient")}
    ${subtitle(`Reçue le ${formatDate(payload.created_at || new Date().toISOString())}`)}

    ${section("Professionnel référent", `
      ${row("Nom", refProf)}
      ${row("Clinique", clinic)}
      ${row("Téléphone clinique", clinicPhone)}
      ${row("Courriel", refEmail)}
    `)}

    ${section("Patient référé", `
      ${row("Nom complet", patientName)}
      ${row("Date de naissance", patientDob)}
      ${row("Téléphone", patientPhone, { highlight: true })}
      ${row("Courriel", patientEmail)}
      ${row("Langue préférée", langLabel)}
    `)}

    ${section("Référence", `
      ${row("Motif principal", reasonLabel, { highlight: isUrgent })}
      ${row("Urgence", isUrgent ? "Oui" : "Non", { highlight: isUrgent })}
      ${checkboxList("Motifs secondaires", motifsList.map((m) => ({ ...m, selected: isChecked(d, m.key) })))}
      ${longText("Résumé clinique", summary)}
      ${longText("Traitements déjà réalisés", previous)}
      ${checkboxList("Documents transmis", docsList.map((doc) => ({ ...doc, selected: isChecked(d, doc.key) })))}
    `)}
  `

  return {
    subject: `${isUrgent ? "⚠ " : ""}[Référence] ${patientName} — ${reasonLabel}`,
    html: baseLayout({
      preheader: `Référence de ${refProf} — ${patientName}`,
      brandLabel: "Référence clinique",
      accentBar: isUrgent ? "red" : "default",
      body,
    }),
    replyTo: refEmail,
  }
}

/* -------------------------------------------------------------------------- */
/* LAB PROFESSIONAL (legacy form, kept for backwards compat)                   */
/* -------------------------------------------------------------------------- */

function renderLabProfessional(payload: NetlifyPayload): EmailTemplate {
  const d = payload.data
  const name = getString(d, "dentistName")
  const clinic = getString(d, "clinic")
  const phone = getString(d, "phone")
  const email = getString(d, "email")
  const caseType = getString(d, "caseType")
  const material = getString(d, "material")
  const comments = getString(d, "comments")

  const body = `
    ${heading("Demande professionnelle (legacy)")}
    ${subtitle(`Reçue le ${formatDate(payload.created_at || new Date().toISOString())}`)}

    ${section("Professionnel", `
      ${row("Nom", name)}
      ${row("Clinique", clinic)}
      ${row("Téléphone", phone)}
      ${row("Courriel", email)}
    `)}

    ${section("Cas", `
      ${row("Type", caseType)}
      ${row("Matériau", material)}
      ${longText("Commentaires", comments)}
    `)}

    <div style="background:#FAF7F0; padding:12px 16px; margin-top:20px; font-family:Inter; font-size:11px; color:#8C837A;">
      Note : ce formulaire (lab-professional) est conservé pour rétrocompatibilité. Les nouvelles demandes utilisent les formulaires séparés Partenaires / Prescription / Référence clinique.
    </div>
  `

  return {
    subject: `[Labo pro] ${name || "Demande"}`,
    html: baseLayout({
      preheader: `${name} — ${clinic}`,
      brandLabel: "Demande laboratoire (legacy)",
      body,
    }),
    replyTo: email,
  }
}

/* -------------------------------------------------------------------------- */
/* ROUTER                                                                      */
/* -------------------------------------------------------------------------- */

export function renderTemplate(payload: NetlifyPayload): EmailTemplate | null {
  switch (payload.form_name) {
    case "contact":
      return renderContact(payload)
    case "appointment":
      return renderAppointment(payload)
    case "emergency":
      return renderEmergency(payload)
    case "partner-onboarding":
      return renderPartnerOnboarding(payload)
    case "lab-prescription":
      return renderLabPrescription(payload)
    case "referred-case":
      return renderReferredCase(payload)
    case "lab-professional":
      return renderLabProfessional(payload)
    default:
      // Unknown form name — return null, route handler will return 200 OK silently
      return null
  }
}

export { NETLIFY_DASHBOARD }
