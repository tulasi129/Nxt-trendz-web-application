import './index.css'

const ProductCard = props => {
  const {productList} = props
  const {title, brand, price, imageUrl, rating} = productList
  return (
    <li className="each-product-detail">
      <img src={imageUrl} alt="" className="product-image" />
      <p className="title">{title}</p>
      <p className="brand">{brand}</p>
      <div className="price-rating-container">
        <p className="price">{price}</p>
        <div className="rating-container">
          <p className="rating">{rating} </p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt=""
            className="star"
          />
        </div>
      </div>
    </li>
  )
}
export default ProductCard
