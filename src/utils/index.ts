export function getId() {
  return Date.now().toString()
}

// export const getObjType = (obj: unknown) => {
//   let toString = Object.prototype.toString;
//   let map = {
//     '[object Boolean]': 'boolean',
//     '[object Number]': 'number',
//     '[object String]': 'string',
//     '[object Function]': 'function',
//     '[object Array]': 'array',
//     '[object Date]': 'date',
//     '[object RegExp]': 'regExp',
//     '[object Undefined]': 'undefined',
//     '[object Null]': 'null',
//     '[object Object]': 'object'
//   };
//   if (obj instanceof Element) {
//     return 'element';
//   }
//   return map[toString.call(obj) as keyof typeof map];
// };

// export const deepClone = (data: unknown) => {
//   let type = getObjType(data);
//   let obj;
//   if (type === 'array') obj = [];
//   else if (type === 'object') obj = {};
//   else return data;
//   if (type === 'array') {
//     for (let i = 0, len = (data as []).length; i < len; i++) {
//       (data as [])[i] = (() => {
//         if ((data as [])[i] === 0) {
//           return (data as [])[i];
//         }
//         return (data as [])[i];
//       })();
//       (obj as []).push(deepClone((data as [])[i]));
//     }
//   } else if (type === 'object') {
//     for (let key in (data as object)) {
//       obj[key] = deepClone((data[ke as object)y]);
//     }
//   }
//   return obj;
// };
