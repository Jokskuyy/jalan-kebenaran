import { useMemo, useState, type FormEvent } from 'react';
import type { RoadmapWeek } from '../data/roadmap';
import {
  calculateWeeklyScore,
  parseAssessmentPaste,
  validateAssessment,
  type RubricScore,
  type StoredWeeklyAssessment,
  type WeeklyAssessmentInput,
} from '../lib/assessment';

type MissionDebriefProps = {
  week: RoadmapWeek;
  assessment?: StoredWeeklyAssessment;
  onSave: (assessment: WeeklyAssessmentInput) => boolean;
  onDelete: () => void;
  onStatus: (message: string) => void;
};

function editableAssessment(assessment: StoredWeeklyAssessment): WeeklyAssessmentInput {
  const { savedAt: _savedAt, ...input } = assessment;
  return input;
}

function blankAssessment(week: RoadmapWeek): WeeklyAssessmentInput {
  return {
    kind: 'agent16-weekly-assessment',
    schemaVersion: 1,
    rubricRevision: 1,
    weekId: week.id,
    weekNumber: week.week,
    rubricResults: week.mission.rubric.map((rubric) => ({
      rubricId: rubric.id,
      score: 0,
      finding: '',
      evidence: '',
      nextAction: '',
    })),
    weekSummary: '',
  };
}

export function MissionDebrief({
  week,
  assessment,
  onSave,
  onDelete,
  onStatus,
}: MissionDebriefProps) {
  const [paste, setPaste] = useState('');
  const [draft, setDraft] = useState<WeeklyAssessmentInput | null>(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const rubricById = useMemo(
    () => new Map(week.mission.rubric.map((rubric) => [rubric.id, rubric])),
    [week.mission.rubric],
  );
  const score = assessment ? calculateWeeklyScore(assessment) : null;
  const weekLabel = `W${String(week.week).padStart(2, '0')}`;
  const showEditor = !assessment || editing;
  const errorId = `${week.id}-debrief-error`;

  function previewPaste() {
    const result = parseAssessmentPaste(paste, week);
    if (!result.ok) {
      setError(result.error);
      onStatus(`${weekLabel}: ${result.error}`);
      return;
    }

    setDraft(result.value);
    setError('');
    onStatus(`${weekLabel}: assessment valid dan siap direview sebelum disimpan.`);
  }

  function startManualEntry() {
    setDraft(assessment ? editableAssessment(assessment) : blankAssessment(week));
    setEditing(true);
    setError('');
  }

  function updateRubric(
    rubricId: string,
    field: 'score' | 'finding' | 'evidence' | 'nextAction',
    value: string,
  ) {
    setDraft((current) => current ? {
      ...current,
      rubricResults: current.rubricResults.map((result) => result.rubricId === rubricId
        ? {
            ...result,
            [field]: field === 'score' ? Number(value) as RubricScore : value,
          }
        : result),
    } : current);
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft) {
      setError('Preview assessment atau pilih Enter manually terlebih dahulu.');
      return;
    }

    const validated = validateAssessment(draft, week);
    if (!validated.ok) {
      setError(validated.error);
      onStatus(`${weekLabel}: ${validated.error}`);
      return;
    }

    if (assessment && !window.confirm(`Ganti Mission Debrief ${weekLabel} yang sudah tersimpan?`)) return;
    if (!onSave(validated.value)) {
      setError('Assessment gagal disimpan. Periksa kembali isinya.');
      return;
    }

    setPaste('');
    setDraft(null);
    setEditing(false);
    setError('');
    onStatus(`${weekLabel}: Mission Debrief tersimpan.`);
  }

  function remove() {
    if (!assessment || !window.confirm(`Hapus Mission Debrief ${weekLabel}? Task dan gate tidak ikut terhapus.`)) return;
    onDelete();
    setPaste('');
    setDraft(null);
    setEditing(false);
    setError('');
    onStatus(`${weekLabel}: Mission Debrief dihapus.`);
  }

  return (
    <details className={`mission-debrief${assessment ? ' has-assessment' : ''}`}>
      <summary>
        <span>AFTER-ACTION LOG</span>
        <strong>{assessment ? 'Mission Debrief recorded' : 'Record Mission Debrief'}</strong>
        <em>{score === null ? 'PASTE AI RESULT ↘' : `${Math.round(score)}/100 · OPEN ↘`}</em>
      </summary>

      <div className="mission-debrief__body">
        <header className="mission-debrief__intro">
          <div>
            <span>{weekLabel} · AI COACH ASSESSMENT</span>
            <h4>{assessment ? 'Review the saved debrief.' : 'Turn the AI review into structured evidence.'}</h4>
          </div>
          <p>Assessment ini editable, tersimpan hanya di browser, dan bukan sertifikasi.</p>
        </header>

        {assessment && !editing ? (
          <div className="saved-debrief">
            <div className="saved-debrief__score">
              <strong>{Math.round(score ?? 0)}</strong>
              <span>weekly mastery</span>
            </div>
            <div className="saved-debrief__summary">
              <span>WEEK SUMMARY</span>
              <p>{assessment.weekSummary}</p>
              <small>Saved {new Date(assessment.savedAt).toLocaleString('id-ID')}</small>
            </div>
            <div className="saved-debrief__criteria">
              {assessment.rubricResults.map((result) => (
                <article key={result.rubricId}>
                  <header>
                    <span>{result.rubricId}</span>
                    <strong>{rubricById.get(result.rubricId)?.label ?? result.rubricId}</strong>
                    <b>{result.score}/2</b>
                  </header>
                  <p>{result.finding}</p>
                  <dl>
                    <div><dt>EVIDENCE</dt><dd>{result.evidence}</dd></div>
                    <div><dt>NEXT ACTION</dt><dd>{result.nextAction}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
            <div className="mission-debrief__actions">
              <button type="button" className="button button-primary" onClick={startManualEntry}>
                Replace saved debrief
              </button>
              <button type="button" className="button button-quiet danger-button" onClick={remove}>
                Delete debrief
              </button>
            </div>
          </div>
        ) : null}

        {showEditor ? (
          <form className="debrief-form" onSubmit={save}>
            <label className="debrief-paste-field">
              <span>PASTE FULL AI RESPONSE</span>
              <textarea
                name={`${week.id}-assessment-paste`}
                value={paste}
                onChange={(event) => setPaste(event.target.value)}
                aria-describedby={error ? errorId : undefined}
                autoComplete="off"
                spellCheck={false}
                placeholder={`Paste respons AI yang memuat AGENT16_ASSESSMENT_V1_START untuk ${weekLabel}.`}
              />
            </label>
            <div className="debrief-form__toolbar">
              <button type="button" className="button button-primary" onClick={previewPaste}>
                Preview review
              </button>
              <button type="button" className="button button-quiet" onClick={startManualEntry}>
                Enter manually
              </button>
              {assessment ? (
                <button type="button" className="text-button" onClick={() => {
                  setEditing(false);
                  setDraft(null);
                  setPaste('');
                  setError('');
                }}>
                  Cancel replace
                </button>
              ) : null}
            </div>

            {error ? <p className="debrief-error" id={errorId} role="alert">{error}</p> : null}

            {draft ? (
              <div className="debrief-preview">
                <div className="debrief-preview__header">
                  <div>
                    <span>VALIDATED PREVIEW</span>
                    <strong>{draft.rubricResults.length}/{week.mission.rubric.length} criteria recognized</strong>
                  </div>
                  <b>{Math.round(calculateWeeklyScore(draft))}/100</b>
                </div>

                <div className="debrief-editor-list">
                  {draft.rubricResults.map((result) => {
                    const rubric = rubricById.get(result.rubricId);
                    return (
                      <fieldset key={result.rubricId}>
                        <legend>
                          <span>{result.rubricId}</span>
                          {rubric?.label ?? result.rubricId}
                        </legend>
                        <p>{rubric?.passCondition}</p>
                        <label>
                          <span>SCORE</span>
                          <select
                            value={result.score}
                            onChange={(event) => updateRubric(result.rubricId, 'score', event.target.value)}
                          >
                            <option value={0}>0 · Absent or unsafe</option>
                            <option value={1}>1 · Partial</option>
                            <option value={2}>2 · Evidence-backed</option>
                          </select>
                        </label>
                        <label>
                          <span>FINDING</span>
                          <textarea
                            value={result.finding}
                            onChange={(event) => updateRubric(result.rubricId, 'finding', event.target.value)}
                          />
                        </label>
                        <label>
                          <span>EVIDENCE</span>
                          <textarea
                            value={result.evidence}
                            onChange={(event) => updateRubric(result.rubricId, 'evidence', event.target.value)}
                          />
                        </label>
                        <label>
                          <span>NEXT ACTION</span>
                          <textarea
                            value={result.nextAction}
                            onChange={(event) => updateRubric(result.rubricId, 'nextAction', event.target.value)}
                          />
                        </label>
                      </fieldset>
                    );
                  })}
                </div>

                <label className="debrief-summary-field">
                  <span>WEEK SUMMARY</span>
                  <textarea
                    value={draft.weekSummary}
                    onChange={(event) => setDraft({ ...draft, weekSummary: event.target.value })}
                  />
                </label>

                <button className="button button-primary debrief-save" type="submit">
                  {assessment ? 'Replace saved debrief' : 'Save debrief'}
                </button>
              </div>
            ) : null}
          </form>
        ) : null}
      </div>
    </details>
  );
}
