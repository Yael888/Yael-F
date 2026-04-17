import { useState } from 'react';
import HostLogin from './HostLogin';
import HostDashboard from './HostDashboard';

export default function HostPage() {
  const [authed, setAuthed] = useState(false);

  if (!authed) {
    return <HostLogin onLogin={() => setAuthed(true)} />;
  }

  return <HostDashboard />;
}
