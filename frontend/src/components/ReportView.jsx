import React from 'react';
import { ClipboardList, AlertCircle, Clock, TrendingUp } from 'lucide-react';

const ReportView = ({ entries }) => {
    // Real app would compute these from entries, using mocks for now
    const insights = [
        { title: 'Primary Symptom', value: 'Headaches', icon: AlertCircle, color: 'var(--accent-green)' },
        { title: 'Average Severity', value: '5.2 / 10', icon: TrendingUp, color: 'var(--accent-blue)' },
        { title: 'Most Common Time', value: 'Mornings', icon: Clock, color: 'var(--accent-sapphire)' },
    ];

    return (
        <div className="glass-panel animate-fade-in stagger-3">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                    <ClipboardList size={20} color="var(--accent-blue)" />
                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Doctor's Report</h2>
                </div>
                <button className="btn" style={{ backgroundColor: 'var(--surface-color)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    Export PDF
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                {insights.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div key={index} style={{
                            padding: '1.25rem',
                            backgroundColor: 'rgba(255,255,255,0.5)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-color)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                <Icon size={16} color={item.color} />
                                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{item.title}</span>
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                {item.value}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: 'rgba(14, 165, 233, 0.05)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--accent-blue)' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>AI Summary</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    Over the past 7 days, the patient has predominantly experienced right-sided headaches, often upon waking. Severity peaked at 8/10 on March 12th. There is a potential correlation between poor sleep quality and heightened morning headache severity. Mild nausea accompanied the most severe episodes but fatigue is the most consistent secondary symptom.
                </p>
            </div>
        </div>
    );
};

export default ReportView;
