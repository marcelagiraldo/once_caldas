import React from "react";
import { DashboardTop } from "../../components/TopComponents/DashboardTop/DashboardTop"
import "./StudentsRegister.scss"
import { Col, Input } from "antd";

export const StudentsRegister = () => {
  return (
    <div>
        <DashboardTop addtitle="ESTUDIANTES" userName="Lina Maria Montereal Mesa" />
    <div className="StudentsRegister">
        <Col>
        <h1 className="textRegister">Nombre:</h1>
        </Col>
        <Col md={8}>
        <Input className="inputStudent"/>
        </Col>
    </div>
    </div>
  );
};
