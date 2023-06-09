import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Breadcrumbs,
  Link,
  Typography,
  makeStyles,
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

interface HeaderProps {
  className?: string;
}

const useStyles = makeStyles(() => ({
  root: {},
}));

const Header: FC<HeaderProps> = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb">
        <Link
          variant="body1"
          color="inherit"
          to="/app"
          component={RouterLink}>
          Home
        </Link>
        <Typography
          variant="body1"
          color="textPrimary">
          Employees
        </Typography>
      </Breadcrumbs>
      <Typography
        variant="h3"
        color="textPrimary">
        Update Employee
      </Typography>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
