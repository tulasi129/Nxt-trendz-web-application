import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Cart from '../Cart'

const ProtectedRoute = () => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return <Route exact path="/cart" component={Cart} />
}
export default ProtectedRoute
