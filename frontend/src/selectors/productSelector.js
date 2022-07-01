import { createSelector } from "reselect";

export const selectProducts = createSelector(
	(state) => state.product.products,
	(users) => users
);

export const selectProductById = (products, id) =>
	products.find((product) => product._id === id);
