import { roadmapWeeks } from '../data/roadmap';
import type { FinalReadinessReport as FinalReadinessReportData } from '../lib/assessment';

type FinalReadinessReportProps = {
  report: FinalReadinessReportData;
  onCopyReport: () => void;
  copyLabel: string;
  manualReport: string | null;
  onCloseManualReport: () => void;
};

function scoreLabel(score: number | null) {
  if (score === null) return 'No evidence';
  if (score >= 85) return 'Strongly demonstrated';
  if (score >= 70) return 'Working proficiency';
  if (score >= 50) return 'Developing';
  return 'Priority gap';
}

function rounded(score: number | null) {
  return score === null ? '—' : Math.round(score);
}

function missingWeekIds(report: FinalReadinessReportData) {
  const taskToWeek = new Map(
    roadmapWeeks.flatMap((week) => week.tasks.map((task) => [task.id, week.id] as const)),
  );
  return [...new Set([
    ...report.missing.taskIds.map((taskId) => taskToWeek.get(taskId)).filter(Boolean),
    ...report.missing.gateWeekIds,
    ...report.missing.assessmentWeekIds,
  ])] as string[];
}

export function FinalReadinessReport({
  report,
  onCopyReport,
  copyLabel,
  manualReport,
  onCloseManualReport,
}: FinalReadinessReportProps) {
  const pendingWeeks = missingWeekIds(report);

  return (
    <section className="final-report-section" id="debrief" aria-labelledby="final-report-title">
      <div className="section-shell">
        <div className="final-report-heading">
          <p className="eyebrow">FINAL AFTER-ACTION REPORT · LOCAL-ONLY</p>
          <h2 id="final-report-title">Selesai bukan berarti merata.</h2>
          <p>
            Laporan ini memisahkan curriculum completion, coach-assessed mastery, dan portfolio evidence.
            Ia menunjukkan apa yang sudah terbukti dan apa yang masih perlu dilatih.
          </p>
        </div>

        {!report.unlocked ? (
          <div className="report-lock" aria-label="Final report belum lengkap">
            <div className="report-lock__stamp" aria-hidden="true">LOCKED</div>
            <div className="report-lock__content">
              <span>READINESS PACKET INCOMPLETE</span>
              <h3>Lengkapi weekly work dan Mission Debrief.</h3>
              <p>{report.conclusion}</p>
              <div className="report-lock__counts">
                <div><strong>{48 - report.missing.tasks}/48</strong><span>tasks</span></div>
                <div><strong>{16 - report.missing.gates}/16</strong><span>gates</span></div>
                <div><strong>{16 - report.missing.assessments}/16</strong><span>debriefs</span></div>
              </div>
              {pendingWeeks.length ? (
                <nav className="pending-week-links" aria-label="Minggu yang belum lengkap">
                  <span>REVISIT</span>
                  {pendingWeeks.map((weekId) => {
                    const week = roadmapWeeks.find((item) => item.id === weekId);
                    return week ? (
                      <a key={week.id} href={`#${week.id}`}>W{String(week.week).padStart(2, '0')}</a>
                    ) : null;
                  })}
                </nav>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="final-report">
            <section className="readiness-hero" aria-label="Final readiness result">
              <div className="readiness-number">
                <span>DEMONSTRATED READINESS</span>
                <strong>{rounded(report.readinessScore)}</strong>
                <small>/100</small>
              </div>
              <div className="readiness-conclusion">
                <span>{report.band}</span>
                <h3>{report.conclusion}</h3>
                {report.safetyFloor ? <strong className="safety-flag">SAFETY FLOOR ACTIVE</strong> : null}
              </div>
              <dl className="readiness-breakdown">
                <div><dt>MASTERY · 80%</dt><dd>{rounded(report.masteryScore)}</dd></div>
                <div><dt>EVIDENCE · 20%</dt><dd>{rounded(report.evidenceScore)}</dd></div>
                <div><dt>DEBRIEFS</dt><dd>16/16</dd></div>
              </dl>
            </section>

            <section className="mission-trace-panel" aria-labelledby="mission-trace-title">
              <header>
                <span>MISSION TRACE</span>
                <h3 id="mission-trace-title">Enam belas minggu, enam belas evidence signals.</h3>
              </header>
              <ol className="mission-score-trace">
                {report.weeklyScores.map((week) => (
                  <li key={week.weekId}>
                    <a href={`#${week.weekId}`} aria-label={`Buka minggu ${week.weekNumber}, score ${Math.round(week.score)}`}>
                      <span>W{String(week.weekNumber).padStart(2, '0')}</span>
                      <strong>{Math.round(week.score)}</strong>
                    </a>
                  </li>
                ))}
              </ol>
            </section>

            <section className="dimension-panel" aria-labelledby="dimension-title">
              <header>
                <span>CAPABILITY TRACE · 7 CORE + 2 CAREER</span>
                <h3 id="dimension-title">Nilai rata-rata menyembunyikan bentuk skill. Trace ini tidak.</h3>
              </header>
              <div className="dimension-list">
                {report.dimensionScores.map((dimension) => (
                  <article key={dimension.id}>
                    <div>
                      <span>{dimension.label}</span>
                      <small>{scoreLabel(dimension.score)}</small>
                    </div>
                    <progress max={100} value={dimension.score ?? 0} aria-label={`${dimension.label}: ${rounded(dimension.score)} dari 100`} />
                    <strong>{rounded(dimension.score)}</strong>
                  </article>
                ))}
              </div>
            </section>

            <div className="insight-grid">
              <section className="strength-panel" aria-labelledby="strength-title">
                <header>
                  <span>RELATIVE STRENGTHS</span>
                  <h3 id="strength-title">Bukti terkuat lo.</h3>
                </header>
                <ol>
                  {report.strengths.map((strength) => (
                    <li key={strength.dimensionId}>
                      <strong>{strength.label}</strong>
                      <b>{Math.round(strength.score)}/100</b>
                      {strength.evidence.slice(0, 2).map((evidence) => (
                        <p key={`${evidence.weekId}-${evidence.rubricId}`}>
                          <span>W{String(evidence.weekNumber).padStart(2, '0')}</span> {evidence.evidence}
                        </p>
                      ))}
                    </li>
                  ))}
                </ol>
              </section>

              <section className="improvement-panel" aria-labelledby="improvement-title">
                <header>
                  <span>PRIORITY QUEUE</span>
                  <h3 id="improvement-title">Area of improvement.</h3>
                </header>
                {report.improvements.length ? (
                  <ol>
                    {report.improvements.map((improvement) => (
                      <li key={improvement.dimensionId}>
                        <div>
                          <strong>{improvement.label}</strong>
                          <b>{Math.round(improvement.score)}/100</b>
                        </div>
                        {improvement.criticalZero ? <span className="critical-gap">CRITICAL ZERO</span> : null}
                        {improvement.items.slice(0, 2).map((item) => (
                          <article key={`${item.weekId}-${item.rubricId}`}>
                            <a href={`#${item.weekId}`}>W{String(item.weekNumber).padStart(2, '0')} · {item.rubricId} ↗</a>
                            <p>{item.finding}</p>
                            <strong>NEXT: {item.nextAction}</strong>
                          </article>
                        ))}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="stretch-note">{report.stretchRecommendation}</p>
                )}
              </section>
            </div>

            <section className="evidence-gap-panel" aria-labelledby="evidence-gap-title">
              <header>
                <span>EVIDENCE GAPS · {report.evidenceGaps.length}/6 OPEN</span>
                <h3 id="evidence-gap-title">Skill dan bukti bukan hal yang sama.</h3>
              </header>
              {report.evidenceGaps.length ? (
                <ul>
                  {report.evidenceGaps.map((item) => (
                    <li key={item.id}>
                      <span>W{String(item.week).padStart(2, '0')}</span>
                      <strong>{item.label}</strong>
                      <p>{item.description}</p>
                    </li>
                  ))}
                </ul>
              ) : <p>Seluruh enam portfolio evidence sudah tercatat.</p>}
            </section>

            <div className="report-export">
              <div>
                <span>PORTABLE EVIDENCE</span>
                <p>Copy report sebagai Markdown untuk retrospective pribadi. Jangan menyebutnya sertifikasi.</p>
              </div>
              <button className="button button-primary" type="button" onClick={onCopyReport}>{copyLabel}</button>
            </div>

            {manualReport ? (
              <section className="manual-copy final-report-manual" aria-labelledby="final-report-manual-title">
                <div>
                  <span>CLIPBOARD FALLBACK</span>
                  <h4 id="final-report-manual-title">Salin final report secara manual.</h4>
                  <button type="button" onClick={onCloseManualReport}>Tutup ×</button>
                </div>
                <textarea
                  readOnly
                  value={manualReport}
                  onFocus={(event) => event.currentTarget.select()}
                  aria-label="AGENT/16 final report Markdown"
                />
              </section>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
