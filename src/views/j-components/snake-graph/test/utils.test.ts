import { describe, it, expect } from 'vitest'
import { generateFlow, isLast, isEven } from '../components/utils'

describe('Snake Graph Utils', () => {
  describe('generateFlow', () => {
    it('应该正确地将一维数组转换为二维数组', () => {
      const source = [1, 2, 3, 4, 5, 6]
      const colNum = 2
      const expected = [[1, 2], [3, 4], [5, 6]]
      expect(generateFlow(source, colNum)).toEqual(expected)
    })

    it('当源数组长度不能被列数整除时，最后一行应该是不完整的', () => {
      const source = [1, 2, 3, 4, 5]
      const colNum = 2
      const expected = [[1, 2], [3, 4], [5]]
      expect(generateFlow(source, colNum)).toEqual(expected)
    })

    it('当源数组为空时应该返回空数组', () => {
      expect(generateFlow([], 2)).toEqual([])
    })
  })

  describe('isLast', () => {
    it('应该正确判断是否为最后一个元素', () => {
      expect(isLast(2, 3)).toBe(true)
      expect(isLast(1, 3)).toBe(false)
      expect(isLast(0, 1)).toBe(true)
    })
  })

  describe('isEven', () => {
    it('应该正确判断是否为偶数', () => {
      expect(isEven(2)).toBe(true)
      expect(isEven(3)).toBe(false)
      expect(isEven(0)).toBe(true)
    })
  })
}) 
