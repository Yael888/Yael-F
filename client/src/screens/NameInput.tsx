import { useState } from 'react';

interface Props {
  onNext: (name: string) => void;
}

export default function NameInput({ onNext }: Props) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) onNext(name.trim());
  };

  return (
    <>
      <div className="progress-dots">
        <div className="dot active" />
        <div className="dot" />
        <div className="dot" />
      </div>
      <div className="screen-card">
        <h2 className="screen-title">מה השם שלך? 👋</h2>
        <p className="screen-subtitle" style={{ marginBottom: 24 }}>
          כדי שנדע מי מגיע
        </p>
        <input
          type="text"
          className="text-input"
          placeholder="השם שלי..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          autoFocus
          autoComplete="given-name"
        />
        <button className="btn-primary" onClick={handleSubmit} disabled={!name.trim()}>
          המשך ←
        </button>
      </div>
    </>
  );
}
