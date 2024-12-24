export function generateFlow(source: Array<any>, colNum: number) {
  const result: number[][] = []
  for (let i = 0; i < source.length; i += colNum) {
    result.push(source.slice(i, i + colNum))
  }
  return result
}

export function isLast(currentIndex: number, total: number) {
  return currentIndex == total - 1
}

export function isEven(num: number) {
  return num % 2 === 0
}
