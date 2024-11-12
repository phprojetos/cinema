'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen,FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function ShoppingsPage() {

  const [shoppings, setShoppings] = useState([])
  
  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const shoppingsLocalStorage = JSON.parse(localStorage.getItem("shoppings")) || []
    // Guarda a lista no estado shoppings
    setShoppings(shoppingsLocalStorage)
    console.log(shoppingsLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(dados) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o shopping ${dados.nome}?`)) {
      // Filtra a lista antiga removendo o dados recebido
      const novaLista = shoppings.filter(item => item.id !== dados.id)
      // Grava no localStorage a nova lista
      localStorage.setItem('shoppings', JSON.stringify(novaLista))
      // Atualiza a lista no estado para renderizar na tela
      setShoppings(novaLista)
      alert("Shopping excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Shoppings"}>
      <div className='text-end mb-2'>
        <Button href='/shoppings/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os shoppings */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nome</th>
            <th>Cnpj</th>
            <th>Administrador</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>País</th>
            <th>Estado</th>
            <th>Cidade</th>
            <th>Cinema</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {shoppings.map(shopping => {
            return (
              <tr>
                <td><img src={shopping.foto} alt="Foto do Shopping" style={{ width: '100px', height: '100px' }} />
                </td>
                <td>{shopping.nome}</td>
                <td>{shopping.cnpj}</td>
                <td>{shopping.administrador}</td>
                <td>{shopping.telefone}</td>
                <td>{shopping.endereco}</td>
                <td>{shopping.pais}</td>
                <td>{shopping.estado}</td>
                <td>{shopping.cidade}</td>
                <td>{shopping.temCinema ? "Sim" : "Não"}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/shoppings/form?id=${shopping.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(shopping)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  )
}
