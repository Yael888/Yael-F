import { useState } from 'react';

const OPTIONS = [
  { value: 'אנטריקוט', icon: '🥩', label: 'אנטריקוט' },
  { value: 'עוף', icon: '🍗', label: 'עוף' },
  { value: 'נקניקיות', icon: '🌭', label: 'נקניקיות' },
  { value: 'צמחוני / טבעוני', icon: '🥦', label: 'צמחוני / טבעוני' },
];

interface Props {
  onNext: (meat: string) => void;
}

export default function MeatQuestion({ onNext }: Props) {
  const [selected, setSelected] = useState('');

  return (
    <>
      <div className="progress-dots">
        <div className="dot" />
        <div className="dot active" />
        <div className="dot" />
      </div>
      <div className="screen-card">
        <h2 className="screen-title">מה תאכל על הגריל? 🔥</h2>
        <p className="screen-subtitle">בחר את ההעדפה שלך</p>
        <div className="options-grid">
          {OPTIONS.map((opt) => (
            <div
              key={opt.value}
              className={`option-card ${selected === opt.value ? 'selected' : ''}`}
              onClick={() => setSelected(opt.value)}
            >
              <span className="option-icon">{opt.icon}</span>
              <span className="option-label">{opt.label}</span>
              {selected === opt.value && <span className="option-check">✓</span>}
            </div>
          ))}
        </div>
        <button className="btn-primary" onClick={() => onNext(selected)} disabled={!selected}>
          המשך ←
        </button>
      </div>
    </>
  );
}
