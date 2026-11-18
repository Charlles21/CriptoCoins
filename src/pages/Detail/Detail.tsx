import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getTheCoin } from "../../Api/ApiLinks/ApiLinks";
import type { MoedaProps } from "../Home/Home";
import style from "./Detail.module.css";


interface ResponseData{
   data: MoedaProps
}

interface ErrorData{
    error: string       
}

type DataProps = ResponseData | ErrorData

export function Detail(){
    const [coin, setCoin] = useState<MoedaProps>()
    const [loading, setLoading] = useState<boolean>(true)

    const {cripto}= useParams()   
    const navigate = useNavigate()
    
    async function loadMoeda(idMoeda?: string){        
        try {                   
            fetch(getTheCoin(idMoeda))
                .then(response => response.json())
                .then((data: DataProps) => {
                        if('error' in data){
                            navigate('/');
                            return
                        }

                const Price = Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    })
            
                const PriceCompact = Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        notation: 'compact'
                    })                
                  
                const resultData = {
                    ...data.data,
                    formatedPrice: Price.format(Number(data.data.priceUsd)),
                    formatedMarket: PriceCompact.format(Number(data.data.marketCapUsd)),
                    formatedVolume: PriceCompact.format(Number(data.data.volumeUsd24Hr))
                }   
                
                setCoin(resultData)
                setLoading(false)
                })
        } catch (error) {
            console.log(error)
            navigate('/');
        }
    }



    useEffect(() => {
        loadMoeda(cripto)      
    }, [cripto])

    if (loading || !coin) {
       return (<h1>Carregando moeda...</h1>)
    }

    return(
        <div className={style.container}>
            <h1 className={style.center}>{coin?.name}</h1> 
            <h1 className={style.center}>{coin?.symbol}</h1>

            <section className={style.content}>                 
                <img
                  className={style.logo}
                  src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                  alt="Imagem moeda" 
                />
                <h3>{coin?.name} | {coin?.symbol}</h3>
                <p><strong>Preço:</strong> {coin?.formatedPrice}</p>  
                <a>
                    <strong>Mercado: </strong> {coin?.formatedMarket}
                </a>
                <a>
                    <strong>Volume: </strong>{coin?.formatedVolume}
                </a>
                <a>
                    <strong>Mudança 24hr: </strong> 
                    <span className={Number(coin?.changePercent24Hr) > 0 ? style.tdProfit : style.tdLoss}> {Number(coin?.changePercent24Hr).toFixed(3)+'%'}</span> 
                </a>
            </section>
        </div>
    )
}