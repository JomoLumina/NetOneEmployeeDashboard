import React, { useCallback, useEffect, useState } from "react";
import type { FC, ChangeEvent } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { 
  Box, Card, Divider, InputAdornment, SvgIcon,
  TablePagination, TextField, makeStyles, colors
} from "@material-ui/core";
import {
  Search as SearchIcon,
} from "react-feather";
import type { Theme } from "src/theme";
import type { Employee } from "src/types/employee";
import EmployeesTable from "./EmployeesTable";
import axios from "axios";
import useIsMountedRef from "src/hooks/useIsMountedRef";

interface ResultsProps {
  className?: string;
}

type Sort =
  | "id|asc"
  | "name|asc"
  | "surname|asc"
  | "gender|asc"

interface SortOption {
  value: Sort,
  label: string
}

const sortOptions: SortOption[] = [
  {
    value: "id|asc",
    label: "ID",
  },
  {
    value: "name|asc",
    label: "Name",
  },
  {
    value: "surname|asc",
    label: "Surname",
  },
  {
    value: "gender|asc",
    label: "Gender",
  }
];

const applyQuery = (employees: Employee[], query: string): Employee[] => employees?.filter((employee) => {
  let matches = true;

  if (query) {
    const properties = ["name","surname","nrcNumber","dateOfBirth", "gender", "maritalStatus"];
    let containsQuery = false;

    properties.forEach((property) => {
      if (employee[property]?.toLowerCase().includes(query.toLowerCase())) {
        containsQuery = true;
      }
    });

    if (!containsQuery) {
      matches = false;
    }
  }

  return matches;
});

const applyPagination = (employees: Employee[], page: number,
  limit: number): Employee[] => employees.slice(page * limit, page * limit + limit);

const descendingComparator = (a: Employee, b: Employee, orderBy: string): number => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
};

const getComparator = (order: "asc" | "desc", orderBy: string) => (order === "desc"
  ? (a: Employee, b: Employee) => descendingComparator(a, b, orderBy)
  : (a: Employee, b: Employee) => -descendingComparator(a, b, orderBy));

const applySort = (employees: Employee[], sort: Sort): Employee[] => {
  const [orderBy, order] = sort.split("|") as [string, "asc" | "desc"];
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = employees.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    // @ts-ignore
    const tmpOrder = comparator(a[0], b[0]);

    if (tmpOrder !== 0) return tmpOrder;

    // @ts-ignore
    return a[1] - b[1];
  });

  // @ts-ignore
  return stabilizedThis.map((el) => el[0]);
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  queryField: {
    width: 500,
  },
  bulkOperations: {
    position: "relative",
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: "absolute",
    width: "100%",
    zIndex: 2,
    backgroundColor: theme.palette.background.default,
  },
  bulkAction: {
    marginLeft: theme.spacing(2),
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
  joinButton:{
    backgroundColor: colors.green[700],
    color: colors.common.white,
    padding: "3px 21px",
    borderRadius: 5,
    textTransform: "inherit"
  },
  leaveButton: {
    backgroundColor: colors.red[700],
    color: colors.common.white,
    padding: "3px 16px",
    borderRadius: 5,
    textTransform: "inherit"
  }
}));

const Results: FC<ResultsProps> = ({className, ...rest}) => {
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [query, setQuery] = useState<string>("");
  const [sort, setSort] = useState<Sort>(sortOptions[0].value);
  const isMountedRef = useIsMountedRef();
  const [employees, setEmployees] = useState<Employee[]>([]);

  const getEmployees = useCallback(async () => {
    try {
      const endpoint = "/employees";
      const response = await axios.get(endpoint);

      if (isMountedRef.current) {
        setEmployees(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSortChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setSort(event.target.value as Sort);
  };

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value, 16));
  };

  const filteredEmployees = applyQuery(employees, query);
  const sortedEmployees = applySort(filteredEmployees, sort);
  const paginatedEmployees = applyPagination(sortedEmployees, page, limit);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}>
      <Divider />
      <Box
        p={2}
        minHeight={56}
        display="flex"
        alignItems="center">
        <TextField
          className={classes.queryField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon fontSize="small" color="action">
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            ),
          }}
          onChange={handleQueryChange}
          placeholder="Search employees"
          value={query}
          variant="outlined"/>
        <Box flexGrow={1} />
        <TextField
          label="Sort By"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={sort}
          variant="outlined">
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </Box>
      <EmployeesTable paginatedEmployees={paginatedEmployees} />
      <TablePagination
        component="div"
        count={filteredEmployees.length}
        onChangePage={(event, newPage) => handlePageChange(newPage)}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string
};

export default Results;
