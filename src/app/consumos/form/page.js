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

export default function ConsumoFormPage(props) {

  const router = useRouter()
  const consumos = JSON.parse(localStorage.getItem('consumos')) || []
  const cinemas = JSON.parse(localStorage.getItem('cinemas')) || []

  const id = props.searchParams.id
  console.log(props.searchParams.id)
  const consumoEditado = consumos.find(item => item.id == id)
  console.log(consumoEditado)

  function salvar(dados) {
    if(consumoEditado){
      Object.assign(consumoEditado, dados)
      localStorage.setItem('consumos', JSON.stringify(consumos))
    } else {
      dados.id = v4()
      consumos.push(dados)
      localStorage.setItem('consumos', JSON.stringify(consumos))
    }

    alert("Consumo criado com sucesso!")
    router.push("/consumos")
  }

  // Campos do form e valores iniciais (default)
  const initialValues = {
    cinema: '',
    comida: '',
    sabor: '',
    tamanho: '',
    refil: '',
    preco: '',
    pagamento: '',
    compra: '',
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    cinema: Yup.string().required("Campo obrigatório"),
    comida: Yup.string().required("Campo obrigatório"),
    sabor: Yup.string(),
    tamanho: Yup.string().required("Campo obrigatório"),
    refil: Yup.string().required("Campo obrigatório"),
    preco: Yup.string().required("Campo obrigatório"),
    pagamento: Yup.string().required("Campo obrigatório"),
    compra: Yup.string().required("Campo obrigatório"),
  })

  return (
    <Pagina titulo={"Cadastro de Consumo"}>

      <Formik
        initialValues={consumoEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {
          ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {


            // Retorno com o template JSX do formulário
            return (
              <Form onSubmit={handleSubmit}>
                {/* Campos do formulário */}
                
                <div className='my-3 text-center'>
                  <h1 >Dados da Compra</h1>
                  <hr></hr>
                </div>
                
                <Row className='mb-2'>
                <Form.Group as={Col}>
                    <Form.Label>Foto do item:</Form.Label>
                    <Form.Control
                      type="text"
                      name="foto"
                      value={values.foto}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.foto && !errors.foto}
                      isInvalid={touched.foto && errors.foto}
                    />
                    <Form.Control.Feedback type="invalid">{errors.foto}</Form.Control.Feedback>

                    {values.foto && (
                      <div style={{ marginTop: '10px', textAlign: 'center' }}>
                        
                      </div>
                    )}
                    </Form.Group>
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
                     <option value=''>Selecione o Cinema</option>
                      {cinemas.map(cinema => (
                        <option key={cinema.id} value={cinema.nome}>{cinema.nome}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.cinema}</Form.Control.Feedback>
                  </Form.Group>
                  </Row>

                  <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Comidas/Bebidas:</Form.Label>
                    <Form.Select
                      name='comida'
                      value={values.comida}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.comida && !errors.comida}
                      isInvalid={touched.comida && errors.comida}
                    >
                      <option value=''>Selecione</option>
                      <option value='Pipoca'>Pipoca</option>
                      <option value='Refrigerante'>Refrigerante</option>
                      <option value='Água'>Água</option>
                      <option value='Soda'>Soda</option>
                      <option value='Doces'>Doces</option>
                      <option value='Chocolate'>Chocolate</option>
                      <option value='Pizza'>Pizza</option>
                      <option value='Nachos'>Nachos</option>
                      <option value='Hamburguer'>Hamburguer</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.comida}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Sabor:</Form.Label>
                    <Form.Select
                      name='sabor'
                      value={values.sabor}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={values.comida !== 'Pipoca'}
                      isValid={touched.sabor && !errors.sabor}
                      isInvalid={touched.sabor && errors.sabor}
                    >
                      <option value=''>Selecione</option>
                      <option value='Salgado'>Salgado</option>
                      <option value='Doce'>Doce</option>
                      <option value='Leite Ninho'>Leite Ninho</option>
                      <option value='Chocalate'>Chocalate</option>
                      
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.sabor}</Form.Control.Feedback>
                  </Form.Group>
                  </Row >

                <Row className='mb-2'>               
                <Form.Group as={Col}>
                    <Form.Label>Tamanho:</Form.Label>
                    <Form.Select
                      name='tamanho'
                      value={values.tamanho}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.tamanho && !errors.tamanho}
                      isInvalid={touched.tamanho && errors.tamanho}
                    >
                      <option value=''>Selecione</option>
                      <option value='Pequeno(a)'>Pequeno(a)</option>
                      <option value='Medio(a)'>Medio(a)</option>
                      <option value='Grande'>Grande</option>
                      <option value='Extra Grande'>Extra Grande</option>
                      
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.tamanho}</Form.Control.Feedback>
                  </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Refil:</Form.Label>
                    <Form.Select
                      name='refil'
                      value={values.refil}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.refil && !errors.refil}
                      isInvalid={touched.refil && errors.refil}
                    >
                      <option value='Sem Refil'>Sem Refil</option>
                      <option value='Com Refil'>Com Refil</option>
                      <option value='Duplo Refil'>Duplo Refil</option>
                      <option value='Triplo Refil'>Triplo Refil</option>
                      <option value='Rodisio'>Rodisio</option>
                      
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.refil}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className='mb-2'>
                <Form.Group as={Col}>
                    <Form.Label>Preço:</Form.Label>
                    <Form.Control
                      as={ReactInputMask}
                      mask={"R$99,99"}
                      name='preco'
                      type='text'
                      placeholder="Ex: R$20,00"
                      value={values.preco}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.preco && !errors.preco}
                      isInvalid={touched.preco && errors.preco}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.preco}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Formas de Pagamento:</Form.Label>
                    <Form.Select
                      name='pagamento'
                      value={values.pagamento}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.pagamento && !errors.pagamento}
                      isInvalid={touched.pagamento && errors.pagamento}
                    >
                      <option value="">Selecione</option>
                      <option value='Debito/Credito'>Debito/Credito</option>
                      <option value='Online'>Online</option>
                      <option value='Dinheiro'>Dinheiro</option>
                     
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.pagamento}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Tipo da Compra:</Form.Label>
                    <Form.Select
                      name='compra'
                      value={values.compra}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.compra && !errors.compra}
                      isInvalid={touched.compra && errors.compra}
                    >
                      <option value="">Selecione</option>
                      <option value='Aplicativo'>Aplicativo</option>
                      <option value='Balcão'>Balção</option>
                      <option value='App/Balcão'>App/Balcão</option>
                     
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.compra}</Form.Control.Feedback>
                  </Form.Group>

                </Row>                

                {/* Botões */}
                <Form.Group className='text-end' >
                  <Button className='me-2' href='/consumos'><FaArrowLeft /> Voltar</Button>
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
