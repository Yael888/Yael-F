import { useState, useEffect, useCallback } from 'react';
import { GuestResponse } from '../types';

function buildBreakdown(items: string[]): Record<string, number> {
  return items.reduce<Record<string, number>>((acc, item) => {
    acc[item] = (acc[item] ?? 0) + 1;
    return acc;
  }, {});
}

function pct(count: number, total: number) {
  return total === 0 ? 0 : Math.round((count / total) * 100);
}

export default function HostDashboard() {
  const [responses, setResponses] = useState<GuestResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState('');

  const fetchResponses = useCallback(async () => {
    try {
      const res = await fetch('/api/responses');
      const data: GuestResponse[] = await res.json();
      setResponses(data);
      setLastRefresh(new Date().toLocaleTimeString('he-IL'));
    } catch {
      // keep previous data on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResponses();
    const interval = setInterval(fetchResponses, 30_000);
    return () => clearInterval(interval);
  }, [fetchResponses]);

  const exportCSV = () => {
    const headers = ['שם', 'מנה', 'משקה', 'פרטי משקה', 'תאריך'];
    const rows = responses.map((r) => [
      r.name,
      r.meat,
      r.drink_type,
      r.drink_detail ?? '',
      new Date(r.created_at.replace(' ', 'T')).toLocaleString('he-IL'),
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\r\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rsvp-יום-העצמאות.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const total = responses.length;

  const meatBreakdown = buildBreakdown(responses.map((r) => r.meat));
  const drinkBreakdown = buildBreakdown(
    responses.map((r) =>
      r.drink_detail ? `${r.drink_type} — ${r.drink_detail}` : r.drink_type
    )
  );

  if (loading) {
    return (
      <div
        className="host-page"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}
      >
        <p style={{ color: 'var(--text-mid)', fontSize: '1.1rem' }}>טוען...</p>
      </div>
    );
  }

  return (
    <div className="host-page">
      {/* Header */}
      <div className="host-header">
        <div>
          <div className="host-title">🎛️ לוח מארח — יום העצמאות</div>
          {lastRefresh && (
            <div className="host-subtitle">עודכן לאחרונה: {lastRefresh}</div>
          )}
        </div>
        <div className="host-actions">
          <button className="btn-ghost" onClick={fetchResponses}>
            רענן 🔄
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{total}</div>
          <div className="stat-label">סה"כ אורחים</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">🇮🇱</div>
          <div className="stat-label">חג שמח!</div>
        </div>
      </div>

      {/* Meat breakdown */}
      <div className="breakdown-card">
        <div className="breakdown-header">
          <h3 className="breakdown-title">🥩 פירוט מנות</h3>
        </div>
        {Object.keys(meatBreakdown).length === 0 ? (
          <p className="empty-state">עוד אין תשובות</p>
        ) : (
          Object.entries(meatBreakdown).map(([name, count]) => (
            <div key={name} className="breakdown-row">
              <div className="breakdown-meta">
                <span className="breakdown-name">{name}</span>
                <span className="breakdown-count">
                  {count} &nbsp;({pct(count, total)}%)
                </span>
              </div>
              <div className="progress-bg">
                <div
                  className="progress-fill"
                  style={{ width: `${pct(count, total)}%` }}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Drink breakdown */}
      <div className="breakdown-card">
        <div className="breakdown-header">
          <h3 className="breakdown-title">🍺 פירוט משקאות</h3>
        </div>
        {Object.keys(drinkBreakdown).length === 0 ? (
          <p className="empty-state">עוד אין תשובות</p>
        ) : (
          Object.entries(drinkBreakdown).map(([name, count]) => (
            <div key={name} className="breakdown-row">
              <div className="breakdown-meta">
                <span className="breakdown-name">{name}</span>
                <span className="breakdown-count">
                  {count} &nbsp;({pct(count, total)}%)
                </span>
              </div>
              <div className="progress-bg">
                <div
                  className="progress-fill"
                  style={{ width: `${pct(count, total)}%` }}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Guest table */}
      <div className="breakdown-card">
        <div className="breakdown-header">
          <h3 className="breakdown-title">📋 רשימת אורחים</h3>
          <button className="btn-secondary" onClick={exportCSV}>
            ייצוא CSV ⬇️
          </button>
        </div>
        {responses.length === 0 ? (
          <p className="empty-state">עוד אין אורחים — שתף את הקישור!</p>
        ) : (
          <div className="table-wrapper">
            <table className="guest-table">
              <thead>
                <tr>
                  <th>שם</th>
                  <th>מנה</th>
                  <th>משקה</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((r) => (
                  <tr key={r.id}>
                    <td>{r.name}</td>
                    <td>{r.meat}</td>
                    <td>
                      {r.drink_detail
                        ? `${r.drink_type} — ${r.drink_detail}`
                        : r.drink_type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
