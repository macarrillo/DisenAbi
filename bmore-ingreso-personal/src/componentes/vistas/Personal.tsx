import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { getPersonas } from '../../actions/PersonaAction';
import useStyles from '../../theme/useStyles';

export interface IAppProps {
}

export interface IPersona {
    id:number;
    nombre:string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    sexo: number;
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

let clearPersona : IPersona = {
    id:0,
    nombre:"",
    apellidoPaterno: "",
    apellidoMaterno: "",
    sexo:0
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



export default function Personal (props: IAppProps) {
    
    const [ respuestaApi, setRespuestaApi ] = useState<IRespuestaApi>(clearRespuesta)

    useEffect(() => {
        const listarDataPersonas = async () => {
            const response = await getPersonas();
            setRespuestaApi(response as IRespuestaApi);
        }
        listarDataPersonas();
    }, [])

    const classes = useStyles();

  return (
    <Container className={classes.containermt}>        
        <TableContainer component={Paper} className={classes.containermt}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido paterno</TableCell>
                            <TableCell>Apellido materno</TableCell>
                            <TableCell align="center" colSpan={2}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { respuestaApi.elementos.map((persona) => (
                        <TableRow key={persona.id}>
                            <TableCell>{persona.nombre}</TableCell>
                            <TableCell>{persona.apellidoPaterno}</TableCell>
                            <TableCell>{persona.apellidoMaterno}</TableCell>
                            <TableCell>
                                <Button
                                variant="contained"
                                color="primary"
                                >
                                    Editar
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                variant="contained"
                                color="secondary">
                                    Eliminar
                                </Button>
                            </TableCell>
                        </TableRow>
                        )) }
                        
                    </TableBody>
                </Table>
            </TableContainer>
    </Container>
  );
}
