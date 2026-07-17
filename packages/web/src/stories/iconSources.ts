/** Storybook static assets — served from `.storybook/static/icons/` */
export const iconSources = {
  search: '/icons/icon-search-bold-mono.svg',
  bell: '/icons/icon-alarm-mono.svg',
  user: '/icons/icon-user-mono.svg',
  check: '/icons/icon-check-circle-mono.svg',
  graph: '/icons/icon-graph-up-mono.svg',
  arrowRight: '/icons/icon-arrow-right-mono.svg',
  lock: '/icons/icon-lock-mono.svg',
  warning: '/icons/icon-warning-circle-mono.svg',
} as const;

export type StoryIconName = keyof typeof iconSources;
