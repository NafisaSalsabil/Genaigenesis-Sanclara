import React from 'react';
import '../index.css';

const Leaf = ({ color, style, className, pattern = ["L", "R", "L", "R"] }) => {


    // Generate inner vein paths dynamically based on the requested number
    // We want them pointing downwards starting from the top tip (Y=2)
    const generateVeins = () => {
        let veinPaths = "M12 23.5V2";

        const startY = 10;
        const endY = 25;
        const step = (endY - startY) / (pattern.length + 1);

        pattern.forEach((side, i) => {
            const y = startY + (i * step);
            const yRise = y - 2;

            if (side === "L") {
                veinPaths += `M12 ${y}C11 ${yRise} 10 ${yRise} 8 ${yRise}`;
            } else {
                veinPaths += `M12 ${y}C13 ${yRise} 14 ${yRise} 16 ${yRise}`;
            }
        });

        return veinPaths;
    };



    return (
        <svg
            width="48"
            height="48"
            viewBox="-2 -2 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`leaf-svg ${className}`}
            style={{ ...style, position: 'absolute', opacity: 0.6 }}
        >
            <g transform="translate(0, 0)">
                {/* Main leaf outline with sharp top and slightly rounded bottom */}
                <path
                    d="M12 2C6 8 6 18 11.5 23.5A 0.5 0.5 0 0 0 12.5 23.5C18 18 18 8 12 2Z"
                    stroke={color}
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {/* Center vein connecting the tips */}
                <path
                    d={generateVeins()}
                    stroke={color}
                    strokeWidth="0.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.8"
                />
            </g>
        </svg>
    );
};

const BackgroundLeaves = () => {
    const leaves = [
        { id: 1, color: '#bbf7d0', size: 100, top: '10%', left: '5%', animation: 'float1', delay: '0s', rotation: 35, pattern: ["L", "R", "L", "R", "L"] },
        { id: 7, color: '#bbf7d0', size: 80, top: '20%', left: '45%', animation: 'float1', delay: '0.8s', rotation: 25, pattern: ["R", "L", "R", "L", "R"] },
        { id: 8, color: '#bbf7d0', size: 100, top: '65%', left: '45%', animation: 'float1', delay: '0s', rotation: -35, pattern: ["L", "R", "L", "R", "L"] },
        { id: 9, color: '#bfdbfe', size: 130, top: '20%', left: '80%', animation: 'float2', delay: '1s', rotation: -50, pattern: ["R", "L", "R", "L"] },
        { id: 11, color: '#a7f3d0', size: 120, top: '90', left: '55%', animation: 'float1', delay: '0.5s', rotation: -30, pattern: ["R", "L", "R", "L"] },
        { id: 5, color: '#e0f2fe', size: 95, top: '40%', left: '90%', animation: 'float3', delay: '1.5s', rotation: 55, pattern: ["L", "R", "L", "R", "L"] },
        { id: 3, color: '#fef08a', size: 85, top: '65%', left: '15%', animation: 'float3', delay: '2s', rotation: 65, pattern: ["L", "R", "L", "R", "L"] },
        { id: 4, color: '#a7f3d0', size: 120, top: '75%', left: '75%', animation: 'float1', delay: '0.5s', rotation: -30, pattern: ["R", "L", "R", "L"] },

        { id: 6, color: '#d9f99d', size: 150, top: '70%', left: '42%', animation: 'float2', delay: '2.5s', rotation: 65, pattern: ["L", "R", "L", "R"] },

        { id: 10, color: '#fef08a', size: 85, top: '40%', left: '25%', animation: 'float3', delay: '2s', rotation: -35, pattern: ["L", "R", "L", "R", "L"] },
        { id: 2, color: '#bfdbfe', size: 130, top: '90%', left: '40%', animation: 'float2', delay: '1s', rotation: 45, pattern: ["R", "L", "R", "L"] }
    ];


    return (
        <div className="leaf-container">
            {leaves.map((leaf) => (
                <div
                    key={leaf.id}
                    style={{
                        position: 'absolute',
                        top: leaf.top,
                        left: leaf.left,
                        transform: `rotate(${leaf.rotation}deg)`,
                        transformOrigin: 'center'
                    }}
                >
                    <Leaf
                        color={leaf.color}
                        pattern={leaf.pattern}
                        style={{
                            width: `${leaf.size}px`,
                            height: `${leaf.size}px`,
                            animation: `${leaf.animation} 8s ease-in-out infinite both alternate`,
                            animationDelay: leaf.delay
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default BackgroundLeaves;
