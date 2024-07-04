import classes from "./main.layout.module.css";

interface Props {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: Props) => {
    return (
      <div className={classes.layout}>
        {children}
      </div>
    );
  };

