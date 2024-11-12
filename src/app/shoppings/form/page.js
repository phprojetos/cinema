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

export default function ShoppingFormPage(props) {

  const router = useRouter()

  const [paises, setPaises] = useState([])
  const [estados, setEstados] = useState([])
  const [cidades, setCidades] = useState([])

  const shoppings = JSON.parse(localStorage.getItem('shoppings')) || []

  const id = props.searchParams.id
  console.log(props.searchParams.id)
  const shoppingEditado = shoppings.find(item => item.id == id)
  console.log(shoppingEditado)

  useEffect(() => {
    apiLocalidades.get('/paises').then(response => {
      console.log("paises >>> ", response.data)
      setPaises(response.data)
    })

    apiLocalidades.get("estados?orderBy=nome").then(response => {
      console.log("estados >>> ", response.data)
      setEstados(response.data)
    })

  }, [])

  function salvar(dados) {
    if(shoppingEditado){
      Object.assign(shoppingEditado, dados)
      localStorage.setItem('shoppings', JSON.stringify(shoppings))
    } else {
      dados.id = v4()
      shoppings.push(dados)
      localStorage.setItem('shoppings', JSON.stringify(shoppings))
    }

    alert("Shopping criado com sucesso!")
    router.push("/shoppings")
  }

  const initialValues = {
    nome: '',
    cnpj: '',
    telefone:'',
    administrador:'',
    pais: 'Brasil',
    estado: '',
    cidade: '',
    endereco: '',
    temCinema: false
  }

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    cnpj: Yup.string().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    administrador: Yup.string().required("Campo obrigatório"),
    pais: Yup.string().required("Campo obrigatório"),
    estado: Yup.string().required("Campo obrigatório"),
    cidade: Yup.string().required("Campo obrigatório"),
    endereco: Yup.string().required("Campo obrigatório"),
    temCinema: Yup.boolean()
  })

  return (
    <Pagina titulo={"Cadastro de Shopping"}>

      <Formik
        initialValues={shoppingEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {
          ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {

            useEffect(() => {
              console.log("Mexeu no estado >>>")
              if (values.estado !== '') {
                apiLocalidades.get(`/estados/${values.estado}/municipios`).then(response => {
                  console.log("cidades >>>", response.data)
                  setCidades(response.data)
                })
              }
            }, [values.estado])

            return (
              <Form onSubmit={handleSubmit}>
                <div className='my-3 text-center'>
                  <h1 >Dados da Empresa</h1>
                  <hr></hr>
                </div>
                
                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control
                      name='nome'
                      type='text'
                      placeholder="Ex: Shopping de SP"
                      value={values.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.nome && !errors.nome}
                      isInvalid={touched.nome && errors.nome}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.nome}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Cnpj:</Form.Label>
                    <Form.Control
                      as={ReactInputMask}
                      mask={"99.999.999/9999-99"}
                      name='cnpj'
                      type='text'
                      placeholder="Ex: 12.123.123/0001-12"
                      value={values.cnpj}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.cnpj && !errors.cnpj}
                      isInvalid={touched.cnpj && errors.cnpj}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.cnpj}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Administrador:</Form.Label>
                    <Form.Control
                      name='administrador'
                      type='text'
                      placeholder="Ex: João Silva"
                      value={values.administrador}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.administrador && !errors.administrador}
                      isInvalid={touched.administrador && errors.administrador}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.administrador}</Form.Control.Feedback>
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
                  <h1 >Endereço</h1>
                  <hr></hr>
                </div>
                
                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Endereço:</Form.Label>
                    <Form.Control
                      name='endereco'
                      type='text'
                      placeholder="Ex: Rua das Flores, 123"
                      value={values.endereco}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.endereco && !errors.endereco}
                      isInvalid={touched.endereco && errors.endereco}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.endereco}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Foto do Shopping:</Form.Label>
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
                </Row>

                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>País:</Form.Label>
                    <Form.Select
                      name='pais'
                      value={values.pais}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.pais && !errors.pais}
                      isInvalid={touched.pais && errors.pais}
                    >
                      <option value="">Selecione o país</option>
                      {paises.map(pais => <option key={pais.nome} value={pais.nome}>{pais.nome}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.pais}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Estado:</Form.Label>
                    <Form.Select
                      name='estado'
                      value={values.estado}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={values.pais !== 'Brasil'}
                      isValid={touched.estado && !errors.estado}
                      isInvalid={touched.estado && errors.estado}
                    >
                      <option value="">Selecione o estado</option>
                      {estados.map(estado => <option key={estado.sigla} value={estado.sigla}>{estado.sigla}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.estado}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Cidade:</Form.Label>
                    <Form.Select
                      name='cidade'
                      value={values.cidade}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={values.pais !== 'Brasil'}
                      isValid={touched.cidade && !errors.cidade}
                      isInvalid={touched.cidade && errors.cidade}
                    >
                      <option value="">Selecione a cidade</option>
                      {cidades.map(cidade => <option key={cidade.nome} value={cidade.nome}>{cidade.nome}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.cidade}</Form.Control.Feedback>
                  </Form.Group>

                </Row>

                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Check
                      name='temCinema'
                      type='checkbox'
                      label='Tem Cinema'
                      checked={values.temCinema}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                </Row>

                <Form.Group className='text-end'>
                  <Button className='me-2' href='/shoppings'><FaArrowLeft /> Voltar</Button>
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
