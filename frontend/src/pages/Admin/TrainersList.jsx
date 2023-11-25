import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../helper/redux/alertsSlice';
import { Table, Button, Layout, Modal } from 'antd';
import Sidebar from '../../components/admin/Sidebar';
import HeadNavbar from '../../components/admin/HeadNavbar';
import { trainersListAPI, blockTrainerAPI } from '../../api/adminAPI';

const { Content } = Layout;

const TrainersList = () => {
  const dispatch = useDispatch();
  const [trainers, setTrainers] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isIdCardImageModalVisible, setIsIdCardImageModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(showLoading());
        const response = await trainersListAPI();
        const { success, message, data } = response.data;
        dispatch(hideLoading());
        if (success) {
          toast.success(message);
          setTrainers(data);
        } else {
          toast.error(message);
        }
      } catch (error) {
        dispatch(hideLoading());
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      key: 'key',
      render: (text, record, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => (
        <img
          src={record.image}
          alt="Trainer"
          style={{ width: '50px', cursor: 'pointer' }}
          onClick={() => handleImageClick(record)}
        />
      ),
    },
    {
      title: 'ID Card',
      dataIndex: 'idCardImage',
      key: 'idCardImage',
      render: (text, record) => (
        <img
          src={record.idcard}
          alt="ID Card"
          style={{ width: '50px', cursor: 'pointer' }}
          onClick={() => handleIdCardImageClick(record)}
        />
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'admin_verification',
      key: 'admin_verification',
      render: (admin_verification) =>
        admin_verification ? 'VERIFIED' : 'NOT VERIFIED',
    },
    {
      title: 'ACTION',
      dataIndex: 'admin_verification',
      key: 'action',
      render: (admin_verification, record) => (
        <Button
          type="primary"
          onClick={() => blockActionTrainer(record)}
        >
          {admin_verification ? 'BLOCK' : 'VERIFY'}
        </Button>
      ),
    },
  ];

  const blockActionTrainer = async (record) => {
    try {
      dispatch(showLoading());
      const response = await blockTrainerAPI(record);
      const { success, message, data } = response.data;
      dispatch(hideLoading());
      if (success) {
        toast.success(message);
        setTrainers(data);
      } else {
        toast.error(message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleImageClick = (record) => {
    setSelectedTrainer(record);
    setIsModalVisible(true);
  };

  const handleIdCardImageClick = (record) => {
    setSelectedTrainer(record);
    setIsIdCardImageModalVisible(true);
  };

  const EnlargedViewModal = () => (
    <Modal
      title="Trainer Image"
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
    >
      {selectedTrainer && (
        <img
          src={selectedTrainer.image}
          alt="Trainer"
          style={{ width: '100%' }}
        />
      )}
    </Modal>
  );

  const EnlargedIdCardImageModal = () => (
    <Modal
      title="ID Card Image"
      visible={isIdCardImageModalVisible}
      onCancel={() => setIsIdCardImageModalVisible(false)}
      footer={null}
    >
      {selectedTrainer && (
        <img
          src={selectedTrainer.idcard}
          alt="ID Card"
          style={{ width: '100%' }}
        />
      )}
    </Modal>
  );

  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout className="site-layout">
          <HeadNavbar />
          <Content style={{ margin: '16px' }}>
            <div>
              <Table
                columns={columns}
                dataSource={trainers}
                pagination={pagination}
                onChange={(pagination) => setPagination(pagination)}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
      <EnlargedViewModal />
      <EnlargedIdCardImageModal />
    </div>
  );
};

export default TrainersList;
