import { useMemo, useRef, useState } from 'react';
import { ControlPanel } from './components/Controls';
import { Preview } from './components/Preview';
import type { Params } from './types';
import { buildArmSegments, replicateArms, segmentsToPath } from './lib/snowflake';

export default function App() {
    const [params, setParams] = useState<Params>({
        arms: 6,
        depth: 4,
        baseLen: 180,
        ratio: 0.62,
        angleDeg: 28,
        jitter: 0.06,
        stroke: 2,
        tipFringe: true,
        ringDots: true,
        animate: false,
        seed: 'crystal-001',
        size: 640,
    });

    const svgRef = useRef<SVGSVGElement | null>(null);

    const { pathD, dots } = useMemo(() => {
        const arm = buildArmSegments(params);
        const all = replicateArms(arm, params.arms);
        const pathD = segmentsToPath(all);

        const dots: { x: number; y: number; r: number }[] = [];
        if (params.ringDots) {
            const R = params.baseLen * 0.18;
            const n = params.arms * 2;
            for (let i = 0; i < n; i++) {
                const th = (i / n) * Math.PI * 2;
                const r = params.stroke * 0.45;
                dots.push({ x: R * Math.cos(th), y: R * Math.sin(th), r });
            }
        }

        return { pathD, dots };
    }, [params]);

    function randomize() {
        const words = ['frost', 'flake', 'ember', 'aurora', 'crystal', 'snow', 'glacier', 'drift', 'ice', 'winter', 'fir', 'pine', 'hoarfrost'];
        const time = Date.now().toString(36).slice(-4);
        const seed = `${words[Math.floor(Math.random() * words.length)]}-${time}`;
        setParams((p) => ({
            ...p,
            seed,
            angleDeg: Math.round(20 + Math.random() * 20),
            ratio: +(0.55 + Math.random() * 0.14).toFixed(2),
            jitter: +(Math.random() * 0.12).toFixed(2),
            depth: Math.floor(3 + Math.random() * 2),
            stroke: +(1 + Math.random() * 2.5).toFixed(1),
        }));
    }

    function downloadSVG() {
        if (!svgRef.current) return;
        const clone = svgRef.current.cloneNode(true) as SVGSVGElement;
        clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        const blob = new Blob([clone.outerHTML], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `snowflake-${params.seed}.svg`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }

    const view = params.size;
    const half = view / 2;

    return (
        <div className="min-h-screen w-full bg-slate-900 text-slate-100 p-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4">
                    <ControlPanel params={params} setParams={setParams} onRandomize={randomize} onDownload={downloadSVG} />
                </div>
                <div className="lg:col-span-8">
                    <Preview view={view} half={half} pathD={pathD} stroke={params.stroke} dots={dots} svgRef={svgRef} animate={params.animate} />
                </div>
            </div>

            <footer className="max-w-6xl mx-auto text-xs text-slate-400 mt-6">
                Pro tip: The same seed always regenerates the exact same snowflake. Share seeds with friends!
            </footer>
        </div>
    );
}
