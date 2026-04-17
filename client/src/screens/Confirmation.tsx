import { RSVPData } from '../types';

interface Props {
  data: RSVPData;
}

export default function Confirmation({ data }: Props) {
  const drinkDisplay = data.drink_detail
    ? `${data.drink_type} — ${data.drink_detail}`
    : data.drink_type;

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
        <div className="summary-row">
          <span className="summary-label">מנה</span>
          <span className="summary-value">{data.meat}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">משקה</span>
          <span className="summary-value">{drinkDisplay}</span>
        </div>
      </div>

      <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
        אפשר לסגור את הדף 👍
      </p>
    </div>
  );
}
