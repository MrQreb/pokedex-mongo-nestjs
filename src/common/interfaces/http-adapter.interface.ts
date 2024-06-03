//Definir la interfaz para el adaptador http.
export interface HttpAdapter{
    
    //<T> => Generico para definir el tipo de la respuesta
    get<T>(url:string):Promise<T>;
}