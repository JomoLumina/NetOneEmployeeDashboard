/* eslint no-param-reassign: "error" */
import React, {
  useState,
  useEffect,
  useCallback,
} from "react";
import type { FC } from "react";
import { useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import {
  Box, Button, Card, CardContent, Grid, TextField, makeStyles, Divider,
  FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography
} from "@material-ui/core";
import axios from "axios";
import useIsMountedRef from "src/hooks/useIsMountedRef";
import type { Employee } from "src/types/employee";
import { GENDERS, MARITAL_STATUSES, PHONE_NUMBER_REGEX, NRC_NUMBER_REGEX } from "src/constants";

interface EmployeeEditFormProps {
  className?: string;
}

const useStyles = makeStyles(() => ({
  root: {},
  formControl: {
    width: "100%"
  },
  inputLabel: {
    top: "-4.5px",
    left: "15px",
  },
  error:{
    color: "#f44336",
    fontSize: "0.75rem",
    background: "transparent",
    justifyContent: "left",
    textTransform: "none",
    fontWeight: "normal",
    marginTop: 3,
    marginLeft: 5
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const EmployeeEditForm: FC<EmployeeEditFormProps> = ({
  className,
  ...rest
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const { employeeId }: { employeeId: string } = useParams();
  const isMountedRef = useIsMountedRef();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [gender, setGender] = useState<string>('');
  const [maritalStatus, setMaritalStatus] = useState<string>('');

  const getEmployee = useCallback(async () => {
    try {
      const response = await axios.get(`/employees/${employeeId}`);
      if (isMountedRef.current) {
        if (response.status === 200) {
          console.log(response.data);
          setEmployee(response.data);
          setGender(response.data.gender);
          setMaritalStatus(response.data.maritalStatus);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef, employeeId]);

  useEffect(() => {
    getEmployee();
  }, [getEmployee]);

  const handleGenderChange = (event: { target: { value: any; }; }) => {
    const {
      target: { value },
    } = event;
    setGender(value);
  };

  const handleMaritalStatusChange = (event: { target: { value: any; }; }) => {
    const {
      target: { value },
    } = event;
    setMaritalStatus(value);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        id: employee?.id ?? "",
        name: employee?.name ?? "",
        surname: employee?.surname ?? "",
        nrcNumber:employee?.nrcNumber ??  "",
        dateOfBirth: employee?.dateOfBirth ?? "",
        contactDetailsPhoneNumber: employee?.contactDetails?.phoneNumber ?? "",
        contactDetailsPhoneNumberAlt: employee?.contactDetails?.phoneNumberAlt ?? "",
        contactDetailsEmailAddress: employee?.contactDetails?.emailAddress ?? "",
        contactDetailsPhysicalAddress: employee?.contactDetails?.physicalAddress ?? "",
        employmentDetailsEmpId: employee?.employmentDetails?.empId ?? "",
        employmentDetailsTitle: employee?.employmentDetails?.title ?? "",
        employmentDetailsDepartment: employee?.employmentDetails?.department ?? "",
        employmentDetailsSupervisor: employee?.employmentDetails?.supervisor ?? "",
        emergencyContactDetailsName: employee?.emergencyContactDetails?.name ?? "",
        emergencyContactDetailsPhoneNumber: employee?.emergencyContactDetails?.phoneNumber ?? "",
        emergencyContactDetailsPhysicalAddress: employee?.emergencyContactDetails?.physicalAddress ?? "",
        submit: null
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Name is required."),
        surname: Yup.string().required("Surname is required."),
        nrcNumber: Yup.string().matches(NRC_NUMBER_REGEX, 'NRC number is not valid').required("NRC number is required."),
        dateOfBirth: Yup.string().required("Date of birth is required."),
        contactDetailsPhoneNumber: Yup.string().matches(PHONE_NUMBER_REGEX, 'Phone number is not valid').required("Phone number is required."),
        contactDetailsPhoneNumberAlt: Yup.string().matches(PHONE_NUMBER_REGEX, 'Phone number is not valid').nullable(),
        contactDetailsEmailAddress: Yup.string().required("Email address is required.").email("Email address must be a valid email."),
        contactDetailsPhysicalAddress: Yup.string().required("Physical address is required."),
        employmentDetailsTitle: Yup.string().required("Title is required."),
        employmentDetailsEmpId: Yup.string().required("Employee ID is required."),
        employmentDetailsDepartment: Yup.string().required("Department is required."),
        employmentDetailsSupervisor: Yup.string().required("Supervisor is required."),
        emergencyContactDetailsName: Yup.string().required("Name is required."),
        emergencyContactDetailsPhoneNumber: Yup.string().matches(PHONE_NUMBER_REGEX, 'Phone number is not valid').required("Phone number is required."),
        emergencyContactDetailsPhysicalAddress: Yup.string().required("Physical address is required."),
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting,
      }) => {
        try {
          const endpoint = "/employees/update";

          const data = JSON.stringify({
            id: employeeId,
            name: values.name,
            surname: values.surname,
            nrcNumber: values.nrcNumber,
            gender: gender,
            dateOfBirth: values.dateOfBirth,
            maritalStatus: maritalStatus,
            active: 1,
            contactDetails: {
              id: employee.contactDetails.id,
              employeeId: employeeId,
              phoneNumber: values.contactDetailsPhoneNumber,
              phoneNumberAlt: values.contactDetailsPhoneNumberAlt,
              emailAddress: values.contactDetailsEmailAddress,
              physicalAddress: values.contactDetailsPhysicalAddress,
            },
            employmentDetails: {
              id: employee.employmentDetails.id,
              employeeId: employeeId,
              title: values.employmentDetailsTitle,
              empId: values.employmentDetailsEmpId,
              department: values.employmentDetailsDepartment,
              supervisor: values.employmentDetailsSupervisor,
            },
            emergencyContactDetails:{
              id: employee.emergencyContactDetails.id,
              employeeId: employeeId,
              name: values.emergencyContactDetailsName,
              phoneNumber: values.emergencyContactDetailsPhoneNumber,
              physicalAddress: values.emergencyContactDetailsPhysicalAddress,
            }
          });
          
          const response = await axios.post(endpoint, data);

          if (isMountedRef.current) {
            if (response.status === 200) {
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              enqueueSnackbar("Employee was updated successfully", { variant: "success" });
            } else {
              enqueueSnackbar("Employee updated failed", { variant: "error" });
            }
            history.push("/app/employees");
          }
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: "Employee update failed" });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form
          noValidate
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}>
          <Card>
            <CardContent>
            <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <Typography variant="h4" color="textPrimary"> Personal Details</Typography>
                  <Divider />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Name"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.name}
                    variant="outlined"/>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.surname && errors.surname)}
                    fullWidth
                    helperText={touched.surname && errors.surname}
                    label="Surname"
                    name="surname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.surname}
                    variant="outlined"/>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.nrcNumber && errors.nrcNumber)}
                    fullWidth
                    helperText={touched.nrcNumber && errors.nrcNumber}
                    label="NRC number"
                    name="nrcNumber"
                    required
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nrcNumber}
                    variant="outlined"/>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                    fullWidth
                    helperText={touched.dateOfBirth && errors.dateOfBirth}
                    label="Date of birth"
                    name="dateOfBirth"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.dateOfBirth}
                    variant="outlined"/>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="gender-label" className={classes.inputLabel}>Gender</InputLabel>
                    <Select
                      labelId="gender-label"
                      id="gender-select"
                      name="gender"
                      fullWidth
                      value={gender}
                      onChange={handleGenderChange}
                      input={<OutlinedInput id={"gender-input"} label="Gender" />}
                      MenuProps={MenuProps}>
                      {GENDERS.map((_gender) => (
                        <MenuItem key={_gender.id} value={_gender.value}>
                          {_gender.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="marital-status-label" className={classes.inputLabel}>Marital status</InputLabel>
                    <Select
                      labelId="marital-status-label"
                      id="marital-status-select"
                      fullWidth
                      name="maritalStatus"
                      onBlur={handleBlur}
                      value={maritalStatus}
                      onChange={handleMaritalStatusChange}
                      input={<OutlinedInput id={"marital-status-input"} label="Marital status" />}
                      MenuProps={MenuProps}>
                      {MARITAL_STATUSES.map((_maritalStatus) => (
                        <MenuItem key={_maritalStatus.id} value={_maritalStatus.value}>
                          {_maritalStatus.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={12} xs={12} style={{marginTop: 18}}>
                  <Typography variant="h4" color="textPrimary"> Contact Details</Typography>
                  <Divider />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.contactDetailsPhoneNumber && errors.contactDetailsPhoneNumber)}
                    fullWidth
                    helperText={touched.contactDetailsPhoneNumber && errors.contactDetailsPhoneNumber}
                    label="Phone number"
                    name="contactDetailsPhoneNumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.contactDetailsPhoneNumber}
                    variant="outlined"/>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.contactDetailsPhoneNumberAlt && errors.contactDetailsPhoneNumberAlt)}
                    fullWidth
                    helperText={touched.contactDetailsPhoneNumberAlt && errors.contactDetailsPhoneNumberAlt}
                    label="Phone number alternative"
                    name="contactDetailsPhoneNumberAlt"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.contactDetailsPhoneNumberAlt}
                    variant="outlined"/>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.contactDetailsEmailAddress && errors.contactDetailsEmailAddress)}
                    fullWidth
                    helperText={touched.contactDetailsEmailAddress && errors.contactDetailsEmailAddress}
                    label="Email address"
                    name="contactDetailsEmailAddress"
                    required
                    type="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.contactDetailsEmailAddress}
                    variant="outlined"/>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.contactDetailsPhysicalAddress && errors.contactDetailsPhysicalAddress)}
                    fullWidth
                    helperText={touched.contactDetailsPhysicalAddress && errors.contactDetailsPhysicalAddress}
                    label="Physical address"
                    name="contactDetailsPhysicalAddress"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.contactDetailsPhysicalAddress}
                    variant="outlined"/>
                </Grid>
                <Grid item md={12} xs={12} style={{marginTop: 18}}>
                  <Typography variant="h4" color="textPrimary"> Employment Details</Typography>
                  <Divider />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.employmentDetailsTitle && errors.employmentDetailsTitle)}
                    fullWidth
                    helperText={touched.employmentDetailsTitle && errors.employmentDetailsTitle}
                    label="Title"
                    name="employmentDetailsTitle"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.employmentDetailsTitle}
                    variant="outlined"/>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.employmentDetailsEmpId && errors.employmentDetailsEmpId)}
                    fullWidth
                    helperText={touched.employmentDetailsEmpId && errors.employmentDetailsEmpId}
                    label="Employee ID"
                    name="employmentDetailsEmpId"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.employmentDetailsEmpId}
                    variant="outlined"/>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.employmentDetailsDepartment && errors.employmentDetailsDepartment)}
                    fullWidth
                    helperText={touched.employmentDetailsDepartment && errors.employmentDetailsDepartment}
                    label="Department"
                    name="employmentDetailsDepartment"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.employmentDetailsDepartment}
                    variant="outlined"/>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.employmentDetailsSupervisor && errors.employmentDetailsSupervisor)}
                    fullWidth
                    helperText={touched.employmentDetailsSupervisor && errors.employmentDetailsSupervisor}
                    label="Supervisor"
                    name="employmentDetailsSupervisor"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.employmentDetailsSupervisor}
                    variant="outlined"/>
                </Grid>
                <Grid item md={12} xs={12} style={{marginTop: 18}}>
                  <Typography variant="h4" color="textPrimary">Emergency Contact Details</Typography>
                  <Divider />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.emergencyContactDetailsName && errors.emergencyContactDetailsName)}
                    fullWidth
                    helperText={touched.emergencyContactDetailsName && errors.emergencyContactDetailsName}
                    label="Name"
                    name="emergencyContactDetailsName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.emergencyContactDetailsName}
                    variant="outlined"/>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.emergencyContactDetailsPhoneNumber && errors.emergencyContactDetailsPhoneNumber)}
                    fullWidth
                    helperText={touched.emergencyContactDetailsPhoneNumber && errors.emergencyContactDetailsPhoneNumber}
                    label="Phone number"
                    name="emergencyContactDetailsPhoneNumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.emergencyContactDetailsPhoneNumber}
                    variant="outlined"/>
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    error={Boolean(touched.emergencyContactDetailsPhysicalAddress && errors.emergencyContactDetailsPhysicalAddress)}
                    fullWidth
                    helperText={touched.emergencyContactDetailsPhysicalAddress && errors.emergencyContactDetailsPhysicalAddress}
                    label="Physical address"
                    name="emergencyContactDetailsPhysicalAddress"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.emergencyContactDetailsPhysicalAddress}
                    variant="outlined"/>
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={isSubmitting}
                  fullWidth>
                  Update employee
                </Button>
              </Box>
            </CardContent>
          </Card>
        </form>
      )}
    </Formik>
  );
};

EmployeeEditForm.propTypes = {
  className: PropTypes.string,
};

export default EmployeeEditForm;
