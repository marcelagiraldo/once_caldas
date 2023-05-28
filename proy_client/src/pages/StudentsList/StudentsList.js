import React from "react";
import { UserButton } from "../../components/UsersComponents/UserButton/UserButton";
import { DeactivateButton } from "../../components/UsersComponents/DeactivateButton/DeactivateButton";
import { DashboardTop } from "../../components/TopComponents/DashboardTop/DashboardTop"
import "./StudentsList.scss"
import { Col } from "antd";

export const StudentsList = () => {
  return (
    <div>
        <DashboardTop addtitle="ESTUDIANTES" userName="Lina Maria Montereal Mesa" />
        <div className="UsersList">
        <Col>
        <UserButton PersonName="juan carlo otalvaro" />
        </Col>
        <DeactivateButton/>
        <Col>
        </Col>
        </div>
    </div>
  );
};
