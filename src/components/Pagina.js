'use client'

import { Container, Nav, Navbar } from "react-bootstrap"




export default function Pagina({ titulo, children }) {

  return (
    <>
      {/* Barra de Navegação */}
      <Navbar bg="info" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/shoppings">Shopping</Nav.Link>
            <Nav.Link href="/cinemas">Cinema</Nav.Link>
            <Nav.Link href="/filmes">Filme</Nav.Link>
            <Nav.Link href="/consumos">Item para Consumo</Nav.Link>
            <Nav.Link href="/clientes">Clientes</Nav.Link>
            <Nav.Link href="/cadeiras">Cadeiras</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Barra de Titulo */}
      <div className="bg-primary text-center text-warning py-2">
        <h1>{titulo}</h1>
      </div>

      {/* Conteudo da Página */}
      <Container className="mt-2">
        {children}
      </Container>
    </>
  )
}
