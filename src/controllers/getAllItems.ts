import { Request, Response } from 'express';
import fetch from 'node-fetch';

import { ResponseItem } from '../types';

const getAllItems = async (req: Request, res: Response) => {
	const query = req.query.q;

	fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`)
		.then((response) => response.json())
		.then((data: any) => {
			const filters = data.filters;
			const foundFilter =
				filters && filters.find((filter: any) => filter.id === 'category');
			const categories =
				foundFilter &&
				foundFilter.values[0]?.path_from_root.map((category: any) => category.name);
			const result: ResponseItem = {
				author: {
					name: 'Franco',
					lastname: 'Gonzalez',
				},
				categories,
				items: data.results.map((item: any) => ({
					id: item.id,
					title: item.title,
					price: {
						currency: item.currency_id,
						amount: item.price,
						decimals: 2,
					},
					picture: item.thumbnail,
					condition: item.condition,
					free_shipping: item.shipping.free_shipping,
					address: item.address.state_name,
				})),
			};
			res.json(result);
		})
		.catch((error: any) => {
			// Acá se puede especificar lo que se quiera hacer en caso que de error
			console.error(error);
			res.sendStatus(500);
		});
};

export default getAllItems;
