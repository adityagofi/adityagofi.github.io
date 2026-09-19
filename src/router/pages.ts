import type { ComponentType } from 'react';
import type { ViewType } from './routes';
export type PageView = ViewType | 'not-found';
export const pageLoaders: Record<PageView, () => Promise<{ default: ComponentType }>> = {
  home: () => import('@/pages/Home'),
  services: () => import('@/pages/Services'),
  contact: () => import('@/pages/Contact'),
  motion: () => import('@/pages/projects/MotionProject'),
  graphic: () => import('@/pages/projects/GraphicDesignProject'),
  'short-form': () => import('@/pages/projects/ShortFormVideoProject'),
  'long-form': () => import('@/pages/projects/LongFormVideoProject'),
  photography: () => import('@/pages/projects/PhotographyProject'),
  'web-dev': () => import('@/pages/projects/WebDevelopmentProject'),
  'market-research': () => import('@/pages/projects/MarketResearchProject'),
  'data-analysis': () => import('@/pages/projects/DataAnalysisProject'),
  'meta-ads': () => import('@/pages/projects/MetaAdsProject'),
  'not-found': () => import('@/pages/NotFound'),
};
