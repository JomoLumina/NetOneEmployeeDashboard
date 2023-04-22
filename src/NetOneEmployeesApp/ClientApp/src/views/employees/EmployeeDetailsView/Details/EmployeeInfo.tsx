import React from "react";
import type { FC } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Card, CardHeader, Divider, Table, TableBody,
  TableCell, TableRow, Typography, makeStyles, Grid
} from "@material-ui/core";
import type { Theme } from "src/theme";
import type { Employee } from "src/types/employee";

interface EmployeeInfoProps {
  employee: Employee;
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const EmployeeInfo: FC<EmployeeInfoProps> = ({
  employee,
  className,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <>
    <Grid container spacing={2}>
      <Grid item md={6} xs={12}>
        <Grid container>
          <Grid item style={{width: '100%'}}>
            <Card className={clsx(classes.root, className)}>
              <CardHeader title="Personal Information" />
              <Divider />
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Employee
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2"color="textSecondary">
                        {employee.name} {employee.surname}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      NRC number
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2"color="textSecondary">
                        {employee.nrcNumber}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Date of birth
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2"color="textSecondary">
                        {employee.dateOfBirth}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Gender
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2"color="textSecondary">
                        {employee.gender}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Marital status
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2"color="textSecondary">
                        {employee.maritalStatus}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </Grid>
          <Grid item  style={{width: '100%', marginTop: 16}}>
            <Card className={clsx(classes.root, className)}>
              <CardHeader title="Emergency Contact Information" />
              <Divider />
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Name
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2"color="textSecondary">
                        {employee.emergencyContactDetails.name}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Phone number
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2"color="textSecondary">
                        {employee.emergencyContactDetails.phoneNumber}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Physical address
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2"color="textSecondary">
                        {employee.emergencyContactDetails.physicalAddress}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={6} xs={12}>
        <Grid container>
          <Grid item style={{width: '100%'}}>
            <Card className={clsx(classes.root, className)}>
              <CardHeader title="Contact Information" />
              <Divider />
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Phone number
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2"color="textSecondary">
                        {employee.contactDetails.phoneNumber}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  {employee.contactDetails.phoneNumberAlt && 
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Phone number alternative
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2"color="textSecondary">
                        {employee.contactDetails.phoneNumberAlt}
                      </Typography>
                    </TableCell>
                  </TableRow>}
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Email address
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2"color="textSecondary">
                        {employee.contactDetails.emailAddress}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Physical address
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2"color="textSecondary">
                        {employee.contactDetails.physicalAddress}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </Grid>
          <Grid item  style={{width: '100%', marginTop: 16}}>
            <Card className={clsx(classes.root, className)}>
              <CardHeader title="Employment Information" />
              <Divider />
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Title
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2"color="textSecondary">
                        {employee.employmentDetails.title}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Employee number
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2"color="textSecondary">
                        {employee.employmentDetails.empId}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Department
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2"color="textSecondary">
                        {employee.employmentDetails.department}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Supervisor
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2"color="textSecondary">
                        {employee.employmentDetails.supervisor}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </>
  );
};

EmployeeInfo.propTypes = {
  className: PropTypes.string,
  employee: PropTypes.any
};

export default EmployeeInfo;
