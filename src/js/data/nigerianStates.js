/**
 * @file nigerianStates.js
 * @description Complete dataset of Nigeria's 36 states + FCT,
 * with major cities/areas and popular neighborhoods per state.
 */

export const NIGERIAN_STATES = [
  { value: "Abia", label: "Abia", capital: "Umuahia", areas: ["Umuahia", "Aba", "Ohafia", "Arochukwu"] },
  { value: "Adamawa", label: "Adamawa", capital: "Yola", areas: ["Yola", "Jimeta", "Mubi", "Numan"] },
  { value: "Akwa Ibom", label: "Akwa Ibom", capital: "Uyo", areas: ["Uyo", "Eket", "Ikot Ekpene", "Oron"] },
  { value: "Anambra", label: "Anambra", capital: "Awka", areas: ["Awka", "Onitsha", "Nnewi", "Ekwulobia"] },
  { value: "Bauchi", label: "Bauchi", capital: "Bauchi", areas: ["Bauchi", "Azare", "Misau", "Jama'are"] },
  { value: "Bayelsa", label: "Bayelsa", capital: "Yenagoa", areas: ["Yenagoa", "Brass", "Ogbia", "Sagbama"] },
  { value: "Benue", label: "Benue", capital: "Makurdi", areas: ["Makurdi", "Gboko", "Otukpo", "Katsina-Ala"] },
  { value: "Borno", label: "Borno", capital: "Maiduguri", areas: ["Maiduguri", "Biu", "Damboa", "Gwoza"] },
  { value: "Cross River", label: "Cross River", capital: "Calabar", areas: ["Calabar", "Calabar South", "Ikom", "Ogoja"] },
  { value: "Delta", label: "Delta", capital: "Asaba", areas: ["Asaba", "Warri", "Sapele", "Ughelli", "Effurun"] },
  { value: "Ebonyi", label: "Ebonyi", capital: "Abakaliki", areas: ["Abakaliki", "Onueke", "Afikpo"] },
  { value: "Edo", label: "Edo", capital: "Benin City", areas: ["Benin City", "GRA Benin", "Ekpoma", "Auchi", "Uromi"] },
  { value: "Ekiti", label: "Ekiti", capital: "Ado-Ekiti", areas: ["Ado-Ekiti", "Ikere-Ekiti", "Ikole-Ekiti"] },
  { value: "Enugu", label: "Enugu", capital: "Enugu", areas: ["Enugu", "Independence Layout", "New Haven", "Trans-Ekulu", "GRA Enugu", "Nsukka"] },
  { value: "FCT", label: "FCT - Abuja", capital: "Abuja", areas: ["Maitama", "Asokoro", "Wuse", "Wuse 2", "Garki", "Jabi", "Gwarinpa", "Kubwa", "Life Camp", "Utako", "Lugbe", "Kado"] },
  { value: "Gombe", label: "Gombe", capital: "Gombe", areas: ["Gombe", "Billiri", "Kaltungo"] },
  { value: "Imo", label: "Imo", capital: "Owerri", areas: ["Owerri", "New Owerri", "Orlu", "Okigwe"] },
  { value: "Jigawa", label: "Jigawa", capital: "Dutse", areas: ["Dutse", "Hadejia", "Gumel", "Birnin Kudu"] },
  { value: "Kaduna", label: "Kaduna", capital: "Kaduna", areas: ["Kaduna", "Barnawa", "Millennium City", "Ungwan Rimi GRA", "Zaria", "Kafanchan"] },
  { value: "Kano", label: "Kano", capital: "Kano", areas: ["Kano", "Nassarawa GRA", "Bompai", "Sharada", "Tarauni"] },
  { value: "Katsina", label: "Katsina", capital: "Katsina", areas: ["Katsina", "Daura", "Funtua"] },
  { value: "Kebbi", label: "Kebbi", capital: "Birnin Kebbi", areas: ["Birnin Kebbi", "Argungu", "Yauri"] },
  { value: "Kogi", label: "Kogi", capital: "Lokoja", areas: ["Lokoja", "Okene", "Kabba", "Idah"] },
  { value: "Kwara", label: "Kwara", capital: "Ilorin", areas: ["Ilorin", "GRA Ilorin", "Tanke", "Offa", "Omu-Aran"] },
  { value: "Lagos", label: "Lagos", capital: "Ikeja", areas: ["Ikoyi", "Lekki Phase 1", "Lekki Phase 2", "Victoria Island", "Ikeja GRA", "Eko Atlantic", "Ajah", "Surulere", "Yaba", "Maryland", "Magodo", "Gbagada", "Ilupeju", "Ogba", "Festac Town", "Amuwo-Odofin", "Banana Island", "Oniru"] },
  { value: "Nasarawa", label: "Nasarawa", capital: "Lafia", areas: ["Lafia", "Keffi", "Karu", "Akwanga"] },
  { value: "Niger", label: "Niger", capital: "Minna", areas: ["Minna", "Suleja", "Bida", "Kontagora"] },
  { value: "Ogun", label: "Ogun", capital: "Abeokuta", areas: ["Abeokuta", "Ijebu-Ode", "Sagamu", "Ota", "Sango-Ota", "Mowe", "Ibafo"] },
  { value: "Ondo", label: "Ondo", capital: "Akure", areas: ["Akure", "Ondo Town", "Owo", "Ikare-Akoko"] },
  { value: "Osun", label: "Osun", capital: "Osogbo", areas: ["Osogbo", "Ile-Ife", "Ilesa", "Ede", "Iwo"] },
  { value: "Oyo", label: "Oyo", capital: "Ibadan", areas: ["Ibadan", "Bodija", "Jericho", "Ring Road", "Oluyole", "UI Area", "Agodi GRA", "Ogbomoso", "Oyo Town"] },
  { value: "Plateau", label: "Plateau", capital: "Jos", areas: ["Jos", "Rayfield", "Bukuru", "Barkin Ladi"] },
  { value: "Rivers", label: "Rivers", capital: "Port Harcourt", areas: ["Port Harcourt", "GRA Phase 1", "GRA Phase 2", "Old GRA", "Peter Odili Road", "Trans Amadi", "Eliozu", "Rukpokwu", "Bonny"] },
  { value: "Sokoto", label: "Sokoto", capital: "Sokoto", areas: ["Sokoto", "Bodinga", "Tambuwal"] },
  { value: "Taraba", label: "Taraba", capital: "Jalingo", areas: ["Jalingo", "Wukari", "Bali"] },
  { value: "Yobe", label: "Yobe", capital: "Damaturu", areas: ["Damaturu", "Potiskum", "Nguru", "Gashua"] },
  { value: "Zamfara", label: "Zamfara", capital: "Gusau", areas: ["Gusau", "Kaura Namoda", "Talata Mafara"] }
];

/**
 * Get all states as select options (with "All States" prepended)
 */
export function getStateOptions() {
  return [
    { value: "all", label: "All States" },
    ...NIGERIAN_STATES
  ];
}

/**
 * Get areas/neighborhoods for a given state
 * @param {string} stateValue
 * @returns {Array<{value: string, label: string}>}
 */
export function getAreasForState(stateValue) {
  if (!stateValue || stateValue === "all") return [{ value: "all", label: "All Areas" }];
  const state = NIGERIAN_STATES.find(s => s.value === stateValue);
  if (!state) return [{ value: "all", label: "All Areas" }];
  return [
    { value: "all", label: "All Areas" },
    ...state.areas.map(a => ({ value: a, label: a }))
  ];
}

/**
 * Resolve a state value back to its city name for backward compat
 * (e.g. "FCT" -> "Abuja", "Lagos" -> "Lagos")
 */
export function getStateCityName(stateValue) {
  if (stateValue === "FCT") return "Abuja";
  const state = NIGERIAN_STATES.find(s => s.value === stateValue);
  return state ? state.capital : stateValue;
}

/**
 * Curated list of high-demand Nigerian states with imagery and verified listing counts
 */
export function getPopularNigerianStates() {
  return [
    {
      value: "Lagos",
      label: "Lagos State",
      capital: "Ikeja",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      count: "1,240+ Verified",
      tagline: "Eko Atlantic, Lekki, Ikoyi & Ikeja GRA"
    },
    {
      value: "FCT",
      label: "Abuja (FCT)",
      capital: "Abuja",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
      count: "890+ Verified",
      tagline: "Maitama, Asokoro, Wuse 2 & Jabi"
    },
    {
      value: "Rivers",
      label: "Rivers State",
      capital: "Port Harcourt",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      count: "430+ Verified",
      tagline: "Port Harcourt, Old GRA & Peter Odili"
    },
    {
      value: "Oyo",
      label: "Oyo State",
      capital: "Ibadan",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
      count: "310+ Verified",
      tagline: "Ibadan, Bodija, Jericho & Agodi GRA"
    },
    {
      value: "Enugu",
      label: "Enugu State",
      capital: "Enugu",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      count: "220+ Verified",
      tagline: "Independence Layout & Trans-Ekulu"
    },
    {
      value: "Kano",
      label: "Kano State",
      capital: "Kano",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      count: "190+ Verified",
      tagline: "Nassarawa GRA & Bompai Commercial Hub"
    },
    {
      value: "Delta",
      label: "Delta State",
      capital: "Asaba",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
      count: "180+ Verified",
      tagline: "Asaba Capital & Warri / Effurun GRA"
    },
    {
      value: "Ogun",
      label: "Ogun State",
      capital: "Abeokuta",
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
      count: "260+ Verified",
      tagline: "Abeokuta, Sagamu, Mowe & Sango-Ota"
    }
  ];
}

