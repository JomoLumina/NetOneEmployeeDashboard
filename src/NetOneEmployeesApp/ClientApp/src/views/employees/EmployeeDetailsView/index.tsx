import React, {
  useCallback,
  useState,
  useEffect
} from "react";
import type { FC } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Divider,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import type { Theme } from "src/theme";
import Page from "src/components/Page";
import type { Employee } from "src/types/employee";
import Header from "./Header";
import Details from "./Details";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

const EmployeeDetailsView: FC = () => {
  const classes = useStyles();
  const { employeeId }: { employeeId: string } = useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);

  const getEmployee = useCallback(async () => {
    try {
      const response = await axios.get(`/employees/${employeeId}`);
      setEmployee(response.data);
    } catch (err) {
      console.error(err);
    }
  }, [employeeId]);

  useEffect(() => {
    getEmployee();
  }, [getEmployee]);

  return (
    <Page
      className={classes.root}
      title="Employee Details">
      <Container maxWidth={false}>
        {employee && <Header employee={employee} />}
        <Divider />
        <Box mt={3}>
          {employee && <Details employee={employee} />}
        </Box>
      </Container>
    </Page>
  );
};

export default EmployeeDetailsView;
