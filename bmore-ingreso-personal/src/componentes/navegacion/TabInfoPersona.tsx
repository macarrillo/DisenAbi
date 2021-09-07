import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useStyles from '../../theme/useStyles';
import RegistraPersonal from '../vistas/RegistraPersonal';
import { Container, Grid } from '@material-ui/core';
import Ubicacion from '../vistas/Ubicacion';
import { HistorialLaboral } from '../vistas/HistorialLaboral';
import Contactos from '../vistas/Contactos';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={4}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Container className={classes.containermt} >
        <Grid container justifyContent="center">
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Datos Básicos" {...a11yProps(0)} />
          <Tab label="Datos Ubicación" {...a11yProps(1)} />
          <Tab label="Datos Contacto" {...a11yProps(2)} />
          <Tab label="Historial Laboral" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <RegistraPersonal></RegistraPersonal>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Ubicacion idPersona={0}></Ubicacion>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Contactos idPersona={0}></Contactos>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <HistorialLaboral idPersona={0}></HistorialLaboral>
        </TabPanel>
      </SwipeableViews>
    </div>
    </Grid>
    </Container>
  );
}