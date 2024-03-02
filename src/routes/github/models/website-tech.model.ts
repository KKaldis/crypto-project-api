export type WebsiteTechResopnse = {
  url: string;
  matching_ingredients: number;
  matches: {
    analytics?: {
      id: string;
      name: string;
      description: string;
      icon: string;
      match_percentage: number;
    }[];
    cms?: {
      id: string;
      name: string;
      description: string;
      icon: string;
      match_percentage: number;
    }[];
    libraries?: {
      id: string;
      name: string;
      description: string;
      icon: string;
      match_percentage: number;
    }[];
    other?: {
      id: string;
      name: string;
      description: string;
      icon: string;
      match_percentage: number;
    }[];
    security?: {
      id: string;
      name: string;
      description: string;
      icon: string;
      match_percentage: number;
    }[];
    servers?: {
      id: string;
      name: string;
      description: string;
      icon: string;
      match_percentage: number;
    }[];
  };
};
