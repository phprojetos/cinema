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

export default function FilmesFormPage(props) {

  // router -> hook para navegação de telas
  const router = useRouter()

  // Criar estados(react) para armazenar os dados dos selects
  const [paises, setPaises] = useState([])

  // Buscar a lista de shoppings no localStorage, se não existir, inicializa uma lista vazia
  const filmes = JSON.parse(localStorage.getItem('filmes')) || []
  const cinemas = JSON.parse(localStorage.getItem('cinemas')) || []

  // Recuperando id para edição
  const id = props.searchParams.id
  console.log(props.searchParams.id)
  // Buscar na lista o shopping com o ID recebido no parâmetro
  const filmesEditando = filmes.find(item => item.id == id)
  console.log(filmesEditando)


  // Carregar os dados na inicialização da página
  useEffect(() => {
    // Buscar os países da API, imprimir no log e guardar no armazenamento
    apiLocalidades.get('/paises').then(response => {
      console.log("paises >>> ", response.data)
      setPaises(response.data)
    })
  }, [])

  // Função para salvar os dados do form
  function salvar(dados) {
    // Se filmesEditando existe, mudar os dados e gravar no localStorage
    if(filmesEditando){
      Object.assign(filmesEditando, dados)
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem('filmes', JSON.stringify(filmes))
    } else {
      // Se filmesEditando não existe, é criação de um novo
      // Gerar um ID (Identificador único)
      dados.id = v4()
      // Adiciona o novo shopping na lista de filmes
      filmes.push(dados)
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem('filmes', JSON.stringify(filmes))
    }

    alert("Filme criado com sucesso!")
    router.push("/filmes")
  }

  // Campos do form e valores iniciais (default)
  const initialValues = {
    titulo: '',
    lancamento: '',
    duracao:'',
    genero:'',
    classificacao: '',
    pais: 'Brasil',
    cinema: '',
    cartaz: '',
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    titulo: Yup.string().required("Campo obrigatório"),
    lancamento: Yup.string().required("Campo obrigatório"),
    duracao: Yup.string().required("Campo obrigatório"),
    genero: Yup.string().required("Campo obrigatório"),
    classificacao: Yup.string().required("Campo obrigatório"),
    pais: Yup.string(),
    cinema: Yup.string().required("Campo obrigatório"),
    cartaz: Yup.string().required("Campo obrigatório"),
  })

  return (
    <Pagina titulo={"Cadastro de Filmes"}>

      {/* Formulário */}
      <Formik
        // Atributos do formik
        // Se for edição, coloca os dados do filmesEditando
        // Se for novo, coloca os initialValues com os valores vazios
        initialValues={filmesEditando || initialValues}
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
                  <h1 >Dados do Filme</h1>
                  <hr></hr>
                </div>
                
                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Titulo do Filme:</Form.Label>
                    <Form.Control
                      name='titulo'
                      type='text'
                      placeholder="Ex: Batman, O Cavaleiro das Trevas"
                      value={values.titulo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.titulo && !errors.titulo}
                      isInvalid={touched.titulo && errors.titulo}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.titulo}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Data de lançamento:</Form.Label>
                    <Form.Control
                      as={ReactInputMask}
                      mask={"99/99/9999"}
                      name='lancamento'
                      type='text'
                      placeholder="Ex: 12/12/2012"
                      value={values.lancamento}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.lancamento && !errors.lancamento}
                      isInvalid={touched.lancamento && errors.lancamento}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.lancamento}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Duração:</Form.Label>
                    <Form.Control
                      as={ReactInputMask}
                      mask={"99hs e 99 min"}
                      name='duracao'
                      type='text'
                      value={values.duracao}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.duracao && !errors.duracao}
                      isInvalid={touched.duracao && errors.duracao}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.duracao}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Genêro:</Form.Label>
                    <Form.Control
                      name='genero'
                      type='text'
                      placeholder="Ex: Ação"
                      value={values.genero}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.genero && !errors.genero}
                      isInvalid={touched.genero && errors.genero}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.genero}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <div className='my-3 text-center'>
                  <h1 >Complemento</h1>
                  <hr></hr>
                </div>
                
                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Classificação Indicativa:</Form.Label>
                    <Form.Select
                      name='classificacao'
                      type='text'
                      value={values.classificacao}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.classificacao && !errors.classificacao}
                      isInvalid={touched.classificacao && errors.classificacao}
                    >
                      <option value=''>Selecione</option>
                      <option value='Livre'>Livre</option>
                      <option value='Acima de 12 anos'>Acima de 12 anos</option>
                      <option value='Acima de 14 anos'>Acima de 14 anos</option>
                      <option value='Acima de 16 anos'>Acima de 16 anos</option>
                      <option value='Acima de 18 anos'>Acima de 18 anos</option>
                      </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.classificacao}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>País de Origem:</Form.Label>
                    <Form.Select
                      name='pais'
                      value={values.pais}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.pais && !errors.pais}
                      isInvalid={touched.pais && errors.pais}
                    >
                      <option value="">Selecione</option>
                      {paises.map(pais => <option key={pais.nome} value={pais.nome}>{pais.nome}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.pais}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Cinema em Exibição:</Form.Label>
                    <Form.Select
                      name='cinema'
                      value={values.cinema}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.cinema && !errors.cinema}
                      isInvalid={touched.cinema && errors.cinema}
                    >
                     <option value=''>Selecione o Cinema</option>
                      {cinemas.map(cinema => (
                        <option key={cinema.id} value={cinema.nome}>{cinema.nome}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.estado}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Cartaz do Filme:</Form.Label>
                    <Form.Control
                      type="text"
                      name="cartaz"
                      value={values.cartaz}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.cartaz && !errors.cartaz}
                      isInvalid={touched.cartaz && errors.cartaz}
                    />
                    <Form.Control.Feedback type="invalid">{errors.cartaz}</Form.Control.Feedback>

                    {values.cartaz && (
                      <div style={{ marginTop: '10px', textAlign: 'center' }}>
                        
                      </div>
                    )}
                  </Form.Group>

                </Row>

                {/* Botões */}
                <Form.Group className='text-end'>
                  <Button className='me-2' href='/filmes'><FaArrowLeft /> Voltar</Button>
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
