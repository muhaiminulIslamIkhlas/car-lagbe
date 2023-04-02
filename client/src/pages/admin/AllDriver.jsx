import { Input, Pagination, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/UI/atom/container/container";
import Heading from "../../components/UI/atom/heading/heading";
import { getAllDriver } from "../../services/admin/driver.service";

const AllDriver = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({
    pageNumber: 1,
    total: 0,
    current: 1,
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tag
          style={{cursor: 'pointer'}}
            color="magenta"
            onClick={() => {
              navigate("/admin/driver/details/" + record.id);
            }}
          >
            Details
          </Tag>
        </Space>
      ),
    },
  ];
  const fetchData = async (pageNumber = 1, search = "") => {
    const { result } = await getAllDriver(pageNumber, search);
    setData(result.data);
    setPaginationInfo({
      current: result.current_page,
      total: result.total,
      pageNumber: pageNumber,
    });
    console.log(result);
  };

  const handlePagination = async (page) => {
    await fetchData(page);
  };

  const handleQueryChange = async (e) => {
    await fetchData(1, e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, [paginationInfo.pageNumber]);

  return (
    <div>
      <Heading marginBottom={20}>All Pending Driver</Heading>
      <Container marginBottom={12}>
        <Input
          placeholder="Search"
          onChange={handleQueryChange}
          style={{ width: "50%" }}
        />
      </Container>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <Pagination
        defaultCurrent={1}
        total={paginationInfo.total}
        current={paginationInfo.current}
        onChange={handlePagination}
      />
    </div>
  );
};
export default AllDriver;
