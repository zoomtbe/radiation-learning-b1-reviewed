/* Documents library (owner request 7 October 2026; extended to all six lessons on 8 October).
 * Presentation, ordering and controls only. Contents come from the package itself: COURSE.documents, the B1.1 exploration
 * readers, the Havenmeer dossier PDF, and the official references of sources.html; the chapter→document map is the
 * package's own (visuals.js cue/fallback tables, course.js references), generated into library-data.js at build time.
 * Order: documents of the current chapter → other documents of this lesson → official legislation and guidance. */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id), esc = Visuals.esc;
  const DATA = window.B1_LIBRARY || { lessons: {} };
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
  const PDF = { title: 'Havenmeer — inspection request and preparation dossier (3 pages, teaching sample)', file: 'havenmeer-request-dossier.pdf',
    note: 'Bram’s request, the planning reply and the completed inspection request with the task risk analysis — the fictional dossier followed in chapters 5 to 8 and 15.' };
  const current = () => { const m = (document.getElementById('stage').dataset.scene || 'B1.1-S01').split('-'); return { lid: m[0], sid: m[1] || 'S01' }; };
  const lessonOf = (lid) => COURSE.lessons.find((l) => l.id === lid) || COURSE.lessons[0];
  const xItems = (lid) => lid === 'B1.1' ? ((lessonOf(lid).scenes.find((s) => s.id === 'S12') || {}).interaction?.items || []) : [];
  function entry(id, lid) {
    if (id === 'PDF-DOSSIER') return { id, kind: 'pdf', title: PDF.title, note: PDF.note };
    if (id.startsWith('X-')) { const it = xItems(lid).find((x) => x.id === id.slice(2)); return it ? { id, kind: 'x', title: it.label, note: it.page, item: it } : null; }
    const d = COURSE.documents[id]; return d ? { id, kind: 'doc', title: d.title, note: (lid === 'B1.1' && NOTE[id]) || d.rules } : null;
  }
  function card(e) {
    const actions = e.kind === 'pdf'
      ? `<a class="lib-btn primary" href="${PDF.file}" target="_blank" rel="noopener">Open PDF</a><a class="lib-btn" href="${PDF.file}" download>Download</a>`
      : `<button class="lib-btn primary" data-open="${esc(e.id)}">Open document</button>`;
    return `<article class="lib-card"><div class="lib-card-text"><span class="lib-kind">${e.kind === 'pdf' ? 'PDF · 3 pages' : e.kind === 'x' ? 'Reader' : 'Teaching document'}</span><h3>${esc(e.title)}</h3><p>${esc(e.note)}</p></div><div class="lib-actions">${actions}</div></article>`;
  }
  const row = (o) => `<article class="lib-row"><div><h4>${esc(o.title)}</h4>${o.note ? `<p>${esc(o.note)}</p>` : ''}</div><a class="lib-btn" href="${o.url}" target="_blank" rel="noopener noreferrer">Open official source</a></article>`;
  function official(L) {
    const groups = [['Legislation (FANC Jurion)', L.official.filter((o) => /jurion/.test(o.url))], ['Guidance and background', L.official.filter((o) => !/jurion/.test(o.url))]];
    return groups.filter((g) => g[1].length).map((g) => `<h3 class="lib-sub">${g[0]}</h3><div class="lib-list">${g[1].map(row).join('')}</div>`).join('');
  }
  function open() {
    const { lid, sid } = current(); const les = lessonOf(lid); const L = DATA.lessons[lid] || { byScene: {}, docs: [], official: [] };
    const sc = les.scenes.find((s) => s.id === sid);
    const here = (L.byScene[sid] || []).map((id) => entry(id, lid)).filter(Boolean);
    const seen = new Set(here.map((e) => e.id));
    const rest = L.docs.filter((id) => !seen.has(id)).map((id) => entry(id, lid)).filter(Boolean);
    const html = `<div class="lib">
      <p class="lib-intro">Teaching documents are fictional samples made for this course; no real client, person or licence data. Official sources open on the issuing body’s own site.</p>
      <section><h3 class="lib-head">Documents in this chapter <span>${esc(sc ? `${les.scenes.indexOf(sc) + 1}. ${sc.title}` : '')}</span></h3>
        ${here.length ? `<div class="lib-grid">${here.map(card).join('')}</div>` : '<p class="lib-empty">This chapter uses no separate document. The documents of the lesson are listed below.</p>'}</section>
      <section><h3 class="lib-head">Other documents of this lesson</h3>${rest.length ? `<div class="lib-grid">${rest.map(card).join('')}</div>` : '<p class="lib-empty">No further documents in this lesson.</p>'}</section>
      <section><h3 class="lib-head">Official legislation and guidance <span>${esc(lid)}</span></h3>${official(L)}</section>
      <p class="lib-foot"><a href="sources.html" target="_blank" rel="noopener">Full list of sources and image credits</a></p></div>`;
    Player.reader(`Documents · lesson ${lid}`, html);
    $('reader-body').querySelectorAll('[data-open]').forEach((b) => b.onclick = () => openEntry(b.dataset.open, lid));
  }
  function openEntry(id, lid) {
    const e = entry(id, lid); if (!e) return;
    if (e.kind === 'x') B11Reviewed.readDocument(e.item); else Player.document(e.id);
    const back = document.createElement('button'); back.className = 'lib-back'; back.type = 'button'; back.textContent = '← Back to documents';
    back.onclick = open; $('reader-body').prepend(back); back.focus();
  }
  $('documents').onclick = open;
  window.B11Library = { open };
})();
