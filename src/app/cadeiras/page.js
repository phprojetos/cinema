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

  // Carregar as informações passadas no localStorage
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
  const [clienteNome, setClienteNome] = useState(cliente?.nome || ''); // Nome do cliente
  const [quantidadeIngressos, setQuantidadeIngressos] = useState(quantidade || 1); // Quantidade de ingressos

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

    // Verifica se o número máximo de cadeiras foi selecionado
    if (selectedSeats.length >= quantidadeIngressos && !selectedSeats.includes(seatId)) {
      alert("Você já selecionou o número máximo de cadeiras.");
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

    // Criar uma cópia do objeto cliente e atualizar as cadeiras selecionadas
    const updatedClientes = [...clientes];
    const clienteIndex = updatedClientes.findIndex(c => c.id === id);
    if (clienteIndex !== -1) {
      updatedClientes[clienteIndex].cadeirasSelecionadas = selectedSeats;
    }
    localStorage.setItem('clientes', JSON.stringify(updatedClientes));

    alert("Cadeiras selecionadas com sucesso!");

    // Redireciona para a próxima página ou realiza outra ação
    router.push(`/confirmacao?id=${id}`);
  };

  // Função para limpar as cadeiras selecionadas
  const clearSelectedSeats = () => {
    setSelectedSeats([]);  // Limpa a seleção no estado

    // Criar uma cópia do objeto cliente e limpar as cadeiras selecionadas
    const updatedClientes = [...clientes];
    const clienteIndex = updatedClientes.findIndex(c => c.id === id);
    if (clienteIndex !== -1) {
      updatedClientes[clienteIndex].cadeirasSelecionadas = [];
    }
    localStorage.setItem('clientes', JSON.stringify(updatedClientes));

    alert("Cadeiras selecionadas foram limpas.");
  };

  // Função para limpar todas as cadeiras ocupadas (nova sessão de cinema)
  const clearAllOccupiedSeats = () => {
    setOccupiedSeats([]);  // Limpa todas as cadeiras ocupadas

    // Remove todas as cadeiras ocupadas do localStorage
    localStorage.removeItem(`ocupadas-${cinema?.nome}-${filme?.titulo}`);

    alert("Todas as cadeiras foram liberadas para uma nova sessão.");
  };

  // Verifica se todas as cadeiras estão ocupadas
  const allSeatsOccupied = occupiedSeats.length === rows * columns;

  return (
    <Pagina titulo={'Selecione sua Cadeira'}>
      <div className="container my-4">
       
        
        {/* Formulário para nome do cliente, filme e quantidade */}
        <div className="mb-4">
          <label htmlFor="nomeCliente" className="form-label">Nome do Cliente</label>
          <input
            type="text"
            className="form-control"
            id="nomeCliente"
            value={clienteNome}
            onChange={(e) => setClienteNome(e.target.value)}
            placeholder="Digite seu nome"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="quantidadeIngressos" className="form-label">Quantas cadeiras você comprou?</label>
          <input
            type="number"
            className="form-control"
            id="quantidadeIngressos"
            value={quantidadeIngressos}
            onChange={(e) => setQuantidadeIngressos(e.target.value)}
            min="1"
            max={rows * columns}
          />
        </div>

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

        {/* Botão para limpar as cadeiras selecionadas */}
        <div className="text-center mt-4">
          <button className="btn btn-secondary" onClick={clearSelectedSeats}>
            Limpar Seleção de Cadeiras
          </button>
        </div>

        {/* Botão "Nova Sessão de Cinema" */}
        {allSeatsOccupied && (
          <div className="text-center mt-4">
            <button className="btn btn-warning" onClick={clearAllOccupiedSeats}>
              Nova Sessão de Cinema
            </button>
          </div>
        )}
      </div>
    </Pagina>
  );
}
