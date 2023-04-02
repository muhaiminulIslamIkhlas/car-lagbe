import { Button, Input, message, Modal, Upload } from "antd";
import Form from "antd/es/form/Form";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { PlusOutlined } from "@ant-design/icons";
import "../styles/driverRegistration.css";
import { useState } from "react";
import { driverRegister } from "../services/driver.service";
import { useNavigate } from "react-router-dom";

const DriverRegistration = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [vehicle1, setVehicle1] = useState(null);
  const [vehicle2, setVehicle2] = useState(null);
  const [nid1, setNid1] = useState(null);
  const [nid2, setNid2] = useState(null);
  const [license1, setLicense1] = useState(null);
  const [license2, setLicense2] = useState(null);

  const onRegisterFinish = async (values) => {
    const driverObject = {
      name: values.name,
      password: values.password,
      passwordConfirmation: values.password,
      phone: values.phone,
      role: 3,
      email: values.email,
      address: values.address,
      license_number: values.license_number,
      vehicle_pic_1: vehicle1,
      vehicle_pic_2: vehicle2,
      nid_pic_1: nid1,
      nid_pic_2: nid2,
      license_pic_1: license1,
      license_pic_2: license2,
    };
    const registerResponse = await driverRegister(driverObject);
    if (!registerResponse.hasError) {
      navigate("/");
    } else {
      errorPopUp(registerResponse.errors["email"]);
      errorPopUp(registerResponse.errors["phone"]);
      errorPopUp(registerResponse.errors["address"]);
      errorPopUp(registerResponse.errors["password"]);
      errorPopUp(registerResponse.errors["license_number"]);
      errorPopUp(registerResponse.errors["vehicle_pic_1"]);
      errorPopUp(registerResponse.errors["vehicle_pic_2"]);
      errorPopUp(registerResponse.errors["nid_pic_1"]);
      errorPopUp(registerResponse.errors["nid_pic_2"]);
      errorPopUp(registerResponse.errors["license_pic_1"]);
      errorPopUp(registerResponse.errors["license_pic_2"]);
    }
  };

  const errorPopUp = (errMessage) => {
    if (errMessage) {
      messageApi.open({
        type: "error",
        content: errMessage,
      });
    }
  };

  const handleUploadVehicle1Change = (info) => {
    setVehicle1(info.file);
  };

  const handleUploadVehicle2Change = (info) => {
    setVehicle2(info.file);
  };

  const handleUploadNid1Change = (info) => {
    setNid1(info.file);
  };

  const handleUploadNid2Change = (info) => {
    setNid2(info.file);
  };

  const handleUploadLicense1Change = (info) => {
    setLicense1(info.file);
  };

  const handleUploadLicense2Change = (info) => {
    setLicense2(info.file);
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleCancel = () => setPreviewOpen(false);

  const onRegisterFinishFailed = (errorInfo) => {};
  return (
    <Helmet title="Driver-registration">
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
      {contextHolder}
      <CommonSection title="Become a Driver" />
      <section className="driverReg">
        <div className="driverReg-from">
          <Form
            encType="multipart/form-data"
            name="register"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onRegisterFinish}
            onFinishFailed={onRegisterFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="License Number"
              name="license_number"
              rules={[
                {
                  required: true,
                  message: "Please input your license number!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Tin Number" name="tin_number">
              <Input />
            </Form.Item>
            <Form.Item
              label="Vehicle pic"
              name="vehicle_pic_1"
              valuePropName="vehicle_pic_1"
              rules={[
                {
                  required: true,
                  message: "Please upload vehicle pic!",
                },
              ]}
            >
              <Upload
                listType="picture-card"
                onChange={handleUploadVehicle1Change}
                onPreview={handlePreview}
                beforeUpload={() => {
                  return false;
                }}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item
              label="Vehicle pic with number plate"
              name="vehicle_pic_2"
              rules={[
                {
                  required: true,
                  message: "Please upload vehicle pic!",
                },
              ]}
            >
              <Upload
                listType="picture-card"
                onChange={handleUploadVehicle2Change}
                onPreview={handlePreview}
                beforeUpload={() => {
                  return false;
                }}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item
              label="Nid Front"
              name="nid_pic_1"
              rules={[
                {
                  required: true,
                  message: "Please upload Nid front",
                },
              ]}
            >
              <Upload
                listType="picture-card"
                onChange={handleUploadNid1Change}
                onPreview={handlePreview}
                beforeUpload={() => {
                  return false;
                }}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item
              label="Nid Back"
              name="nid_pic_2"
              rules={[
                {
                  required: true,
                  message: "Please upload Nid back",
                },
              ]}
            >
              <Upload
                listType="picture-card"
                onChange={handleUploadNid2Change}
                onPreview={handlePreview}
                beforeUpload={() => {
                  return false;
                }}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item
              label="License Front"
              name="license_pic_1"
              rules={[
                {
                  required: true,
                  message: "Please upload Nid front",
                },
              ]}
            >
              <Upload
                listType="picture-card"
                onChange={handleUploadLicense1Change}
                onPreview={handlePreview}
                beforeUpload={() => {
                  return false;
                }}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item
              label="License Back"
              name="license_pic_2"
              rules={[
                {
                  required: true,
                  message: "Please upload Nid back",
                },
              ]}
            >
              <Upload
                listType="picture-card"
                onChange={handleUploadLicense2Change}
                onPreview={handlePreview}
                beforeUpload={() => {
                  return false;
                }}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    </Helmet>
  );
};

export default DriverRegistration;
