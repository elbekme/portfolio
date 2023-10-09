import { Fragment, useState,   } from "react"
import { Table, Space, Button, message, Modal, Form, Input, Pagination } from 'antd';

import { useAddPortfolioMutation, useDeletePortfolioMutation, useGetPortfoliosQuery, useUpdatePortfolioMutation, useGetPortfolioMutation } from "../../redux/services/portfolioService";

const PortfoliosPage = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState(null);

    const {data, isFetching, refetch} = useGetPortfoliosQuery(page);

    const [getPortfolio] = useGetPortfolioMutation();
    const [addPortfolio] = useAddPortfolioMutation();
    const [updatePortfolio] = useUpdatePortfolioMutation();
    const [deletePortfolio] = useDeletePortfolioMutation(); 

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
    }
    const closeModal = () =>{
        setIsModalOpen(false);
    }




    const handleOk = async () => {
      try {
        let values = await form.validateFields();
        values.photo = "6521485e1b06670014733226";
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
            <h1>Portfolios ({data?.pagination.total})</h1>
            <Button onClick={openModal}  type="primary">
              Add portfolio
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
        okText={selected ? "Save portfolio" : "Add portfolio"}
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

export default PortfoliosPage