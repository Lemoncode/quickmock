/* import { MemberListComponent } from './components/members.component';
import { memberList } from './members'; */
import classes from './about.pod.module.css';

export const AboutPod = () => {
  return (
    <div className={classes.container}>
      <img
        className={classes.projectLogo}
        src={''} //TODO: Impove Logo Project
        alt="Quickmock Logo"
      />
      <h2 className={classes.projectName}>QuickMock</h2>
      <p className={classes.projectVersion}>Version 0.0</p>
      <p className={classes.projectCommunity}>Community preview</p>

      <h2 className={classes.team}>Development Team</h2>
      <div className={classes.teamWrapper}>
        {/*   {memberList.map(member => (
          <MemberListComponent
            member={member}
            key={member.id}
          ></MemberListComponent>
          ))} */
        /* //TODO: quitar comentarios cuando el css esté listo */}
      </div>
    </div>
  );
};
