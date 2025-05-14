'use client'
import { useState, useEffect } from "react";
import { fetchMockData, CampaignData } from "../utils/CampaignDataClient";

export default function Dashboard() {
  const [data, setData] = useState<CampaignData[]>([]);
  const [filteredData, setFilteredData] = useState<CampaignData[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });

  useEffect(() => {
    const mockData = fetchMockData();
    setData(mockData);
    setFilteredData(mockData);
  }, []);

  const handleFilter = () => {
    let filtered = data;

    if (selectedCampaign !== "all") {
      filtered = filtered.filter(
        (item) => item.campaignId === selectedCampaign
      );
    }

    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter(
        (item) =>
          new Date(item.date) >= new Date(dateRange.start) &&
          new Date(item.date) <= new Date(dateRange.end)
      );
    }

    setFilteredData(filtered);
  };

  const totalClicks = filteredData.reduce((sum, item) => sum + item.clicks, 0);
  const totalSpend = filteredData.reduce((sum, item) => sum + item.spend, 0);
  const ctr = totalClicks > 0 ? ((totalClicks / totalSpend) * 100).toFixed(2) : "0";

  return (
    <div>
      <div>
        <label>
          Date Range:
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, start: e.target.value }))
            }
          />
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, end: e.target.value }))
            }
          />
        </label>
        <label>
          Campaign:
          <select
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
          >
            <option value="all">All Campaigns</option>
            {data.map((campaign) => (
              <option key={campaign.campaignId} value={campaign.campaignId}>
                {campaign.campaignName}
              </option>
            ))}
          </select>
        </label>
        <button onClick={handleFilter}>Apply Filters</button>
      </div>

      <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
        <div>
          <h3>Total Clicks</h3>
          <p>{totalClicks}</p>
        </div>
        <div>
          <h3>Total Spend</h3>
          <p>${totalSpend.toFixed(2)}</p>
        </div>
        <div>
          <h3>CTR</h3>
          <p>{ctr}%</p>
        </div>
      </div>
      <table style={{ marginTop: "16px", width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Campaign Name</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Date</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Clicks</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Spend</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.campaignId}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item.campaignName}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item.date}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item.clicks}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                ${item.spend.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
