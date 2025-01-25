import { describe, expect, it } from 'vitest'
import { generateVortex, getVortexSize } from '../utils'

describe('generateVortex', () => {
  it('should generate a valid vortex', () => {
    const result = generateVortex([1,2,3,4,5], 3, 3)
    expect(result).toEqual([
      [{ value: 1, direction: 'right', index: 0}, {value: 2, direction: 'right', index: 1}, {value: 3, direction: 'down', index: 2}],
      // eslint-disable-next-line no-sparse-arrays
      [, , {value: 4, direction: 'down', index: 3}],
      // eslint-disable-next-line no-sparse-arrays
      [, , {value: 5, index: 4}]
    ])
  })
})

describe('getVortexSize', () => {
  it('should return the correct size', () => {
    const result = getVortexSize(9, 3)
    expect(result).toEqual([3, 3])
  })

  it('should return the correct size', () => {
    const result = getVortexSize(10, 3)
    expect(result).toEqual([4, 3])
  })
})
