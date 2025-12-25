import { Container, Card, Button } from "react-bootstrap"
import { useCart } from "../context/CartContext"
import { Link } from "react-router-dom"

export default function Cart() {
  const { cart, updateQty, removeFromCart } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  if (cart.length === 0) {
    return (
      <Container className="mt-4 text-center">
        <h5>Keranjang masih kosong</h5>
        <Button as={Link} to="/" variant="danger">
          Kembali ke Menu
        </Button>
      </Container>
    )
  }

  return (
    <Container className="mt-3 mb-5">
      <h4 className="mb-3">Keranjang Pesanan</h4>

      {cart.map(item => (
        <Card key={item.id} className="mb-3 shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="mb-1">{item.name}</h6>
                <small className="text-muted">
                  Rp {item.price.toLocaleString()}
                </small>
              </div>

              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => removeFromCart(item.id)}
              >
                Hapus
              </Button>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="d-flex align-items-center">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  disabled={item.qty <= 1}
                >
                  −
                </Button>

                <span className="mx-3 fw-bold">{item.qty}</span>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => updateQty(item.id, item.qty + 1)}
                >
                  +
                </Button>
              </div>

              <strong>
                Rp {(item.price * item.qty).toLocaleString()}
              </strong>
            </div>
          </Card.Body>
        </Card>
      ))}

      {/* TOTAL */}
      <Card className="p-3 shadow-sm">
        <div className="d-flex justify-content-between">
          <strong>Total</strong>
          <strong>Rp {total.toLocaleString()}</strong>
        </div>

        <Button
          as={Link}
          to="/checkout"
          variant="success"
          size="lg"
          className="mt-3"
        >
          Lanjut Checkout
        </Button>
      </Card>
    </Container>
  )
}