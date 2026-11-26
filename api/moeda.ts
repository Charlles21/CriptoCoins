
export default async function moedas(req: any, res: any) {
    
    const API_KEY = process.env.COIN_CAP_API_KEY;    
    
    const {moeda} = req.query;    
    try {
        if (!API_KEY) {
            return res.status(500).json({
                error: "COIN_CAP_API_KEY não configurada"
            });
        }
    

        const response = await fetch(
            `https://rest.coincap.io/v3/assets/${moeda}`,
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