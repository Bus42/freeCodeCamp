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


