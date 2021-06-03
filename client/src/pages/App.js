import { Card, Button, Row, Col, Form, Input, InputNumber, Table } from "antd";
import { FieldNumberOutlined /*, GithubOutlined */ } from "@ant-design/icons";
import logo from "../assets/logo.png";
import React from "react";
import "../index.css";
import api from '../services/api';
import Modal from "antd/lib/modal/Modal";

export default class App extends React.Component {
  state = {
    form: {
      x1: undefined,
      x2: undefined,
      x3: undefined,
      y1: undefined,
      y2: undefined,
      y3: undefined,
      y4: undefined,
      y5: undefined,
      y6: undefined,
      z1: undefined,
      z2: undefined,
    },
    dados_tabela: undefined,
    show_info: true,
    show_calc: false,
    loading: false,
  };

  colunas = [
    {
      title: 'producaoImperialIPA',
      dataIndex: 'producaoImperialIPA',
      width: '175px',
      align: 'center',
      render: (value) => Math.floor(value),
    },
    {
      title: 'producaoDoubleIPA',
      dataIndex: 'producaoDoubleIPA',
      width: '175px',
      align: 'center',
      render: (value) => Math.floor(value),
    },
    {
      title: 'Malte Pale Ale (kg)',
      dataIndex: 'x1',
      width: '175px',
      align: 'center',
      render: (value) => Math.floor(value),
    },
    {
      title: 'Malte Carared (kg)',
      dataIndex: 'x2',
      width: '175px',
      align: 'center',
      render: (value) => Math.floor(value),
    },
    {
      title: 'Malte Chateau Cara Blond (kg)',
      dataIndex: 'x3',
      width: '175px',
      align: 'center',
      render: (value) => Math.floor(value),
    },
    {
      title: 'Lúpulo Galena (kg)',
      dataIndex: 'y1',
      width: '175px',
      align: 'center',
      render: (value) => Math.floor(value),
    },
    {
      title: 'Lúpulo Columbus (kg)',
      dataIndex: 'y2',
      width: '175px',
      align: 'center',
      render: (value) => Math.floor(value),
    },
    {
      title: 'Lúpulo Cascade (kg)',
      dataIndex: 'y3',
      width: '175px',
      align: 'center',
      render: (value) => Math.floor(value),
    },
    {
      title: 'Centennial',
      dataIndex: 'y4',
      width: '175px',
      align: 'center',
      render: (value) => Math.floor(value),
    },
    {
      title: 'Chinook',
      dataIndex: 'y5',
      width: '175px',
      align: 'center',
      render: (value) => Math.floor(value),
    },
    {
      title: 'Aramis',
      dataIndex: 'y6',
      width: '175px',
      align: 'center',
      render: (value) => Math.floor(value),
    },
    {
      title: 'Levedura US-05 (kg)',
      dataIndex: 'z1',
      width: '175px',
      align: 'center',
      render: (value) => Math.floor(value),
    },
    {
      title: 'Levedura SafAle BE 134 (kg)',
      dataIndex: 'z2',
      width: '175px',
      align: 'center',
      render: (value) => Math.floor(value),
    },
  ]

  inverte_exibicao = () => {
    const { show_info, show_calc } = this.state;

    this.setState({
      show_info: !show_info,
      show_calc: !show_calc,
    });
  };

  changeVal = (field, value) => {
    this.setState({
      form :{
        ...this.state.form,
        [field]: value,
      }
    });
  };

  generateField = (field, placeholder) => {
    return (
      <InputNumber
        prefix={<FieldNumberOutlined />}
        placeholder={placeholder}
        style={{ width: "100%" }}
        onChange={(val) => this.changeVal(field, val)}
        disabled={this.state.loading}
      />
    );
  };

  enviaForm = async (event) => {
    event.preventDefault();

    const { form } = this.state;
    
    this.setState({ loading: true })

    let url = 'api/cerveja?'
    Object.entries(form).forEach((arr) => {
      const prop = arr[0]
      const val = arr[1]
      url += `${prop}=${val}&`
    })

    try {
      const dados_tabela = await api.post(url);
      this.setState({ dados_tabela: [dados_tabela] }, () => console.log(this.state.dados_tabela))
    }
    catch (err) {
      alert('Erro ao tentar contatar o servidor. Tente novamente.');
    }
    finally {
      this.setState({ loading: false })
    }
  };

  limpaTabela = () => {
    this.setState({ dados_tabela: undefined })
  }

  render() {
    const { show_info, show_calc } = this.state;
    return (
      <Row justify="center" align="middle" className="row">
        <Col>
          <Card
            bordered={false}
            style={{
              width: 700,
              borderRadius: "8px",
              boxShadow: "1px 1px 1px 2px #ccc",
            }}
          >
            <Row
              style={{ marginTop: "25px", marginBottom: "65px", width: "100%" }}
              justify="center"
            >
              <Col span={4}>
                <img
                  src={logo}
                  alt="logo"
                  style={{ objectFit: "contain", width: "100%" }}
                />
              </Col>
              <Col span={6} className="title">
                Cevs
              </Col>
            </Row>

            {show_info && (
              <>
                <div style={{ color: "#000000" }}>
                  <p>
                    Mussum Ipsum, cacilds vidis litro abertis. Manduma pindureta
                    quium dia nois paga. Interessantiss quisso pudia ce receita
                    de bolis, mais bolis eu num gostis. Praesent vel viverra
                    nisi. Mauris aliquet nunc non turpis scelerisque, eget. Suco
                    de cevadiss deixa as pessoas mais interessantis.
                  </p>
                  <p>
                    Mais vale um bebadis conhecidiss, que um alcoolatra
                    anonimis. Si u mundo tá muito paradis? Toma um mé que o
                    mundo vai girarzis! Paisis, filhis, espiritis santis.
                    Detraxit consequat et quo num tendi nada.
                  </p>
                  <p>
                    Casamentiss faiz malandris se pirulitá. Nec orci ornare
                    consequat. Praesent lacinia ultrices consectetur. Sed non
                    ipsum felis. Leite de capivaris, leite de mula manquis sem
                    cabeça. A ordem dos tratores não altera o pão duris.{" "}
                  </p>
                </div>
                <Button onClick={() => this.inverte_exibicao()}>
                  Ir para a calculadora
                </Button>
              </>
            )}

            {show_calc && (
              <>
                <Row
                  gutter={[12, 12]}
                  style={{ marginBottom: "25px" }}
                  justify="space-between"
                >
                  <Col span={24}>
                    {this.generateField("dindin", "Orçamento para ingredientes (R$)")}
                  </Col>
                </Row>
                <Row
                  gutter={[12, 12]}
                  style={{ marginBottom: "25px" }}
                  justify="space-between"
                >
                  <Col span={8}>
                    {this.generateField("x1", "Malte Pale Ale (kg)")}
                  </Col>
                  <Col span={8}>
                    {this.generateField("x2", "Malte Carared (kg)")}
                  </Col>
                  <Col span={8}>
                    {this.generateField("x3", "Malte Chateau Cara Blond (kg)")}
                  </Col>
                </Row>
                <Row
                  gutter={[12, 12]}
                  style={{ marginBottom: "25px" }}
                  justify="space-between"
                >
                  <Col span={8}>
                    {this.generateField("y1", "Lúpulo Galena (kg)")}
                  </Col>
                  <Col span={8}>
                    {this.generateField("y2", "Lúpulo Columbus  (kg)")}
                  </Col>
                  <Col span={8}>
                    {this.generateField("y3", "Lúpulo Cascade (kg)")}
                  </Col>
                </Row>
                <Row
                  gutter={[12, 12]}
                  style={{ marginBottom: "25px" }}
                  justify="space-between"
                >
                  <Col span={8}>
                    {this.generateField("y4", "Lúpulo Centennial (kg)")}
                  </Col>
                  <Col span={8}>
                    {this.generateField("y5", "Lúpulo Chinook (kg)")}
                  </Col>
                  <Col span={8}>
                    {this.generateField("y6", "Lúpulo Aramis (kg)")}
                  </Col>
                </Row>
                <Row
                  gutter={[12, 12]}
                  style={{ marginBottom: "25px" }}
                  justify="space-between"
                >
                  <Col span={12}>
                    {this.generateField("z1", "Levedura US-05 (kg)")}
                  </Col>
                  <Col span={12}>
                    {this.generateField("z2", "Levedura SafAle BE 134 (kg)")}
                  </Col>
                </Row>

                <Row justify="space-between">
                  <Button
                    disabled={this.state.loading}
                    onClick={() => this.inverte_exibicao()}
                  >
                    Info
                  </Button>
                  <Button
                    type="primary"
                    onClick={this.enviaForm}
                    disabled={this.state.loading}
                  >
                    Calcular
                  </Button>
                </Row>
              </>
            )}

            {this.state.dados_tabela && (
              <Modal
                title="Resultados obtidos"
                style={{ width: '425px' }}
                centered
                visible
                onOk={this.limpaTabela}
                onCancel={this.limpaTabela}
                footer={[]}
              >
                <Table 
                  columns={this.colunas}
                  dataSource={this.state.dados_tabela}
                  scroll={{ x: 400 }}
                  pagination={false}
                />
              </Modal>
            )}
          </Card>
        </Col>
      </Row>
    );
  };
}
