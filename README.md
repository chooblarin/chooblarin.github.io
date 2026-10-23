# My personal blog

Link: [https://chooblarin.github.io](https://chooblarin.github.io)

## Development

Install or update [Vite+](https://viteplus.dev/guide/), then install the pinned dependencies:

```sh
vp install --frozen-lockfile
vp run dev
```

Node.js is pinned in `.node-version`, pnpm in `package.json`, and Vite+ in the `pnpm-workspace.yaml` catalog.

```sh
vp check
vp run test
vp run build
vp run build-storybook
```

The build runs `astro check` before generating the static site. Tests use the Node.js test runner. Use `vp run` to invoke the Astro and Storybook scripts.
