/* Documents library (B1.1 public deploy, owner request 7 October 2026).
 * Presentation, ordering and controls only: the documents themselves (COURSE.documents, the B1.1 exploration readers,
 * the Havenmeer dossier PDF) and the official references are the existing ones; nothing is added or reworded.
 * Order: documents of the current chapter → other documents of this lesson → official legislation and guidance. */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id), esc = Visuals.esc;
  const lesson = () => COURSE.lessons[0];
  // one line per document, taken from its title / purpose in the lesson
  const NOTE = {
    'DOC-REQ': 'Bram’s inspection request: which welds, which component, which examination — the job information the company needs beforehand.',
    'DOC-TECH-JUST': 'The client’s written justification of radiography as the technique for this type of assignment.',
    'DOC-LOC-JUST': 'The client’s written justification of the irradiation location: bunker, irradiation infrastructure or the hall.',
    'DOC-LICENCE': 'Excerpt of the company’s establishment and operating licence: authorised practices, equipment scope and conditions.',
    'DOC-CHECK-SHEET': 'The pre-use check sheet in its current version, with the sentence Daniel proposes to clarify.',
    'DOC-PLANNING': 'The worksite planning sheet with the designated radiation protection agent for the day.',
    'DOC-PROCEDURE-RECORD': 'An approved procedure page with its approval line, and the record line of a check on a day.',
    'DOC-SITE-PLAN': 'Conceptual drawing of the client’s hall: vessel, perimeter, agreed and changed walkway route.',
    'DOC-REG-EXTRACT': 'Regulation extract used in the readers: article reference with a short extract.',
  };
  // which teaching documents belong to which chapter (scene ids of B1.1)
  const BY_SCENE = {
    S01: ['DOC-REQ'], S03: ['DOC-PLANNING', 'DOC-CHECK-SHEET', 'DOC-PROCEDURE-RECORD'], S04: ['DOC-PROCEDURE-RECORD'],
    S05: ['PDF-DOSSIER', 'DOC-REQ'], S06: [], S07: ['PDF-DOSSIER', 'DOC-TECH-JUST', 'DOC-LOC-JUST'], S08: ['PDF-DOSSIER', 'DOC-SITE-PLAN'],
    S09: ['DOC-SITE-PLAN'], S10: [], S11: [], S12: ['X-regulation', 'X-licence', 'X-procedure', 'DOC-LICENCE', 'DOC-REG-EXTRACT'],
    S13: ['DOC-SITE-PLAN'], S14: ['DOC-SITE-PLAN', 'DOC-PROCEDURE-RECORD'], S15: ['PDF-DOSSIER', 'DOC-REQ', 'DOC-TECH-JUST', 'DOC-LOC-JUST'],
  };
  const LESSON_DOCS = ['PDF-DOSSIER', 'DOC-REQ', 'DOC-TECH-JUST', 'DOC-LOC-JUST', 'DOC-SITE-PLAN', 'X-regulation', 'X-licence', 'X-procedure', 'DOC-LICENCE', 'DOC-PROCEDURE-RECORD', 'DOC-CHECK-SHEET', 'DOC-PLANNING', 'DOC-REG-EXTRACT'];
  // official legislation and guidance referenced in B1.1 (sources.html), one entry per source
  const OFFICIAL = [
    ['Legislation', 'Royal Decree of 17 February 2023 on industrial radiography', 'The industrial radiography decree: client information, justification of technique and location, worksite rules. FANC Jurion, Dutch.', 'https://www.jurion.fanc.fgov.be/jurdb-consult/plainWettekstServlet?lang=nl&wettekstId=32765'],
    ['Legislation', 'Royal Decree of 17 February 2023 — article 2, definitions', 'Definitions used in the decree (bunker, irradiation infrastructure, worksite). FANC Jurion, Dutch.', 'https://www.jurion.fanc.fgov.be/jurdb-consult/plainWettekstServlet?lang=nl&wettekstId=32766'],
    ['Legislation', 'Royal Decree of 17 February 2023 — articles 3–8, 11, 16, 18 and 19', 'Justification, job information, stopping unsafe work, worksite measures and dose-rate criteria. FANC Jurion, Dutch.', 'https://www.jurion.fanc.fgov.be/jurdb-consult/plainWettekstServlet?lang=nl&wettekstId=32769'],
    ['Legislation', 'ARBIS / RGPRI — Royal Decree of 20 July 2001', 'The general radiation protection regulation. FANC Jurion, Dutch.', 'https://www.jurion.fanc.fgov.be/jurdb-consult/plainWettekstServlet?lang=nl&wettekstId=7460'],
    ['Legislation', 'ARBIS article 20 — protection principles and dose limits', 'Justification, optimisation and dose limitation. FANC Jurion, Dutch.', 'https://www.jurion.fanc.fgov.be/jurdb-consult/plainWettekstServlet?lang=nl&wettekstId=11565'],
    ['Legislation', 'ARBIS article 23 — physical control', 'Organisation of physical control, the head of service, recognised experts and Agency supervision. FANC Jurion, Dutch.', 'https://www.jurion.fanc.fgov.be/jurdb-consult/plainWettekstServlet?lang=nl&wettekstId=11569'],
    ['Legislation', 'ARBIS article 30 — individual protection; 30.4 training of agents', 'Including the training of radiation protection agents. FANC Jurion, Dutch.', 'https://www.jurion.fanc.fgov.be/jurdb-consult/plainWettekstServlet?lang=nl&wettekstId=11577'],
    ['Legislation', 'ARBIS article 26 — duties of workers', 'What every worker and external worker must do. FANC Jurion, Dutch.', 'https://www.jurion.fanc.fgov.be/jurdb-consult/plainWettekstServlet?lang=nl&wettekstId=11572'],
    ['Legislation', 'ARBIS article 27 — safety factors', 'The regulation’s own safety factors for effective protection. FANC Jurion, Dutch.', 'https://www.jurion.fanc.fgov.be/jurdb-consult/plainWettekstServlet?lang=nl&wettekstId=11574'],
    ['Legislation', 'ARBIS article 31 — warning signs, symbols and mentions', 'Signs and markings, including the trefoil. FANC Jurion, Dutch.', 'https://www.jurion.fanc.fgov.be/jurdb-consult/plainWettekstServlet?lang=nl&wettekstId=11578'],
    ['Legislation', 'ARBIS chapter III section VI — external workers', 'Articles 37ter–37sexies on the protection of external workers. FANC Jurion, Dutch.', 'https://www.jurion.fanc.fgov.be/jurdb-consult/plainWettekstServlet?lang=nl&wettekstId=11588'],
    ['Legislation', 'FANC technical regulation of 7 November 2023 — minimum safety means', 'Minimum requirements for certain safety means in industrial radiography. FANC Jurion, Dutch.', 'https://www.jurion.fanc.fgov.be/jurdb-consult/plainWettekstServlet?lang=nl&wettekstId=33444'],
    ['Legislation', 'FANC technical regulation of 31 January 2019 (sections 3.2.6 and 4.1.1)', 'Technical regulation referred to for physical control arrangements. FANC Jurion, Dutch.', 'https://www.jurion.fanc.fgov.be/jurdb-consult/plainWettekstServlet?lang=nl&wettekstId=27058'],
    ['Guidance', 'FANC — Industrial radiography (overview)', 'The regulator’s overview page for industrial radiography. Dutch.', 'https://fanc.fgov.be/nl/professionals/industriele-activiteiten/industriele-radiografie'],
    ['Guidance', 'FANC — Justification in industrial radiography', 'Three levels: technique, irradiation location, type of equipment. Dutch.', 'https://fanc.fgov.be/nl/professionals/industriele-activiteiten/industriele-radiografie/rechtvaardiging'],
    ['Guidance', 'FANC — Responsibilities of the NDT client', 'What the client has to provide and arrange. Dutch.', 'https://fanc.fgov.be/nl/professionals/industriele-activiteiten/industriele-radiografie/verantwoordelijkheden-van-de-ndo-0'],
    ['Guidance', 'FANC — Bunker (industrial radiography)', 'What makes an enclosure a bunker and which safety features it needs. Dutch.', 'https://fanc.fgov.be/nl/professionals/industriele-activiteiten/industriele-radiografie/bunker'],
    ['Guidance', 'FANC — Industrial radiography FAQ', 'Frequently asked questions. Dutch.', 'https://fanc.fgov.be/nl/professionals/industriele-activiteiten/industriele-radiografie/faq'],
    ['Guidance', 'FANC — Physical control and recognised organisations', 'Regulatory page on physical control. Dutch.', 'https://fanc.fgov.be/nl/professionals/regelgeving/fysische-controle'],
    ['Guidance', 'FANC — Recognition of individual experts', 'How experts in physical control are recognised. Dutch.', 'https://fanc.fgov.be/nl/professionals/fysische-controle/deskundige-erkend-de-fysische-controle'],
    ['Guidance', 'FANC — Mission and regulatory role', 'Who the Agency is. Dutch.', 'https://fanc.fgov.be/nl/over-ons/wie-zijn-wij'],
    ['Guidance', 'IAEA GSR Part 3 — Radiation protection and safety of radiation sources', 'International basic safety standards (PDF, English).', 'https://www-pub.iaea.org/MTCD/Publications/PDF/Pub1578_web-57265295.pdf'],
  ];
  const PDF = { title: 'Havenmeer — inspection request and preparation dossier (3 pages, teaching sample)', file: 'havenmeer-request-dossier.pdf',
    note: 'Bram’s request, the planning reply and the completed inspection request with the task risk analysis — the fictional dossier followed in chapters 5 to 8 and 15.' };
  const xItems = () => (lesson().scenes.find((s) => s.id === 'S12') || {}).interaction?.items || [];
  function entry(id) {
    if (id === 'PDF-DOSSIER') return { id, kind: 'pdf', title: PDF.title, note: PDF.note };
    if (id.startsWith('X-')) { const it = xItems().find((x) => x.id === id.slice(2)); return it ? { id, kind: 'x', title: it.label, note: it.page, item: it } : null; }
    const d = COURSE.documents[id]; return d ? { id, kind: 'doc', title: d.title, note: NOTE[id] || d.rules } : null;
  }
  function card(e) {
    const actions = e.kind === 'pdf'
      ? `<a class="lib-btn primary" href="${PDF.file}" target="_blank" rel="noopener">Open PDF</a><a class="lib-btn" href="${PDF.file}" download>Download</a>`
      : `<button class="lib-btn primary" data-open="${esc(e.id)}">Open document</button>`;
    return `<article class="lib-card"><div class="lib-card-text"><span class="lib-kind">${e.kind === 'pdf' ? 'PDF · 3 pages' : e.kind === 'x' ? 'Reader' : 'Teaching document'}</span><h3>${esc(e.title)}</h3><p>${esc(e.note)}</p></div><div class="lib-actions">${actions}</div></article>`;
  }
  function official() {
    const groups = ['Legislation', 'Guidance'];
    return groups.map((g) => `<h3 class="lib-sub">${g === 'Legislation' ? 'Legislation (FANC Jurion)' : 'Guidance and background'}</h3><div class="lib-list">${OFFICIAL.filter((o) => o[0] === g).map((o) => `<article class="lib-row"><div><h4>${esc(o[1])}</h4><p>${esc(o[2])}</p></div><a class="lib-btn" href="${o[3]}" target="_blank" rel="noopener noreferrer">Open official source</a></article>`).join('')}</div>`).join('');
  }
  function currentScene() { const m = (document.getElementById('stage').dataset.scene || '').split('-'); return m[1] || 'S01'; }
  function open() {
    const sid = currentScene(), sc = lesson().scenes.find((s) => s.id === sid);
    const here = (BY_SCENE[sid] || []).map(entry).filter(Boolean);
    const seen = new Set(here.map((e) => e.id));
    const rest = LESSON_DOCS.filter((id) => !seen.has(id)).map(entry).filter(Boolean);
    const html = `<div class="lib">
      <p class="lib-intro">Teaching documents are fictional samples made for this course; no real client, person or licence data. Official sources open on the issuing body’s own site.</p>
      <section><h3 class="lib-head">Documents in this chapter <span>${esc(sc ? `${lesson().scenes.indexOf(sc) + 1}. ${sc.title}` : '')}</span></h3>
        ${here.length ? `<div class="lib-grid">${here.map(card).join('')}</div>` : '<p class="lib-empty">This chapter uses no separate document. The documents of the lesson are listed below.</p>'}</section>
      <section><h3 class="lib-head">Other documents of this lesson</h3><div class="lib-grid">${rest.map(card).join('')}</div></section>
      <section><h3 class="lib-head">Official legislation and guidance</h3>${official()}</section>
      <p class="lib-foot"><a href="sources.html" target="_blank" rel="noopener">Full list of sources and image credits</a></p></div>`;
    Player.reader('Documents · lesson B1.1', html);
    $('reader-body').querySelectorAll('[data-open]').forEach((b) => b.onclick = () => openEntry(b.dataset.open));
  }
  function openEntry(id) {
    const e = entry(id); if (!e) return;
    if (e.kind === 'x') B11Reviewed.readDocument(e.item); else Player.document(e.id);
    const back = document.createElement('button'); back.className = 'lib-back'; back.type = 'button'; back.textContent = '← Back to documents';
    back.onclick = open; $('reader-body').prepend(back); back.focus();
  }
  $('documents').onclick = open;
  window.B11Library = { open };
})();
