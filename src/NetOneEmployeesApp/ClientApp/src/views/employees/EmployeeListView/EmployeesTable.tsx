import React from "react";
import type { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Box, colors, IconButton, SvgIcon, Table, TableBody,
  TableCell, TableHead, TableRow, Tooltip } from "@material-ui/core";
import { 
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon
} from "react-feather";
import type { Employee } from "src/types/employee";

interface EmployeesTableProps {
  paginatedEmployees: Employee[];
}

const EmployeesTable: FC<EmployeesTableProps> = ({paginatedEmployees}) => (
  <Box>
    <PerfectScrollbar>
      <Box minWidth={700}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Id
              </TableCell>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Surname
              </TableCell>
              <TableCell>
                Nrc number
              </TableCell>
              <TableCell>
                Gender
              </TableCell>
              <TableCell>
                Date of Birth
              </TableCell>
              <TableCell>
                Marital Status
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEmployees.map((employee) => (
              <TableRow hover key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.surname}</TableCell>
                <TableCell>{employee.nrcNumber}</TableCell>
                <TableCell>{employee.gender}</TableCell>
                <TableCell>{employee.dateOfBirth}</TableCell>
                <TableCell>{employee.maritalStatus}</TableCell>
                <TableCell align="right">
                    <IconButton component={RouterLink}
                      to={`/app/employees/${employee.id}/edit`}>
                      <Tooltip title="Edit employee">
                        <SvgIcon fontSize="small">
                          <EditIcon color={colors.blue[900]}/>
                        </SvgIcon>
                      </Tooltip>
                    </IconButton>
                    <IconButton component={RouterLink}
                        to={`/app/employees/${employee.id}`}>
                        <Tooltip title="View details">
                          <SvgIcon fontSize="small">
                            <ArrowRightIcon color={colors.common.black}/>
                          </SvgIcon>
                        </Tooltip>
                    </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
  </Box>
);

EmployeesTable.propTypes = {
  paginatedEmployees: PropTypes.array.isRequired,
};
export default EmployeesTable;
