'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function CinemasPage() {

  const [cinemas, setCinemas] = useState([])

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const cinemasLocalStorage = JSON.parse(localStorage.getItem("cinemas")) || []
    // Guarda a lista no estado cinemas
    setCinemas(cinemasLocalStorage)
    console.log(cinemasLocalStorage)
  }, [])
 
  // Função para exclusão do cinema
  function excluir(cinema) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o cinema ${cinema.nome}?`)) {
      // Filtra a lista antiga removendo o cinema recebido
      const novaLista = cinemas.filter(item => item.id !== cinema.id)
      // Grava no localStorage a nova lista
      localStorage.setItem('cinemas', JSON.stringify(novaLista))
      // Grava a nova lista no estado para renderizar na tela
      setCinemas(novaLista)
      alert("Cinema excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Cinemas"}>
      <div className='text-end mb-2'>
        <Button href='/cinemas/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os Cinemas */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Shopping</th>
            <th>Email</th>
            <th>Capacidade</th>
            <th>Funcionario</th>
            <th>Funcionamento</th>
            <th>Venda</th>
            <th>Exibição</th>
            <th>Shopping</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {cinemas.map(cinema => {
            return (
              <tr key={cinema.id}>
                <td>{cinema.nome}</td>
                <td>{cinema.email}</td>
                <td>{cinema.capacidade}</td>
                <td>{cinema.funcionario}</td>
                <td>{cinema.horario}</td>
                <td>{cinema.venda}</td>
                <td>{cinema.exibicao}</td>
                <td>{cinema.shopping}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/cinemas/form?id=${cinema.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(cinema)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  )
}
