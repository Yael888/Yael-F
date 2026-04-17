import { MeatItem, RSVPData } from '../types';

interface Props {
  data: RSVPData;
}

function parseMeat(raw: string): MeatItem[] {
  try { return JSON.parse(raw); } catch { return [{ item: raw, qty: 1 }]; }
}

function parseDrinks(raw: string): string[] {
  try { return JSON.parse(raw); } catch { return [raw]; }
}

export default function Confirmation({ data }: Props) {
  const meatItems = parseMeat(data.meat);
  const drinks = parseDrinks(data.drink_type);

  return (
    <div className="screen-card confirmation-card">
      <span className="confirmation-emoji">🎉</span>
      <h2 className="confirmation-title">תודה {data.name}!</h2>
      <p className="confirmation-sub">נתראה ביום העצמאות 🇮🇱🔥</p>

      <div className="summary-card">
        <div className="summary-row">
          <span className="summary-label">שם</span>
          <span className="summary-value">{data.name}</span>
        </div>

        <div className="summary-row summary-row--col">
          <span className="summary-label">על האש</span>
          <ul className="summary-list">
            {meatItems.map((m, i) => (
              <li key={i}>{m.item} × {m.qty}</li>
            ))}
          </ul>
        </div>

        <div className="summary-row summary-row--col">
          <span className="summary-label">משקאות</span>
          <ul className="summary-list">
            {drinks.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      </div>

      <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
        אפשר לסגור את הדף 👍
      </p>
    </div>
  );
}
