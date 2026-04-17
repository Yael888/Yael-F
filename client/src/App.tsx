import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RSVPFlow from './RSVPFlow';
import HostPage from './host/HostPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RSVPFlow />} />
        <Route path="/host" element={<HostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
