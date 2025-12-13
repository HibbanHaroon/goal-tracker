import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import useYearlyProgress from "../../../hooks/useYearlyProgress";
import "./styles/ProgressGraph.css";

/**
 * Custom tooltip for the chart
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="progress-tooltip">
        <p className="tooltip-date">{data.label}</p>
        <p className="tooltip-percentage">{data.percentage}%</p>
        <p className="tooltip-details">
          {data.completed} / {data.total} goals
        </p>
      </div>
    );
  }
  return null;
};

/**
 * Progress Graph Component
 * Displays yearly goal completion progress as a line chart
 */
const ProgressGraph = ({ refreshKey }) => {
  const { progress, loading, error, year } = useYearlyProgress(
    null,
    refreshKey
  );

  if (loading) {
    return (
      <div className="progress-graph-container">
        <div className="progress-graph-loading">Loading progress...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="progress-graph-container">
        <div className="progress-graph-error">Error loading progress</div>
      </div>
    );
  }

  // Calculate average percentage
  const totalPercentage = progress.reduce(
    (sum, day) => sum + day.percentage,
    0
  );
  const averagePercentage =
    progress.length > 0 ? Math.round(totalPercentage / progress.length) : 0;

  // Get tick values for X axis (show every month)
  const getMonthTicks = () => {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      const month = String(i).padStart(2, "0");
      const dateStr = `${year}-${month}-01`;
      if (progress.some((p) => p.date >= dateStr)) {
        months.push(dateStr);
      }
    }
    return months;
  };

  return (
    <div className="progress-graph-container">
      <div className="progress-graph-header">
        <h2>Progress in {year}</h2>
        <div className="progress-stats">
          <span className="stat-item">
            <span className="stat-value">{averagePercentage}%</span>
            <span className="stat-label">avg completion</span>
          </span>
          <span className="stat-item">
            <span className="stat-value">{progress.length}</span>
            <span className="stat-label">days tracked</span>
          </span>
        </div>
      </div>

      <div className="progress-graph-chart">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={progress}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickFormatter={(date) => {
                const d = new Date(date + "T00:00:00");
                return d.toLocaleDateString("en-US", { month: "short" });
              }}
              ticks={getMonthTicks()}
              stroke="#666"
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
              stroke="#666"
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={averagePercentage}
              stroke="#999"
              strokeDasharray="5 5"
              label={({ viewBox }) => {
                if (viewBox && viewBox.width !== undefined) {
                  return (
                    <text
                      x={viewBox.x + 50}
                      y={viewBox.y - 5}
                      fill="#666"
                      fontSize={12}
                      textAnchor="end"
                    >
                      Avg: {averagePercentage}%
                    </text>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="percentage"
              stroke="#000"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#000" }}
              isAnimationActive={true}
              animationDuration={500}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressGraph;
