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
        <span>FULL MISSION DOSSIER</span>
        <strong>{caseLabel}</strong>
        <em>Open brief + files ↘</em>
      </summary>

      <div className="mission-dossier__body">
        <div className="mission-context">
          <span>SYNTHETIC TRAINING CASE · AI COACHES, YOU BUILD</span>
          <p>{week.mission.context}</p>
        </div>

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
              <strong>TEACHING PROTOCOL</strong>
              <p>AI wajib menjelaskan konsep di bawah dalam Bahasa Indonesia sebelum meminta draft: definisi sederhana, alasan konsep ini penting, contoh dari case minggu ini, anti-pattern, dan satu pertanyaan cek pemahaman.</p>
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
