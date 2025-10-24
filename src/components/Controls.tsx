import type {Params} from "../types.ts";
import type {Dispatch, SetStateAction} from "react";

export function Range({label, min, max, step, value, onChange}: { label: string; min: number; max: number; step: number, value: number; onChange: (v: number) => void}) {
    return (
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span>{label}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full accent-sky-400"
            />
        </div>
    );
}

export function Toggle({label, checked, onChange}: { label: string; checked: boolean; onChange: (v: boolean) => void}) {
    return (
        <label className="flex items-center gap-3 text-sm select-none">
            <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="accent-sky-400 w-4 h-4" />
            <span>{label}</span>
        </label>
    );
}

export function ControlPanel({params, setParams, onRandomize, onDownload}: { params: Params; setParams: Dispatch<SetStateAction<Params>>; onRandomize: () => void; onDownload: () => void}) {
    return (
        <div className="p-4 bg-slage-800/60 rounded-2xl shadow-xl border border-slate-700 space-y-4">
            <h1 className="text-2xl font-semibold tracking-tight">Snowflake SVG Generator</h1>
            <p className="text-slage-300 text-sm">Deterministic, parameterized generator. Tweak, randomize and download.</p>

            <Range label="Arms" min={3} max={12} step={1} value={params.arms} onChange={(v) => setParams((p) => ({...p, arms: v}))} />
            <Range label="Depth" min={1} max={6} step={1} value={params.depth} onChange={(v) => setParams((p) => ({...p, depth: v}))} />
            <Range label="Base length" min={80} max={260} step={1} value={params.baseLen} onChange={(v) => setParams((p) => ({...p, baseLen: v}))} />
            <Range label="Angle (°)" min={12} max={45} step={1} value={params.angleDeg} onChange={(v) => setParams((p) => ({ ...p, angleDeg: v }))} />
            <Range label="Ratio" min={0.45} max={0.75} step={0.01} value={params.ratio} onChange={(v) => setParams((p) => ({ ...p, ratio: v }))} />
            <Range label="Jitter" min={0} max={0.25} step={0.01} value={params.jitter} onChange={(v) => setParams((p) => ({ ...p, jitter: v }))} />
            <Range label="Stroke" min={0.5} max={4} step={0.1} value={params.stroke} onChange={(v) => setParams((p) => ({ ...p, stroke: v }))} />

            <Toggle label="Tip fringe" checked={params.tipFringe} onChange={(v) => setParams((p) => ({ ...p, tipFringe: v }))} />
            <Toggle label="Center ring dots" checked={params.ringDots} onChange={(v) => setParams((p) => ({ ...p, ringDots: v }))} />
            <Toggle label="Rotate animation" checked={params.animate} onChange={(v) => setParams((p) => ({ ...p, animate: v }))} />

            <div>
                <label className="block text-sm mb-1">Seed</label>
                <input className="w-full bg-slage-900 border border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" value={params.seed} onChange={(e) => setParams((p) => ({...p, seed: e.target.value}))} />
            </div>

            <div className="flex gap-2 pt-2">
                <button onClick={onRandomize} className="px-3 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-900 font-semibold shadow">Randomize</button>
                <button onClick={onDownload} className="px-3 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-semibold shadow">Download SVG</button>
            </div>
        </div>
    )
}
