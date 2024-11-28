import React, { useState, useEffect } from "react";
import InputMask from 'react-input-mask';
import { Link, useLocation } from 'react-router-dom';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import axios from 'axios';
import MenuSistema from '../../MenuSistema';

export default function FormEntregador() {

    const { state } = useLocation();
    const [idEntregador, setIdEntregador] = useState();
    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState();
    const [valorFrete, setValorFrete] = useState();
    const [enderecoRua, setEnderecoRua] = useState();
    const [enderecoComplemento, setEnderecoComplemento] = useState();
    const [enderecoNumero, setEnderecoNumero] = useState();
    const [enderecoBairro, setEnderecoBairro] = useState();
    const [enderecoCidade, setEnderecoCidade] = useState();
    const [enderecoCep, setEnderecoCep] = useState();
    const [enderecoUf, setEnderecoUf] = useState();
    const [ativo, setAtivo] = useState();

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/entregador/" + state.id)
                .then((response) => {
                    const data = response.data.dataNascimento.split('-')
                    const formatDataNascimento = [data[2], data[1], data[0]].join("/")
                    setIdEntregador(response.data.id)
                    setNome(response.data.nome)
                    setCpf(response.data.cpf)
                    setRg(response.data.rg)
                    setDataNascimento(formatDataNascimento)
                    setFoneCelular(response.data.foneCelular)
                    setFoneFixo(response.data.foneFixo)
                    setQtdEntregasRealizadas(response.data.qtdEntregasRealizadas)
                    setValorFrete(response.data.valorFrete)
                    setEnderecoRua(response.data.enderecoRua)
                    setEnderecoComplemento(response.data.enderecoComplemento)
                    setEnderecoNumero(response.data.enderecoNumero)
                    setEnderecoBairro(response.data.enderecoCep)
                    setEnderecoCidade(response.data.enderecoCidade)
                    setEnderecoCep(response.data.enderecoCep)
                    setEnderecoUf(response.data.enderecoUf)
                    setAtivo(response.data.ativo)

                })
        }
    }, [state])


    function salvar() {

        let entregadorRequest = {
            nome: nome,
            cpf: cpf,
            rg: rg,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            qtdEntregasRealizadas: qtdEntregasRealizadas,
            valorFrete: valorFrete,
            enderecoRua: enderecoRua,
            enderecoComplemento: enderecoComplemento,
            enderecoNumero: enderecoNumero,
            enderecoBairro: enderecoBairro,
            enderecoCidade: enderecoCidade,
            enderecoCep: enderecoCep,
            enderecoUf: enderecoUf,
            ativo: ativo
        }

        if (idEntregador != null) { //Alteração:
            axios.put("http://localhost:8080/api/entregador/" + idEntregador, entregadorRequest)
                .then((response) => { alert('Entregador alterado com sucesso.') })
                .catch((error) => { alert('Erro ao alterar um entregador.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/entregador", entregadorRequest)
                .then((response) => { alert('Entregador cadastrado com sucesso.') })
                .catch((error) => { alert('Erro ao incluir o entregador.') })
        }

        console.log(enderecoUf)
    }

    const ufList = [
        { key: 'AC', value: 'AC', text: 'Acre' },
        { key: 'AL', value: 'AL', text: 'Alagoas' },
        { key: 'AP', value: 'AP', text: 'Amapá' },
        { key: 'AM', value: 'AM', text: 'Amazonas' },
        { key: 'BA', value: 'BA', text: 'Bahia' },
        { key: 'CE', value: 'CE', text: 'Ceará' },
        { key: 'DF', value: 'DF', text: 'Distrito Federal' },
        { key: 'ES', value: 'ES', text: 'Espírito Santo' },
        { key: 'GO', value: 'GO', text: 'Goiás' },
        { key: 'MA', value: 'MA', text: 'Maranhão' },
        { key: 'MT', value: 'MT', text: 'Mato Grosso' },
        { key: 'MS', value: 'MS', text: 'Mato Grosso do Sul' },
        { key: 'MG', value: 'MG', text: 'Minas Gerais' },
        { key: 'PA', value: 'PA', text: 'Pará' },
        { key: 'PB', value: 'PB', text: 'Paraíba' },
        { key: 'PR', value: 'PR', text: 'Paraná' },
        { key: 'PE', value: 'PE', text: 'Pernambuco' },
        { key: 'PI', value: 'PI', text: 'Piauí' },
        { key: 'RJ', value: 'RJ', text: 'Rio de Janeiro' },
        { key: 'RN', value: 'RN', text: 'Rio Grande do Norte' },
        { key: 'RS', value: 'RS', text: 'Rio Grande do Sul' },
        { key: 'RO', value: 'RO', text: 'Rondônia' },
        { key: 'RR', value: 'RR', text: 'Roraima' },
        { key: 'SC', value: 'SC', text: 'Santa Catarina' },
        { key: 'SP', value: 'SP', text: 'São Paulo' },
        { key: 'SE', value: 'SE', text: 'Sergipe' },
        { key: 'TO', value: 'TO', text: 'Tocantins' },
    ]



    return (

        <div>
            <MenuSistema tela={'entregador'} />
            <div style={{ marginTop: '3%' }}>

                <Container style={{ width: '90%', maxWidth: '90%' }} textAlign='justified'  >
                    {idEntregador === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idEntregador !== undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='RG'>
                                    <InputMask
                                        required
                                        mask="99.999.999"
                                        value={rg}
                                        onChange={e => setRg(e.target.value)}
                                    />
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='DT Nascimento'
                                    width={6}
                                    placeholder='Ex: 99/99/9999'>
                                    <InputMask
                                        mask='99/99/9999'
                                        value={dataNascimento}
                                        onChange={e => setDataNascimento(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Celular'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9 9999.9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9 9999.9999"
                                        value={foneFixo}
                                        onChange={e => setFoneFixo(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    width={4}
                                    label='QTD Entregas Realizadas'
                                    type="number"
                                    value={qtdEntregasRealizadas}
                                    onChange={e => setQtdEntregasRealizadas(e.target.value)}

                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Valor por Frete'
                                    width={6}
                                    value={valorFrete}
                                    onChange={e => setValorFrete(e.target.value)}
                                ></Form.Input>
                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Rua'
                                    width={16}
                                    value={enderecoRua}
                                    onChange={e => setEnderecoRua(e.target.value)}
                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Número'
                                    width={2}
                                    value={enderecoNumero}
                                    onChange={e => setEnderecoNumero(e.target.value)}></Form.Input>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Complemento'
                                    width={16}
                                    value={enderecoComplemento}
                                    onChange={e => setEnderecoComplemento(e.target.value)}
                                ></Form.Input>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Bairro'
                                    width={10}
                                    value={enderecoBairro}
                                    onChange={e => setEnderecoBairro(e.target.value)}
                                >
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    width={10}
                                    value={enderecoCidade}
                                    onChange={e => setEnderecoCidade(e.target.value)}
                                >
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='CEP'
                                    width={4}
                                >

                                    <InputMask
                                        mask='99999-999'
                                        value={enderecoCep}
                                        onChange={e => setEnderecoCep(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.Select
                                    label='UF'
                                    placeholder="Selecione"
                                    options={ufList}
                                    value={enderecoUf}
                                    onChange={(e, { value }) => setEnderecoUf(value)}
                                >
                                </Form.Select>
                            </Form.Group>



                            <Form.Group>
                                <span><strong>Ativo:</strong></span>
                                <Form.Radio
                                    checked={ativo === true}
                                    label='Sim'
                                    value={true}
                                    onChange={() => setAtivo(true)}
                                    name="status"></Form.Radio>
                                <Form.Radio
                                    checked={ativo === false}
                                    label='Não'
                                    value={false}
                                    onChange={() => setAtivo(false)}
                                    name="status"></Form.Radio>
                            </Form.Group>

                        </Form>

                        <div style={{ marginTop: '4%' }}>
                            <Link to={'/list-entregador'}>

                                <Button
                                    type="button"
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='orange'
                                >
                                    Voltar
                                    <Icon name='reply' />
                                </Button>
                            </Link>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
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
