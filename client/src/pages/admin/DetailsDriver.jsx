import { Button, Empty, Image, List, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/UI/atom/container/container";
import { API_FILES_URL } from "../../config/settings";
import {
  activateOrDeactivate,
  getDriverById,
} from "../../services/admin/driver.service";

const DetailsDriver = () => {
  let { id } = useParams();
  const [data, setData] = useState([]);

  const fetchData = async (id) => {
    const { result } = await getDriverById(id);
    setData(result[0]);
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const handleOnClick = async () => {
    const response = await activateOrDeactivate(id);
    if (response) {
      message.success({
        message: "Congratulations!!!",
        description: "Updated successfully",
      });
      await fetchData(id);
    }
  };

  if (!data) {
    return <Empty />;
  }

  return (
    <div>
      <Container marginBottom={10}>
        <div>Name: {data.name}</div>
      </Container>
      <Container marginBottom={10}>
        <div>Phone: {data.phone}</div>
      </Container>
      <Container marginBottom={10}>
        <div>Address: {data.address}</div>
      </Container>
      <Container marginBottom={10}>
        <div>License Number: {data.license_number}</div>
      </Container>
      <div>
        <Container marginBottom={10}>
          <div>Nid Front Part:</div>
        </Container>
        <Image width={200} src={API_FILES_URL + data.nid_pic_1} />
      </div>
      <div>
        <Container marginBottom={10}>
          <div>Nid Back Part:</div>
        </Container>
        <Image width={200} src={API_FILES_URL + data.nid_pic_2} />
      </div>

      <div>
        <Container marginBottom={10}>
          <div>License Front Part:</div>
        </Container>
        <Image width={200} src={API_FILES_URL + data.license_pic_1} />
      </div>
      <div>
        <Container marginBottom={10}>
          <div>License Back Part:</div>
        </Container>
        <Image width={200} src={API_FILES_URL + data.license_pic_2} />
      </div>

      <div>
        <Container marginBottom={10}>
          <div>Vehicle:</div>
        </Container>
        <Image width={200} src={API_FILES_URL + data.vehicle_pic_1} />
      </div>
      <div>
        <Container marginBottom={10}>
          <div>Vehicle:</div>
        </Container>
        <Image width={200} src={API_FILES_URL + data.vehicle_pic_2} />
      </div>

      <Container marginTop={20}>
        <Button type="primary" onClick={handleOnClick}>
          {data.is_active ? "Deactivate" : "Activate"}
        </Button>
      </Container>
    </div>
  );
};

export default DetailsDriver;
