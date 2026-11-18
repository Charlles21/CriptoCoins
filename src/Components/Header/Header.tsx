import { Link } from "react-router-dom";
import Logo from '../../Assets/logo.svg';
import style from './Header.module.css';


export function Header(){
    return(
    <header className={style.container}>
        <Link 
        to={'/'}>
        <img 
        src={Logo}
        ></img>
        </Link>
    </header>
    )
}