import { Card, Button, Row, Col, Form, Input, InputNumber } from "antd";
import { FieldNumberOutlined /*, GithubOutlined */ } from "@ant-design/icons";
import logo from "../assets/logo.png";
import React from "react";
import "../index.css";

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
    show_info: true,
    show_calc: false,
  };

  inverte_exibicao = () => {
    const { show_info, show_calc } = this.state;

    this.setState({
      show_info: !show_info,
      show_calc: !show_calc,
    });
  };

  changeVal = (field, value) => {
    console.log(field, value)
    this.setState({
      form :{
        ...this.state.form,
        [field]: value,
      }
    }, () => console.log(this.state.form[field]));
  };

  generateField = (field, placeholder) => {
    return (
      <InputNumber
        prefix={<FieldNumberOutlined />}
        placeholder={placeholder}
        style={{ width: "100%" }}
        onChange={(val) => this.changeVal(field, val)}
      />
    );
  };

  finalizado = () => {
    const { form } = this.state;

    console.log(form)
  };

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
                  <Button onClick={() => this.inverte_exibicao()}>Info</Button>
                  <Button type="primary" onClick={() => this.finalizado()}>
                    Calcular
                  </Button>
                </Row>
              </>
            )}
          </Card>
        </Col>
      </Row>
    );
  }
}
