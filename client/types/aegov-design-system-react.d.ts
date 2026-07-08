/**
 * @aegov/design-system-react ships no TypeScript declarations (plain JS, no
 * "types" field in its package.json). This ambient module keeps imports from
 * it type-checkable as `any` rather than failing the build.
 */
declare module "@aegov/design-system-react";
