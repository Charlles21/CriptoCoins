import { API_KEY } from "../APIKeys/ApiKey";


export function getMoedas(comeco: number, limite: number){
    if(limite == 0){
        limite = 10
    }    
    return `https://rest.coincap.io/v3/assets?limit=${limite}&offset=${comeco}`  
}

export function getTheCoin(IdMoeda?: string){   
    debugger     
    if(!IdMoeda){
        IdMoeda = '';    
    } 
    
    return `https://rest.coincap.io/v3/assets/${IdMoeda}`
}


