'use client'
import { useState, useEffect } from "react";
import { fetchMockData, CampaignData } from "../utils/CampaignDataClient";
import "./Dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState<CampaignData[]>([]);
  const [filteredData, setFilteredData] = useState<CampaignData[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });
  const [sortConfig, setSortConfig] = useState<{ key: keyof CampaignData; direction: "asc" | "desc" } | null>(null);

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

  const handleSort = (key: keyof CampaignData) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredData(sortedData);
  };

  const getSortIndicator = (key: keyof CampaignData) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return "⇅";
  };

  const totalClicks = filteredData.reduce((sum, item) => sum + item.clicks, 0);
  const totalSpend = filteredData.reduce((sum, item) => sum + item.spend, 0);
  const ctr = totalClicks > 0 ? ((totalClicks / totalSpend) * 100).toFixed(2) : "0";

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Ads Dashboard</h1>
      <div className="filters">
        <div className="date-range">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, start: e.target.value }))
            }
          />
          <span>–</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, end: e.target.value }))
            }
          />
        </div>
        <select
          className="campaign-select"
          value={selectedCampaign}
          onChange={(e) => setSelectedCampaign(e.target.value)}
        >
          <option value="all">Campaign</option>
          {data.map((campaign) => (
            <option key={campaign.campaignId} value={campaign.campaignId}>
              {campaign.campaignName}
            </option>
          ))}
        </select>
        <button className="apply-filters" onClick={handleFilter}>
          Apply Filters
        </button>
      </div>

      <div className="summary">
        <div className="summary-tile">
          <h3>Clicks</h3>
          <p>{totalClicks.toLocaleString()} K</p>
        </div>
        <div className="summary-tile">
          <h3>Spend</h3>
          <p>${totalSpend.toLocaleString()}</p>
        </div>
        <div className="summary-tile">
          <h3>CTR</h3>
          <p>{ctr}%</p>
        </div>
      </div>

      <table className="performance-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("campaignName")}>
              Campaign {getSortIndicator("campaignName")}
            </th>
            <th onClick={() => handleSort("date")}>
              Date {getSortIndicator("date")}
            </th>
            <th onClick={() => handleSort("clicks")}>
              Clicks {getSortIndicator("clicks")}
            </th>
            <th onClick={() => handleSort("spend")}>
              Spend {getSortIndicator("spend")}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.campaignId}>
              <td>{item.campaignName}</td>
              <td>{item.date}</td>
              <td>{item.clicks.toLocaleString()}</td>
              <td>${item.spend.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
