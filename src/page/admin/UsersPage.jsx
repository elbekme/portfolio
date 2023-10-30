import { Fragment, useState,   } from "react"
import { Table, Space, Button, Modal, Form, Input, message, Pagination } from 'antd';
import { useAddUserMutation, useDeleteUserMutation, useGetUserMutation, useGetUsersQuery, useUpdateUserMutation } from "../../redux/services/userService";



const UsersPage = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const {data, isFetching, refetch} = useGetUsersQuery(page);
  console.log(data);

  const [getUser] = useGetUserMutation();
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation(); 


  const columns = [
    {
      title: "First name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
        title: "Username",
        dataIndex: "username",
        key: "username",
      },
    {
      title: "Action",
      render: (_, row) => {
        return (
          <Space size="middle">
            <Button type="primary" onClick={() => editUser(row._id)}>
              Edit
            </Button>
            <Button danger  type="primary" onClick={async () => { await deleteUser(row._id); refetch(); deleteUserss}}>
              Delete
            </Button>
          </Space>
        );
      },
    },
    ];


    const deleteUserss = () => {
      message.success("success delete !");
  }

  const openModal = () =>{
      setIsModalOpen(true);
      setSelected(null);
      form.resetFields();
  }
  const closeModal = () =>{
      setIsModalOpen(false);
  }

  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      values.photo = "6521485e1b06670014733226";
      if(selected === null){
        await addUser(values);
        message.success('success add !');
      }else {
        await updateUser({id:selected,body: values});
        message.success('success update !');
      }
      closeModal();
      refetch();
    }catch(err){
      console.log(err);
    }
  };

  async function editUser(id) {
    try {
      setSelected(id);
      setIsModalOpen(true);
      const { data } = await getUser(id);
      form.setFieldsValue(data);
    } catch (err) {
      console.log(err);
    }
  }


  return ( <Fragment>
    <Table
        loading={isFetching}
        bordered
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>Users ({data?.pagination.total})</h1>
            <Button onClick={openModal}  type="primary">
              Add User
            </Button>
          </div>
        )}
        columns={columns}
        dataSource={data?.data}
      />
      <Pagination total={data?.pagination.total} current={page} onChange={(page) => {
        setPage(page)
      }}/>
      <Modal
        title="Category data"
        open={isModalOpen}
        onOk={handleOk}
        // confirmLoading={btnLoading}
        onCancel={closeModal}
        okText={selected ? "Save user" : "Add user"}
      >
        <Form
          form={form}
          name="user"
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
            label="First Name"
            name="firstName"
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
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="User name"
            name="username"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input/>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  )
}

export default UsersPage