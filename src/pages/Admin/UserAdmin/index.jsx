/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Table, Space, Popconfirm, Form, Input, Button, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import {
  getUserListAction,
  editUserAdminAction,
  deleteUserAdminAction
} from '../../../redux/actions'


function AdminUserListPage(props) {

  const {
    getUserListAdmin,
    userListAdmin,
    deleteUserAdmin,
    editUserAdmin
  } = props

  useEffect(() => {
    getUserListAdmin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  function ShowTable() {
    const columns = [
      {
        title: 'ID', dataIndex: 'id', key: 'id',
      },
      {
        title: 'Name', dataIndex: 'name', key: 'name',
      },
      {
        title: 'Email', dataIndex: 'email', key: 'email',
        // render: text => <a style={{color: 'black'}}>{text}</a>,
      },
      {
        title: 'Address', dataIndex: 'address', key: 'address',
      },
      {
        title: 'Phone', key: 'phone', dataIndex: 'phone',
      },
      {
        title: 'Password', key: 'password', dataIndex: 'password',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space>
            <Button type="primary" ghost onClick={() => showModal()}>
              <EditOutlined />
            </Button>
            <Popconfirm
              title={`Bạn có chắc muốn xóa: ${record.name}`}
              onConfirm={() => handleDeleteUser(record.id)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button danger ><DeleteOutlined /></Button>
            </Popconfirm>
          </Space>


        ),
      },
    ];
    const dataSource = userListAdmin.data.map((userItem) => ({
      ...userItem,
      key: userItem.id
    }))
    return (
      <Table
        loading={userListAdmin.load}
        columns={columns}
        dataSource={dataSource}
      />
    )
  }


  //Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // Modal


  const handleDeleteUser = (id) => {
    deleteUserAdmin({ id })
  }

  const handleEdit = ({ id, values }) => {

  }




  return (
    <div style={{ width: '100%', height: 'calc(100vh - 80px)'}}>
      <h2>Danh sách người dùng:</h2>
      {ShowTable()}
      <>
        <Modal title="Cập nhập người dùng" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Form
            layout="vertical"
            name="basic"
            initialValues={{
            }}
            onFinish={(values) => { handleEdit(values); }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </Modal>
      </>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserListAdmin: (params) => dispatch(getUserListAction(params)),
    deleteUserAdmin: (params) => dispatch(deleteUserAdminAction(params)),
    editUserAdmin: (params) => dispatch(editUserAdminAction(params))
  }
}

const mapStateToProps = (state) => {
  const { userListAdmin } = state.userAdminReducer
  return {
    userListAdmin
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminUserListPage);