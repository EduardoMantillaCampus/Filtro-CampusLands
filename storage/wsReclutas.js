const getAllReclutas = async()=>{
    try{

        let respuesta = await fetch("http://localhost:4001/recluta");
        const data = await respuesta.json();

        let plantilla ="";
        for(const res in data){
            let teams = await fetch(`http://localhost:4001/team/${data[res].idTeam}`);
            const team = await teams.json();

            plantilla +=
            `
            <tr>
                <th scope="row">${data[res].id}</th>
                <td>${data[res].nombre}</td>
                <td>${data[res].edad}</td>
                <td>${data[res].telefono}</td>
                <td>${data[res].email}</td>
                <td>${data[res].direccion}</td>
                <td>${data[res].fechaNacimiento}</td>
                <td>${data[res].documento}</td>
                <td>${data[res].fechaIngresoPrograma}</td>
                <td>${team.nombre}</td>
                <td>
                    <button href="#" id='${data[res].id}' class="btn-eliminar eliminarRecluta">Eliminar</button>
                    <button href="#" id='${data[res].id}' class="btn-editar editarRecluta">Editar</button>
                </td>
            </tr>
            `;
        }

        return plantilla
    }catch(e){
        return "Error => "+e;
    }
}

const buscarRecluta = async(palabra)=>{
    try{
        let plantilla="";
        let respuesta = await fetch(`http://localhost:4001/recluta?q=${palabra}`);
        const data = await respuesta.json();
        for(const res in data){
            
            let teams = await fetch(`http://localhost:4001/team/${data[res].idTeam}`);
            const team = await teams.json();

            plantilla +=
            `
            <tr>
                <th scope="row">${data[res].id}</th>
                <td>${data[res].nombre}</td>
                <td>${data[res].edad}</td>
                <td>${data[res].telefono}</td>
                <td>${data[res].email}</td>
                <td>${data[res].direccion}</td>
                <td>${data[res].fechaNacimiento}</td>
                <td>${data[res].documento}</td>
                <td>${data[res].fechaIngresoPrograma}</td>
                <td>${team.nombre}</td>
                <td>
                    <button href="#" id='${data[res].id}' class="eliminarRecluta">Eliminar</button>
                    <button href="#" id='${data[res].id}' class="editarRecluta">Editar</button>
                </td>
            </tr>
            `;
        }
        return plantilla
    }catch(e){
        return "Error => "+e;
    }
}
const buscarReclutaTeam = async(palabra)=>{
    try{
        let plantilla="";
        let respuesta = await fetch(`http://localhost:4001/recluta?q=${palabra}`);
        const data = await respuesta.json();
        for(const res in data){
            
/*          let categorias = await fetch(`http://localhost:4001/recluta/${data[dat].categoriaId}`);
            const categoria = await categorias.json(); */

            plantilla +=
            `
            <tr>
                <th scope="row">${data[res].id}</th>
                <td>${data[res].nombre}</td>
                <td>${data[res].edad}</td>
                <td>${data[res].telefono}</td>
                <td>${data[res].email}</td>
                <td>${data[res].direccion}</td>
                <td>${data[res].fechaNacimiento}</td>
                <td>${data[res].documento}</td>
                <td>${data[res].fechaIngresoPrograma}</td>
                <td>${data[res].idTeam}</td>
                <td>
                    <button href="#" id='${data[res].id}' class="eliminarRecluta">Eliminar</button>
                    <button href="#" id='${data[res].id}' class="editarRecluta">Editar</button>
                </td>
            </tr>
            `;
        }
        return plantilla
    }catch(e){
        return "Error => "+e;
    }
}
const dropRecluta = async(id)=>{
    try{
        let plantilla="";
        let config={
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
        };
        let respuesta = await fetch(`http://localhost:4001/recluta/${id}`,config);
        const data = await respuesta.json();

        return "ok"
    }catch(e){
        return "Error => "+e;
    }
}

const updateRecluta = async(data2)=>{
    try{
        let config={
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data2)
        };

        let respuesta = await fetch(`http://localhost:4001/recluta/${data2.id}`,config);
        const result = await respuesta.json();

        return "ok"
    }catch(e){
        return "Error => "+e;
    }
}

const showRecluta = async(id)=>{
    try{
        let respuesta = await fetch(`http://localhost:4001/recluta/${id}`);
        const data = await respuesta.json();
        return data
    }catch(e){
        return "Error => "+e;
    }
}

const addRecluta = async(data2)=>{
    try{
        let config={
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data2)
        };

        let respuesta = await fetch(`http://localhost:4001/recluta/`,config);
        const result = await respuesta.json();

        return "ok"
    }catch(e){
        return "Error => "+e;
    }
}
self.addEventListener('message', async function(event){
    let data = "";
    switch(event.data.type){
        case "addRecluta":
            data = await addRecluta(event.data.data);
        break; 
        case "getAllReclutas":
            data = await getAllReclutas();
        break; 
        case "buscarRecluta":
            data = await buscarRecluta(event.data.data);
        break;
        case "dropRecluta":
            data = await dropRecluta(event.data.id);
        break;
        case "buscarReclutaTeam":
            data = await buscarReclutaTeam(event.data.data);
        break;
        case "updateRecluta":
            data = await updateRecluta(event.data.data);
        break;
        case "showRecluta":
            data = await showRecluta(event.data.id);
        break;
    }
    self.postMessage(data);
})