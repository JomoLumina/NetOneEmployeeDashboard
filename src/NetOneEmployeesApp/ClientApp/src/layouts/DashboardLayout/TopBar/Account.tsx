import React, { useRef, useState } from 'react';
import type { FC } from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Avatar, Box, ButtonBase, Hidden, Menu, MenuItem,
   Typography, makeStyles } from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 32,
    width: 32,
    marginRight: theme.spacing(1)
  },
  popover: {
    width: 200
  }
}));

const Account: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const ref = useRef<any>(null);
  const { user, logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      handleClose();
      await logout();
      history.push('/');
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Unable to logout', {
        variant: 'error'
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        component={ButtonBase}
        onClick={handleOpen}
        // @ts-ignore
        ref={ref}
      >
        <Avatar
          alt="User"
          className={classes.avatar}
          src={"/static/images/avatar.png"}
          />
        <Hidden smDown>
          <Typography
            variant="h6"
            color="inherit"
          >
            {`${user.name} ${user.surname}`} 
          </Typography>
        </Hidden>
      </Box>
      <Menu
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        keepMounted
        PaperProps={{ className: classes.popover }}
        getContentAnchorEl={null}
        anchorEl={ref.current}
        open={isOpen}
      >
        <MenuItem component={RouterLink} to={`/app/profile`}>
          Profile
        </MenuItem>
        
        <MenuItem onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default Account;
