import products from "../data/products"
import { Row, Col, Container } from "react-bootstrap"
import ProductCard from "../components/ProductCard"

export default function Home() {
  return (
    <Container className="mt-4">
      <h3 className="mb-4">Menu Favorit</h3>
      <Row>
        {products.map(item => (
          <Col md={3} sm={6} xs={12} key={item.id} className="mb-4">
            <ProductCard product={item} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}