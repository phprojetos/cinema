'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen,FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function FilmesPage() {

  const [filmes, setFilmes] = useState([])
  
  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const filmeslocalStarage = JSON.parse(localStorage.getItem("filmes")) || []
    // Guarda a lista no estado filmes
    setFilmes(filmeslocalStarage)
    console.log(filmeslocalStarage)
  }, [])

  // Função para exclusão do item
  function excluir(dados) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o filme ${dados.nome}?`)) {
      // Filtra a lista antiga removendo o dados recebido
      const novaLista = filmes.filter(item => item.id !== dados.id)
      // Grava no localStorage a nova lista
      localStorage.setItem('filmes', JSON.stringify(novaLista))
      // Atualiza a lista no estado para renderizar na tela
      setFilmes(novaLista)
      alert("Filme excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Filmes"}>
      <div className='text-end mb-2'>
        <Button href='/filmes/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os filmes */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Cartaz do Filme</th>
            <th>Titulo do Filme</th>
            <th>Data de lançamento</th>
            <th>Duração</th>
            <th>Genêro</th>
            <th>Classificação Indicativa</th>
            <th>Origem</th>
            <th>Cinema em Exibição</th>
          </tr>
        </thead>
        <tbody>
          {filmes.map(filme => {
            return (
              <tr>
                <td><img src={filme.cartaz} alt="Cartaz do Filme" style={{ width: '100px', height: '100px' }} />
                </td>
                <td>{filme.titulo}</td>
                <td>{filme.lancamento}</td>
                <td>{filme.duracao}</td>
                <td>{filme.genero}</td>
                <td>{filme.classificacao}</td>
                <td>{filme.pais}</td>
                <td>{filme.cinema}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/filmes/form?id=${filme.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(filme)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  )
}
