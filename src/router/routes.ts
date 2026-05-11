export type ViewType =
  | 'home'
  | 'services'
  | 'contact'
  | 'motion'
  | 'graphic'
  | 'short-form'
  | 'long-form'
  | 'photography'
  | 'web-dev'
  | 'market-research'
  | 'data-analysis'
  | 'meta-ads';

export const viewToPath: Record<ViewType, string> = {
  'home': '/',
  'services': '/services',
  'contact': '/contact',
  'motion': '/motion',
  'graphic': '/graphic',
  'short-form': '/short-form',
  'long-form': '/long-form',
  'photography': '/photography',
  'web-dev': '/web-dev',
  'market-research': '/market-research',
  'data-analysis': '/data-analysis',
  'meta-ads': '/meta-ads',
};

export const pathToView: Record<string, ViewType> = Object.entries(viewToPath).reduce(
  (acc, [view, path]) => {
    acc[path] = view as ViewType;
    return acc;
  },
  {} as Record<string, ViewType>,
);

export const viewToTitle: Record<ViewType, string> = {
  'home': "Gofi's Portfolio",
  'services': "Services | Gofi's Portfolio",
  'contact': "Contact | Gofi's Portfolio",
  'motion': "Motion Graphics | Gofi's Portfolio",
  'graphic': "Graphic Design | Gofi's Portfolio",
  'short-form': "Short-Form Video | Gofi's Portfolio",
  'long-form': "Long-Form Video | Gofi's Portfolio",
  'photography': "Photography | Gofi's Portfolio",
  'web-dev': "Web Development | Gofi's Portfolio",
  'market-research': "Market Research | Gofi's Portfolio",
  'data-analysis': "Data Analysis | Gofi's Portfolio",
  'meta-ads': "Meta Ads | Gofi's Portfolio",
};
