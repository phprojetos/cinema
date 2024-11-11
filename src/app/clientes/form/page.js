'use client'

import Pagina from '@/components/Pagina'
import apiLocalidades from '@/services/apiLocalidades'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'
import ReactInputMask from 'react-input-mask'

export default function ClientesFormPage(props) {

  // router -> hook para navegação de telas
  const router = useRouter()

    // Buscar a lista de clientes no localStorage, se não existir, inicializa uma lista vazia
  const clientes = JSON.parse(localStorage.getItem('clientes')) || []
  const filmes = JSON.parse(localStorage.getItem('filmes')) || []
  const cinemas = JSON.parse(localStorage.getItem('cinemas')) || []
  const consumos = JSON.parse(localStorage.getItem('consumos')) || []

  // Recuperando id para edição
  const id = props.searchParams.id
  console.log(props.searchParams.id)
  // Buscar na lista o cliente com o ID recebido no parâmetro
  const clienteEditado = clientes.find(item => item.id == id)
  console.log(clienteEditado)



// Função para salvar os dados do form
function salvar(dados) {
  // Se clienteEditado existe, mudar os dados e gravar no localStorage
  if(clienteEditado){
    Object.assign(clienteEditado, dados)
    // Substitui a lista antiga pela nova no localStorage
    localStorage.setItem('clientes', JSON.stringify(clientes))
  } else {
    // Se clienteEditado não existe, é criação de um novo
    // Gerar um ID (Identificador único)
    dados.id = v4()
    // Adiciona o novo cliente na lista de clientes
    clientes.push(dados)
    // Substitui a lista antiga pela nova no localStorage
    localStorage.setItem('clientes', JSON.stringify(clientes))
  }

  alert("cliente criado com sucesso!")
  
  // Redirecionar para a página de seleção de cadeiras, passando os dados necessários
  router.push("/clientes")
}


  // Campos do form e valores iniciais (default)
  const initialValues = {
    nome: '',
    cpf: '',
    telefone:'',
    cinema:'',
    filme: '',
    consumo: '',
    quantidade: '',
    tipo: '',
    valor: '',
    
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    cpf: Yup.string().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    cinema: Yup.string().required("Campo obrigatório"),
    filme: Yup.string().required("Campo obrigatório"),
    consumo: Yup.string().required("Campo obrigatório"),
    quantidade: Yup.string().required("Campo obrigatório"),
    tipo: Yup.string().required("Campo obrigatório"),
    valor: Yup.string().required("Campo obrigatório"),
    
  })

  return (
    <Pagina titulo={"Cadastro de Cliente"}>

      {/* Formulário */}
      <Formik
        // Atributos do formik
        // Se for edição, coloca os dados do clienteEditado
        // Se for novo, coloca os initialValues com os valores vazios
        initialValues={clienteEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {/* Construção do template do formulário */}
        {
          // Os valores e funções do Formik
          ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {

    

            // Retorno com o template JSX do formulário
            return (
              <Form onSubmit={handleSubmit}>
                {/* Campos do formulário */}
                
                <div className='my-3 text-center'>
                  <h1 >Dados Pessoais</h1>
                  <hr></hr>
                </div>
                
                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control
                      name='nome'
                      type='text'
                      placeholder="Ex: Gustavo Clay"
                      value={values.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.nome && !errors.nome}
                      isInvalid={touched.nome && errors.nome}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.nome}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Cfp:</Form.Label>
                    <Form.Control
                      as={ReactInputMask}
                      mask={"999.999.999-99"}
                      name='cpf'
                      type='text'
                      placeholder="Ex: 12.123.123/0001-12"
                      value={values.cpf}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.cpf && !errors.cpf}
                      isInvalid={touched.cpf && errors.cpf}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.cpf}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Telefone:</Form.Label>
                    <Form.Control
                      as={ReactInputMask}
                      mask={"(99)99999-9999"}
                      name='telefone'
                      type='text'
                      placeholder="Ex: (61)98765-4321"
                      value={values.telefone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.telefone && !errors.telefone}
                      isInvalid={touched.telefone && errors.telefone}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.telefone}</Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <div className='my-3 text-center'>
                  <h1 >Cadastro de Serviço</h1>
                  <hr></hr>
                </div>
                

                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Cinema:</Form.Label>
                    <Form.Select
                      name='cinema'
                      value={values.cinema}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.cinema && !errors.cinema}
                      isInvalid={touched.cinema && errors.cinema}
                    >
                      <option value=''>Selecione o cinema</option>
                      {cinemas.map(cinema => (
                        <option key={cinema.id} value={cinema.nome}>{cinema.nome}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.cinema}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Filmes:</Form.Label>
                    <Form.Select
                      name='filme'
                      value={values.filme}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.filme && !errors.filme}
                      isInvalid={touched.filme && errors.filme}
                    >
                      <option value=''>Selecione o filme</option>
                      {filmes.map(filme => (
                        <option key={filme.id} value={filme.titulo}>{filme.titulo}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.filme}</Form.Control.Feedback>
                  </Form.Group>
                 
                </Row>

                <Row className='mb-2'>
                <Form.Group as={Col}>
                    <Form.Label>Comidas/Bedidas:</Form.Label>
                    <Form.Select
                      name='consumo'
                      value={values.consumo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.consumo && !errors.consumo}
                      isInvalid={touched.consumo && errors.consumo}
                    >
                      <option value=''>Selecione o consumo</option>
                      {consumos.map(consumo => (
                        <option key={consumo.id} value={consumo.comida}>{consumo.comida}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.consumo}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className='mb-2'>
                <Form.Group as={Col}>
                    <Form.Label>Quantidade de ingressos:</Form.Label>
                    <Form.Control
                      name='quantidade'
                      type='number'
                      min={1}
                      placeholder="Ex: 200"
                      value={values.quantidade}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.quantidade && !errors.quantidade}
                      isInvalid={touched.quantidade && errors.quantidade}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.quantidade}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Tipo do Ingresso:</Form.Label>
                    <Form.Select
                      name='tipo'
                      value={values.tipo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.tipo && !errors.tipo}
                      isInvalid={touched.tipo && errors.tipo}
                    >
                      <option value="">Selecione</option>
                      <option value='Inteira'>Inteira</option>
                      <option value='Meia'>Meia</option>
                      <option value='Voucher'>Voucher</option>
                     
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.tipo}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Valor Total:</Form.Label>
                    <Form.Control
                      as={ReactInputMask}
                      mask={"R$99,99"}
                      name='valor'
                      type='text'
                      placeholder="Ex: R$50,00"
                      value={values.valor}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.valor && !errors.valor}
                      isInvalid={touched.valor && errors.valor}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.valor}</Form.Control.Feedback>
                  </Form.Group>

                </Row>              

                {/* Botões */}
                <Form.Group className='text-end'>
                  <Button className='me-2' href='/clientes'><FaArrowLeft /> Voltar</Button>
                  <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
                </Form.Group>

              </Form>
            )
          }
        }
      </Formik>

    </Pagina>
  )
}
