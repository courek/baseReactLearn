import { useEffect } from "react";
import { useArray2 } from "utils";

export const TsReactTest = () => {
  const persoin: { name: string; age: number }[] = [
    { name: "john", age: 25 },
    { name: "ma", age: 25 },
  ];
  const { value, clear, removeIndex, add } = useArray2(persoin);
  useEffect(() => {
    ///
  });

  return (
    <div>
      <button onClick={() => add({ name: "john", age: 30 })}>add john</button>
      <button onClick={() => removeIndex(0)}>removeIndex</button>
      <button onClick={() => clear()} style={{ marginBottom: "50px" }}>
        clear
      </button>

      {value.map((item, index) => {
        return (
          <div style={{ marginBottom: "30px" }} key={index}>
            <span style={{ color: "red" }}>{index}</span>
            <span>{item.name}</span>
            <span>{item.age}</span>
          </div>
        );
      })}
    </div>
  );
};
