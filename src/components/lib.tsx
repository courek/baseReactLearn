import styled from "@emotion/styled";

/*
 用emotion 变量 做了一个很像react component组件的东西
*/
export const Row = styled.div<{
  gap?: number | boolean; // 这里是定义类型  所以还是需要的
  between?: boolean;
  marginBottom?: number | boolean; // 这个一般是加来给上下元素添加边距的.
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) =>
    typeof props.marginBottom === "number"
      ? props.marginBottom + "rem"
      : props.marginBottom
      ? "1rem"
      : undefined};
  /* 有默认值就多判断,没有就不处理就好了 */
  /* 因为如果这个div的子元素有margin-top这种的话,会影响剧中. 所以需要去设置所有自元素没有margin-top */
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    /* 可以直接使用 写死的左右边距,但是为了灵活性  要加上变量才行 */
    /* margin-left: 2rem; */
    /* 判断是不是数值,数值就加上单位返回.  如果不是数值 再判断是不是存在, 不存在返回默认值 */
    margin-left: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

// export const Row = styled.div<{
//   gap?: number | boolean;
//   between?: boolean;
//   marginBottom?: number;
// }>`
//   display: flex;
//   align-items: center;
//   justify-content: ${(props) => (props.between ? "space-between" : undefined)};
//   margin-bottom: ${(props) => props.marginBottom + "rem"};
//   > * {
//     margin-top: 0 !important;
//     margin-bottom: 0 !important;
//     margin-right: ${(props) =>
//       typeof props.gap === "number"
//         ? props.gap + "rem"
//         : props.gap
//         ? "2rem"
//         : undefined};
//   }
// `;
