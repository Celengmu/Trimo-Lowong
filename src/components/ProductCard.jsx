import { Card, Button } from "react-bootstrap"
import { useCart } from "../context/CartContext"

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <Card>
      <Card.Img
  src={product.image}
  style={{ height: 250, objectFit: "cover" }}
/>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>Rp {product.price.toLocaleString()}</Card.Text>
        <Button variant="danger" onClick={() => addToCart(product)}>
          Tambah Pesanan
        </Button>
      </Card.Body>
    </Card>
  )
}