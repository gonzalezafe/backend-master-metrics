import { Request, Response } from 'express';
import fetch from 'node-fetch';

import { ResponseItemId } from '../types';

const getItemId = async (req: Request, res: Response) => {
	const id = req.params.id;

	const translate: { [key: string]: string } = {
		new: 'Nuevo',
		used: 'Usado',
	};
	try {
		// Realizamos la primera consulta a la API de Mercado Libre
		const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
		const item = await response.json();

		// Realizamos la segunda consulta a la API de Mercado Libre
		const descriptionResponse = await fetch(
			`https://api.mercadolibre.com/items/${id}/description`,
		);
		const description = await descriptionResponse.json();

		// Armamos el objeto que se enviará como respuesta
		const result: ResponseItemId = {
			author: {
				name: 'Franco',
				lastname: 'Gonzalez',
			},
			item: {
				id: item.id,
				title: item.title,
				price: {
					currency: item.currency_id,
					amount: item.price,
					decimals: 2,
				},
				picture: item.thumbnail,
				condition: translate[item.condition],
				free_shipping: item.shipping.free_shipping,
				sold_quantity: item.sold_quantity,
				description: description.plain_text,
				category_id: item.category_id,
			},
		};
		res.json(result);
	} catch (error) {
		// Acá se puede especificar lo que se quiera hacer en caso que de error
		console.error(error);
		res.sendStatus(500);
	}
};

export default getItemId;
