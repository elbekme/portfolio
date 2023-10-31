import { Fragment, useState,   } from "react"
import { Table, Space, Button, message, Modal, Form, Input, Pagination } from 'antd';

import {
    useGetMessagesQuery,
    useGetMessageMutation,
    useAddMessageMutation,
    useUpdateMessageMutation,
    useDeleteMessageMutation,
} from "../../redux/services/messageService";

const MessagePage = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState(null);

    const {data, isFetching, refetch} = useGetMessagesQuery(page);

    const [getMessage] = useGetMessageMutation();
    const [addMessage] = useAddMessageMutation();
    const [updateMessage] = useUpdateMessageMutation();
    const [deleteMessage] = useDeleteMessageMutation(); 

    const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
        title: "User",
        dataIndex: "user",
        key: "user",
    },
    {
        title: "Answer",
        dataIndex: "answer",
        key: "answer",
      },
    {
      title: "Action",
      render: (_, row) => {
        return (
          <Space size="middle">
            <Button type="primary" onClick={() => editMessage(row._id)}>
              Edit
            </Button>
            <Button danger  type="primary" onClick={async () => { await deleteMessage(row._id); refetch();deleteMesg}}>
              Delete
            </Button>
          </Space>
        );
      },
    },
    ];

    const deleteMesg = () =>{
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
          await addMessage(values);
          message.success('success add !');
        }else {
          await updateMessage({id:selected,body: values});
          message.success('success update !');
        }
        closeModal();
        refetch();
      }catch(err){
        console.log(err);
      }
    };

    async function editMessage(id) {
      try {
        setSelected(id);
        setIsModalOpen(true);
        const { data } = await getMessage(id);
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
            <h1>Messages ({data?.pagination.total})</h1>
            <Button onClick={openModal}  type="primary">
              Add message
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
        title="Messsage data"
        open={isModalOpen}
        onOk={handleOk}
        // confirmLoading={btnLoading}
        onCancel={closeModal}
        okText={selected ? "Save message" : "Add message"}
      >
        <Form
          form={form}
          name="message"
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
            label="Answer"
            name="answer"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  )
}

export default MessagePage