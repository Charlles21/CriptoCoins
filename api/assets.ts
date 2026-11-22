import { getMoedas } from "./ApiLinks/ApiLinks";


export default async function moedas(req: any, res: any) {
    
    const API_KEY = process.env.COIN_CAP_API_KEY;    

    const { offset = "0", limit = "10" } = req.query;

    try {
        const response = await fetch(
            getMoedas(offset, limit),
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
