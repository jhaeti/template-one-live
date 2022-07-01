import Link from "next/link";

const ProductListItem = ({ product, index }) => {
	const { name, price, ns, quantity, _id } = product;
	return (
		<tr>
			{/* <td></td> */}
			<td>{index}</td>
			<td>{name}</td>
			<td>{quantity}</td>
			<td>{ns}</td>
			<td>{price}</td>
			<td>
				<Link href={`/admin-products-management/${_id}`}>
					<a>Edit</a>
				</Link>
			</td>
		</tr>
	);
};

export default ProductListItem;
