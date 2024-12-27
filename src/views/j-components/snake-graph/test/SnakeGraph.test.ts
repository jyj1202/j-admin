import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import SnakeGraph from '../components/SnakeGraph.vue'

describe('SnakeGraph Component', () => {
  const sourceData = [1, 2, 3, 4, 5, 6]
  let mockResizeObserver: any

  beforeEach(() => {
    // Mock ResizeObserver
    mockResizeObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }))
    vi.stubGlobal('ResizeObserver', mockResizeObserver)
  })

  it('应该正确渲染组件', () => {
    const wrapper = mount(SnakeGraph, {
      props: {
        sourceData,
        cb: vi.fn(),
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该正确调用回调函数并更新数据', async () => {
    const mockCb = vi.fn((_width, reSize) => {
      reSize(2) // 设置每行2列
    })

    const wrapper = mount(SnakeGraph, {
      props: {
        sourceData,
        cb: mockCb,
      },
    })

    // 触发 ResizeObserver
    const [resizeCallback] = mockResizeObserver.mock.calls[0]
    resizeCallback([
      {
        contentBoxSize: [{ inlineSize: 800 }],
      },
    ])

    await nextTick()

    // 验证回调被调用
    expect(mockCb).toHaveBeenCalledWith(800, expect.any(Function))
    
    // 验证数据被正确分组
    const flowData = wrapper.vm.flowData
    expect(flowData).toEqual([[1, 2], [3, 4], [5, 6]])
  })

  it('应该正确处理 delay 属性', () => {
    const mockCb = vi.fn()
    mount(SnakeGraph, {
      props: {
        sourceData,
        cb: mockCb,
        delay: 1000,
      },
    })

    // 验证节流函数的延迟设置
    const [resizeCallback] = mockResizeObserver.mock.calls[0]
    resizeCallback([
      {
        contentBoxSize: [{ inlineSize: 800 }],
      },
    ])

    expect(mockCb).toHaveBeenCalledTimes(1)
  })
}) 
