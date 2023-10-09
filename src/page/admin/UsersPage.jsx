import { Fragment, useState,   } from "react"
import { Table, Space, Button, Modal, Form, Input } from 'antd';
// import { useGetUsersQuery } from "../../redux/services/userService";



const UsersPage = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const {data} = useGetUsersQuery();

  // console.log(data);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
      render: (url) => <a target="_blank" rel="noreferrer" href={url}>{url}</a>
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
    {
      title: "Action",
      render: () => {
        return (
          <Space size="middle">
            <Button type="primary">
              Edit
            </Button>
            <Button danger  type="primary" >
              Delete
            </Button>
          </Space>
        );
      },
    },
    ];


  //   const deletePort = () =>{
  //     message.success("success delete !");
  // }

  const openModal = () =>{
      setIsModalOpen(true);
  }
  const closeModal = () =>{
      setIsModalOpen(false);
  }


  return ( <Fragment>
    <Table
        // loading={isFetching}
        bordered
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>Users (0)</h1>
            <Button onClick={openModal}  type="primary">
              Add User
            </Button>
          </div>
        )}
        columns={columns}
        dataSource={(0)}
      />
      <Modal
        title="Category data"
        open={isModalOpen}
        // onOk={handleOk}
        // confirmLoading={btnLoading}
        onCancel={closeModal}
        okText={"Add User"}
      >
        <Form
          form={form}
          name="portfolio"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Portfolio name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Portfolio url"
            name="url"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input.TextArea/>
          </Form.Item>
          
        </Form>
      </Modal>
    </Fragment>
  )
}

export default UsersPage