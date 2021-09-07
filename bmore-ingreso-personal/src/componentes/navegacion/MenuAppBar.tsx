import { AppBar, Button, Container, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from '../../theme/useStyles';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import { AccountCircle, AddBox, Ballot, ThreeDRotation } from '@material-ui/icons';

export interface IMenuAppBarProps {
}

export function MenuAppBar(props: IMenuAppBarProps) {

  const classes = useStyles()

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Container>
          <Toolbar>
            <div className={classes.grow}>
              <Link to="/" color="inherit" className={classes.linkAppBarLogo} >
                <Ballot className={classes.mr} fontSize="large"/>
                <Typography variant="h5">Home</Typography>
              </Link>
            </div>
            <div className={classes.grow}>
              <Link to="/personal" color="inherit" className={classes.linkAppBarLogo} >
                <Ballot className={classes.mr} fontSize="large"/>
                <Typography variant="h5">Vista de personal</Typography>
              </Link>
            </div>
            <div className={classes.grow}>
              <Link to="/registrar" color="inherit" className={classes.linkAppBarLogo} >
                <AddBox className={classes.mr} fontSize="large" />
                <Typography variant="h5">Ingreso de personal</Typography>
              </Link>
            </div>
            <div>
              <Button color="inherit" className={classes.buttonIcon}>
                <Link to="/login" color="inherit"  className={classes.linkAppBarDesktop}>
                  <AccountCircle className={classes.mr} />
                  LOGIN
                </Link>
              </Button>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

