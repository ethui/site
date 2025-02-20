/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutImport } from './routes/_layout'
import { Route as IndexImport } from './routes/index'
import { Route as DocsLImport } from './routes/docs/_l'
import { Route as DocsLIndexImport } from './routes/docs/_l.index'
import { Route as DocsLSectionImport } from './routes/docs/_l.$section'
import { Route as DocsLSectionIndexImport } from './routes/docs/_l.$section.index'
import { Route as LayoutOnboardingExtensionIndexImport } from './routes/_layout.onboarding/extension/index'
import { Route as DocsLSectionSubsectionImport } from './routes/docs/_l.$section.$subsection'

// Create Virtual Routes

const DocsImport = createFileRoute('/docs')()

// Create/Update Routes

const DocsRoute = DocsImport.update({
  id: '/docs',
  path: '/docs',
  getParentRoute: () => rootRoute,
} as any)

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const DocsLRoute = DocsLImport.update({
  id: '/_l',
  getParentRoute: () => DocsRoute,
} as any)

const DocsLIndexRoute = DocsLIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => DocsLRoute,
} as any)

const DocsLSectionRoute = DocsLSectionImport.update({
  id: '/$section',
  path: '/$section',
  getParentRoute: () => DocsLRoute,
} as any)

const DocsLSectionIndexRoute = DocsLSectionIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => DocsLSectionRoute,
} as any)

const LayoutOnboardingExtensionIndexRoute =
  LayoutOnboardingExtensionIndexImport.update({
    id: '/onboarding/extension/',
    path: '/onboarding/extension/',
    getParentRoute: () => LayoutRoute,
  } as any)

const DocsLSectionSubsectionRoute = DocsLSectionSubsectionImport.update({
  id: '/$subsection',
  path: '/$subsection',
  getParentRoute: () => DocsLSectionRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/docs': {
      id: '/docs'
      path: '/docs'
      fullPath: '/docs'
      preLoaderRoute: typeof DocsImport
      parentRoute: typeof rootRoute
    }
    '/docs/_l': {
      id: '/docs/_l'
      path: '/docs'
      fullPath: '/docs'
      preLoaderRoute: typeof DocsLImport
      parentRoute: typeof DocsRoute
    }
    '/docs/_l/$section': {
      id: '/docs/_l/$section'
      path: '/$section'
      fullPath: '/docs/$section'
      preLoaderRoute: typeof DocsLSectionImport
      parentRoute: typeof DocsLImport
    }
    '/docs/_l/': {
      id: '/docs/_l/'
      path: '/'
      fullPath: '/docs/'
      preLoaderRoute: typeof DocsLIndexImport
      parentRoute: typeof DocsLImport
    }
    '/docs/_l/$section/$subsection': {
      id: '/docs/_l/$section/$subsection'
      path: '/$subsection'
      fullPath: '/docs/$section/$subsection'
      preLoaderRoute: typeof DocsLSectionSubsectionImport
      parentRoute: typeof DocsLSectionImport
    }
    '/_layout/onboarding/extension/': {
      id: '/_layout/onboarding/extension/'
      path: '/onboarding/extension'
      fullPath: '/onboarding/extension'
      preLoaderRoute: typeof LayoutOnboardingExtensionIndexImport
      parentRoute: typeof LayoutImport
    }
    '/docs/_l/$section/': {
      id: '/docs/_l/$section/'
      path: '/'
      fullPath: '/docs/$section/'
      preLoaderRoute: typeof DocsLSectionIndexImport
      parentRoute: typeof DocsLSectionImport
    }
  }
}

// Create and export the route tree

interface LayoutRouteChildren {
  LayoutOnboardingExtensionIndexRoute: typeof LayoutOnboardingExtensionIndexRoute
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutOnboardingExtensionIndexRoute: LayoutOnboardingExtensionIndexRoute,
}

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren)

interface DocsLSectionRouteChildren {
  DocsLSectionSubsectionRoute: typeof DocsLSectionSubsectionRoute
  DocsLSectionIndexRoute: typeof DocsLSectionIndexRoute
}

const DocsLSectionRouteChildren: DocsLSectionRouteChildren = {
  DocsLSectionSubsectionRoute: DocsLSectionSubsectionRoute,
  DocsLSectionIndexRoute: DocsLSectionIndexRoute,
}

const DocsLSectionRouteWithChildren = DocsLSectionRoute._addFileChildren(
  DocsLSectionRouteChildren,
)

interface DocsLRouteChildren {
  DocsLSectionRoute: typeof DocsLSectionRouteWithChildren
  DocsLIndexRoute: typeof DocsLIndexRoute
}

const DocsLRouteChildren: DocsLRouteChildren = {
  DocsLSectionRoute: DocsLSectionRouteWithChildren,
  DocsLIndexRoute: DocsLIndexRoute,
}

const DocsLRouteWithChildren = DocsLRoute._addFileChildren(DocsLRouteChildren)

interface DocsRouteChildren {
  DocsLRoute: typeof DocsLRouteWithChildren
}

const DocsRouteChildren: DocsRouteChildren = {
  DocsLRoute: DocsLRouteWithChildren,
}

const DocsRouteWithChildren = DocsRoute._addFileChildren(DocsRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof LayoutRouteWithChildren
  '/docs': typeof DocsLRouteWithChildren
  '/docs/$section': typeof DocsLSectionRouteWithChildren
  '/docs/': typeof DocsLIndexRoute
  '/docs/$section/$subsection': typeof DocsLSectionSubsectionRoute
  '/onboarding/extension': typeof LayoutOnboardingExtensionIndexRoute
  '/docs/$section/': typeof DocsLSectionIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof LayoutRouteWithChildren
  '/docs': typeof DocsLIndexRoute
  '/docs/$section/$subsection': typeof DocsLSectionSubsectionRoute
  '/onboarding/extension': typeof LayoutOnboardingExtensionIndexRoute
  '/docs/$section': typeof DocsLSectionIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_layout': typeof LayoutRouteWithChildren
  '/docs': typeof DocsRouteWithChildren
  '/docs/_l': typeof DocsLRouteWithChildren
  '/docs/_l/$section': typeof DocsLSectionRouteWithChildren
  '/docs/_l/': typeof DocsLIndexRoute
  '/docs/_l/$section/$subsection': typeof DocsLSectionSubsectionRoute
  '/_layout/onboarding/extension/': typeof LayoutOnboardingExtensionIndexRoute
  '/docs/_l/$section/': typeof DocsLSectionIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/docs'
    | '/docs/$section'
    | '/docs/'
    | '/docs/$section/$subsection'
    | '/onboarding/extension'
    | '/docs/$section/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/docs'
    | '/docs/$section/$subsection'
    | '/onboarding/extension'
    | '/docs/$section'
  id:
    | '__root__'
    | '/'
    | '/_layout'
    | '/docs'
    | '/docs/_l'
    | '/docs/_l/$section'
    | '/docs/_l/'
    | '/docs/_l/$section/$subsection'
    | '/_layout/onboarding/extension/'
    | '/docs/_l/$section/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  LayoutRoute: typeof LayoutRouteWithChildren
  DocsRoute: typeof DocsRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LayoutRoute: LayoutRouteWithChildren,
  DocsRoute: DocsRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_layout",
        "/docs"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/onboarding/extension/"
      ]
    },
    "/docs": {
      "filePath": "docs",
      "children": [
        "/docs/_l"
      ]
    },
    "/docs/_l": {
      "filePath": "docs/_l.tsx",
      "parent": "/docs",
      "children": [
        "/docs/_l/$section",
        "/docs/_l/"
      ]
    },
    "/docs/_l/$section": {
      "filePath": "docs/_l.$section.tsx",
      "parent": "/docs/_l",
      "children": [
        "/docs/_l/$section/$subsection",
        "/docs/_l/$section/"
      ]
    },
    "/docs/_l/": {
      "filePath": "docs/_l.index.tsx",
      "parent": "/docs/_l"
    },
    "/docs/_l/$section/$subsection": {
      "filePath": "docs/_l.$section.$subsection.tsx",
      "parent": "/docs/_l/$section"
    },
    "/_layout/onboarding/extension/": {
      "filePath": "_layout.onboarding/extension/index.tsx",
      "parent": "/_layout"
    },
    "/docs/_l/$section/": {
      "filePath": "docs/_l.$section.index.tsx",
      "parent": "/docs/_l/$section"
    }
  }
}
ROUTE_MANIFEST_END */
