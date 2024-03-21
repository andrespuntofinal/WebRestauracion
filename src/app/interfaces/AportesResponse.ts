export interface AportesResponse {
    total: number;
    aportes: Aportes[];
  }
  export interface Aportes {
    _id: string;
    miembro: MiembrosResponse;
    tipo_aporte: string;
    fecha_aporte: string;
    valor_aporte: number;
    observaciones: string;
    usuario: UsuariosResponse;
    estado: boolean;
    fecha_registro: string;
  }
  interface MiembrosResponse {
    _id: string;
    nombre: string;
  }

  interface UsuariosResponse {
    _id: string;
    nombre: string;
  }