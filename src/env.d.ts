/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// CSS-only font package has no type declarations; TS 6 (ts2882) requires one
// for side-effect imports.
declare module "@fontsource-variable/jetbrains-mono";
