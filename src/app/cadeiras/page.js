'use client';  // Adicionando o "use client" para tornar o componente de cliente

import Pagina from '@/components/Pagina';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Função principal do componente
export default function Cinema({ searchParams }) {
  // A quantidade de cadeiras pode ser configurada conforme necessário
  const rows = 5; // 5 filas de cadeiras
  const columns = 8; // 8 cadeiras por fila

  // Recuperando os dados passados na URL (id do cliente e quantidade de ingressos)
  const router = useRouter();
  const { id, quantidade } = searchParams;

  // Carregar as informações do localStorage
  const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  const filmes = JSON.parse(localStorage.getItem('filmes')) || [];
  const cinemas = JSON.parse(localStorage.getItem('cinemas')) || [];
  const consumos = JSON.parse(localStorage.getItem('consumos')) || [];

  // Encontrando o cliente e suas informações de filme e cinema
  const cliente = clientes.find(c => c.id === id);
  const filme = filmes.find(f => f.titulo === cliente?.filme);
  const cinema = cinemas.find(c => c.nome === cliente?.cinema);
  const consumo = consumos.find(c => c.comida === cliente?.consumo);

  // Estado que guarda as cadeiras selecionadas (usando um array de objetos {row, col})
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);  // Cadeiras já ocupadas

  useEffect(() => {
    // Carregar as cadeiras ocupadas para o filme e cinema selecionado
    const storedOccupiedSeats = JSON.parse(localStorage.getItem(`ocupadas-${cinema?.nome}-${filme?.titulo}`)) || [];
    setOccupiedSeats(storedOccupiedSeats);
  }, [cinema, filme]);

  // Função para gerenciar a seleção/deseleção das cadeiras
  const toggleSeat = (row, col) => {
    const seatId = `${row}-${col}`;
    
    // Verifica se a cadeira já foi ocupada por outro cliente
    if (occupiedSeats.includes(seatId)) {
      alert("Esta cadeira já foi ocupada por outro cliente!");
      return;
    }
    
    setSelectedSeats(prev => {
      // Se a cadeira já estiver selecionada, desmarcamos
      if (prev.includes(seatId)) {
        return prev.filter(seat => seat !== seatId);
      }
      // Caso contrário, adicionamos à seleção
      return [...prev, seatId];
    });
  };

  // Função para salvar as seleções de cadeiras no localStorage
  const saveSeats = () => {
    // Salvar as cadeiras selecionadas no localStorage
    const newOccupiedSeats = [...occupiedSeats, ...selectedSeats];
    setOccupiedSeats(newOccupiedSeats);
    
    // Atualiza o localStorage com as novas cadeiras ocupadas
    localStorage.setItem(`ocupadas-${cinema?.nome}-${filme?.titulo}`, JSON.stringify(newOccupiedSeats));
    
    // Atualiza a seleção de cadeiras no cliente
    cliente.cadeirasSelecionadas = selectedSeats;
    localStorage.setItem('clientes', JSON.stringify(clientes));
    
    alert("Cadeiras selecionadas com sucesso!");

    // Redireciona para a próxima página ou realiza outra ação
    router.push(`/confirmacao?id=${cliente.id}`);
  };

  return (
    <Pagina titulo={'Selecione sua Cadeira'}>
      <div className="container my-4">
        <h1 className="text-center mb-4">Sala de Cinema</h1>
        <h3>Cinema: {cinema?.nome} | Filme: {filme?.titulo}</h3>
        <h4>Consumo: {consumo?.comida || 'Nenhum'}</h4>
        <h4>Quantidade de ingressos: {quantidade}</h4>
        <div className="d-flex flex-column align-items-center">
          {Array.from({ length: rows }).map((_, row) => (
            <div key={row} className="d-flex justify-content-center mb-2">
              {Array.from({ length: columns }).map((_, col) => {
                const seatId = `${row}-${col}`;
                const isSelected = selectedSeats.includes(seatId);
                const isOccupied = occupiedSeats.includes(seatId);
                return (
                  <div
                    key={col}
                    className={`seat border rounded m-1 d-flex align-items-center justify-content-center cursor-pointer
                        ${isSelected ? 'bg-success text-white' : isOccupied ? 'bg-danger text-white' : 'bg-light'}`}
                    style={{ width: '40px', height: '40px' }}
                    onClick={() => !isOccupied && toggleSeat(row, col)}
                  >
                    {isSelected ? '✔' : ''}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h3>Cadeiras Selecionadas:</h3>
          <ul className="list-group">
            {selectedSeats.length > 0 ? (
              selectedSeats.map(seat => (
                <li key={seat} className="list-group-item">
                  {seat}
                </li>
              ))
            ) : (
              <li className="list-group-item">Nenhuma cadeira selecionada</li>
            )}
          </ul>
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={saveSeats}>
            Confirmar Seleção de Cadeiras
          </button>
        </div>
      </div>
    </Pagina>
  );
}
