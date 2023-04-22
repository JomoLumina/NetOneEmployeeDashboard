import React from "react";
import type { FC } from "react";
import {
  Box,
  Container,
  makeStyles,
} from "@material-ui/core";
import type { Theme } from "src/theme";
import Page from "src/components/Page";
import EmployeeEditForm from "./EmployeeEditForm";
import Header from "./Header";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

const EmployeeEditView: FC = () => {
  const classes = useStyles();
  return (
    <Page
      className={classes.root}
      title="Update Employee">
      <Container maxWidth={false}>
        <Header />
      </Container>
      <Box mt={3}>
        <Container maxWidth="lg">
          <EmployeeEditForm />
        </Container>
      </Box>
    </Page>
  );
};

export default EmployeeEditView;
