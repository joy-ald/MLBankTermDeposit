// Data: each element is an object with hours studied and score
const data = [
  { hours: 1, score: 50 },
  { hours: 2, score: 55 },
  { hours: 3, score: 60 },
  { hours: 4, score: 65 },
  { hours: 5, score: 70 },
  { hours: 6, score: 75 },
  { hours: 7, score: 80 },
  { hours: 8, score: 85 },
  { hours: 9, score: 90 },
  { hours: 10, score: 95 },
]

// Set up dimensions and margins
const margin = { top: 20, right: 20, bottom: 40, left: 40 }
const width = 600 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

// Create an SVG element and append it to the div container
const svg = d3
  .select("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`)

// Set up the scales for x (hours studied) and y (score)
const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(data, (d) => d.hours)]) // Domain: minimum to maximum value of hours studied
  .range([0, width])

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(data, (d) => d.score)]) // Domain: minimum to maximum value of score
  .range([height, 0])

// Add the x-axis to the bottom of the graph
svg
  .append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScale))
  .append("text")
  .attr("x", width / 2)
  .attr("y", 35)
  .attr("fill", "black")
  .style("text-anchor", "middle")
  .text("Hours Studied")

// Add the y-axis to the left of the graph
svg
  .append("g")
  .call(d3.axisLeft(yScale))
  .append("text")
  .attr("x", -35)
  .attr("y", height / 2)
  .attr("fill", "black")
  .style("text-anchor", "middle")
  .text("Score")

// Add the scatter plot points (circle elements) to the chart
svg
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", (d) => xScale(d.hours))
  .attr("cy", (d) => yScale(d.score))
  .attr("r", 5)
  .attr("fill", "blue")

// Optional: Add labels for each point
svg
  .selectAll("text")
  .data(data)
  .enter()
  .append("text")
  .attr("x", (d) => xScale(d.hours))
  .attr("y", (d) => yScale(d.score) - 10)
  .attr("fill", "black")
  .style("text-anchor", "middle")
  .text((d) => `${d.hours}h`)
