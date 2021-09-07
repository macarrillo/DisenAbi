import { IPersona} from '../componentes/vistas/RegistraPersonal';
import { IRespuestaApi } from '../componentes/vistas/Personal';
import HttpCliente from '../servicios/HttpCliente'

export const getPersonas = () =>{
    return new Promise((resolve, eject:any)=>{
        HttpCliente.get("/api/Persona/Registros").then(response =>{
            resolve(response.data);
        });
    })
}

export const registrarPersona = (persona:IPersona) => {
        // persona.fechaNacimiento = "2021-09-07T14:49:14.418Z";
    console.log(persona);
    
    return new Promise((resolve, eject)=>{
        HttpCliente.post("/api/Persona", persona).then(response =>{
            resolve(response.data);
        }).catch((error)=>{
            resolve(error)
        });
    })
}

export const deletePersona = (id:number) =>{
    return new Promise((resolve, eject:any)=>{
        HttpCliente.delete("/api/Persona/"+id).then(response =>{
            resolve(response.data);
        });
    })
}