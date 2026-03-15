import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Activity } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const TimelineChart = ({ data }) => {
    // Flatten backend response
    const chartData = data?.length > 0
      ? data.flatMap(entry => entry.symptoms?.map(sym => ({
            date: entry.date || new Date().toISOString(),  // fallback if no date
            symptom: sym.name,
            severity: typeof sym.severity === "number" ? sym.severity : 5  // default 5 if "unknown"/string
        })) || [])
      : [
          { date: '2026-03-08T10:00:00Z', severity: 4, symptom: 'headache' },
          { date: '2026-03-09T14:30:00Z', severity: 7, symptom: 'headache' }
      ];

    const formattedData = chartData.map(item => ({
        ...item,
        formattedDate: format(parseISO(item.date), 'MMM d'),
    }));



    return (
        <div className="glass-panel animate-fade-in stagger-2">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                <Activity size={20} color="var(--accent-green)" />
                <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Symptom Timeline</h2>
            </div>

            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorSeverity" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                        <XAxis
                            dataKey="formattedDate"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                            domain={[0, 10]}
                            ticks={[0, 5, 10]}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                borderRadius: '8px',
                                border: 'none',
                                boxShadow: 'var(--shadow-md)',
                                color: 'var(--text-primary)'
                            }}
                            formatter={(value, name, props) => [`Severity: ${value}/10`, props.payload.symptom]}
                            labelStyle={{ color: 'var(--text-secondary)', marginBottom: '4px' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="severity"
                            stroke="var(--accent-sapphire)"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorSeverity)"
                            activeDot={{ r: 6, fill: 'var(--accent-sapphire)', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TimelineChart;
