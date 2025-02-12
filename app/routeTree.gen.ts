/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutImport } from './routes/_layout'
import { Route as IndexImport } from './routes/index'
import { Route as OnboardingExtensionIndexImport } from './routes/onboarding/extension/index'

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const OnboardingExtensionIndexRoute = OnboardingExtensionIndexImport.update({
  id: '/onboarding/extension/',
  path: '/onboarding/extension/',
  getParentRoute: () => rootRoute,
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
    '/onboarding/extension/': {
      id: '/onboarding/extension/'
      path: '/onboarding/extension'
      fullPath: '/onboarding/extension'
      preLoaderRoute: typeof OnboardingExtensionIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof LayoutRoute
  '/onboarding/extension': typeof OnboardingExtensionIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof LayoutRoute
  '/onboarding/extension': typeof OnboardingExtensionIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_layout': typeof LayoutRoute
  '/onboarding/extension/': typeof OnboardingExtensionIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '' | '/onboarding/extension'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '' | '/onboarding/extension'
  id: '__root__' | '/' | '/_layout' | '/onboarding/extension/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  LayoutRoute: typeof LayoutRoute
  OnboardingExtensionIndexRoute: typeof OnboardingExtensionIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LayoutRoute: LayoutRoute,
  OnboardingExtensionIndexRoute: OnboardingExtensionIndexRoute,
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
        "/onboarding/extension/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_layout": {
      "filePath": "_layout.tsx"
    },
    "/onboarding/extension/": {
      "filePath": "onboarding/extension/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
