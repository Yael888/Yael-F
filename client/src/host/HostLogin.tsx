import { useState } from 'react';

interface Props {
  onLogin: () => void;
}

export default function HostLogin({ onLogin }: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (password === 'bbq2025') {
      onLogin();
    } else {
      setError('סיסמה שגויה, נסה שוב');
      setPassword('');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <span className="login-icon">🔒</span>
        <h2 className="login-title">כניסה למארח</h2>
        <p className="login-subtitle">הכנס סיסמה לצפייה בתוצאות</p>
        <input
          type="password"
          className="text-input"
          placeholder="סיסמה..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          autoFocus
          autoComplete="current-password"
        />
        {error && <p className="error-msg">{error}</p>}
        <button
          className="btn-primary"
          onClick={handleLogin}
          style={{ marginTop: error ? 16 : 0 }}
        >
          כניסה
        </button>
      </div>
    </div>
  );
}
