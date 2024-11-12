'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen,FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function ConsumosPage() {

  const [consumos, setConsumos] = useState([])
  
  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const consumosLocalStorage = JSON.parse(localStorage.getItem("consumos")) || []
    // Guarda a lista no estado consumos
    setConsumos(consumosLocalStorage)
    console.log(consumosLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(dados) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o consumo ${dados.nome}?`)) {
      // Filtra a lista antiga removendo o dados recebido
      const novaLista = consumos.filter(item => item.id !== dados.id)
      // Grava no localStorage a nova lista
      localStorage.setItem('consumos', JSON.stringify(novaLista))
      // Atualiza a lista no estado para renderizar na tela
      setConsumos(novaLista)
      alert("Consumo excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Consumo"}>
      <div className='text-end mb-2'>
        <Button href='/consumos/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os consumo */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Foto do Item</th>
            <th>Cinema</th>
            <th>Comidas/Bebidas</th>
            <th>Sabor</th>
            <th>Tamanho</th>
            <th>Refil</th>
            <th>Preço</th>
            <th>Pagamento</th>
            <th>Compra</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {consumos.map(consumo => {
            return (
              <tr key={consumo.id}>
                <td><img src={consumo.foto} alt="Foto do Item" style={{ width: '100px', height: '100px' }} />
                </td>
                <td>{consumo.cinema}</td>
                <td>{consumo.comida}</td>
                <td>{consumo.sabor}</td>
                <td>{consumo.tamanho}</td>
                <td>{consumo.refil}</td>
                <td>{consumo.preco}</td>
                <td>{consumo.pagamento}</td>
                <td>{consumo.compra}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/consumos/form?id=${consumo.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(consumo)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  )
}
