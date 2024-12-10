# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

**Breaking Changes**

- minimum Svelte version required is 5

**Features**

- support Svelte 5 runes mode
- upgrade `svelte` dependency to 5.9.1
- upgrade `vite` dependency to 5.4.11
- upgrade `@sveltejs/vite-plugin-svelte` to 4.0.1

## [0.9.0](https://github.com/metonym/svelte-time/releases/tag/v0.9.0) - 2024-04-19

**Features**

- allow `title` attribute to be overridden

## [0.8.2](https://github.com/metonym/svelte-time/releases/tag/v0.8.2) - 2023-12-16

**Fixes**

- fix `exports` in package.json to include types; add exports for `./src/*.svelte` and `./src/*`

## [0.8.1](https://github.com/metonym/svelte-time/releases/tag/v0.8.1) - 2023-12-16

**Fixes**

- add `exports` to package.json to resolve Vite development warnings

## [0.8.0](https://github.com/metonym/svelte-time/releases/tag/v0.8.0) - 2023-07-27

**Breaking Changes**

- minimum Svelte version required is 3.55

**Features**

- update type definitions to support Svelte 4
- upgrade `dayjs` to v1.11.9

## [0.7.2](https://github.com/metonym/svelte-time/releases/tag/v0.7.2) - 2023-06-04

- upgrade `dayjs` to v1.11.8
- fix `Time.svelte` types to allow `data-*` attributes (e.g., `data-test-id`)

## [0.7.1](https://github.com/metonym/svelte-time/releases/tag/v0.7.1) - 2022-06-18

- use default CJS imports from `dayjs` instead of ESM
- upgrade `dayjs` to v1.11.3
- fix TypeScript definition for re-exported `dayjs` function to extend the `relativeTime` plugin
- fix `svelteTime` action to update when using a custom live interval
- fix `svelteTime` action to also set the `datetime` attribute

## [0.7.0](https://github.com/metonym/svelte-time/releases/tag/v0.7.0) - 2022-05-15

- format `title` attribute using `format` prop when using relative time

## [0.6.3](https://github.com/metonym/svelte-time/releases/tag/v0.6.3) - 2022-05-15

- revert back to using ESM exports from `dayjs`

## [0.6.2](https://github.com/metonym/svelte-time/releases/tag/v0.6.2) - 2022-05-15

- use default CJS imports from `dayjs` instead of ESM

## [0.6.1](https://github.com/metonym/svelte-time/releases/tag/v0.6.1) - 2021-12-16

- set `type="module"` in package.json

## [0.6.0](https://github.com/metonym/svelte-time/releases/tag/v0.6.0) - 2021-10-10

- extend `TimeProps` in svelte-time.d.ts `SvelteTimeOptions` interface

## [0.5.0](https://github.com/metonym/svelte-time/releases/tag/v0.5.0) - 2021-09-15

- Use `.svelte.d.ts` extension for component TypeScript definition

## [0.4.2](https://github.com/metonym/svelte-time/releases/tag/v0.4.2) - 2021-09-01

- Update documentation on exported `dayjs` function

## [0.4.1](https://github.com/metonym/svelte-time/releases/tag/v0.4.1) - 2021-08-24

- Fix `live` prop value in README.md
- Add example set-ups (SvelteKit, Vite, Sapper, Rollup, Webpack)

## [0.4.0](https://github.com/metonym/svelte-time/releases/tag/v0.4.0) - 2021-07-27

- Export `dayjs` from `src/index.js`

## [0.3.1](https://github.com/metonym/svelte-time/releases/tag/v0.3.1) - 2021-07-27

- Add TypeScript definition for `svelte-time/src/dayjs` export

## [0.3.0](https://github.com/metonym/svelte-time/releases/tag/v0.3.0) - 2021-03-02

- Forward `$$restProps` to the `time` element

## [0.2.0](https://github.com/metonym/svelte-time/releases/tag/v0.2.0) - 2021-02-28

- Add `live` prop to update a relative timestamp at an interval

## [0.1.0](https://github.com/metonym/svelte-time/releases/tag/v0.1.0) - 2021-02-27

- Initial release
