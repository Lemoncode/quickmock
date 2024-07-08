import { MainLayout } from "@/layout/main.layout";
import classes from "./main.module.css";

import {
  CanvasPod,
  ToolbarPod,
  ContainerGalleryPod,
  ComponentGalleryPod,
} from "@/pods";

export const MainScene = () => {
  return (
    <MainLayout >
      <ToolbarPod />
      <div className={classes.containerGallery}><ContainerGalleryPod /><ComponentGalleryPod /></div>
      <div className={classes.componentGallery}></div>
      <CanvasPod />
    </MainLayout>
  );
};
