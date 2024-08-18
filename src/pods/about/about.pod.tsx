/* import { MemberListComponent } from './components/members.component';
import { memberList } from './members'; */
import { QuickmockLogoComponent } from '@/common/components/icons';
import classes from './about.pod.module.css';
import { DevelopmentTeamComponent } from './components/developmentTeam.component';

export const AboutPod = () => {
  return (
    <div className={classes.container}>
      <QuickmockLogoComponent styleClass={classes.projectLogo} />
      <h2 className={classes.projectName}>QuickMock</h2>
      <p className={classes.projectVersion}>Version 0.0</p>
      <p className={classes.projectCommunity}>Community preview</p>
      <DevelopmentTeamComponent />
    </div>
  );
};
