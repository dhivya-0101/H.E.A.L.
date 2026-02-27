// Store health data separately for each role
let healthData_villager = JSON.parse(localStorage.getItem("healthData_villager")) || [];
let healthData_asha = JSON.parse(localStorage.getItem("healthData_asha")) || [];
let healthData_staff = JSON.parse(localStorage.getItem("healthData_staff")) || [];

// Active role that requires authentication
let pendingRole = null;
const PINS = {
    asha: "1234",
    staff: "5678"
};

const translations = {
    en: {
        title: "SmartHealth",
        submit: "Submit Report",
        village: "Village Name / Location",
        role_villager: "Villager",
        role_asha: "ASHA",
        role_staff: "Staff",
        q_many_sick: "Are many people sick in your area?",
        q_symptoms: "What symptoms are common?",
        q_water_dirty: "Is the water looking dirty or muddy?",
        q_water_smell: "Is the water smelling bad?",
        s_diarrhea: "Diarrhea",
        s_vomiting: "Vomiting",
        s_fever: "Fever",
        s_skin: "Skin Rash",
        opt_yes: "Yes",
        opt_no: "No",
        label_sick_count: "Approximate number of sick people",
        label_date: "Observation Date",
        label_ph: "pH Level",
        label_turbidity: "Turbidity (NTU)",
        label_bacteria: "Bacterial Contamination",
        label_notes: "Lab Test Results / Notes",
        dashboard: "Access Health Analytics Dashboard",
        dashTitle: "District Health Analytics",
        dashSubtitle: "Real-time monitoring of community health indicators.",
        statVillages: "Total Villages",
        statOutbreaks: "Active Outbreaks",
        statTurbidity: "Avg. Turbidity",
        tableTitle: "Village Health Status",
        colDate: "Sample Date",
        colBacteria: "Bacteria",
        colStatus: "Status"
    },
    hi: {
        title: "स्मार्टहेल्थ",
        submit: "रिपोर्ट जमा करें",
        village: "गांव का नाम / स्थान",
        role_villager: "ग्रामीण",
        role_asha: "आशा कार्यकर्ता",
        role_staff: "कर्मचारी",
        q_many_sick: "क्या आपके क्षेत्र में कई लोग बीमार हैं?",
        q_symptoms: "कौन से लक्षण सामान्य हैं?",
        q_water_dirty: "क्या पानी गंदा या मटमैला दिख रहा है?",
        q_water_smell: "क्या पानी से दुर्गंध आ रही है?",
        s_diarrhea: "दस्त",
        s_vomiting: "उल्टी",
        s_fever: "बुखार",
        s_skin: "त्वचा पर चकत्ते",
        opt_yes: "हाँ",
        opt_no: "नहीं",
        label_sick_count: "बीमार लोगों की अनुमानित संख्या",
        label_date: "अवलोकन तिथि",
        label_ph: "pH स्तर",
        label_turbidity: "मैलापन (NTU)",
        label_bacteria: "बैक्टीरिया संदूषण",
        label_notes: "लैब टेस्ट परिणाम / नोट्स",
        dashboard: "स्वास्थ्य विश्लेषण डैशबोर्ड",
        dashTitle: "जिला स्वास्थ्य विश्लेषण",
        dashSubtitle: "सामुदायिक स्वास्थ्य संकेतकों की वास्तविक समय की निगरानी।",
        statVillages: "कुल गांव",
        statOutbreaks: "सक्रिय प्रकोप",
        statTurbidity: "औसत मटमैलापन",
        tableTitle: "गांव स्वास्थ्य स्थिति",
        colDate: "नमूना तिथि",
        colBacteria: "बैक्टीरिया",
        colStatus: "स्थिति"
    },
    as: {
        title: "স্মাৰ্টহেল্থ",
        submit: "প্ৰতিবেদন দাখিল কৰক",
        village: "গাঁৱৰ নাম / স্থান",
        role_villager: "গাঁৱলীয়া",
        role_asha: "আশা কৰ্মী",
        role_staff: "কৰ্মচাৰী",
        q_many_sick: "আপোনাৰ অঞ্চলত বহুত মানুহ অসুস্থ নেকি?",
        q_symptoms: "সাধাৰণ লক্ষণবোৰ কি কি?",
        q_water_dirty: "পানীখিনি লেতেৰা বা ঘোলা যেন লাগিছে নেকি?",
        q_water_smell: "পানীৰ পৰা বেয়া গোন্ধ ওলাইছে নেকি?",
        s_diarrhea: "ডায়েৰিয়া",
        s_vomiting: "বমি",
        s_fever: "জ্বৰ",
        s_skin: "ছালৰ খজুৱতি",
        opt_yes: "হয়",
        opt_no: "নহয়",
        label_sick_count: "অসুস্থ মানুহৰ আনুমানিক সংখ্যা",
        label_date: "নিৰীক্ষণৰ তাৰিখ",
        label_ph: "pH স্তৰ",
        label_turbidity: "ঘোলাতা (NTU)",
        label_bacteria: "বেক্টেৰিয়াৰ সংক্ৰমণ",
        label_notes: "পৰীক্ষাগাৰৰ ফলাফল / টোকা",
        dashboard: "স্বাস্থ্য ডেশ্বব’ৰ্ড চাওক",
        dashTitle: "জিলা স্বাস্থ্য বিশ্লেষণ",
        dashSubtitle: "সামাজিক স্বাস্থ্য সূচকৰ বাস্তৱ-সময়ৰ নিৰীক্ষণ।",
        statVillages: "মুঠ গাঁও",
        statOutbreaks: "সক্ৰিয় প্ৰাদুৰ্ভাৱ",
        statTurbidity: "গড় ঘোলাতা",
        tableTitle: "গাঁও স্বাস্থ্যৰ স্থিতি",
        colDate: "নমুনাৰ তাৰিখ",
        colBacteria: "বেক্টেৰিয়া",
        colStatus: "স্থিতি"
    },
    mz: {
        title: "SmartHealth",
        submit: "Report thehluhna",
        village: "Khua hming / Hmun",
        role_villager: "Khua mipui",
        role_asha: "ASHA",
        role_staff: "Staff",
        q_many_sick: "In vengah mi tam tak an damlo em?",
        q_symptoms: "Eng natna te nge lang tlangpui?",
        q_water_dirty: "Tui a bawlhhlawh em?",
        q_water_smell: "Tui a rimchhia em?",
        s_diarrhea: "Kawthalo",
        s_vomiting: "Luak",
        s_fever: "Khawsik",
        s_skin: "Vun thak",
        opt_yes: "Aw",
        opt_no: "Aih",
        label_sick_count: "Damlo zat awm tawk",
        label_date: "En hun",
        label_ph: "pH Level",
        label_turbidity: "Tui bawlhhlawh dân (NTU)",
        label_bacteria: "Bacteria tam dan",
        label_notes: "Lab test result te",
        dashboard: "Health Dashboard enna",
        dashTitle: "District Health Analytics",
        dashSubtitle: "Hrisêlna vilna.",
        statVillages: "Khua zawng zawng",
        statOutbreaks: "Hri lêng awm zât",
        statTurbidity: "Tui tibuak leih dân",
        tableTitle: "Khua hrisêlna dinhmun",
        colDate: "Hun",
        colBacteria: "Bacteria",
        colStatus: "Nihphung"
    },
    mn: {
        title: "SmartHealth",
        submit: "Report piba",
        village: "Khulgi ming / Mafam",
        role_villager: "Khulgi mising",
        role_asha: "ASHA worker",
        role_staff: "Staff",
        q_many_sick: "Nakhulda mising mayam ana-laba leibra?",
        q_symptoms: "Kyamnaba symptom sing-di karino?",
        q_water_dirty: "Ishing-di amangba nattraga turbidity leibra?",
        q_water_smell: "Ishing-di nammabra?",
        s_diarrhea: "Diarrhea",
        s_vomiting: "Sha-wakpa",
        s_fever: "Sha-nanaba",
        s_skin: "Unshada khoraba",
        opt_yes: "Hoi",
        opt_no: "Nat-te",
        label_sick_count: "Ana-laba mising-gi mapping",
        label_date: "Yengba tang",
        label_ph: "pH Level",
        label_turbidity: "Turbidity (NTU)",
        label_bacteria: "Bacteria leiba",
        label_notes: "Lab test result sing",
        dashboard: "Health Dashboard yengba",
        dashTitle: "District Health Analytics",
        dashSubtitle: "Hakshel yengba.",
        statVillages: "Khul pumnamuk",
        statOutbreaks: "Outbreak leiba",
        statTurbidity: "Turbidity-gi avg",
        tableTitle: "Khul-gi hakshel phibam",
        colDate: "Tang",
        colBacteria: "Bacteria",
        colStatus: "Phibam"
    },
    ks: {
        title: "SmartHealth",
        submit: "Pyndep ia ka Report",
        village: "Kyrteng ka Shnong / Hmun",
        role_villager: "Ki nongshnong",
        role_asha: "ASHA",
        role_staff: "Staff",
        q_many_sick: "Ha ka thain jong phi don bun ki briew ba pang?",
        q_symptoms: "Kiei ki dak ki shin ba kynrei?",
        q_water_dirty: "Kaba ka um ka long kaba bit tngit?",
        q_water_smell: "Kaba ka um ka sma iwtngit?",
        s_diarrhea: "Pynhiar kpoh",
        s_vomiting: "Prie",
        s_fever: "Khieshoh",
        s_skin: "Prum",
        opt_yes: "Hooid",
        opt_no: "Em",
        label_sick_count: "Katto katne tylli ki briew ba pang",
        label_date: "Tarik ba peit",
        label_ph: "pH Level",
        label_turbidity: "Turbidity (NTU)",
        label_bacteria: "Bacteria",
        label_notes: "Lab test result",
        dashboard: "Peit ia ka Dashboard",
        dashTitle: "District Health Analytics",
        dashSubtitle: "Ka jingpeit bniah ia ka koit ka khiah.",
        statVillages: "Baroh ki shnong",
        statOutbreaks: "Jingpang ba saphriang",
        statTurbidity: "Turbidity jong ka um",
        tableTitle: "Ka koit ka khiah ha ki shnong",
        colDate: " tarik",
        colBacteria: "Bacteria",
        colStatus: "Katto katne"
    }
};

/**
 * Changes the reporting role and updates UI
 */
function setRole(role) {
    if (role === 'villager') {
        applyRoleChange('villager');
        return;
    }

    // Trigger Login for ASHA/Staff
    pendingRole = role;
    document.getElementById("loginTitle").innerText = role.toUpperCase() + " Authentication";
    document.getElementById("loginOverlay").style.display = "flex";
    document.getElementById("accessPin").value = "";
    document.getElementById("accessPin").focus();
}

/**
 * Verifies pin and applies role change
 */
function verifyLogin() {
    const pin = document.getElementById("accessPin").value;
    if (pin === PINS[pendingRole]) {
        applyRoleChange(pendingRole);
        document.getElementById("loginOverlay").style.display = "none";
        showToast(`Welcome ${pendingRole.toUpperCase()}`, "success");
    } else {
        showToast("Invalid Access Pin", "error");
    }
}

/**
 * Cancels login and reverts to currently active role
 */
function cancelLogin() {
    document.getElementById("loginOverlay").style.display = "none";
    const currentRole = document.getElementById("userRole").value;

    // Reset buttons to reflect current active role
    document.querySelectorAll('.role-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`role-${currentRole}`).classList.add('active');
}

function applyRoleChange(role) {
    document.getElementById("userRole").value = role;
    // Set session auth for dashboard access
    sessionStorage.setItem("authRole", role);

    // Hide/Show dashboard link (Staff only)
    const dashLink = document.getElementById("dashboardLink");
    if (dashLink) {
        dashLink.style.display = role === 'staff' ? 'flex' : 'none';
    }

    // Update buttons
    document.querySelectorAll('.role-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`role-${role}`).classList.add('active');

    // Show/Hide fields
    document.getElementById("fields-villager").style.display = role === 'villager' ? 'block' : 'none';
    document.getElementById("fields-asha").style.display = role === 'asha' ? 'block' : 'none';
    document.getElementById("fields-staff").style.display = role === 'staff' ? 'block' : 'none';

    // Re-initialize icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

/**
 * Changes the app language based on selection
 */
function changeLanguage() {
    const lang = document.getElementById("languageSelect").value;
    const t = translations[lang];

    // Update Header 
    const titleEl = document.querySelector('header h1');
    if (titleEl) titleEl.innerText = t.title;

    // Index Page Support
    const submitBtnEl = document.getElementById("submitBtn");
    const dashboardLinkEl = document.querySelector('.dashboard-link');

    if (submitBtnEl) {
        submitBtnEl.innerHTML = `<i data-lucide="send" size="18"></i> ${t.submit}`;
    }
    if (dashboardLinkEl) {
        dashboardLinkEl.innerHTML = `<i data-lucide="bar-chart-3" size="16"></i> ${t.dashboard}`;
    }

    // Role Labels
    const roleVillager = document.querySelector('#role-villager span');
    const roleAsha = document.querySelector('#role-asha span');
    const roleStaff = document.querySelector('#role-staff span');
    if (roleVillager) roleVillager.innerText = t.role_villager;
    if (roleAsha) roleAsha.innerText = t.role_asha;
    if (roleStaff) roleStaff.innerText = t.role_staff;

    // Form Labels & Questions
    const villageLabel = document.querySelector('label[for="village"]');
    if (villageLabel) villageLabel.innerText = t.village;

    // Villager Mode
    const qManySick = document.querySelector('#fields-villager .form-group:nth-child(1) label');
    const qSymptoms = document.querySelector('#fields-villager .form-group:nth-child(2) label');
    const qWaterDirty = document.querySelector('#fields-villager .form-group:nth-child(3) label');
    const qWaterSmell = document.querySelector('#fields-villager .form-group:nth-child(4) label');
    if (qManySick) qManySick.innerText = t.q_many_sick;
    if (qSymptoms) qSymptoms.innerText = t.q_symptoms;
    if (qWaterDirty) qWaterDirty.innerText = t.q_water_dirty;
    if (qWaterSmell) qWaterSmell.innerText = t.q_water_smell;

    // Symptom Checkboxes & Radios
    const spans = document.querySelectorAll('.radio-label, .check-label');
    spans.forEach(span => {
        const input = span.querySelector('input');
        if (input) {
            const val = input.value;
            if (val === 'yes') span.childNodes[1].nodeValue = " " + t.opt_yes;
            if (val === 'no') span.childNodes[1].nodeValue = " " + t.opt_no;
            if (val === 'diarrhea') span.childNodes[1].nodeValue = " " + t.s_diarrhea;
            if (val === 'vomiting') span.childNodes[1].nodeValue = " " + t.s_vomiting;
            if (val === 'fever') span.childNodes[1].nodeValue = " " + t.s_fever;
            if (val === 'skin') span.childNodes[1].nodeValue = " " + t.s_skin;
        }
    });

    // ASHA Mode
    const labelSickCount = document.querySelector('label[for="sickCount"]');
    const labelAshaSymptoms = document.querySelector('#fields-asha .form-group:nth-child(2) label');
    const labelDate = document.querySelector('label[for="reportDate"]');
    if (labelSickCount) labelSickCount.innerText = t.label_sick_count;
    if (labelAshaSymptoms) labelAshaSymptoms.innerText = t.q_symptoms;
    if (labelDate) labelDate.innerText = t.label_date;

    // Staff Mode
    const labelPh = document.querySelector('label[for="phLevel"]');
    const labelTurb = document.querySelector('label[for="turbidity"]');
    const labelBact = document.querySelector('label[for="bacteriaCount"]');
    const labelNotes = document.querySelector('label[for="labNotes"]');
    if (labelPh) labelPh.innerText = t.label_ph;
    if (labelTurb) labelTurb.innerText = t.label_turbidity;
    if (labelBact) labelBact.innerText = t.label_bacteria;
    if (labelNotes) labelNotes.innerText = t.label_notes;

    // Dashboard Page Elements
    const dashTitle = document.querySelector('.dash-title');
    const dashSubtitle = document.querySelector('.dash-title + p');
    if (dashTitle) dashTitle.innerText = t.dashTitle;
    if (dashSubtitle) dashSubtitle.innerText = t.dashSubtitle;

    const statLabels = document.querySelectorAll('.stat-label');
    if (statLabels.length >= 3) {
        statLabels[0].innerText = t.statVillages;
        statLabels[1].innerText = t.statOutbreaks;
        statLabels[2].innerText = t.statTurbidity;
    }

    const tableTitle = document.querySelector('h3');
    if (tableTitle) tableTitle.innerText = t.tableTitle;

    const ths = document.querySelectorAll('th');
    if (ths.length >= 6) {
        ths[0].innerText = t.village;
        ths[1].innerText = t.colDate;
        ths[2].innerText = t.s_diarrhea + "/" + t.s_fever;
        ths[3].innerText = t.label_turbidity;
        ths[4].innerText = t.colBacteria;
        ths[5].innerText = t.colStatus;
    }

    // Re-initialize icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

/**
 * Submits form data to local storage
 */
function submitData() {
    const role = document.getElementById("userRole").value;
    const village = document.getElementById("village").value;

    if (!village) {
        showToast("Please enter village name", "error");
        return;
    }

    let entry = {
        village: village,
        role: role,
        timestamp: new Date().toISOString()
    };

    if (role === 'villager') {
        const manySick = document.querySelector('input[name="manySick"]:checked')?.value || "unknown";
        const waterDirty = document.querySelector('input[name="waterDirty"]:checked')?.value || "unknown";
        const waterSmell = document.querySelector('input[name="waterSmell"]:checked')?.value || "unknown";

        const symptoms = [];
        document.querySelectorAll('input[name="symptom"]:checked').forEach(cb => symptoms.push(cb.value));

        entry.manySick = manySick;
        entry.waterDirty = waterDirty;
        entry.waterSmell = waterSmell;
        entry.symptoms = symptoms;

        // Map for dashboard consistency
        entry.diarrhea = symptoms.includes('diarrhea') ? (manySick === 'yes' ? 10 : 1) : 0;
        entry.fever = symptoms.includes('fever') ? (manySick === 'yes' ? 10 : 1) : 0;
        entry.turbidity = waterDirty === 'yes' ? 15 : 1;

        healthData_villager.push(entry);
        localStorage.setItem("healthData_villager", JSON.stringify(healthData_villager));

    } else if (role === 'asha') {
        const sickCount = document.getElementById("sickCount").value || 0;
        const reportDate = document.getElementById("reportDate").value || new Date().toISOString();

        const symptoms = [];
        document.querySelectorAll('input[name="asha_symptom"]:checked').forEach(cb => symptoms.push(cb.value));

        entry.sickCount = Number(sickCount);
        entry.symptoms = symptoms;
        entry.reportDate = reportDate;

        // Map to legacy fields
        entry.diarrhea = symptoms.includes('diarrhea') ? Number(sickCount) : 0;
        entry.fever = symptoms.includes('fever') ? Number(sickCount) : 0;
        entry.turbidity = 1;

        healthData_asha.push(entry);
        localStorage.setItem("healthData_asha", JSON.stringify(healthData_asha));

    } else if (role === 'staff') {
        const ph = document.getElementById("phLevel").value || 7;
        const turbidity = document.getElementById("turbidity").value || 0;
        const bacteria = document.getElementById("bacteriaCount").value || 0;
        const notes = document.getElementById("labNotes").value || "";

        entry.ph = Number(ph);
        entry.turbidity = Number(turbidity);
        entry.bacteria = Number(bacteria);
        entry.notes = notes;

        // Map to legacy fields
        entry.diarrhea = 0;
        entry.fever = 0;

        healthData_staff.push(entry);
        localStorage.setItem("healthData_staff", JSON.stringify(healthData_staff));
    }

    showToast("Report submitted successfully!", "success");

    // Clear form
    document.getElementById("reportForm").reset();
    applyRoleChange(role); // Maintain current role view
}

/**
 * Simple toast notification system
 */
function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.style.position = "fixed";
    toast.style.bottom = "2rem";
    toast.style.right = "2rem";
    toast.style.padding = "1rem 2rem";
    toast.style.borderRadius = "10px";
    toast.style.color = "white";
    toast.style.fontWeight = "600";
    toast.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.2)";
    toast.style.zIndex = "1000";
    toast.style.transition = "all 0.3s ease";
    toast.style.transform = "translateY(20px)";
    toast.style.opacity = "0";

    if (type === "success") toast.style.backgroundColor = "var(--success)";
    else toast.style.backgroundColor = "var(--danger)";

    toast.innerText = message;
    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.style.transform = "translateY(0)";
        toast.style.opacity = "1";
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = "translateY(20px)";
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Global initialization
document.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Handle auto-login redirect from dashboard
    const params = new URLSearchParams(window.location.search);
    if (params.get('login') === 'staff') {
        setRole('staff');
    }
});

/**
 * Log out and clear session
 */
function logout() {
    sessionStorage.removeItem("authRole");
    setRole('villager');
    showToast("Logged out successfully", "success");
}
/**
 * Toggles the visibility of the kebab menu
 */
function toggleMenu(event) {
    if (event) event.stopPropagation();
    const menu = document.querySelector('.dropdown-menu');
    if (menu) {
        menu.classList.toggle('show');
    }
}

// Close menus when clicking outside
document.addEventListener('click', (e) => {
    const menu = document.querySelector('.dropdown-menu');
    const trigger = document.querySelector('.menu-trigger');
    if (menu && menu.classList.contains('show')) {
        if (!menu.contains(e.target) && !trigger.contains(e.target)) {
            menu.classList.remove('show');
        }
    }
});
