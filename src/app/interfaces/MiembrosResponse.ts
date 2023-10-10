export interface MiembrosResponse {
    total:    number;
    miembros: Miembros[];
}

export interface Miembros {
    _id:              string;
    nombre:           string;
    numero_id:        string;
    email:            string;
    telefono:         string;
    celular:          string;
    barrio:           string;
    direccion:        string;
    sexo:             string;
    poblacion:        string;
    estado_civil:     string;
    fecha_nacimiento: Date;
    imagen:           string;
    tipo_miembro:     string;
    bautizado:        string;
    fecha_membresia:  Date;
    lider_contacto:   string;
    ministerio:       string;
    estado:           boolean;
   
}
