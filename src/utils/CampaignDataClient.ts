export type CampaignData = {
  campaignId: string;
  campaignName: string;
  date: string;
  clicks: number;
  spend: number;
};

export const fetchMockData = (): CampaignData[] => [
  {
    campaignId: "abc123",
    campaignName: "Spring Promo",
    date: "2025-05-14",
    clicks: 1200,
    spend: 320.45,
  },
  {
    campaignId: "def456",
    campaignName: "Summer Sale",
    date: "2025-05-15",
    clicks: 800,
    spend: 200.0,
  },
];
