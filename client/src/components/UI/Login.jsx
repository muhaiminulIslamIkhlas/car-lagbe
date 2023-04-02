import { Button, Result } from "antd";

const Forbidden = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page. Please login"
      extra={<Button type="primary">Back Home</Button>}
    />
  );
};

export default Forbidden;
