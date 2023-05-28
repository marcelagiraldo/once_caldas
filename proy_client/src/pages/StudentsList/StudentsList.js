import React from "react";
import { UserButton } from "../../components/UsersComponents/UserButton/UserButton";
import { DeactivateButton } from "../../components/UsersComponents/DeactivateButton/DeactivateButton";
import { DashboardTop } from "../../components/TopComponents/DashboardTop/DashboardTop"
import "./StudentsList.scss"
import { Button, Col, Input } from "antd";
import { FileSearchOutlined, SearchOutlined } from "@ant-design/icons";

export const StudentsList = () => {
  return (
    <div>
        <DashboardTop addtitle="ESTUDIANTES" userName="Lina Maria Montereal Mesa" />
        <div className="filter">
          <Input classname="filterInput" prefix={<SearchOutlined/>}/>
          <Button className="filterButton"><FileSearchOutlined /></Button>
        </div>
    <div className="StudentsList">
    
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
