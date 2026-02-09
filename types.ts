
export interface Photo {
  id: string;
  url: string;
  title: string;
  author: string;
  description?: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  cover: string;
}

export interface AIAnalysis {
  story: string;
  vibe: string;
}
