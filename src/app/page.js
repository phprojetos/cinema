'use client'

import Pagina from '@/components/Pagina'
import { Button, Card, Col, Row } from 'react-bootstrap'

export default function HomePage() {


  const shoppings = JSON.parse(localStorage.getItem("shoppings")) || []
  const cinemas = JSON.parse(localStorage.getItem("cinemas")) || []
  const filmes = JSON.parse(localStorage.getItem("filmes")) || []
  const consumos = JSON.parse(localStorage.getItem("consumos")) || []
  const clientes = JSON.parse(localStorage.getItem("clientes")) || []

  const lista = [
    {
      nome: "Shoppings",
      imagem: "https://deonibus.com/blog/wp-content/uploads/2020/08/principais-shoppings-sao-paulo.jpg", quantidade: shoppings.length,
      link: "/shoppings"
    },
    {
      nome: "Cinemas",
      imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuyDLJ4zy1fsgyXxIsSxXevCRRofUfjLAsTg&s", quantidade: cinemas.length,
      link: "/cinemas"
    },
    {
      nome: "Filmes",
      imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz9-1mwlQgk4_tlyYhWo84vQFDWXs9dbGHAw&s", quantidade: filmes.length,
      link: "/filmes"
    },
    {
      nome: "Itens de Consumo",
      imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx_77vHeGLlibIwIKtjO3JVIRc2TsT-sl7Jg&s", quantidade: consumos.length,
      link: "/consumos"
    },
    {
      nome: "Clientes",
      imagem: "https://classic.exame.com/wp-content/uploads/2024/07/bernardbodo.jpg?quality=70&strip=info&w=724", quantidade: clientes.length,
      link: "/clientes"
    },
    {
      nome: "Reserve sua Cadeira",
      imagem: "https://thumbs.dreamstime.com/b/escadas-e-cadeiras-em-um-cinema-3316736.jpg",
      link: "/cadeiras"
    },
  ]



  return (
    <Pagina titulo={"Projeto CINE"}>
      <Row md={3}>
        {lista.map(item => (
          <Col className='py-2'>
            <Card style={{height: '100%'}}>
              <Card.Img src={item.imagem} style={{ height: '100%' }} />
              <Card.Body>
                <Card.Title>{item.nome}</Card.Title>
                Cadastrados: {item.quantidade}
              </Card.Body>
              <Card.Footer className='text-end'>
                <Button href={item.link}>Ver Lista</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}

      </Row>
    </Pagina>
  )
}
