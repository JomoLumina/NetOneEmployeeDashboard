import React from "react";
import type { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  SvgIcon,
  Typography,
  makeStyles,
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Edit as EditIcon } from "react-feather";

interface HeaderProps {
  className?: string;
  employee: any;
}

const useStyles = makeStyles(() => ({
  root: {},
}));

const Header: FC<HeaderProps> = ({ className, employee, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={3}
      justify="space-between"
      className={clsx(classes.root, className)}
      {...rest}>
      <Grid item>
        <Breadcrumbs aria-label="breadcrumb" 
          separator={<NavigateNextIcon fontSize="small" />}>
          <Link variant="body1" color="inherit" to="/app" component={RouterLink}>
            Home
          </Link>
          <Typography variant="body1" color="textPrimary">
            Employee
          </Typography>
        </Breadcrumbs>
        <Typography variant="h3" color="textPrimary">
          {`${employee.name}  ${employee.surname}`}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          component={RouterLink}
          to={`/app/employees/${employee.id}/edit`}
          startIcon={(
            <SvgIcon fontSize="small">
              <EditIcon />
            </SvgIcon>
          )}>
          Edit
        </Button>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  employee: PropTypes.any
};

export default Header;
