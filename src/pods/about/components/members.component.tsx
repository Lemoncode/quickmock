import React from 'react';
import classes from './members.component.module.css';
import { Member } from '../members';
import { LinkedinIcon } from '@/common/components/icons/linkedin-icon.component';

interface Props {
  member: Member;
}
export const MemberListComponent: React.FC<Props> = props => {
  const { member } = props;
  return (
    <div className={classes.member}>
      <a
        className={classes.memberLink}
        href={member.urlLinkedin}
        target="_blank"
      >
        <img src={member.image} alt={member.name} />
        <div className={classes.memberIcon}>
          <LinkedinIcon />
        </div>
      </a>
      <p className={classes.memberName}>
        {member.name} <br />
        {member.surname}
      </p>
    </div>
  );
};
