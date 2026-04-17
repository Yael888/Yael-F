import { useState } from 'react';
import { MeatItem } from '../types';

const OPTIONS = [
  { value: 'המבורגרים', icon: '🍔' },
  { value: 'פרגיות', icon: '🍗' },
  { value: 'נקניות', icon: '🌭' },
  { value: 'דגים', icon: '🐟' },
];

interface Props {
  onNext: (selections: MeatItem[]) => void;
}

export default function MeatQuestion({ onNext }: Props) {
  const [qtys, setQtys] = useState<Record<string, number>>({});
  const [otherChecked, setOtherChecked] = useState(false);
  const [otherText, setOtherText] = useState('');
  const [otherQty, setOtherQty] = useState(1);

  const isSelected = (val: string) => val in qtys;

  const toggle = (val: string) => {
    setQtys((prev) => {
      if (val in prev) {
        const next = { ...prev };
        delete next[val];
        return next;
      }
      return { ...prev, [val]: 1 };
    });
  };

  const changeQty = (val: string, delta: number) => {
    setQtys((prev) => {
      const next = Math.max(1, (prev[val] ?? 1) + delta);
      return { ...prev, [val]: next };
    });
  };

  const canSubmit =
    Object.keys(qtys).length > 0 || (otherChecked && otherText.trim() !== '');

  const handleSubmit = () => {
    if (!canSubmit) return;
    const items: MeatItem[] = Object.entries(qtys).map(([item, qty]) => ({ item, qty }));
    if (otherChecked && otherText.trim()) {
      items.push({ item: `אחר: ${otherText.trim()}`, qty: otherQty });
    }
    onNext(items);
  };

  return (
    <>
      <div className="progress-dots">
        <div className="dot" />
        <div className="dot active" />
        <div className="dot" />
      </div>
      <div className="screen-card">
        <h2 className="screen-title">על האש 🔥</h2>
        <p className="screen-subtitle">אפשר לבחור כמה דברים + כמות</p>

        <div className="options-grid">
          {OPTIONS.map((opt) => (
            <div
              key={opt.value}
              className={`option-card ${isSelected(opt.value) ? 'selected' : ''}`}
              onClick={() => toggle(opt.value)}
            >
              <span className="option-icon">{opt.icon}</span>
              <span className="option-label">{opt.value}</span>
              {isSelected(opt.value) ? (
                <div className="qty-stepper" onClick={(e) => e.stopPropagation()}>
                  <button className="qty-btn" onClick={() => changeQty(opt.value, -1)}>−</button>
                  <span className="qty-num">{qtys[opt.value]}</span>
                  <button className="qty-btn" onClick={() => changeQty(opt.value, +1)}>+</button>
                </div>
              ) : null}
            </div>
          ))}

          {/* אחר */}
          <div
            className={`option-card ${otherChecked ? 'selected' : ''}`}
            onClick={() => setOtherChecked((v) => !v)}
          >
            <span className="option-icon">✏️</span>
            <span className="option-label">אחר</span>
          </div>
        </div>

        {otherChecked && (
          <div className="other-section">
            <input
              type="text"
              className="text-input"
              placeholder="מה תאכלו? (למשל: שישליק)"
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              autoFocus
            />
            <div className="qty-row">
              <span className="qty-row-label">כמות:</span>
              <div className="qty-stepper" onClick={(e) => e.stopPropagation()}>
                <button className="qty-btn" onClick={() => setOtherQty((q) => Math.max(1, q - 1))}>−</button>
                <span className="qty-num">{otherQty}</span>
                <button className="qty-btn" onClick={() => setOtherQty((q) => q + 1)}>+</button>
              </div>
            </div>
          </div>
        )}

        <button className="btn-primary" onClick={handleSubmit} disabled={!canSubmit}>
          המשך ←
        </button>
      </div>
    </>
  );
}
