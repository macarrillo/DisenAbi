import { Button, Container, Grid, MenuItem, TextField, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { getCatalogo } from '../../actions/CatalogoActions';
import { registrarPersona } from '../../actions/PersonaAction';
import useStyles from '../../theme/useStyles';
import DateFnsUtils from '@date-io/date-fns';

export interface IAppProps {
}

export interface IPersona {
    id:number;
    Nombre:string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    sexo: number;
    fechaNacimiento:string;
    curp:string;

}

export interface ICatalogo {
    idElementoCatalogo:number;
    valor: string;
}

export interface IRespuestaApiCatalogo {
    json: string,
    mensaje: string,
    entidad: ICatalogo,
    elementos: ICatalogo[],
    exito: boolean,
    httpStatus: number,
    valor: string
}

let clearPersona : IPersona = {
    id:0,
    Nombre:"",
    apellidoPaterno: "",
    apellidoMaterno: "",
    sexo:0,
    fechaNacimiento: "",
    curp:""

}

let clearCatalogo : ICatalogo = {
    idElementoCatalogo:0,
    valor:"",
}

let clearPaises : IRespuestaApiCatalogo = {
    json: "",
    mensaje: "",
    entidad: clearCatalogo,    
    elementos: [],
    exito: true,
    httpStatus: 200,
    valor: ""
}


export default function RegistraPersonal (props: IAppProps) {
    const [persona, setPersona] = useState<IPersona>(clearPersona);
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
    const [paises, setPaises] = useState<IRespuestaApiCatalogo>(clearPaises);

    useEffect(() => {
        const listarPaises = async () => {
            const response = await getCatalogo("paises");
            setPaises(response as IRespuestaApiCatalogo);
        }
        listarPaises();
    }, [])
    
    const handleChange = (e:any) => {
        const {name, value} = e.target;
        setPersona(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const {format} = require('date-fns');

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        setPersona(prev => ({
            ...prev,
            fechaNacimiento: format(date,'yyyy-MM-dd')
        }))
    }

    const guardarPersona = () => {
        console.log("Mi persona es", persona);
        registrarPersona(persona);
        //setPersona(clearPersona);
    }

    const classes = useStyles();
  return (
    <div>
        <Container className={classes.containermt} >
            <Grid container justifyContent="center">
                <Grid item lg={7} md={8}>
                    <Typography variant="h4">Personal</Typography>
                    
        <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
            <Grid container spacing={2}>
          <Grid item md={6} xs={12} className={classes.gridmb}>
              <TextField 
              label="Nombre"
              variant="outlined"
              fullWidth
              name="Nombre"
              value = {persona.Nombre}
              onChange={handleChange}
              />
          </Grid>
          <Grid item md={6} xs={12} className={classes.gridmb}>
              <TextField 
              label="Apellido paterno"
              variant="outlined"
              fullWidth
              name="apellidoPaterno"
              value = {persona.apellidoPaterno}
              onChange={handleChange}
              />
          </Grid>
          <Grid item md={6} xs={12} className={classes.gridmb}>
              <TextField 
              label="Apellido materno"
              variant="outlined"
              fullWidth
              name="apellidoMaterno"
              value = {persona.apellidoMaterno}
              onChange={handleChange}
              />
          </Grid>
          
          <Grid item md={6} xs={12} className={classes.gridmb}>
              <TextField
                select
                label="Sexo"
                variant="outlined"
                fullWidth
                name="sexo"
                value = {persona.sexo}
                onChange={handleChange}>          
                    <MenuItem value="0" disabled>Seleccione</MenuItem>
                    <MenuItem value="1">Masculino</MenuItem>
                    <MenuItem value="2">Femenino</MenuItem>                
              </TextField> 
          </Grid>
          <Grid item md={6} xs={12} className={classes.gridmb}>   
          
    <MuiPickersUtilsProvider utils={DateFnsUtils}>   
    
    <Grid container justifyContent="space-around">        
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                name="fechaNacimiento"
                label="Fecha de nacimiento"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
                </Grid>
                </MuiPickersUtilsProvider>
          </Grid>
          <Grid item md={6} xs={12} className={classes.gridmb}>
              <TextField 
              label="Curp"
              variant="outlined"
              fullWidth
              name="curp"
              value = {persona.curp}
              onChange={handleChange}
              />
          </Grid>
          
          
          <Grid item md={12} xs={12} className={classes.gridmb}>
            <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={guardarPersona}
            type="submit"
            >
                Registrar
            </Button>
        </Grid>
        </Grid>
      </form>
    
                </Grid>
            </Grid>
        </Container>
        </div>
  );
}
