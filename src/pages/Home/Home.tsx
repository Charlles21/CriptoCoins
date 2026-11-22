import { BsSearch } from "react-icons/bs";
import style from './Home.module.css'
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, type FormEvent } from "react";

export interface MoedaProps {
    id: string;
    name: string;
    symbol: string;
    priceUsd: string;
    vwap24Hr: string;
    changePercent24Hr: string;
    rank: string;
    supply: string;
    maxSupply: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    explorer: string;  
    formatedPrice?: string;
    formatedMarket?: string;
    formatedVolume?: string;    
}

interface DataProps{
    data: MoedaProps[] 
}

export function Home(){
    const [input, setInput] = useState<string>('')
    const [moedas, SetMoedas] = useState<MoedaProps[]>([])
    const [offSet, SetOffSet] = useState<number>(0)

    const navigate = useNavigate();

    function handleSubmit(e: FormEvent){
        e.preventDefault();

        if(input === "") return

        navigate(`/detail/${input}`)
    }

    useEffect(() => {
        loadData()
    }, [offSet])


    function loadData(){
        fetch(`/api/assets?offset=${offSet}&limit=10`)
        .then(async response => response.json())
        .then((data: DataProps) => {
            const Moedas = data.data  
           
           const Price = Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
           })
           
           const PriceCompact = Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact'
           }) 

           const FormatedResult =  Moedas.map((item) => {
                const Formated = {
                    ...item,
                    formatedPrice: Price.format(Number(item.priceUsd)),
                    formatedMarket: PriceCompact.format(Number(item.marketCapUsd)),
                    formatedVolume: PriceCompact.format(Number(item.volumeUsd24Hr))

                }

                return Formated
            })

            const ListaMoedas = [...moedas, ...FormatedResult]

           SetMoedas(ListaMoedas)
        })    
    }

    function handleSearch(){
      alert('tester');
    }

    function handleLoadMore(){        
        SetOffSet(offSet + 10);
    }

    return(
        <main className={style.container}>
            <form className={style.form} onSubmit={handleSubmit}>               
                <input type="text" 
                placeholder="Digite o nome da moeda... Ex Bitcoin"
                value={input}
                onChange={(e) => (setInput(e.target.value))} />                
                <button 
                type="submit"
                >
                <BsSearch size={30} color="#FFF" onClick={handleSearch}/>
                </button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th scope="col">Moeda</th>
                        <th scope="col">Valor de mercado</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Volume</th>
                        <th scope="col">Mudança 24h</th>
                    </tr>                    
                </thead>
                <tbody>
                    {moedas.length > 0 && moedas.map((item) => (
                        <tr className={style.tr} key={item.id}>
                        <td className={style.tdLabel} data-label='Moeda'>
                            <div className={style.name}>
                                <img className={style.logo}
                                    alt="Logo cripto"
                                    src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
                                />
                                <Link to={`detail/${item.name}`}>                                
                                    <span>{item.name}</span> | {item.symbol}
                                </Link>
                            </div>
                        </td>
                        <td className={style.tdLabel} data-label='Valor de mercado'>
                            {item.formatedMarket}   
                        </td>
                        <td className={style.tdLabel} data-label='Preço'>
                            {item.formatedPrice}  
                        </td>
                        <td className={style.tdLabel} data-label='Volume'>
                         {item.formatedVolume} 
                        </td>
                        <td className={Number(item.changePercent24Hr) > 0 ? style.tdProfit : style.tdLoss} data-label='Mudança 24h'>
                          <span>{Number(item.changePercent24Hr).toFixed(3)+'%'}</span>  
                        </td>   
                    </tr> 
                    ))}
                </tbody>
            </table>
            <button 
            className={style.buttonMore}
            onClick={handleLoadMore}>Carrear mais...</button>
        </main>
    )
}