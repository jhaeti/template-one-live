import ProductList from "./ProductList";

const ProductsTable = () => (
	<table className="products-table">
		<thead>
			<tr>
				{/* <th></th> */}
				<th>Sn</th>
				<th>Name</th>
				<th>Quantity</th>
				<th>Sold</th>
				{/* <th>Likes</th> */}
				<th>Price</th>
				<th>Operations</th>
			</tr>
		</thead>
		<tbody>
			<ProductList />
		</tbody>
	</table>
);

export default ProductsTable;
