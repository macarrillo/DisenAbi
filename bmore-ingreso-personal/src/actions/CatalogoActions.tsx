import HttpCliente from '../servicios/HttpCliente'

export const getCatalogo = (nombre:string) =>{
    return new Promise((resolve, eject:any)=>{
        HttpCliente.get("/api/Catalogos/"+nombre).then(response =>{
            resolve(response.data);
        });
    })
}
