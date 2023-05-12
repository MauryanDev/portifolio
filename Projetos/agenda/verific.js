import vtddd from "./dados.js";
import ddd from "./agenda.js";

    let uf=vtddd.filter(vtddd => vtddd.numero.includes(ddd));

    let estado=uf[0].nome
 
 export default estado



