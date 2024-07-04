import { ComboBoxShape } from "@/common/components/front-components";
import { Layer, Stage } from "react-konva";

export const CanvasPod = () => {
  return (
    <>
      {/*TODO: harcoded border, once final layout is ready, remove this*/}
      <div style={{ border: "1px solid black" }}>
        {/*TODO: right now harcoded values, remove this once we have final layout*/}
        <Stage width={1024} height={800}>
          <Layer>
            <ComboBoxShape x={10} y={10} width={200} height={50} />
          </Layer>
        </Stage>
      </div>
    </>
  );
};
