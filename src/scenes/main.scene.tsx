import classes from "./main.module.css";
import {
  CanvasPod,
  ToolbarPod,
  ContainerGalleryPod,
  ComponentGalleryPod,
} from "@/pods";

export const MainScene = () => {
  return (
    <div className={classes.layout} >
      <div className={classes.toolbar}><ToolbarPod /></div>
      <div className={classes.containerGallery}><ContainerGalleryPod /></div>
      <div className={classes.componentGallery}><ComponentGalleryPod /></div>
      <div className={classes.canvas}><CanvasPod /></div>
    </div>
  );
};
