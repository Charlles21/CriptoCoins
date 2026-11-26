import { getMoedas } from "./ApiLinks/ApiLinks.ts";


export default async function moedas(req: any, res: any) {
    
    const API_KEY = process.env.COIN_CAP_API_KEY;    

    const offset = Number(req.query.offset ?? 0);
    const limit = Number(req.query.limit ?? 10);

    try {
        if (!API_KEY) {
            return res.status(500).json({
                error: "COIN_CAP_API_KEY não configurada"
            });
        }

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
