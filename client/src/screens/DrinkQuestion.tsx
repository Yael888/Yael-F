import { useState } from 'react';

const DRINK_TYPES = [
  { value: 'בירה', icon: '🍺', label: 'בירה' },
  { value: 'יין', icon: '🍷', label: 'יין' },
  { value: 'ללא אלכוהול', icon: '🥤', label: 'ללא אלכוהול' },
];

const SUB_OPTIONS: Record<string, string[]> = {
  'בירה': ['בירה בהירה', 'בירה כהה / שחורה', 'לא משנה לי'],
  'יין': ['יין אדום', 'יין לבן', 'יין רוזה', 'לא משנה לי'],
};

interface Props {
  onNext: (drink_type: string, drink_detail: string) => void;
}

export default function DrinkQuestion({ onNext }: Props) {
  const [drinkType, setDrinkType] = useState('');
  const [drinkDetail, setDrinkDetail] = useState('');

  const handleTypeSelect = (type: string) => {
    setDrinkType(type);
    setDrinkDetail('');
  };

  const subOptions = SUB_OPTIONS[drinkType] ?? [];
  const needsDetail = drinkType !== '' && drinkType !== 'ללא אלכוהול';
  const canSubmit = drinkType !== '' && (!needsDetail || drinkDetail !== '');

  const handleSubmit = () => {
    if (canSubmit) onNext(drinkType, drinkDetail);
  };

  return (
    <>
      <div className="progress-dots">
        <div className="dot" />
        <div className="dot" />
        <div className="dot active" />
      </div>
      <div className="screen-card">
        <h2 className="screen-title">מה תשתה? 🥂</h2>
        <p className="screen-subtitle">בחר את המשקה המועדף</p>

        <div className="options-grid">
          {DRINK_TYPES.map((opt) => (
            <div
              key={opt.value}
              className={`option-card ${drinkType === opt.value ? 'selected' : ''}`}
              onClick={() => handleTypeSelect(opt.value)}
            >
              <span className="option-icon">{opt.icon}</span>
              <span className="option-label">{opt.label}</span>
              {drinkType === opt.value && <span className="option-check">✓</span>}
            </div>
          ))}
        </div>

        {needsDetail && (
          <div className="sub-section">
            <p className="sub-title">
              {drinkType === 'בירה' ? 'איזה סוג בירה?' : 'איזה סוג יין?'}
            </p>
            <div className="options-grid" style={{ margin: '0 0 26px' }}>
              {subOptions.map((opt) => (
                <div
                  key={opt}
                  className={`option-card ${drinkDetail === opt ? 'selected' : ''}`}
                  onClick={() => setDrinkDetail(opt)}
                >
                  <span className="option-label">{opt}</span>
                  {drinkDetail === opt && <span className="option-check">✓</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        <button className="btn-primary" onClick={handleSubmit} disabled={!canSubmit}>
          שלח תשובה 🎉
        </button>
      </div>
    </>
  );
}
