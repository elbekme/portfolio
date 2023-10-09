import { Fragment, useEffect } from "react"
import { Table, Space, Button, Modal, Form, Input } from 'antd';
import { addSkill, controlModal, editSkill, getSkill, getSkills, showModal, updateSkill,deleteSkill } from "../../redux/slices/skillSlice";
import { useDispatch, useSelector } from "react-redux";

const SkillsPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const {skills, isModalOpen, selected, loading, btnLoading} = useSelector(state => state.skill);

  useEffect(() => {
    dispatch(getSkills());
  },[dispatch])

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
            <Button type="primary" onClick={async () => { 
              await dispatch(editSkill(row._id));
              await dispatch(getSkills());
            let {payload} = await dispatch(getSkill(row._id));
            form.setFieldsValue(payload);
            }}>
              Edit
            </Button>
            <Button loading={btnLoading} danger type="primary" onClick={async () => {
              await dispatch(deleteSkill(row._id))
              await dispatch(getSkills());
              }}>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];



  const closeModal = () => {
    dispatch(controlModal());
  };

  const handleOk = async () => {
    try{
      let values = await form.validateFields();
      if(selected === null){
        await dispatch(addSkill(values));
      }else{
        await dispatch(updateSkill({id: selected, values}));
      }
      closeModal();
      await dispatch(getSkills());
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
    <Table
        loading={loading}
        bordered
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>Skills ({skills.length})</h1>
            <Button onClick={() => dispatch(showModal(form))} type="primary">
              Add skill
            </Button>
          </div>
        )}
        columns={columns}
        dataSource={skills}
      />
      <Modal
        title="Category data"
        open={isModalOpen}
        onOk={handleOk}
        confirmLoading={btnLoading}
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