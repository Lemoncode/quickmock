import classes from './canvas-size-settings.component.module.css';

export const CanvasSizeSettings = () => {
  return (
    <div className={classes.container}>
      <p className={classes.title}>Canvas Dimensions</p>
      <div className={classes.canvasSizeSettings}>
        <p> Width:</p>
        <input
          type="text"
          placeholder="Search icons..."
          className={classes.searchInput}
        />
      </div>
      <div className={classes.canvasSizeSettings}>
        <p>Height:</p>
        <input
          type="text"
          placeholder="Search icons..."
          className={classes.searchInput}
        />
      </div>
    </div>
  );
};
