/**
 * JSON.stringfy 无法处理的情况：
 * undefined、function、symbol丢失;
 * set、map无法正确处理;
 * 循环引用
 */

export function getId() {
  return Date.now().toString()
}

export function deepClone<T>(source: T, hashTable=new WeakSet()):T {
  /* const o = Object.create(null)
  o instanceof Object // false */
  /* instanceof 不靠谱：
    if (!(source instanceof Object) || source === null) {
    return source;
  } */
  // typeof 返回值: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"

  // 只对数组或者不是error的object进行递归
  if (typeof source !== 'object' || source === null || source instanceof Error) {
    return source;
  }
  // dom节点无法完成深拷贝
  if (typeof window !== 'undefined' && (source instanceof Node || source instanceof HTMLCollection)) {
    return source;
  }
  // 是否在hashTable中，处理循环引用
  if (hashTable.has(source)) {
    return source
  }
  // 处理Set
  if (source instanceof Set) {
    const newSet = new Set()
    source.forEach(val => {
      newSet.add(deepClone(val))
    })
    return newSet as T
  }
  // 处理Map
  if (source instanceof Map) {
    const newMap = new Map()
    source.forEach((val, key) => {
      newMap.set(key, deepClone(val))
    })
    return newMap as T
  }
  // 处理数组和object
  const newVal:any = Array.isArray(source) ? [] : {};
  /** Reflect.ownKeys() 方法返回一个由对象自身的所有属性键组成的数组，包括不可枚举的属性和符号属性。 */
  Reflect.ownKeys(source).forEach(key => {
    const currentVal = source[key as keyof typeof source]
    if (typeof currentVal !== 'object' || source === null || source instanceof Error) {
      newVal[key] = currentVal
    } else if (currentVal instanceof Set) {
      const newSet = new Set()
      currentVal.forEach(val => {
        newSet.add(deepClone(val))
      })
      newVal[key] = newSet
    } else if (currentVal instanceof Map) {
      const newMap = new Map()
      currentVal.forEach((val, key) => {
        newMap.set(key, deepClone(val))
      })
    } else {
      hashTable.add(source)
      newVal[key] = deepClone(currentVal, hashTable)
    }
  })

  return newVal as T;
}


let typeMap = {
  '[object Boolean]': 'boolean',
  '[object Number]': 'number',
  '[object String]': 'string',
  '[object Symbol]': 'symbol',
  '[object Undefined]': 'undefined',
  '[object Null]': 'null',
  '[object Function]': 'function',
  '[object Array]': 'array',
  '[object Date]': 'date',
  '[object RegExp]': 'regExp',
  '[object Object]': 'object',
};
type dataType = 
  | 'boolean'
  | 'number'
  | 'string'
  | 'symbol'
  | 'undefined'
  | 'null'
  | 'function'
  | 'array'
  | 'date'
  | 'regExp'
  | 'object'
export function isBaseDataType(type: string) {
  return ['boolean', 'number', 'string', 'symbol', 'undefined', 'null'].includes(type)
}

/** 靠谱的获取对象类型方法   */
/* 要将基本的 Object.prototype.toString() 用于重写的对象（或者在 null 或 undefined 上调用它），
你需要在它上面调用 Function.prototype.call() 或者 Function.prototype.apply()，
将要检查的对象作为第一个参数传递（称为 thisArg）。 */
export function getObjType(obj: unknown): dataType|'element' {
  if (obj instanceof Element) {
    return 'element';
  }
  return typeMap[Object.prototype.toString.call(obj) as keyof typeof typeMap] as dataType;
};


export function useLock<P extends any[] = any[], V = any>(fn: (...args: P) => Promise<V>, count: number = 1) {
  let maxCount = count
  let initCount = 0

  const lockFn = async function (...args: P) {
    if (initCount < maxCount) {
      try {
        initCount++
        const res = await fn(...args)
        return res
      } finally {
        initCount--
      }
    }
  }
  return lockFn
}

