export interface UsuariosResponse {
    total:    number;
    usuarios: Usuarios[];
}

export interface Usuarios {
    _id:    string;
    nombre: string;
    email:  string;
    rol:    string;
    uid:    string;
    password: string;
    estado: string;
    __v:    number;
    imagen: string;
}