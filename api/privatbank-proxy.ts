import fetch from 'node-fetch';
import { Request, Response } from 'express';

module.exports = async (req:Request, res:Response): Promise<void> => {
    const url = 'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5';

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            res.status(200).json(data);
        } else {
            res.status(response.status).send('Error fetching data');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
};
