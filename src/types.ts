export type Seg = { x1: number; y1: number; x2: number; y2: number };

export type Params = {
    arms: number;
    depth: number;
    baseLen: number;
    ratio: number;
    angleDeg: number;
    jitter: number; // 0..0.5
    stroke: number;
    tipFringe: boolean;
    ringDots: boolean;
    animate: boolean;
    seed: string;
    size: number; // svg view size
};
