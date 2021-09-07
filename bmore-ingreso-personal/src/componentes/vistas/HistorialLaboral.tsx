import React from 'react'
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import useStyles from '../../theme/useStyles';

interface Props {
    idPersona:number
}

export const HistorialLaboral = (props: Props) => {
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
                        {/* { respuestaApi.elementos.map((persona) => (
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
                        )) } */}
                        
                    </TableBody>
                </Table>
            </TableContainer>
    </Container>
    )
}

export default HistorialLaboral