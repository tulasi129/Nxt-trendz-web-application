import Header from '../Header'
import AllProductSection from '../AllProductSection'
import PrimeDealSection from '../PrimeDealSection'
import './index.css'

const Products = () => (
  <>
    <Header />
    <div className="products-container">
      <PrimeDealSection />
      <AllProductSection />
    </div>
  </>
)

export default Products
