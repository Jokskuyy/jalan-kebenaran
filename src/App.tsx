import { useMemo, useState, type CSSProperties } from 'react';
import {
  evidenceItems,
  phases,
  projectLabs,
  roadmapWeeks,
  skillNodes,
  targetRoles,
  type PhaseId,
  type RoadmapWeek,
} from './data/roadmap';
import { useProgress } from './hooks/useProgress';

const applicationCadence = [
  ['12–15', 'targeted applications'],
  ['05', 'relevant outreach'],
  ['02', 'mock interviews'],
  ['01', 'public build note'],
];

function phaseForWeek(week: RoadmapWeek) {
  return phases.find((phase) => phase.id === week.phaseId) ?? phases[0];
}

function App() {
  const {
    state,
    progress,
    currentWeek,
    setStartDate,
    setSelectedPhase,
    toggleTask,
    toggleGate,
    toggleEvidence,
    reset,
  } = useProgress();
  const [copiedWeekId, setCopiedWeekId] = useState<string | null>(null);
  const [liveMessage, setLiveMessage] = useState('');

  const completedTasks = useMemo(() => new Set(state.completedTaskIds), [state.completedTaskIds]);
  const completedGates = useMemo(() => new Set(state.completedGateIds), [state.completedGateIds]);
  const completedEvidence = useMemo(
    () => new Set(state.completedEvidenceIds),
    [state.completedEvidenceIds],
  );

  const currentWeekData = roadmapWeeks[currentWeek - 1];
  const currentPhase = phaseForWeek(currentWeekData);
  const nextOpenWeek = roadmapWeeks.find((week) => !completedGates.has(week.id));
  const nextOpenEvidence = evidenceItems.find((item) => !completedEvidence.has(item.id));
  const nextMilestone = nextOpenWeek
    ? `W${String(nextOpenWeek.week).padStart(2, '0')} · ${nextOpenWeek.gate}`
    : nextOpenEvidence
      ? `Evidence · ${nextOpenEvidence.label}`
      : 'Roadmap complete · publish the retrospective.';

  const filteredWeeks = state.selectedPhase === 'all'
    ? roadmapWeeks
    : roadmapWeeks.filter((week) => week.phaseId === state.selectedPhase);

  const phaseWeekNumbers = useMemo(() => {
    if (state.selectedPhase === 'all') return null;
    return new Set(
      roadmapWeeks
        .filter((week) => week.phaseId === state.selectedPhase)
        .map((week) => week.week),
    );
  }, [state.selectedPhase]);

  const filteredSkills = phaseWeekNumbers
    ? skillNodes.filter((skill) => skill.weeks.some((week) => phaseWeekNumbers.has(week)))
    : skillNodes;

  function jumpToRoadmap(phaseId?: PhaseId) {
    if (phaseId) setSelectedPhase(phaseId);
    window.requestAnimationFrame(() => {
      document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function jumpToCurrentWeek() {
    setSelectedPhase(currentWeekData.phaseId);
    window.requestAnimationFrame(() => {
      document
        .getElementById(currentWeekData.id)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  async function copyAgentBrief(week: RoadmapWeek) {
    try {
      await navigator.clipboard.writeText(week.agentBrief);
      setCopiedWeekId(week.id);
      setLiveMessage(`Agent brief minggu ${week.week} disalin.`);
      window.setTimeout(() => setCopiedWeekId(null), 1800);
    } catch {
      setLiveMessage('Browser menolak akses clipboard. Pilih dan salin brief secara manual.');
    }
  }

  function resetProgress() {
    const confirmed = window.confirm('Hapus seluruh progres AGENT/16 di browser ini?');
    if (!confirmed) return;
    reset();
    setLiveMessage('Seluruh progres lokal sudah direset.');
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Lewati ke konten utama</a>

      <header className="topbar">
        <a className="brand" href="#top" aria-label="AGENT/16 home">
          <span className="brand-mark">A/16</span>
          <span>CLIENT SOLUTION ROADMAP</span>
        </a>
        <nav aria-label="Navigasi utama">
          <a href="#loop">Delivery loop</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#labs">Project labs</a>
          <a href="#evidence">Evidence</a>
        </nav>
        <span className="storage-note">LOCAL-ONLY · NO ACCOUNT</span>
      </header>

      <main id="main-content">
        <section className="hero section-shell" id="top">
          <div className="hero-copy">
            <p className="eyebrow">FIELD MANUAL 01 · FRESH GRAD → CLIENT-READY BUILDER</p>
            <h1>AGENT/<br />16</h1>
            <p className="hero-thesis">
              Bukan belajar coding dari nol. Belajar mengirim solusi agentic AI yang bisa dipercaya client.
            </p>
            <p className="hero-body">
              Roadmap 16 minggu untuk menguasai discovery, agent architecture, RAG, integration,
              evaluation, safety, dan business impact—dengan coding sebagai alat delivery.
            </p>
            <div className="hero-actions">
              <button className="button button-primary" type="button" onClick={() => jumpToRoadmap()}>
                Mulai current mission <span aria-hidden="true">↘</span>
              </button>
              <a className="button button-quiet" href="#labs">Lihat project labs</a>
            </div>
          </div>

          <aside className="mission-card" aria-labelledby="mission-title">
            <div className="mission-card__header">
              <span id="mission-title">MISSION CONTROL</span>
              <span className="status-dot">SYSTEM READY</span>
            </div>
            <div
              className="progress-gauge"
              style={{ '--progress': `${progress}%` } as CSSProperties}
              role="progressbar"
              aria-label="Overall roadmap progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <strong>{progress}%</strong>
              <span>overall progress</span>
            </div>
            <label className="date-field">
              <span>START DATE</span>
              <input
                type="date"
                value={state.startDate}
                onChange={(event) => setStartDate(event.target.value)}
                aria-describedby="date-help"
              />
              <small id="date-help">Current week dihitung otomatis dari tanggal ini.</small>
            </label>
            <div className="mission-stat-row">
              <div><span>CURRENT WEEK</span><strong>W{String(currentWeek).padStart(2, '0')}</strong></div>
              <div><span>PHASE</span><strong>{currentPhase.label}</strong></div>
            </div>
            <div className="mission-next">
              <span>NEXT MILESTONE</span>
              <strong>{nextMilestone}</strong>
            </div>
          </aside>
        </section>

        <section className="delivery-section" id="loop">
          <div className="section-shell">
            <div className="section-heading compact inverse-heading">
              <p className="eyebrow">OPERATING MODEL · CLICK TO FILTER</p>
              <h2>Agent Delivery Loop</h2>
              <p>Workflow yang proper bukan soal banyak agent. Ia soal keputusan yang dapat dibatasi, diuji, dan dioperasikan.</p>
            </div>
            <div
              className="delivery-loop"
              style={{ '--trace-progress': `${Math.max(5, progress)}%` } as CSSProperties}
              aria-label="Fase agent delivery"
            >
              {phases.map((phase, index) => {
                const isSelected = state.selectedPhase === phase.id;
                const isCurrent = currentPhase.id === phase.id;
                return (
                  <button
                    className={`phase-node${isSelected ? ' active' : ''}${isCurrent ? ' current' : ''}`}
                    type="button"
                    key={phase.id}
                    onClick={() => jumpToRoadmap(phase.id)}
                    aria-pressed={isSelected}
                    aria-label={`Filter ${phase.label}: ${phase.description}`}
                  >
                    <span className="phase-index">0{index + 1} · {phase.verb}</span>
                    <strong>{phase.label}</strong>
                    <small>{phase.description}</small>
                  </button>
                );
              })}
            </div>
            <div className="loop-footer">
              <p><span>TRACE</span> {progress}% evidence complete · current phase {currentPhase.label}</p>
              <button
                className="text-button inverse-text-button"
                type="button"
                onClick={() => setSelectedPhase('all')}
                aria-pressed={state.selectedPhase === 'all'}
              >
                Tampilkan semua fase
              </button>
            </div>
          </div>
        </section>

        <section className="roadmap-section section-shell" id="roadmap">
          <aside className="roadmap-rail" aria-label="Current mission">
            <p className="eyebrow">CURRENT MISSION</p>
            <span className="week-stamp">{String(currentWeek).padStart(2, '0')}</span>
            <div>
              <p className="rail-phase">{currentPhase.label} · {currentPhase.verb}</p>
              <h2>{currentWeekData.title}</h2>
              <p>{currentWeekData.clientOutcome}</p>
            </div>
            <dl>
              <div><dt>TIMEBOX</dt><dd>{currentWeekData.hours}</dd></div>
              <div><dt>FILTER</dt><dd>{state.selectedPhase === 'all' ? 'All phases' : phaseForWeek(filteredWeeks[0]).label}</dd></div>
              <div><dt>VISIBLE</dt><dd>{filteredWeeks.length} of 16 weeks</dd></div>
            </dl>
            <button className="button button-primary rail-button" type="button" onClick={jumpToCurrentWeek}>
              Buka minggu ini
            </button>
          </aside>

          <div className="roadmap-content">
            <div className="section-heading">
              <p className="eyebrow">16-WEEK EXECUTION SYSTEM</p>
              <h2>Roadmap yang menghasilkan bukti.</h2>
              <p>Centang kerja nyata, bukan jam menonton. Gate hanya selesai ketika acceptance criterion benar-benar terbukti.</p>
            </div>

            <div className="filter-strip" aria-live="polite">
              <span>{state.selectedPhase === 'all' ? 'ALL PHASES' : `FILTER · ${state.selectedPhase.toUpperCase()}`}</span>
              <strong>{filteredWeeks.length} MINGGU TERLIHAT</strong>
              {state.selectedPhase !== 'all' && (
                <button type="button" onClick={() => setSelectedPhase('all')}>Clear filter ×</button>
              )}
            </div>

            <div className="week-list">
              {filteredWeeks.map((week) => {
                const phase = phaseForWeek(week);
                const tasksDone = week.tasks.filter((task) => completedTasks.has(task.id)).length;
                const gateDone = completedGates.has(week.id);
                const weekDone = tasksDone === week.tasks.length && gateDone;
                const isCurrent = week.week === currentWeek;

                return (
                  <article
                    className={`week-card${isCurrent ? ' is-current' : ''}${weekDone ? ' is-complete' : ''}`}
                    id={week.id}
                    key={week.id}
                  >
                    <header>
                      <span className="week-number">W{String(week.week).padStart(2, '0')}</span>
                      <div>
                        <p>{phase.label} · {phase.verb}</p>
                        <h3>{week.title}</h3>
                      </div>
                      <div className="week-meta">
                        <span className="week-hours">{week.hours}</span>
                        <span className={`week-state ${weekDone ? 'done' : ''}`}>
                          {weekDone ? 'GATE PASSED' : `${tasksDone}/${week.tasks.length} TASKS`}
                        </span>
                      </div>
                    </header>

                    <p className="client-outcome">
                      <span>CLIENT OUTCOME</span>
                      <strong>{week.clientOutcome}</strong>
                    </p>

                    <div className="concept-list" aria-label="Konsep minggu ini">
                      {week.concepts.map((concept) => <span key={concept}>{concept}</span>)}
                    </div>

                    <div className="task-list" role="group" aria-label={`Tasks minggu ${week.week}`}>
                      {week.tasks.map((task) => (
                        <label key={task.id}>
                          <input
                            type="checkbox"
                            checked={completedTasks.has(task.id)}
                            onChange={() => toggleTask(task.id)}
                          />
                          <span>{task.label}</span>
                        </label>
                      ))}
                    </div>

                    <footer>
                      <div>
                        <span>SHIP THIS EVIDENCE</span>
                        <strong>{week.evidence}</strong>
                      </div>
                      <div>
                        <span>QUALITY GATE</span>
                        <strong>{week.gate}</strong>
                      </div>
                    </footer>

                    <div className="week-actions">
                      <button className="copy-button" type="button" onClick={() => copyAgentBrief(week)}>
                        {copiedWeekId === week.id ? 'Brief disalin ✓' : 'Copy agent brief'}
                      </button>
                      <button
                        className={`gate-button${gateDone ? ' complete' : ''}`}
                        type="button"
                        aria-pressed={gateDone}
                        onClick={() => toggleGate(week.id)}
                      >
                        {gateDone ? 'Gate passed ✓' : 'Tandai gate passed'}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="skill-section" id="skills">
          <div className="section-shell">
            <div className="section-heading skill-heading">
              <p className="eyebrow">CAPABILITY MAP · FILTER-AWARE</p>
              <h2>Skill yang membuat client percaya.</h2>
              <p>Framework berubah. Kemampuan memahami masalah, membatasi tindakan, mengukur kualitas, dan menjaga operasi tetap bernilai.</p>
            </div>
            <div className="skill-grid">
              {filteredSkills.map((skill, index) => (
                <article className={`skill-card ${skill.kind}`} key={skill.id}>
                  <header>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <em>{skill.kind === 'core' ? 'CORE CAPABILITY' : 'SUPPORT LAYER'}</em>
                  </header>
                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>
                  <ul>
                    {skill.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
                  </ul>
                  <footer>
                    <span>PROOF</span>
                    <strong>{skill.proof}</strong>
                    <small>W{skill.weeks.map((week) => String(week).padStart(2, '0')).join(' · W')}</small>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="labs-section section-shell" id="labs">
          <div className="section-heading labs-heading">
            <p className="eyebrow">CLIENT PROJECT LABS</p>
            <h2>Dua proyek. Dua jenis risiko. Bukti end-to-end.</h2>
            <p>Keduanya menggunakan data publik atau sintetis. Tujuannya bukan meniru client sungguhan, tetapi menunjukkan cara berpikir seperti delivery engineer.</p>
          </div>

          <div className="lab-grid">
            {projectLabs.map((project) => (
              <article className="lab-card" key={project.id}>
                <header>
                  <p>{project.label}</p>
                  <span>{project.weeks}</span>
                </header>
                <h3>{project.title}</h3>
                <div className="lab-problem">
                  <span>PROBLEM</span>
                  <p>{project.problem}</p>
                </div>
                <div className="workflow-trace" aria-label={`Workflow ${project.title}`}>
                  {project.workflow.map((step, index) => (
                    <span key={step}>{step}{index < project.workflow.length - 1 && <b aria-hidden="true">→</b>}</span>
                  ))}
                </div>
                <div className="constraint-callout">
                  <span>NON-NEGOTIABLE CONSTRAINT</span>
                  <strong>{project.constraint}</strong>
                </div>
                <div className="lab-lists">
                  <div>
                    <span>MEASURE</span>
                    <ul>{project.metrics.map((metric) => <li key={metric}>{metric}</li>)}</ul>
                  </div>
                  <div>
                    <span>ACCEPTANCE</span>
                    <ul>{project.acceptance.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="evidence-section" id="evidence">
          <div className="section-shell evidence-layout">
            <div className="evidence-intro">
              <p className="eyebrow">JOB-READY EVIDENCE</p>
              <h2>Recruiter tidak bisa menilai niat. Mereka bisa menilai bukti.</h2>
              <p>Gunakan checklist ini sebagai definition of done sebelum mengklaim diri siap mengirim solusi agentic AI.</p>
              <div className="evidence-score">
                <strong>{String(state.completedEvidenceIds.length).padStart(2, '0')}/{String(evidenceItems.length).padStart(2, '0')}</strong>
                <span>portfolio artifacts complete</span>
              </div>
            </div>

            <div className="evidence-checklist" role="group" aria-label="Portfolio evidence checklist">
              {evidenceItems.map((item) => (
                <label key={item.id} className={completedEvidence.has(item.id) ? 'checked' : ''}>
                  <input
                    type="checkbox"
                    checked={completedEvidence.has(item.id)}
                    onChange={() => toggleEvidence(item.id)}
                  />
                  <span className="evidence-week">W{String(item.week).padStart(2, '0')}</span>
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.description}</small>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="section-shell readiness-grid">
            <article className="role-panel">
              <p className="eyebrow">SEARCH BY JOB DESCRIPTION, NOT ONE TITLE</p>
              <h3>Target role radar</h3>
              <div className="role-list">
                {targetRoles.map((role, index) => (
                  <span key={role}><b>{String(index + 1).padStart(2, '0')}</b>{role}</span>
                ))}
              </div>
            </article>
            <article className="cadence-panel">
              <p className="eyebrow">WEEKLY APPLICATION SPRINT</p>
              <h3>Belajar dan melamar berjalan paralel.</h3>
              <div className="cadence-grid">
                {applicationCadence.map(([value, label]) => (
                  <div key={label}><strong>{value}</strong><span>{label}</span></div>
                ))}
              </div>
              <p className="cadence-note">Mulai melamar sejak minggu pertama. Respons pasar adalah evaluation signal untuk positioning, portfolio, dan interview loop.</p>
            </article>
          </div>
        </section>

        <section className="closing-section section-shell">
          <div>
            <p className="eyebrow">THE FINISH LINE</p>
            <h2>Jangan jual “bisa pakai AI”.<br />Tunjukkan sistem yang bisa dipercaya.</h2>
          </div>
          <a className="button button-primary" href="#roadmap">Kembali ke mission ↑</a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-shell footer-grid">
          <div>
            <span className="brand-mark">A/16</span>
            <p>Progress disimpan hanya di browser ini melalui localStorage. Tidak ada akun, backend, database, API key, atau data client.</p>
          </div>
          <div>
            <p><strong>PORTFOLIO DISCLAIMER</strong><br />Project labs memakai data publik atau sintetis. Benchmark harus dilabeli sebagai simulasi.</p>
            <button className="reset-button" type="button" onClick={resetProgress}>Reset local progress</button>
          </div>
        </div>
      </footer>

      <p className="sr-only" aria-live="polite">{liveMessage}</p>
    </div>
  );
}

export default App;
