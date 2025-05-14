export type CampaignData = {
  campaignId: string;
  campaignName: string;
  date: string;
  clicks: number;
  spend: number;
};

export const fetchMockData = (): CampaignData[] => [
  { campaignId: "jan2024-abc", campaignName: "January 2024 Campaign", date: "2024-01-15", clicks: 1000, spend: 250.0 },
  { campaignId: "feb2024-abc", campaignName: "February 2024 Campaign", date: "2024-02-15", clicks: 1100, spend: 270.0 },
  { campaignId: "mar2024-abc", campaignName: "March 2024 Campaign", date: "2024-03-15", clicks: 1200, spend: 300.0 },
  { campaignId: "apr2024-abc", campaignName: "April 2024 Campaign", date: "2024-04-15", clicks: 1300, spend: 320.0 },
  { campaignId: "may2024-abc", campaignName: "May 2024 Campaign", date: "2024-05-15", clicks: 1400, spend: 350.0 },
  { campaignId: "jun2024-def", campaignName: "June 2024 Campaign", date: "2024-06-15", clicks: 800, spend: 200.0 },
  { campaignId: "jul2024-def", campaignName: "July 2024 Campaign", date: "2024-07-15", clicks: 850, spend: 210.0 },
  { campaignId: "aug2024-def", campaignName: "August 2024 Campaign", date: "2024-08-15", clicks: 900, spend: 220.0 },
  { campaignId: "sep2024-def", campaignName: "September 2024 Campaign", date: "2024-09-15", clicks: 950, spend: 230.0 },
  { campaignId: "oct2024-def", campaignName: "October 2024 Campaign", date: "2024-10-15", clicks: 1000, spend: 240.0 },
  { campaignId: "nov2024-ghi", campaignName: "November 2024 Campaign", date: "2024-11-15", clicks: 1500, spend: 400.0 },
  { campaignId: "dec2024-ghi", campaignName: "December 2024 Campaign", date: "2024-12-15", clicks: 1600, spend: 420.0 },
  { campaignId: "jan2025-ghi", campaignName: "January 2025 Campaign", date: "2025-01-15", clicks: 1700, spend: 450.0 },
  { campaignId: "feb2025-ghi", campaignName: "February 2025 Campaign", date: "2025-02-15", clicks: 1800, spend: 470.0 },
  { campaignId: "mar2025-ghi", campaignName: "March 2025 Campaign", date: "2025-03-15", clicks: 1900, spend: 500.0 },
  { campaignId: "apr2025-ghi", campaignName: "April 2025 Campaign", date: "2025-04-15", clicks: 2000, spend: 520.0 },
  { campaignId: "may2025-ghi", campaignName: "May 2025 Campaign", date: "2025-05-15", clicks: 2100, spend: 550.0 },
];
