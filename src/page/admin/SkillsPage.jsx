import { Fragment, useState } from "react"
import { Table, Space, Button, Modal, Form, Input, message, Pagination } from 'antd';

import {
  useGetSkillsQuery,
  useGetSkillMutation,
  useAddSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} from '../../redux/services/skillService';

const SkillsPage = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const {data, isFetching, refetch} = useGetSkillsQuery(page);

  const [getSkill] = useGetSkillMutation();
  const [addSkill] = useAddSkillMutation();
  const [updateSkill] = useUpdateSkillMutation();
  const [deleteSkill] = useDeleteSkillMutation(); 

  const openModal = () =>{
    setIsModalOpen(true);
    setSelected(null);
    form.resetFields();
  }
  const closeModal = () =>{
      setIsModalOpen(false);
  }



  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
    },
    {
      title: "Action",
      render: (_, row) => {
        return (
          <Space size="middle">
            <Button type="primary" onClick={() => editSkill(row._id)}>
              Edit
            </Button>
            <Button danger type="primary" onClick={async () => { await deleteSkill(row._id); refetch(); deleteSkillss}}>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const deleteSkillss = () => {
    message.success("success delete !");
}

  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      values.photo = "6521485e1b06670014733226";
      if(selected === null){
        await addSkill(values);
        message.success('success add !');
      }else {
        await updateSkill({id:selected,body: values});
        message.success('success update !');
      }
      closeModal();
      refetch();
    }catch(err){
      console.log(err);
    }
  };

  async function editSkill(id) {
    try {
      setSelected(id);
      setIsModalOpen(true);
      const { data } = await getSkill(id);
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
            <h1>Skills ({data?.pagination.total})</h1>
            <Button onClick={openModal} type="primary">
              Add skill
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
        okText={selected ? "Save skill" : "Add skill" }
      >
        <Form
          form={form}
          name="skill"
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
            label="Skill name"
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
            label="Percent"
            name="percent"
            rules={[
              {
                required: true,
                message: "Please fill!",
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

export default SkillsPage