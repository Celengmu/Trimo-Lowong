import { Container, Card, Button, Form } from "react-bootstrap"
import { useCart } from "../context/CartContext"

export default function Checkout() {
  const { cart, updateQty, removeFromCart } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  if (cart.length === 0) {
    return (
      <Container className="mt-4 text-center">
        <h5>Belum ada pesanan</h5>
      </Container>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const name = e.target.name.value
    const address = e.target.address.value
    const note = e.target.note.value

    let message = `*🧾 NOTA PESANAN*\n\n`
    message += `Nama: ${name}\n`
    message += `Alamat: ${address}\n\n`
    message += `*Pesanan:*\n`

    cart.forEach(item => {
      message += `- ${item.name} x${item.qty} = Rp ${(item.price * item.qty).toLocaleString()}\n`
    })

    message += `\n*Total: Rp ${total.toLocaleString()}*`
    if (note) message += `\n\nCatatan: ${note}`

    window.open(
      `https://wa.me/6281229648671?text=${encodeURIComponent(message)}`,
      "_blank"
    )
  }

  return (
    <Container className="mt-3 mb-5">

      <h4 className="mb-3">Checkout</h4>

      {/* LIST PESANAN */}
      {cart.map(item => (
        <Card key={item.id} className="mb-3 shadow-sm">
          <Card.Body>

            {/* HEADER */}
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

            {/* QTY */}
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

      {/* RINGKASAN TOTAL */}
      <Card className="p-3 shadow-sm mb-3">
        <div className="d-flex justify-content-between">
          <strong>Total Pembayaran</strong>
          <strong>Rp {total.toLocaleString()}</strong>
        </div>
      </Card>

      {/* FORM PEMESAN */}
      <Card className="p-3 shadow-sm">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Control
              name="name"
              placeholder="Nama Pemesan"
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              name="address"
              placeholder="Alamat Lengkap"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              name="note"
              placeholder="Catatan (opsional)"
            />
          </Form.Group>

          <Button
            type="submit"
            variant="success"
            size="lg"
            className="w-100"
          >
            Pesan via WhatsApp
          </Button>
        </Form>
      </Card>

    </Container>
  )
}