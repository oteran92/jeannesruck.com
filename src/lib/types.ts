export type LocalizedString = {
  en: string;
  fr: string;
};

export type Artwork = {
  id: string;
  src: string;
  title: LocalizedString;
  medium?: LocalizedString;
  dimensions?: string;
};
