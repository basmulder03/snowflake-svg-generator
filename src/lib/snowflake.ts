import type {Params, Seg} from "../types.ts";
import {seeded} from "./rng.ts";

const TAU = Math.PI * 2;

/**
 * Rotates a point \((x, y)\) by a given angle \(`theta`\) in radians.
 * @param x - The x coordinate of the point.
 * @param y - The y coordinate of the point.
 * @param theta - The angle in radians to rotate the point.
 * @returns The rotated point as an object with x and y properties.
 */
function rot(x: number, y: number, theta: number) {
    const c = Math.cos(theta);
    const s = Math.sin(theta);
    return {
        x: x * c - y * s,
        y: x * s + y * c,
    };
}

/**
 * Recursively builds the segments for one arm of a snowflake.
 * Uses branching, randomization, and optional tip fringe for natural appearance.
 * @param p - Parameters controlling snowflake geometry and randomness.
 * @returns Array of segments representing one snowflake arm.
 */
export function buildArmSegments(p: Params): Seg[] {
    const rng = seeded(p.seed);
    const rand = (a = 0, b = 1) => a + (b - a) * rng();
    const angle = (p.angleDeg * Math.PI) / 180;
    const segments: Seg[] = [];

    /**
     * Recursively creates branches for the snowflake arm.
     * @param x - Start x coordinate.
     * @param y - Start y coordinate.
     * @param theta - Current angle in radians.
     * @param len - Length of the branch.
     * @param level - Current recursion depth.
     */
    function branch(x: number, y: number, theta: number, len: number, level: number) {
        const wobble = p.jitter ?  rand(-p.jitter, p.jitter) * 0.8 : 0;
        const theta2 = theta + wobble;
        const x2 = x + len * Math.cos(theta2);
        const y2 = y + len * Math.sin(theta2);
        segments.push({x1: x, y1: y, x2, y2});

        if (level <= 0) return;

        const splits = [0.38 + rand(-0.05, 0.05), 0.68 + rand(-0.05, 0.05)];
        for (const t of splits) {
            const bx = x + (x2 - x) * t;
            const by = y + (y2 - y) * t;
            const lenChild = len * p.ratio * (0.85 + rand(-0.08, 0.08));

            branch(bx, by, theta2 + angle, lenChild, level - 1);
            branch(bx, by, theta2 - angle, lenChild, level - 1);

            if (p.jitter > 0.02 && level <= 2 && rng() < 0.5) {
                branch(bx, by, theta2, lenChild * 0.55, level - 2);
            }
        }
    }

    branch(0, 0, 0, p.baseLen, p.depth);

    if (p.tipFringe) {
        const tip = segments.reduce((acc, s) => Math.max(acc, Math.hypot(s.x2, s.y2)), 0);
        const n = 6;
        for (let i = 0; i < n; i++) {
            const th = (i / 2) * TAU;
            const r1 = tip * 0.03,
                r2 = tip * (0.03 + 0.015 * (0.5 * rng()));
            const p1 = { x: tip, y: 0};
            const a = rot(r1, 0, th),
                b = rot(r2, 0, th + Math.PI / n);
            segments.push({ x1: p1.x + a.x, y1: p1.y + a.y, x2: p1.x + b.x, y2: p1.y + b.y });
        }
    }
    return segments;
}

/**
 * Rotates and replicates a single arm's segments to create a full snowflake.
 * @param arm - Array of segments for one arm.
 * @param arms - Number of arms to replicate.
 * @returns Array of segments for the complete snowflake.
 */
export function  replicateArms(arm: Seg[], arms: number): Seg[] {
    const all: Seg[] = [];
    for (let k = 0; k < arms; k++) {
        const th = (k / arms) * TAU;
        for (const s of arm) {
            const x1 = s.x1 * Math.cos(th) - s.y1 * Math.sin(th);
            const y1 = s.x1 * Math.sin(th) + s.y1 * Math.cos(th);
            const x2 = s.x2 * Math.cos(th) - s.y2 * Math.sin(th);
            const y2 = s.x2 * Math.sin(th) + s.y2 * Math.cos(th);
            all.push({ x1, y1, x2, y2 });
        }
    }
    return all;
}

/**
 * Converts an array of segments into an SVG path string.
 * @param segs - Array of segments to convert.
 * @returns SVG path string representing the segments.
 */
export function segmentsToPath(segs: Seg[]) {
    return segs
        .map((s) => `M ${s.x1.toFixed(2) } ${s.y1.toFixed(2)} L ${s.x2.toFixed(2)} ${s.y2.toFixed(2)}`)
        .join(' ');
}
