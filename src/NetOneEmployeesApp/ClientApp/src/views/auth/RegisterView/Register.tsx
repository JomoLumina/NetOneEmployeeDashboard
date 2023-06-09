import React from "react";
import type { FC } from "react";
import clsx from "clsx";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Formik } from "formik";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  makeStyles
} from "@material-ui/core";
import useAuth from "src/hooks/useAuth";
import useIsMountedRef from "src/hooks/useIsMountedRef";
import { useSnackbar } from "notistack";
import { PHONE_NUMBER_REGEX } from "src/constants";

interface RegisterProps {
  className?: string;
}

const useStyles = makeStyles(() => ({
  root: {}
}));

const Register: FC<RegisterProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const { register } = useAuth() as any;
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        name: "",
        surname: "",
        emailAddress: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        submit: null
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(30).required("Name is required."),
        surname: Yup.string().max(30).required("Surname is required."),
        emailAddress: Yup.string().max(30).required("Email address is required.").email("Email address must be a valid email."),
        phoneNumber: Yup.string().matches(PHONE_NUMBER_REGEX, 'Phone number is not valid').nullable(),
        password: Yup.string().min(7).max(30).required("Password is required."),
        confirmPassword: Yup.string().min(7).max(30).required("Confirm password is required.").oneOf([Yup.ref("password"), null], "Passwords must match")
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {

          //prepend the 0 if it was removed from the front
          let phone: string = values.phoneNumber.toString();
          if(phone && phone.length <= 9){
            phone = phone.padStart(10, "0");
          }

          await register(values.name, values.surname, values.emailAddress, phone, values.password);
          enqueueSnackbar(`${values.name} ${values.surname} was registered successfully`, { variant: "success" });
          if (isMountedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit:  "User emailAddress already exists" });
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
        values
      }) => (
        <form
          noValidate
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <TextField
            error={Boolean(touched.name && errors.name)}
            fullWidth
            helperText={touched.name && errors.name}
            label="Name"
            margin="normal"
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.surname && errors.surname)}
            fullWidth
            helperText={touched.surname && errors.surname}
            label="Surname"
            margin="normal"
            name="surname"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.surname}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.emailAddress && errors.emailAddress)}
            fullWidth
            helperText={touched.emailAddress && errors.emailAddress}
            label="Email address"
            margin="normal"
            name="emailAddress"
            type="emailAddress"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.emailAddress}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
            fullWidth
            helperText={touched.phoneNumber && errors.phoneNumber}
            label="Phone number"
            margin="normal"
            name="phoneNumber"
            type="number"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.phoneNumber}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            fullWidth
            helperText={touched.confirmPassword && errors.confirmPassword}
            label="Confirm password"
            margin="normal"
            name="confirmPassword"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.confirmPassword}
            variant="outlined"
          />
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>
                {errors.submit}
              </FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Register
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

Register.propTypes = {
  className: PropTypes.string
};

export default Register;
