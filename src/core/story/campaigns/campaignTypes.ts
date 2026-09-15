export interface CampaignChoice {
  label: string;
  reaction: string;
  changes: {
    coraje?: number;
    salud?: number;
    pericia?: number;
    liderazgo?: number;
    impactoGuerra?: number;
  };
  promotedToRankIndex?: number;
  medalAwarded?: string;
  soundEffect?: 'confirm' | 'alert' | 'radio';
  fatalText?: string;
}

export interface CampaignStep {
  id: string;
  stepNumber: number;
  date: string;
  location: string;
  title: string;
  situation: string;
  choices: CampaignChoice[];
}

export type RankTier = 'tropa' | 'suboficial' | 'oficial' | 'alto_mando';

export function getRankTierFromIndex(index: number): RankTier {
  if (index === 0) return 'tropa';
  if (index <= 2) return 'suboficial';
  if (index <= 6) return 'oficial';
  return 'alto_mando';
}
