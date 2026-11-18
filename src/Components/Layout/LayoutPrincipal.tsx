import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import style from './LayoutPrincipal.module.css'

export function LayoutPrincipal(){
    return(
        <div className={style.container}>  
        <Header/>      
        <Outlet/>
        </div>
    )
}