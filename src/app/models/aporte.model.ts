import { MiembroModel } from './miembro.model'

export class AporteModel {

    tipo_aporte?:string;
    fecha_aporte?:string;
    valor_aporte?:number;
    observaciones?:string;
    miembro?: MiembroModel;

}   