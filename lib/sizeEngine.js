import { SIZE_CHARTS } from "./sizeCharts";

function estimateBodyWidth(height, weight) {
  return (weight / height) * 100 + 40;
}

export function getRecommendedSize(height, weight, type) {
  const chart = SIZE_CHARTS[type] || SIZE_CHARTS.regular;

  const bodyWidth = estimateBodyWidth(height, weight);

  let best = chart[0];

  for (const size of chart) {
    if (size.width >= bodyWidth) {
      best = size;
      break;
    }
  }

  return {
    size: best.size,
    width: best.width,
    length: best.length,
    bodyWidth: bodyWidth.toFixed(1),
  };
}
