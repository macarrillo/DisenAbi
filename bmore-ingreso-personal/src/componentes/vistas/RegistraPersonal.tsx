import { Button, Container, Grid, MenuItem, TextField, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { obtenerPersonaPorId, registrarPersona } from '../../actions/PersonaAction';
import useStyles from '../../theme/useStyles';
import DateFnsUtils from '@date-io/date-fns';
import PersonaContext from '../../contexto/PersonaContext';
import { useParams } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export interface IAppProps {
}

export interface IPersona {
    id:number;
    nombre:string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    sexo: number;
    fechaNacimiento:string;
    curp:string;
}

export interface IRespuestaApi {
    json: string,
    mensaje: string,
    entidad: IPersona,
    elementos: IPersona[],
    exito: boolean,
    httpStatus: number,
    valor: string
}

const {format} = require('date-fns');

let clearPersona : IPersona = {
    id:0,
    nombre:"",
    apellidoPaterno: "",
    apellidoMaterno: "",
    sexo:0,
    fechaNacimiento: format(new Date(),'yyyy-MM-dd'),
    curp:""
}

let clearRespuesta : IRespuestaApi = {
    json: "",
    mensaje: "",
    entidad: clearPersona,    
    elementos: [],
    exito: true,
    httpStatus: 200,
    valor: ""
}
type PersonaEdicion = {
    p_Id: string;
  };

export default function RegistraPersonal (props: IAppProps) {
    const { p_Id } = useParams<PersonaEdicion>();
    const [persona, setPersona] = useState<IPersona>(clearPersona);
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
    
    const { personaId, setPersonaId } = useContext(PersonaContext);
    console.log(personaId)
    
    const handleChange = (e:any) => {
        const {name, value} = e.target;
        setPersona(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        setPersona(prev => ({
            ...prev,
            fechaNacimiento: format(date,'yyyy-MM-dd')
        }))
    }

    const guardarPersona = async () => {
        console.log("Mi persona es", persona);
        const response = await registrarPersona(persona);
        setPersona(prev => ({
            ...prev,
            id: (response as IRespuestaApi).entidad.id
        }))
        
        setPersonaId((response as IRespuestaApi).entidad.id)
    }

    const obtenerPersona = async (personaId:number) => {
        if(personaId==0){
            setPersona(clearPersona);
            setPersonaId(0);
        }
        else{
            const response = await obtenerPersonaPorId(personaId)
            console.log("respuesta:...",response)
            setPersona((response as IRespuestaApi).entidad);
            setPersonaId(personaId);
            setSelectedDate(new Date((response as IRespuestaApi).entidad.fechaNacimiento))
        }
    }

    useEffect(() => {
        console.log("p_Id:",p_Id);
        if((typeof p_Id!='undefined' && p_Id)){
            obtenerPersona(Number(p_Id))
        }
    }, [p_Id])

    useEffect(() => {
        ValidatorForm.addValidationRule(
            "isValidName", (string) => /[$%&|<>#]/g.test(string)
        )
    }, [])

    const classes = useStyles();


  return (
    <div>
        <Container className={classes.containermt} >
            <Grid container justifyContent="center">
                <Grid item lg={7} md={8}>
                    <Typography variant="h4">{(p_Id=="0")?"Nuevo ":"Editar "}Personal</Typography>
                    
                    <ValidatorForm className={classes.form} onSubmit={guardarPersona}>
                        <Grid container spacing={2}>
                    <Grid item md={6} xs={12} className={classes.gridmb}>
                        <TextValidator
                        label="Nombre"
                        variant="outlined"
                        fullWidth
                        name="nombre"
                        validators={["required"]}
                        errorMessages={["El nombre es requerido"]}
                        value = {persona.nombre}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item md={6} xs={12} className={classes.gridmb}>
                        <TextValidator 
                        label="Apellido paterno"
                        variant="outlined"
                        fullWidth
                        name="apellidoPaterno"
                        validators={["required"]}
                        errorMessages={["El primer apellido es requerido"]}
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
                        format="yyyy-MM-dd"
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
                        <TextValidator 
                        label="Curp"
                        variant="outlined"
                        fullWidth
                        name="curp"
                        validators={["required"]}
                        errorMessages={["El curp es requerido"]}
                        value = {persona.curp}
                        onChange={handleChange}
                        />
                    </Grid>

                    <Grid item md={12} xs={12} className={classes.gridmb}>
                        <Button
                            variant="contained"
                            fullWidth
                            color="primary"
                            // onClick={guardarPersona}
                            type="submit"
                            >
                            {persona.id===0?"Registrar":"Actualizar"}
                        </Button>
                    </Grid>
                    </Grid>
                </ValidatorForm>
                
                </Grid>
            </Grid>
        </Container>
        </div>
  );
}
