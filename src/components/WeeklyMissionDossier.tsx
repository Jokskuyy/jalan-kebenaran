import { caseDossiers } from '../data/missions';
import type { RoadmapWeek } from '../data/roadmap';

type WeeklyMissionDossierProps = {
  week: RoadmapWeek;
};

export function WeeklyMissionDossier({ week }: WeeklyMissionDossierProps) {
  const dossiers = week.mission.caseIds.map((caseId) => caseDossiers[caseId]);
  const caseLabel = dossiers.map((dossier) => dossier.title).join(' + ');

  return (
    <details className="mission-dossier">
      <summary>
        <span>MISSION KIT</span>
        <strong>{caseLabel}</strong>
        <em>Open context + files ↘</em>
      </summary>

      <div className="mission-dossier__body">
        <section className="mission-preflight" aria-label={`Pre-flight mission minggu ${week.week}`}>
          <header>
            <span>PRE-FLIGHT · SYNTHETIC CASE</span>
            <p>{week.mission.story.opening}</p>
          </header>
          <dl>
            <div>
              <dt>SITUATION</dt>
              <dd>{week.mission.context}</dd>
            </div>
            <div>
              <dt>MISSION THIS WEEK</dt>
              <dd>{week.clientOutcome} Deliverable: {week.mission.deliverable.title}.</dd>
            </div>
            <div>
              <dt>YOUR FIRST MOVE</dt>
              <dd>Buka evidence dan starter brief, lalu klik Copy full mission. Jawab satu keputusan per adegan.</dd>
            </div>
            <div>
              <dt>AI WILL</dt>
              <dd>Memainkan client dan coach, memberi satu adegan per giliran, lalu menunggu jawaban lo.</dd>
            </div>
            <div>
              <dt>DONE WHEN</dt>
              <dd>{week.gate}</dd>
            </div>
          </dl>
        </section>

        <details className="mission-panel">
          <summary>
            <span>01</span>
            <div>
              <p>LEARN · JUST IN TIME</p>
              <h4 id={`${week.id}-learn`}>Pelajari hanya yang dibutuhkan untuk mission ini.</h4>
            </div>
          </summary>
          <div className="mission-panel__content">
            <div className="teach-first">
              <strong>STORY-FIRST PROTOCOL</strong>
              <p>AI membawa lo ke satu adegan client, meminta keputusan, lalu baru memberi nama konsep yang barusan lo pakai. Satu adegan per giliran; AI tidak melanjutkan sebelum lo menjawab.</p>
              <div>{week.concepts.map((concept) => <span key={concept}>{concept}</span>)}</div>
            </div>
            <div className="resource-list">
              {week.mission.resources.map((resource) => (
                <a href={resource.url} target="_blank" rel="noreferrer" key={resource.id}>
                  <span>{resource.provider} · {resource.minutes} MIN</span>
                  <strong>{resource.title}</strong>
                  <p>{resource.why}</p>
                  <em aria-hidden="true">OPEN ↗</em>
                </a>
              ))}
            </div>
          </div>
        </details>

        <details className="mission-panel">
          <summary>
            <span>02</span>
            <div>
              <p>INSPECT · CLIENT EVIDENCE</p>
              <h4 id={`${week.id}-case`}>Pahami kondisi client sebelum merancang solusi.</h4>
            </div>
          </summary>
          <div className="mission-panel__content">
            <div className="case-grid">
              {dossiers.map((dossier) => (
                <article key={dossier.id}>
                  <span>{dossier.label}</span>
                  <h5>{dossier.title}</h5>
                  <p className="case-client">{dossier.client} · {dossier.weeks}</p>
                  <p>{dossier.brief}</p>
                  <strong>KNOWN FACTS</strong>
                  <ul>{dossier.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
                </article>
              ))}
            </div>
            <div className="raw-evidence">
              <strong>THIS WEEK'S RAW EVIDENCE</strong>
              <ul>{week.mission.rawEvidence.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </details>

        <details className="mission-panel">
          <summary>
            <span>03</span>
            <div>
              <p>BUILD · ATTEMPT SOLO</p>
              <h4 id={`${week.id}-build`}>{week.mission.deliverable.title}</h4>
            </div>
          </summary>
          <div className="mission-panel__content">
            <div className="deliverable-grid">
              <dl>
                <div><dt>FORMAT</dt><dd>{week.mission.deliverable.format}</dd></div>
                <div><dt>LANGUAGE</dt><dd>{week.mission.deliverable.language}</dd></div>
                <div><dt>TIMEBOX</dt><dd>{week.hours}</dd></div>
              </dl>
              <div>
                <strong>REQUIRED SECTIONS</strong>
                <ol>{week.mission.deliverable.sections.map((section) => <li key={section}>{section}</li>)}</ol>
              </div>
            </div>
          </div>
        </details>

        <details className="mission-panel">
          <summary>
            <span>04</span>
            <div>
              <p>REVIEW · SCORE 0–2</p>
              <h4 id={`${week.id}-rubric`}>Minta kritik, revisi sendiri, lalu buktikan gate.</h4>
            </div>
          </summary>
          <div className="mission-panel__content">
            <div className="rubric-list">
              {week.mission.rubric.map((item) => (
                <article key={item.id}>
                  <span>0 · 1 · 2</span>
                  <strong>{item.label}</strong>
                  <p>{item.passCondition}</p>
                </article>
              ))}
            </div>
            <div className="coach-rule">
              <strong>COACH PROTOCOL</strong>
              <p>AI wajib meminta draft lo dulu, bertanya maksimal lima kali, memberi skor dan revision checklist, serta tidak menulis artifact final untuk lo.</p>
            </div>
          </div>
        </details>

        <details className="mission-panel">
          <summary>
            <span>05</span>
            <div>
              <p>STARTER FILES · DOWNLOAD</p>
              <h4 id={`${week.id}-files`}>Raw evidence dan template untuk mulai bekerja.</h4>
            </div>
          </summary>
          <div className="mission-panel__content">
            <div className="starter-file-list">
              {week.mission.starterAssets.map((asset) => (
                <a href={asset.path} download key={asset.path}>
                  <span>{asset.kind.toUpperCase()}</span>
                  <strong>{asset.label}</strong>
                  <p>{asset.description}</p>
                  <em aria-hidden="true">DOWNLOAD ↓</em>
                </a>
              ))}
            </div>
          </div>
        </details>
      </div>
    </details>
  );
}
