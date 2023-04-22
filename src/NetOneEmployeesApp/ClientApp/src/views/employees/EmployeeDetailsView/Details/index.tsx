import React, { FC } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Grid, makeStyles } from "@material-ui/core";
import EmployeeInfo from "./EmployeeInfo";

interface DetailsProps {
  employee: any;
  className?: string;
}

const useStyles = makeStyles(() => ({
  root: {},
}));

const Details: FC<DetailsProps> = ({
  employee,
  className,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Grid className={clsx(classes.root, className)}
      container spacing={3} {...rest}>
      <Grid item xs={12}>
        <EmployeeInfo employee={employee} />
      </Grid>
    </Grid>
  );
};

Details.propTypes = {
  className: PropTypes.string,
  employee: PropTypes.any,
};

export default Details;
