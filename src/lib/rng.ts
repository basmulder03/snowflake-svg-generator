/**
 * Hashes a string into a 32-bit integer using a variant of the FNV-1a algorithm.
 * Returns a function that further mixes the hash for randomness.
 * @param str - The input string to hash.
 * @returns A function that returns a mixed 32-bit integer hash.
 */
export function xfnv1a(str: string) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return () => {
        h += h << 13;
        h ^= h >>> 7;
        h += h << 3;
        h ^= h >>> 17;
        h += h << 5;
        return (h >>> 0);
    }
}

/**
 * Implements the Mulberry32 pseudo-random number generator algorithm.
 * Takes a seed and returns a function that generates numbers between 0 and 1.
 * @param a - The seed value.
 * @returns A function that generates a pseudo-random number.
 */
export function mulberry32(a: number) {
    return () => {
        a |= 0;
        a = (a + 0x6D2B79F5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
}

/**
 * Creates a seeded random number generator from a string seed.
 * Combines xfnv1a and mulberry32 to produce reproducible random numbers.
 * @param strSeed - The string seed.
 * @returns A function that generates seeded pseudo-random numbers.
 */
export function seeded(strSeed: string) {
    const h = xfnv1a(strSeed)();
    return mulberry32(h);
}
