// Dans src/vite-env.d.ts

/// <reference types="vite/client" />

declare module "*.mdx" {
  // Il exporte par défaut un composant fonctionnel React.
  const MDXComponent: (props: Record<string, unknown>) => JSX.Element;
  export default MDXComponent;
}