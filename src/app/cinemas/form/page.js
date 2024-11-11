'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import ReactInputMask from 'react-input-mask'
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function CinemaFormPage(props) {

  // router -> hook para navegação de telas
  const router = useRouter()

  // Busca a lista de cinemas no localStorage, se não existir, inicializa uma lista vazia
  const cinemas = JSON.parse(localStorage.getItem('cinemas')) || []
  const shoppings = JSON.parse(localStorage.getItem('shoppings')) || []

  // Recuperando id para edição
  const id = props.searchParams.id
  const cinemaEditado = cinemas.find(item => item.id == id)

  // função para salvar os dados do form
  function salvar(dados) {
    // Se cinemaEditado existe, mudar os dados e gravar no localStorage
    if (cinemaEditado) {
      Object.assign(cinemaEditado, dados)
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem('cinemas', JSON.stringify(cinemas))
    } else {
      // Se cinemaEditado não existe, é criação de um novo
      // Gerar um ID (Identificador único)
      dados.id = v4()
      // Adiciona o novo cinema na lista de cinemas
      cinemas.push(dados)
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem('cinemas', JSON.stringify(cinemas))
    }

    alert("Cinema cadastrado com sucesso!")
    router.push("/cinemas")
  }

  // Campos do form e valores iniciais (default)
  const initialValues = {
    nome: '',
    email: '',
    capacidade: '',
    funcionario: '',
    horario: '',
    venda: '',
    exibicao: '',
    shopping: ''
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    email: Yup.string().required("Campo obrigatório"),
    capacidade: Yup.number().min(1, "Capacidade inválida").required("Campo obrigatório"),
    funcionario: Yup.number().min(1, "Capacidade inválida").required("Campo obrigatório"),
    horario: Yup.string().required("Campo obrigatório"),
    venda: Yup.string().required("Campo obrigatório"),
    exibicao: Yup.string().required("Campo obrigatório"),
    shopping: Yup.string().required("Campo obrigatório")
  })

  return (
    <Pagina titulo={"Cadastro de Cinema"}>

      {/* Formulário */}
      <Formik
        // Se for edição, coloca os dados de cinemaEditado
        // Se for novo, coloca o initialValues com os valores vazios
        initialValues={cinemaEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {/* Construção do template do formulário */}
        {
          // os valores e funções do formik
          ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {

            return (
              <Form onSubmit={handleSubmit}>
                {/* Campos do form */}
                <Row className='mb-3' md={3}>
                  <Form.Group as={Col}>
                    <Form.Label>Nome do Cinema:</Form.Label>
                    <Form.Control
                      name='nome'
                      type='text'
                      placeholder="Ex: Cinema do Shopping X"
                      value={values.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.nome && !errors.nome}
                      isInvalid={touched.nome && errors.nome}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.nome}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      name='email'
                      type='email'
                      placeholder="Ex: contato@cinema.com"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.email && !errors.email}
                      isInvalid={touched.email && errors.email}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Capacidade:</Form.Label>
                    <Form.Control
                      name='capacidade'
                      type='number'
                      min={1}
                      placeholder="Ex: 200"
                      value={values.capacidade}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.capacidade && !errors.capacidade}
                      isInvalid={touched.capacidade && errors.capacidade}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.capacidade}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Quantidade de Funcionários:</Form.Label>
                    <Form.Control
                      name='funcionario'
                      type='number'
                      min={1}
                      placeholder="Ex: 10"
                      value={values.funcionario}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.funcionario && !errors.funcionario}
                      isInvalid={touched.funcionario && errors.funcionario}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.funcionario}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Horário de Funcionamento:</Form.Label>
                    <Form.Control
                      as={ReactInputMask}
                      mask={"99:99"}
                      name='horario'
                      type='text'
                      placeholder="Ex: 09:00"
                      value={values.horario}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.horario && !errors.horario}
                      isInvalid={touched.horario && errors.horario}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.horario}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Tipos de Venda:</Form.Label>
                    <Form.Select
                      name='venda'
                      value={values.venda}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.venda && !errors.venda}
                      isInvalid={touched.venda && errors.venda}
                    >
                      <option value=''>Selecione o tipo de venda</option>
                      <option value='Balcão'>Balcão</option>
                      <option value='Online'>Online</option>
                      <option value='Balcão/Online'>Balcão/Online</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.venda}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Formato de Exibição:</Form.Label>
                    <Form.Select
                      name='exibicao'
                      value={values.exibicao}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.exibicao && !errors.exibicao}
                      isInvalid={touched.exibicao && errors.exibicao}
                    >
                      <option value=''>Selecione o formato</option>
                      <option value='2D'>2D</option>
                      <option value='3D'>3D</option>
                      <option value='IMAX'>IMAX</option>
                      <option value='2D/3D'>2D/3D</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.exibicao}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Shopping:</Form.Label>
                    <Form.Select
                      name='shopping'
                      value={values.shopping}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.shopping && !errors.shopping}
                      isInvalid={touched.shopping && errors.shopping}
                    >
                      <option value=''>Selecione o shopping</option>
                      {shoppings.map(shopping => (
                        <option key={shopping.id} value={shopping.nome}>{shopping.nome}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.shopping}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                {/* Botões */}
                <Form.Group className='text-end'>
                  <Button className='me-2' href='/cinemas'><FaArrowLeft /> Voltar</Button>
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
