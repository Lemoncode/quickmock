import {
  CanvasPod,
  ToolbarPod,
  ContainerGalleryPod,
  ComponentGalleryPod,
} from "@/pods";

export const MainScene = () => {
  return (
    <>
      <ToolbarPod />
      <ContainerGalleryPod />
      <ComponentGalleryPod />
      <CanvasPod />
    </>
  );
};
