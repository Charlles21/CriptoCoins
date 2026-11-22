import { getTheCoin } from "../src/Api/ApiLinks/ApiLinks";

export default async function moedas(req: any, res: any) {
    
    const API_KEY = process.env.COIN_CAP_API_KEY;    
    
    const {moeda} = req.query;
    console.log(moeda)
    try {
        const response = await fetch(
            getTheCoin(moeda),
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
            }
        );

        const data = await response.json();

        return res.status(response.status).json(data);

    } catch (error) {
        return res.status(500).json({
            error: "Erro ao consultar CoinCap"
        });
    }
    
}