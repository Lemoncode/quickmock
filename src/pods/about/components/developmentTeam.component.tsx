import { memberList } from '../members';
import classes from './developmentTeam.component.module.css';
import { MemberListComponent } from './members.component';

export const DevelopmentTeamComponent = () => {
  return (
    <>
      <h2 className={classes.team}>Development Team</h2>
      <div className={classes.teamWrapper}>
        {memberList.map(member => (
          <MemberListComponent member={member} key={member.id} />
        ))}
      </div>
    </>
  );
};
