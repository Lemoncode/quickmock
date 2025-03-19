/* import { MemberListComponent } from './components/members.component';
import { memberList } from './members'; */
import { QuickmockLogoComponent } from '@/common/components/icons';
import classes from './about.pod.module.css';
import { DevelopmentTeamComponent } from './components/developmentTeam.component';

export const AboutPod = () => {
  return (
    <div className={classes.container}>
      <QuickmockLogoComponent styleClass={classes.projectLogo} />
      <h2 className={classes.projectName}>Quickmock</h2>
      <p className={classes.projectVersion}>Version 1.0</p>
      <DevelopmentTeamComponent />
    </div>
  );
};
