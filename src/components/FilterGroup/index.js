import {BsSearch} from 'react-icons/bs'
import './index.css'

const FilterGroup = props => {
  const renderRatingsFiltersList = () => {
    const {ratingsList} = props

    return ratingsList.map(rating => {
      const {changeRating, activeRatingId} = props
      const onClickRatingItem = () => changeRating(rating.ratingId)

      const ratingClassName =
        activeRatingId === rating.ratingId ? `and-up active-rating` : `and-up`

      return (
        <li
          className="rating-item"
          key={rating.ratingId}
          onClick={onClickRatingItem}
        >
          <img
            src={rating.imageUrl}
            alt={`rating ${rating.ratingId}`}
            className="rating-img"
          />
          <p className={ratingClassName}>& up</p>
        </li>
      )
    })
  }

  const renderRatingsFilters = () => (
    <div>
      <h1 className="rating-heading">Rating</h1>
      <ul className="ratings-list">{renderRatingsFiltersList()}</ul>
    </div>
  )

  const rendercategoryList = () => {
    const {categoryOptions} = props
    return categoryOptions.map(eachOption => {
      const {activeCategoryid, changeCategory} = props
      const onClicKCategoryItem = () => changeCategory(eachOption.categoryId)
      const isActive = eachOption.categoryId === activeCategoryid
      const categoryClassName = isActive
        ? 'categoryname active-category-name'
        : 'categoryname'

      return (
        <li
          className="each-category"
          key={eachOption.categoryId}
          onClick={onClicKCategoryItem}
        >
          <p className={categoryClassName}>{eachOption.name}</p>
        </li>
      )
    })
  }

  const rendercategory = () => (
    <>
      <h1 className="category-heading">Category</h1>
      <ul className="category-list">{rendercategoryList()}</ul>
    </>
  )

  const onEnterSerchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  const rendersearchInput = () => {
    const {searchInput} = props
    return (
      <div className="search-container">
        <input
          type="search"
          placeholder="search"
          onChange={onSearchInput}
          onKeyDown={onEnterSerchInput}
          value={searchInput}
          className="inputElement"
        />
        <BsSearch className="search-icon" />
      </div>
    )
  }

  return (
    <div className="filter-group-container">
      {rendersearchInput()}
      {rendercategory()}
      {renderRatingsFilters()}
    </div>
  )
}
export default FilterGroup
