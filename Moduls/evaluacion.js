export default{
    showEvaluacion(){
        let plantilla=
        `
        <div class="form-group col-12 col-md-2">
            <label>Buscador General</label>
            <input id="buscarRecluta" value="" class="form-control">
        </div>
        <table class="table" id="tabla_evaluacion">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Recluta</th>
                    <th scope="col">Modulo</th>
                    <th scope="col">Nota</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody id="tabla_datos_evaluacion">
            </tbody>
        </table>

        <form id="updateProducts">
            <input type="hidden" name="id" id="id_Edit_Recluta">
            <input type="text" name="nombre" id="nombre_Edit_Recluta" required>
            <input type="number" name="edad" id="edad_Edit_Recluta" required>
            <input type="number" name="telefono" id="telefono_Edit_Recluta" required>
            <button class="btn btn-sm btn-danger">Enviar</button>
        </form>    
        <!--<My-Form-Recluta/>-->
        `;

        const worker = new Worker("./storage/wsConsultas.js")

        document.querySelector("#moduloCotent").innerHTML= plantilla;
        worker.postMessage({"type":"getDataEvaluacion"});
        worker.onmessage = function(event){
            document.querySelector("#tabla_datos_evaluacion").insertAdjacentHTML("beforeend", event.data)
        } 

        document.querySelector("#tabla_evaluacion").addEventListener('click', (e)=>{
            if (e.target.matches('.eliminarRecluta')) {
                let idRecluta=e.target.id;
                let res=confirm("Esta seguro que desea eliminar la evaluacion");
                if(res){
                    worker.postMessage({"type":"dropRecluta","id":idRecluta});
                    worker.onmessage = function(event){
                        if(event.data =="ok"){
                            alert("Recluta eliminado con exito")
                        }else{
                            alert("Hubo un problema al eliminar el recluta")
                        }
                    }
                }    
            } else if (e.target.matches('.editarRecluta')) {
                let idRecluta=e.target.id;

                worker.postMessage({"type":"showRecluta","id":idRecluta});
                worker.onmessage = function(event){
                    let id = document.querySelector("#id_Edit_Recluta");
                    let nombre = document.querySelector("#nombre_Edit_Recluta");
                    let edad = document.querySelector("#edad_Edit_Recluta"); 
                    let telefono = document.querySelector("#telefono_Edit_Recluta");
                    let email = document.querySelector("#email_Edit_Recluta");
                    let direccion = document.querySelector("#direccion_Edit_Recluta");
                    let nacimiento = document.querySelector("#nacimiento_Edit_Recluta");
                    let documento = document.querySelector("#documento_Edit_Recluta");
                    let ingreso = document.querySelector("#ingreso_Edit_Recluta");
                    let team = document.querySelector("#team_Edit_Recluta");

                    id.value = event.data.id
                    nombre.value=event.data.nombre
                    edad.value=event.data.edad
                    telefono.value=event.data.telefono
                    email.value=event.data.email
                    direccion.value=event.data.direccion
                    nacimiento.value=event.data.fechaNacimiento
                    documento.value=event.data.documento
                    ingreso.value=event.data.fechaIngresoPrograma
                    team.value=event.data.idTeam
                    console.log(getAllTeam().data);
                }
            }
        })

/*
        const getAllTeam = async()=>{
            try{
        
                let respuesta = await fetch("http://localhost:4001/team");
                const data = await respuesta.json();
        
                let plantilla ="";

                for(const res in data){
                    plantilla +=
                    `
                    <option value="${data[res].id}">${data[res].nombre}</option>
                    `;
                }
        
                return plantilla
            }catch(e){
                return "Error => "+e;
            }
        }

        document.querySelector("#buscarRecluta").addEventListener("input", (e)=>{            
            const worker = new Worker("./storage/wsReclutas.js")
            worker.postMessage({"type":"buscarRecluta","data":e.target.value});
            
            worker.onmessage = function(event){
                document.querySelector("#tabla_datos_reclutas").innerHTML=event.data;
            }      
        })

        document.querySelector("#buscarReclutaTeam").addEventListener("input", (e)=>{            
            const worker = new Worker("./storage/wsReclutas.js")
            worker.postMessage({"type":"buscarRecluta","data":e.target.value});
            
            worker.onmessage = function(event){
                document.querySelector("#tabla_datos_reclutas").innerHTML=event.data;
            }      
        })


        document.querySelector("#updateProducts").addEventListener("submit", (e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target))
            
            worker.postMessage({"type":"updateRecluta","data":data});
            worker.onmessage = function(event){
                console.log("Respuesta => ", event.data)
            }
            
        }) */

    }
}