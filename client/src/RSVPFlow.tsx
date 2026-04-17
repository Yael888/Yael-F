import { useState } from 'react';
import Landing from './screens/Landing';
import NameInput from './screens/NameInput';
import MeatQuestion from './screens/MeatQuestion';
import DrinkQuestion from './screens/DrinkQuestion';
import Confirmation from './screens/Confirmation';
import { RSVPData } from './types';

type Screen = 'landing' | 'name' | 'meat' | 'drink' | 'confirmation';

export default function RSVPFlow() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [screenKey, setScreenKey] = useState(0);
  const [data, setData] = useState<RSVPData>({
    name: '',
    meat: '',
    drink_type: '',
    drink_detail: '',
  });

  const goTo = (next: Screen) => {
    setScreenKey((k) => k + 1);
    setScreen(next);
  };

  const submitRSVP = async (finalData: RSVPData) => {
    try {
      await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });
    } catch (e) {
      console.error('RSVP submit error:', e);
    }
    goTo('confirmation');
  };

  return (
    <div className="app-wrapper">
      <div key={screenKey} className="screen-container">
        {screen === 'landing' && (
          <Landing onStart={() => goTo('name')} />
        )}
        {screen === 'name' && (
          <NameInput
            onNext={(name) => {
              setData((d) => ({ ...d, name }));
              goTo('meat');
            }}
          />
        )}
        {screen === 'meat' && (
          <MeatQuestion
            onNext={(meat) => {
              setData((d) => ({ ...d, meat }));
              goTo('drink');
            }}
          />
        )}
        {screen === 'drink' && (
          <DrinkQuestion
            onNext={(drink_type, drink_detail) => {
              const finalData = { ...data, drink_type, drink_detail };
              setData(finalData);
              submitRSVP(finalData);
            }}
          />
        )}
        {screen === 'confirmation' && <Confirmation data={data} />}
      </div>
    </div>
  );
}
