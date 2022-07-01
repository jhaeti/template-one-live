import DeleteButton from "./DeleteButton";

const Product = ({ product }) => (
	<div className="bg">
		<div className="container">
			<div className="item row row--space-between row--v-center">
				<h3 className="item__text">{product.name}</h3>{" "}
				<DeleteButton id={product._id} />
			</div>
		</div>
	</div>
);

export default Product;
