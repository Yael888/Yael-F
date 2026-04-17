interface Props {
  onStart: () => void;
}

export default function Landing({ onStart }: Props) {
  return (
    <div className="screen-card landing-card">
      <span className="landing-flag">🇮🇱</span>
      <span className="landing-bbq">🔥🥩</span>
      <h1 className="landing-title">יום העצמאות אצלנו</h1>
      <p className="landing-subtitle">כמה שאלות קצרות כדי שנהיה מוכנים</p>
      <button className="btn-start" onClick={onStart}>
        בואו נתחיל &nbsp;🎉
      </button>
    </div>
  );
}
