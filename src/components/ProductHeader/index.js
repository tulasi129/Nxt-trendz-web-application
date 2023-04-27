import {BsFilterRight} from 'react-icons/bs'

import './index.css'

const ProductHeader = props => {
  const {sortbyOptions, activeOptionId, changeOptionId} = props

  const changeActioveOption = event => {
    changeOptionId(event.target.value)
  }
  return (
    <div className="products-header">
      <h1 className="products-list-heading">All Products</h1>
      <div className="sort-container">
        <BsFilterRight className="filter-icon" />
        <p className="sortBy">Sort By</p>
        <select
          value={activeOptionId}
          onChange={changeActioveOption}
          className="slectoption"
        >
          {sortbyOptions.map(each => (
            <option
              key={each.optionId}
              value={each.optionId}
              className="each-option"
            >
              {each.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
export default ProductHeader
