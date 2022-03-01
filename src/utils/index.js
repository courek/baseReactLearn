// 在一个函数里,改变传入的对象本身是不好的, 也就是写函数的时候,不要污染传入的对象.

// 自己写的
// const cleanObject = (object) => {
//   if (object) return "";
//   let orginObj = { ...object };
//   let obj = {};
//   Object.keys(orginObj).map((v) => {
//     if (object[v]) {
//       obj[v] = object[v];
//     }
//   });
//   return obj;
// };

// 跟着写的

//辅助函数
const isFalsy = (value) => (value === 0 ? false : !value);
export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).map((key) => {
    const value = result[key];
    // 这样写 当value 等于 0的时候就会也删掉了,那是不对的.  所以又做了辅助函数-- (那还是我的写法可靠点?)
    // if(!value)
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
