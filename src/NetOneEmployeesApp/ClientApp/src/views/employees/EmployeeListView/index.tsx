import React from "react";
import type { FC } from "react";
import {Box, Container, makeStyles} from "@material-ui/core";
import type { Theme } from "src/theme";
import Page from "src/components/Page";
import Results from "./Results";
import Header from "./Header";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

const EmployeeListView: FC = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Employee List">
      <Container maxWidth={false}>
        <Header />
        <Box mt={3}>
          <Results />
        </Box>
      </Container>
    </Page>
  );
};

export default EmployeeListView;
