type Author = {
	name: string;
	lastname: string;
};

type Price = {
	currency: string;
	amount: number;
	decimals: number;
};

type Item = {
	id: string;
	title: string;
	price: Price;
	picture: string;
	condition: string;
	free_shipping: boolean;
	address: string;
};

type ItemId = {
	id: string;
	title: string;
	price: Price;
	picture: string;
	condition: string;
	free_shipping: boolean;
	sold_quantity: number;
	description: string;
	category_id: string;
};
export type ResponseItem = {
	author: Author;
	categories: string[];
	items: Item[];
};

export type ResponseItemId = {
	author: Author;
	item: ItemId;
};
