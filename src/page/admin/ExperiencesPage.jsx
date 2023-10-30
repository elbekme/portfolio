import { Fragment, useState,   } from "react"
import { Table, Space, Button, message, Modal, Form, Input, Pagination } from 'antd';

import { 
    useGetEducationsQuery,
    useGetEducationMutation,
    useAddEducationMutation,
    useUpdateEducationMutation,
    useDeleteEducationMutation, } from "../../redux/services/experienceServices";

const ExperiencePage = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState(null);

    const {data, isFetching, refetch} = useGetEducationsQuery(page);

    const [getPortfolio] = useGetEducationMutation();
    const [addPortfolio] = useAddEducationMutation();
    const [updatePortfolio] = useUpdateEducationMutation();
    const [deletePortfolio] = useDeleteEducationMutation(); 

    const columns = [
    {
      title: "Work name",
      dataIndex: "workName",
      key: "workName",
    },
    {
      title: "Company name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Start Data",
        dataIndex: "startDate",
        key: "startDate",
      },
      {
        title: "End Data",
        dataIndex: "endDate",
        key: "endDate",
      },
    {
      title: "Action",
      render: (_, row) => {
        return (
          <Space size="middle">
            <Button type="primary" onClick={() => editPortfolio(row._id)}>
              Edit
            </Button>
            <Button danger  type="primary" onClick={async () => { await deletePortfolio(row._id); refetch();deletePort}}>
              Delete
            </Button>
          </Space>
        );
      },
    },
    ];

    const deletePort = () =>{
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
        console.log(values);
        // values.photo = "6521485e1b06670014733226";
        if(selected === null){
          await addPortfolio(values);
          message.success('success add !');
        }else {
          await updatePortfolio({id:selected,body: values});
          message.success('success update !');
        }
        closeModal();
        refetch();
      }catch(err){
        console.log(err);
      }
    };

    async function editPortfolio(id) {
      try {
        setSelected(id);
        setIsModalOpen(true);
        const { data } = await getPortfolio(id);
        form.setFieldsValue(data);
      } catch (err) {
        console.log(err);
      }
    }

  return (
    <Fragment>
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
            <h1>Experience ({data?.pagination.total})</h1>
            <Button onClick={openModal}  type="primary">
              Add experience
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
        title="Experience data"
        open={isModalOpen}
        onOk={handleOk}
        // confirmLoading={btnLoading}
        onCancel={closeModal}
        okText={selected ? "Save experience" : "Add experience"}
      >
        <Form
          form={form}
          name="experience"
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
            label="Work name"
            name="workName"
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
            label="Company name"
            name="companyName"
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
          <Form.Item
            label="start Date"
            name="startDate"
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
            label="end Date"
            name="endDate"
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

export default ExperiencePage