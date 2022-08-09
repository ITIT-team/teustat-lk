export const numberSplitter = rate => {
    let arr = rate.split('').reverse()
    let newRate = []
    let numberIdx = 0
    arr.forEach(sym => {
      if (sym !== '.' && sym !== ','){
        if (numberIdx % 3 === 0 && numberIdx !== 0) newRate.push(' ')
        numberIdx += 1
      }
      newRate.push(sym)
    })
    return newRate.reverse().join('')
  }