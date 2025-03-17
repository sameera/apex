import { atom } from "jotai";

export interface Bucket {
    id: string;
    name: string;
    description: string;
}

export const buckets$ = atom<Map<string, Bucket>>(new Map());

export const setBuckets$ = atom(null, (_, set, buckets: Bucket[]) => {
    set(buckets$, (prev) => {
        prev.clear();

        buckets.forEach((bucket) => {
            prev.set(bucket.id, bucket);
        });
        return prev;
    });
});

export const addBucket$ = atom(null, (_, set, bucket: Bucket) => {
    set(buckets$, (prev) => prev.set(bucket.id, bucket));
});

export const updateBucket$ = atom(null, (_, set, bucket: Bucket) => {
    set(buckets$, (prev) => {
        if (!prev.has(bucket.id)) return prev;
        return prev.set(bucket.id, bucket);
    });
});
