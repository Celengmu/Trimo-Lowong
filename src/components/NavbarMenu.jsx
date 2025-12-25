import { Navbar, Container, Badge } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { FaHome, FaShoppingCart } from "react-icons/fa"

export default function NavbarMenu() {
  const { cart } = useCart()

  return (
    <Navbar bg="danger" variant="dark" fixed="top">
      <Container className="d-flex justify-content-between">

        {/* HOME ICON */}
        <Link to="/" className="text-white fs-4">
          <FaHome />
        </Link>

        {/* LOGO / BRAND */}
        <Navbar.Brand className="fw-bold">
          TrimoLowong
        </Navbar.Brand>

        {/* CART ICON */}
        <Link to="/cart" className="text-white position-relative fs-4">
          <FaShoppingCart />

          {cart.length > 0 && (
            <Badge
              bg="light"
              text="dark"
              pill
              className="position-absolute top-0 start-100 translate-middle"
            >
              {cart.length}
            </Badge>
          )}
        </Link>

      </Container>
    </Navbar>
  )
}