import React from "react";
import { DashboardTop } from "../../components/TopComponents/DashboardTop/DashboardTop"
import "./StudentsRegister.scss"
import { Col, Input } from "antd";
import { SaveButton } from "../../components/UsersComponents/SaveButton/SaveButton";

export const StudentsRegister = () => {
  return (
    <div>
        <DashboardTop addtitle="ESTUDIANTES" userName="Lina Maria Montereal Mesa" />
    <div className="FirstStudentsRegister">
        
        <Col>
        <h1 className="textRegister">Nombres :</h1>
        </Col>
        <Col md={8}>
        <Input className="inputStudent"/>
        </Col>
        
    </div>
    <div className="StudentsRegister">
        
        <Col>
        <h1 className="textRegister">Apellidos :</h1>
        </Col>
        <Col md={8}>
        <Input className="inputStudent"/>
        </Col>
        
    </div>
    <div className="StudentsRegister">
        
        <Col>
        <h1 className="textRegister">Código :</h1>
        </Col>
        <Col md={8}>
        <Input className="inputStudentC"/>
        </Col>
        
    </div>
    <div className="StudentsRegister">
        
        <Col>
        <h1 className="textRegister">Semestre :</h1>
        </Col>
        <Col md={8}>
        <Input className="inputStudent"/>
        </Col>
        
    </div>
    <div className="SButton">
        <SaveButton/>
    </div>
    </div>
  );
};
