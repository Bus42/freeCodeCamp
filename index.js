const colors = {
  light: '#00FAFA',
  dark: '#007AFF',
  muted: '#007AAF',
  random: getRandomColor()
}

function getRandomColor () {
  const range = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F'
  ]
  let picks = ['#']
  for (i = 0; i < 6; i++) {
    const pick = range[Math.floor(Math.random() * range.length)]
    picks.push(pick)
  }
  return picks.join('')
}

const output = d3.select('svg')
const title = d3.select(document.getElementById('title'))
const range = d3.select(document.getElementById('range'))
const updated = d3.select(document.getElementById('updated'))
const description = d3.select(document.getElementById('description'))

getData = () => {
  return new Promise((resolve, reject) => {
    const url =
      'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
    fetch(url)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err))
  })
}

getData().then(res => {
  // find the highest value in the dataset
  const maxVal = d3.max(res.data, d => d[1])
  // specify height of svg
  const svgHeight = 500
  // calculate width of svg
  const svgWidth = window.innerWidth * 0.9

  const modifier = maxVal / svgHeight
  const barHeight = maxVal / modifier
  const fromDate = new Date(res.from_date).toLocaleDateString()
  const toDate = new Date(res.to_date).toLocaleDateString()
  const lastUpdated = new Date(res.updated_at)
  const barMargin = 0.5
  const barWidth = svgWidth / res.data.length - barMargin

  console.log(`%c${res.data.length} data points`, `color: ${colors.light}`)
  console.groupCollapsed('%cData Table', `color: ${colors.dark}`)
  console.table(res.data)
  console.groupEnd()

  title.text(res.source_name)
  range.text(`From ${fromDate} to ${toDate}`)
  updated.text(
    `Last updated ${lastUpdated.toLocaleDateString()} at ${lastUpdated.toLocaleTimeString()}`
  )
  // svg for chart
  output
    .attr('width', `${svgWidth}vw`)
    .style('overflow', 'show')
    .attr('height', barHeight)
    .selectAll('rect')
    .data(res.data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('data-date', d => d[0])
    .attr('data-gdp', d => d[1])
    .attr('x', (d, i) => i * (barWidth + barMargin))
    .attr('y', d => barHeight - d[1] / modifier)
    .attr('width', barWidth)
    .attr('height', d => d[1] / modifier)
    .attr('fill', 'steelblue')
    .append('title')
    .attr('id', 'tooltip')
    .attr('data-date', d => d[0])
    .text(d => {
      const targetDate = new Date(d[0]).toDateString()
      return `${targetDate}\n$${d[1]}`
    })
    .attr('x', d => (d, i) => i * (barWidth + barMargin))
    .attr('y', d => barHeight - d[1] / modifier)
  // Add description below svg
  description
    .text(res.description)
    .style('position', 'relative')
    .style('top', `${svgHeight}px`)
  // Axes
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(res.data, d => d[1])])
    .range([0, svgWidth])

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(res.data, d => d[1])])
    .range([svgHeight, 0])

  const x_axis = d3.axisBottom().scale(xScale)
  const y_axis = d3.axisLeft().scale(yScale)
  output
    .append('g')
    .attr('id', 'x-axis')
    .call(x_axis)
    .append('g')
    .attr('id', 'y-axis')
    .call(y_axis)
})
