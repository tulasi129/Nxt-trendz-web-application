import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ProductHeader from '../ProductHeader'
import ProductCard from '../ProductCard'
import FilterGroup from '../FilterGroup'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoading: 'ISLOADING',
}
const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductSection extends Component {
  state = {
    productList: [],
    apiStatus: apiConstants.initial,
    activeOptionId: sortbyOptions[0].optionId,
    activeCategoryid: '',
    searchInput: '',
    activeRatingId: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiConstants.isLoading,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {
      activeOptionId,
      activeCategoryid,
      searchInput,
      activeRatingId,
    } = this.state

    const url = `https://apis.ccbp.in/products/?sort_by=${activeOptionId}&category=${activeCategoryid}&title_search=${searchInput}&rating=${activeRatingId}`

    console.log(url)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const newData = fetchedData.products.map(each => ({
        title: each.title,
        brand: each.brand,
        price: each.price,
        id: each.id,
        imageUrl: each.image_url,
        rating: each.rating,
      }))
      this.setState({productList: newData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  changeOptionId = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  categoryOptionsChange = activeCategoryid => {
    this.setState({activeCategoryid}, this.getProducts)
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderproductView = () => {
    const {productList, activeOptionId} = this.state
    return (
      <div className="products-container">
        <ProductHeader
          sortbyOptions={sortbyOptions}
          activeOptionId={activeOptionId}
          changeOptionId={this.changeOptionId}
        />
        <ul className="product-lists-view">
          {productList.map(each => (
            <ProductCard productList={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderAllProducts = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderproductView()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.isLoading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  changeCategory = activeCategoryid => {
    this.setState({activeCategoryid}, this.getProducts)
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  enterSearchInput = () => {
    this.getProducts()
  }

  changeRating = activeRatingId => {
    this.setState({activeRatingId}, this.getProducts)
  }

  render() {
    const {activeCategoryid, searchInput, activeRatingId} = this.state
    console.log(activeCategoryid)
    console.log(activeCategoryid)
    console.log(searchInput)
    return (
      <div className="all-products-section">
        <FilterGroup
          categoryOptions={categoryOptions}
          changeCategory={this.changeCategory}
          activeCategoryid={activeCategoryid}
          searchInput={searchInput}
          changeSearchInput={this.changeSearchInput}
          enterSearchInput={this.enterSearchInput}
          ratingsList={ratingsList}
          activeRatingId={activeRatingId}
          changeRating={this.changeRating}
        />
        {this.renderAllProducts()}
      </div>
    )
  }
}
export default AllProductSection
