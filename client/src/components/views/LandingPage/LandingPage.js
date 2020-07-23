import React from "react";
import { FaCode } from "react-icons/fa";
import { Typography, Button, Form, message } from "antd";
const { Title } = Typography;
function LandingPage() {
  return (
    <div className="app">
      <div style={{ maxWidth: "700px" }}>
        <div style={{ textAlign: "center" }}>
          <Title level={3}>
            Redefining the role and scope of Registrar and Transfer Agents by
            leveraging cutting edge technologies
          </Title>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
