import { useState } from 'react';

const DRINK_TYPES = [
  { value: 'בירה', icon: '🍺' },
  { value: 'יין', icon: '🍷' },
  { value: 'ללא אלכוהול', icon: '🥤' },
];

const SUB_OPTIONS: Record<string, string[]> = {
  בירה: ['בירה בהירה', 'בירה כהה / שחורה', 'לא משנה לי'],
  יין: ['יין אדום', 'יין לבן', 'יין רוזה', 'לא משנה לי'],
};

interface Props {
  onNext: (drinks: string[]) => void;
}

export default function DrinkQuestion({ onNext }: Props) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  // sub-selection per drink type (single choice per type)
  const [subs, setSubs] = useState<Record<string, string>>({});

  const toggleType = (type: string) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        setSubs((s) => {
          const next = { ...s };
          delete next[type];
          return next;
        });
        return prev.filter((t) => t !== type);
      }
      return [...prev, type];
    });
  };

  const selectSub = (type: string, sub: string) => {
    setSubs((prev) => ({ ...prev, [type]: sub }));
  };

  // All selected types that need a sub-choice must have one
  const canSubmit =
    selectedTypes.length > 0 &&
    selectedTypes.every(
      (t) => !(t in SUB_OPTIONS) || subs[t] !== undefined
    );

  const buildResult = (): string[] =>
    selectedTypes.map((t) => (subs[t] ? subs[t] : t));

  return (
    <>
      <div className="progress-dots">
        <div className="dot" />
        <div className="dot" />
        <div className="dot active" />
      </div>
      <div className="screen-card">
        <h2 className="screen-title">מה לשתות? 🥂</h2>
        <p className="screen-subtitle">אפשר לבחור כמה דברים</p>

        <div className="options-grid">
          {DRINK_TYPES.map((opt) => (
            <div
              key={opt.value}
              className={`option-card ${selectedTypes.includes(opt.value) ? 'selected' : ''}`}
              onClick={() => toggleType(opt.value)}
            >
              <span className="option-icon">{opt.icon}</span>
              <span className="option-label">{opt.value}</span>
              {selectedTypes.includes(opt.value) && (
                <span className="option-check">✓</span>
              )}
            </div>
          ))}
        </div>

        {/* Sub-options for beer / wine */}
        {selectedTypes
          .filter((t) => t in SUB_OPTIONS)
          .map((type) => (
            <div key={type} className="sub-section">
              <p className="sub-title">
                {type === 'בירה' ? 'איזו בירה?' : 'איזה יין?'}
              </p>
              <div className="options-grid" style={{ margin: '0 0 18px' }}>
                {SUB_OPTIONS[type].map((sub) => (
                  <div
                    key={sub}
                    className={`option-card ${subs[type] === sub ? 'selected' : ''}`}
                    onClick={() => selectSub(type, sub)}
                  >
                    <span className="option-label">{sub}</span>
                    {subs[type] === sub && <span className="option-check">✓</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}

        <button className="btn-primary" onClick={() => onNext(buildResult())} disabled={!canSubmit}>
          שלח תשובה 🎉
        </button>
      </div>
    </>
  );
}
