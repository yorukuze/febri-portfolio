import icons from './brandIcons.json';

export interface BrandIconData {
  title: string;
  path: string;
  hex: string;
}

export const brandIcons: Record<string, BrandIconData> = icons;
