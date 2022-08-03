import CartContainer from './components/CartContainer'
import NavBar from './components/NavBar'
import Modal from './components/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTotal, getCartItems } from './features/cart/cartSlice'
import { useEffect } from 'react'

function App() {
  const { cartItems, isLoading } = useSelector((store) => store.cart)
  const { isOpen } = useSelector((store) => store.modal)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotal())
  }, [cartItems])

  useEffect(() => {
    dispatch(getCartItems())
  }, [])

  if (isLoading) {
    return <h3>Loading ...</h3>
  }

  return (
    <main>
      {isOpen && <Modal />}
      <NavBar />
      <CartContainer />
    </main>
  )
}
export default App
