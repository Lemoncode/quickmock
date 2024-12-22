import { CanvasSizeSettings } from './components';
import classes from './settings.pod.module.css';

export const SettingsPod = () => {
  return (
    <div className={classes.container}>
      <p className={classes.title}>Settings</p>
      <CanvasSizeSettings />
    </div>
  );
};
