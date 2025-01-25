export function generateVortex(source: any[], rows: number, cols: number) {
  // if (rows < 0 || cols < 0) {
  //   throw new Error('rows and cols must be greater than 0')
  // }
  const res = Array.from({length: rows}, () => Array(cols))

  if (rows == 0 || cols == 0) {
    return res
  }

  let curRow = 0
  let curCol = 0
  let rowStep = 0
  let colStep = 1
  let index = 0
  
  function _needChangeDirection() {
    return (
      curRow + rowStep > rows - 1 ||
      curRow + rowStep < 0 ||
      curCol + colStep < 0 ||
      curCol + colStep > cols - 1 ||
      res[curRow + rowStep][curCol + colStep] != undefined
    );
  }

  // eslint-disable-next-line no-constant-condition
  while (1) {
    if (index >= source.length) {
      break
    }

    res[curRow][curCol] = {
      index,
      value: source[index++],
    }

    if (_needChangeDirection()) {
      if (rowStep == 0) {
        rowStep = colStep
        colStep = 0
      } else {
        colStep = -rowStep
        rowStep = 0
      }
      if (_needChangeDirection()) {
        break
      }
    }
    
    if (index >= source.length) {
      break
    }

    res[curRow][curCol].direction = colStep > 0 ? 'right' : colStep < 0 ? 'left' : rowStep > 0 ?  'down' : 'up'

    curRow += rowStep
    curCol += colStep
  }

  return res
}

export function getVortexSize(total: number, cols: number) {
  const rows = Math.ceil(total / cols)
  return [
    rows,
    cols
  ]
}

export function isLast(currentIndex: number, total: number) {
  return currentIndex == total - 1
}

export function isEven(num: number) {
  return num % 2 === 0
}

