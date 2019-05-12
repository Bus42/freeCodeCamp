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

;(test = () => {
  const randomColor = colors.random
  console.log('%cindex.js loaded', `color: ${colors.random}`)
  console.log(randomColor)
})()

const output = d3.select(document.getElementById('output'))
const title = d3.select(document.getElementById('title'))
const range = d3.select(document.getElementById('range'))
const updated = d3.select(document.getElementById('updated'))

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
  const fromDate = new Date(res.from_date).toLocaleDateString()
  const toDate = new Date(res.to_date).toLocaleDateString()
  const lastUpdated = new Date(res.updated_at)
  title.text(res.source_name)
  range.text(`From ${fromDate} to ${toDate}`)
  updated.text(
    `Last updated ${lastUpdated.toLocaleDateString()} at ${lastUpdated.toLocaleTimeString()}`
  )
  output.selectAll('p')
  .data(res.data)
  .enter()
  .append('p')
  .text(d => d)
})
