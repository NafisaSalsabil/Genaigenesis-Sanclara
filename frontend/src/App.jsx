import React, { useState } from 'react';
import SymptomInput from './components/SymptomInput';
import TimelineChart from './components/TimelineChart';
import ReportView from './components/ReportView';
import BackgroundLeaves from './components/BackgroundLeaves';
import { HeartPulse } from 'lucide-react';
import './index.css';

function App() {
  const [entries, setEntries] = useState([]);

  const handleAddEntry = (entry) => {
    setEntries([entry, ...entries]);
  };

  return (
    <>
      <BackgroundLeaves />
      <div className="app-container" style={{ position: 'relative', zIndex: 1 }}>
        <header className="header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <HeartPulse size={40} color="var(--accent-sapphire)" style={{ filter: 'drop-shadow(0 0 8px rgba(2, 132, 199, 0.4))' }} />
            <h1>SanClara</h1>
          </div>
          <p>Your intelligent health journal. Describe how you feel, and we'll handle the rest.</p>
        </header>

        <main style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <SymptomInput onAddEntry={handleAddEntry} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ flex: '1 1 50%' }}>
              <TimelineChart data={entries.map(e => e.extracted)} />
            </div>
            <div style={{ flex: '1 1 50%' }}>
              <ReportView entries={entries} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
