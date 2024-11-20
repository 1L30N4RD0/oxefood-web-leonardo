import React, { useState } from "react";
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function FormEntregador() {
    const options = [
        { key: '1', text: 'PE', value: 'PE' },
        { key: '2', text: 'SC', value: 'SC' },
        { key: '3', text: 'SP', value: 'SP' },
    ]

    const [yesorno, setYesorno] = useState()

    const handleChange = (e, { value }) => {
        setYesorno(value)
    }
    return (

        <div>
            <MenuSistema tela={'entregador'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='RG'>
                                    <InputMask
                                        required
                                        mask="99.999.999"
                                    />
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='DT Nascimento'
                                    width={6}
                                    placeholder='Ex: 10/10/2000'>
                                    <InputMask
                                        mask='99/99/9999'></InputMask>
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Celular'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='QTD de Entregas Realizadas'
                                    width={6}
                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Valor por Frete'
                                    width={6}></Form.Input>
                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Rua'
                                    width={16}>
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Número'
                                    width={2}></Form.Input>
                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Bairro'
                                    width={10}>
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    width={10}>
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='CEP'
                                    width={4}>
                                </Form.Input>
                            </Form.Group>

                            <Form.Group>
                                <Form.Select
                                    fluid
                                    label='UF'
                                    options={options}
                                    width={16}></Form.Select>
                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Complemento'
                                    width={16}></Form.Input>
                            </Form.Group>

                            <Form.Group>
                                <span><strong>Ativo:</strong></span>
                                <Form.Radio
                                    checked={yesorno === "yes"}
                                    label='Sim'
                                    value="yes"
                                    onChange={handleChange}
                                    name="status"></Form.Radio>
                                <Form.Radio
                                    checked={yesorno === "no"}
                                    label='Não'
                                    value="no"
                                    onChange={handleChange}
                                    name="status"></Form.Radio>
                            </Form.Group>

                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                <Link to={'/list-entregador'}>Voltar</Link>
                            </Button>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>

                </Container>
            </div>
        </div>

    );

}
