'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen,FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function ClientesPage() {

  const [clientes, setClientes] = useState([])
  
  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const clientesLocalStorage = JSON.parse(localStorage.getItem("clientes")) || []
    // Guarda a lista no estado clientes
    setClientes(clientesLocalStorage)
    console.log(clientesLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(dados) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o cliente ${dados.nome}?`)) {
      // Filtra a lista antiga removendo o dados recebido
      const novaLista = clientes.filter(item => item.id !== dados.id)
      // Grava no localStorage a nova lista
      localStorage.setItem('clientes', JSON.stringify(novaLista))
      // Atualiza a lista no estado para renderizar na tela
      setClientes(novaLista)
      alert("Cliente excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Clientes"}>
      <div className='text-end mb-2'>
        <Button href='/clientes/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os clientes */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cnpj</th>
            <th>Telefone</th>
            <th>Cinema</th>
            <th>Filmes</th>
            <th>Comida/Bebida</th>
            <th>Ingresso(s)</th>
            <th>Tipo</th>
            <th>Valor</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => {
            return (
              <tr>
                <td>{cliente.nome}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.cinema}</td>
                <td>{cliente.filme}</td>
                <td>{cliente.consumo}</td>
                <td>{cliente.quantidade}</td>
                <td>{cliente.tipo}</td>
                <td>{cliente.valor}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/clientes/form?id=${cliente.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(cliente)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  )
}
