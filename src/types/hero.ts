export interface HeroSearchValues {
  location: string;
  serviceType: string;
  needType: string;
}

export type HeroSearchField = keyof HeroSearchValues;
