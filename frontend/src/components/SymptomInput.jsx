import React, { useState } from 'react';
import { Send, FileText } from 'lucide-react';

const SymptomInput = ({ onAddEntry }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);

    try {
      // Call FastAPI backend
      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();

      // Pass extracted data to parent
      onAddEntry({
        id: Date.now(),
        rawText: text,
        date: new Date().toISOString(),
        extracted: data  // <-- this is the structured JSON from backend
      });

      setText("");
    } catch (err) {
      console.error("Error extracting symptoms:", err);
      // Fallback to mock data if API fails
      onAddEntry({
        id: Date.now(),
        rawText: text,
        date: new Date().toISOString(),
        extracted: { symptoms: ["unknown"], severity: "unknown" }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-panel animate-fade-in stagger-1">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        <FileText size={20} color="var(--accent-blue)" />
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>New Journal Entry</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-container" style={{ marginBottom: '1.5rem' }}>
          <textarea
            className="input-field"
            rows="4"
            placeholder="How are you feeling today? e.g. 'I woke up with a sharp headache on my right side that has lasted for 2 hours...'"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!text.trim() || isSubmitting}
            style={{ opacity: (!text.trim() || isSubmitting) ? 0.7 : 1 }}
          >
            {isSubmitting ? 'Processing...' : 'Log Symptoms'}
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SymptomInput;