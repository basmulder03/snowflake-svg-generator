import React from 'react';

export function Preview({ view, half, pathD, stroke, dots, svgRef, animate }: { view: number; half: number; pathD: string; stroke: number; dots: { x: number; y: number; r: number }[]; svgRef: React.RefObject<SVGSVGElement | null>; animate: boolean }) {
    return (
        <div className="p-4 bg-slate-800/60 rounded-2xl shadow-xl border border-slate-700 flex items-center justify-center">
            <div className="relative">
                <svg ref={svgRef} width={view} height={view} viewBox={`${-half} ${-half} ${view} ${view}`} className={animate ? 'animate-[spin_18s_linear_infinite]' : ''}>
                    <defs>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="1.5" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <rect x={-half} y={-half} width={view} height={view} fill="transparent" />
                    <path d={pathD} stroke="#e2f3ff" strokeWidth={stroke} strokeLinecap="round" filter="url(#glow)" fill="none" />
                    <circle cx={0} cy={0} r={Math.max(1, stroke * 0.9)} fill="#e2f3ff" />
                    {dots.map((d, i) => (
                        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#e2f3ff" />
                    ))}
                </svg>
            </div>
        </div>
    );
}
