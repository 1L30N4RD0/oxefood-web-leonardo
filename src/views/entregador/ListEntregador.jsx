import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header, TableHeader, TableHeaderCell, TableCell } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListEntregador() {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();
    const [idVisualizar, setIdVisualizar] = useState(false);

    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/entregador")
            .then((response) => {
                setLista(response.data)
            })
    }
    console.log(lista)
    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[0] + '/' + arrayData[1] + '/' + arrayData[2];
    }

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

    async function remover() {

        await axios.delete('http://localhost:8080/api/entregador/' + idRemover)
            .then((response) => {

                console.log('Entregador removido com sucesso.')

                axios.get("http://localhost:8080/api/entregador")
                    .then((response) => {
                        setLista(response.data)
                    })
            })
            .catch((error) => {
                console.log('Erro ao remover um entregador.')
            })
        setOpenModal(false)
    }

    return (
        <div>
            <MenuSistema tela={'entregador'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Entregador </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-entregador'
                        />


                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <TableHeader>
                                <Table.Row>
                                    <TableHeaderCell>Nome</TableHeaderCell>
                                    <TableHeaderCell>CPF</TableHeaderCell>
                                    <TableHeaderCell>RG</TableHeaderCell>
                                    <TableHeaderCell>Data de Nascimento</TableHeaderCell>
                                    <TableHeaderCell>Fone Celular</TableHeaderCell>
                                    <TableHeaderCell textAlign='center'>Ações</TableHeaderCell>
                                </Table.Row>
                            </TableHeader>

                            <Table.Body>

                                {lista.map(entregador => (

                                    <Table.Row key={entregador.id}>
                                        <Table.Cell>{entregador.nome}</Table.Cell>
                                        <Table.Cell>{entregador.cpf}</Table.Cell>
                                        <Table.Cell>{entregador.rg}</Table.Cell>
                                        <Table.Cell>{formatarData(entregador.dataNascimento)}</Table.Cell>
                                        <Table.Cell>{entregador.foneCelular}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                            <Link to="/form-entregador" state={{ id: entregador.id }} style={{ color: 'green' }}>
                                                <Button
                                                    inverted
                                                    circular
                                                    color='green'
                                                    title='Clique aqui para editar os dados deste cliente'
                                                    icon
                                                >
                                                    <Icon name='edit' />
                                                </Button>
                                            </Link>

                                            &nbsp;

                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este entregador'
                                                icon
                                                onClick={e => confirmaRemover(entregador.id)}
                                            >
                                                <Icon name='trash' />
                                            </Button>
                                            <Button
                                                inverted
                                                circular
                                                color='yellow'
                                                title='Clique aqui para visualizar este cliente'
                                                icon
                                                onClick={e => setIdVisualizar(entregador)}>
                                                <Icon name='eye' />
                                            </Button>


                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>
            <Modal
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}

            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={() => remover()}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>

            <Modal
                basic
                onClose={() => setIdVisualizar(false)}
                onOpen={() => setIdVisualizar(true)}
                open={idVisualizar}
            >
                <Modal.Actions>
                    <Table celled>
                        <Table.Header key={idVisualizar.id}>
                            <TableHeaderCell></TableHeaderCell>
                            <TableHeaderCell>{idVisualizar.nome}</TableHeaderCell>
                            <TableHeaderCell></TableHeaderCell>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <TableCell width={6}>CPF</TableCell>
                                <TableCell textAlign='center'>{idVisualizar.cpf}</TableCell>
                            </Table.Row>
                            <Table.Row>
                                <TableCell>RG</TableCell>
                                <TableCell textAlign='center'>{idVisualizar.rg}</TableCell>
                            </Table.Row>
                            <Table.Row>
                                <TableCell>Data de Nascimento</TableCell>
                                <TableCell textAlign='center'>{formatarData(idVisualizar.dataNascimento)}</TableCell>
                            </Table.Row>
                            <Table.Row>
                                <TableCell>Fone Celular</TableCell>
                                <TableCell textAlign='center'>{idVisualizar.foneCelular}</TableCell>
                            </Table.Row>
                            <Table.Row>
                                <TableCell>Fone Fixo</TableCell>
                                <TableCell textAlign='center'>{idVisualizar.foneFixo}</TableCell>
                            </Table.Row>
                            <Table.Row>
                                <TableCell>QTD de Entregas Realizadas</TableCell>
                                <TableCell textAlign='center'>{idVisualizar.qtdEntregasRealizadas}</TableCell>
                            </Table.Row>
                            <Table.Row>
                                <TableCell>Valor do Frete</TableCell>
                                <TableCell textAlign='center'>{idVisualizar.valorFrete}</TableCell>
                            </Table.Row>
                            <Table.Row>
                                <TableCell>Rua</TableCell>
                                <TableCell textAlign='center'>{idVisualizar.enderecoRua}</TableCell>
                            </Table.Row>
                            <Table.Row>
                                <TableCell>Complemento</TableCell>
                                <TableCell textAlign='center'>{idVisualizar.enderecoComplemento}</TableCell>
                            </Table.Row>
                            <Table.Row>
                                <TableCell>Número</TableCell>
                                <TableCell textAlign='center'>{idVisualizar.enderecoNumero}</TableCell>
                            </Table.Row>
                            <Table.Row>
                                <TableCell>Bairro</TableCell>
                                <TableCell textAlign='center'>{idVisualizar.enderecoBairro}</TableCell>
                            </Table.Row>
                            <Table.Row>
                                <TableCell>Cidade</TableCell>
                                <TableCell textAlign='center'>{idVisualizar.enderecoCidade}</TableCell>
                            </Table.Row>
                            <Table.Row>
                                <TableCell>CEP</TableCell>
                                <TableCell textAlign='center'>{idVisualizar.enderecoCep}</TableCell>
                            </Table.Row>
                            <Table.Row>
                                <TableCell>UF</TableCell>
                                <TableCell textAlign='center'>{idVisualizar.enderecoUf}</TableCell>
                            </Table.Row>
                            <Table.Row>
                                <TableCell>Status</TableCell>
                                <TableCell textAlign='center'>{idVisualizar.ativo ? "sim" : "não"}</TableCell>
                            </Table.Row>
                            <TableCell textAlign='center' />
                        </Table.Body>
                    </Table>
                    <Button color='red' inverted onClick={() => setIdVisualizar(false)}>
                        <Icon name='remove' /> Sair
                    </Button>
                </Modal.Actions>
            </Modal>
        </div >
    )
}
