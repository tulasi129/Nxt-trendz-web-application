import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import ProductCard from '../ProductCard'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoading: 'ISLOADING',
}
class PrimeDealSection extends Component {
  state = {productList: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiConstants.isLoading,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/prime-deals'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const newData = fetchedData.prime_deals.map(each => ({
        title: each.title,
        brand: each.brand,
        price: each.price,
        id: each.id,
        imageUrl: each.image_url,
        rating: each.rating,
      }))
      this.setState({productList: newData, apiStatus: apiConstants.success})
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderLoadingview = () => (
    <div className="products-loader-container">
      <Loader type="three-dots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureview = () => (
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

  getPrimeProducts = () => {
    const {productList} = this.state
    return (
      <div className="prime-deals-container">
        <h1 className="">Exclusive Prime Deals</h1>
        <ul className="primedeals-list">
          {productList.map(each => (
            <ProductCard productList={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderPrimeProducts = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.getPrimeProducts()
      case apiConstants.failure:
        return this.renderFailureview()
      case apiConstants.isLoading:
        return this.renderLoadingview()
      default:
        return null
    }
  }

  render() {
    return <div className="">{this.renderPrimeProducts()}</div>
  }
}
export default PrimeDealSection
