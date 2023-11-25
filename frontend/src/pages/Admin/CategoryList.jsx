import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../helper/redux/alertsSlice'
import { Table, Button, Layout } from 'antd';
import Sidebar from '../../components/admin/Sidebar';
import HeadNavbar from '../../components/admin/HeadNavbar';
import { categoryListAPI , blockCategoryAPI} from '../../api/adminAPI';
const {Content} = Layout;

function CategoryList() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(showLoading());
        const response = await categoryListAPI();
        const { success, message, data } = response.data;
        dispatch(hideLoading());
        if (success) {
          toast.success(message);
          setCategories(data);
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
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status) =>
      status ? 'ACTIVE' : 'BLOCKED',
    },
    {
      title: 'ACTION',
      dataIndex: 'status',
      key: 'action',
      render: (status, record) =>
        status ? (
          <Button type="primary" onClick={() => blockCategory(record)}>
            BLOCK
          </Button>
        ) : (
          <Button type="primary" onClick={() => blockCategory(record)}>
            VERIFY
          </Button>
        ),
    },
  ];

  const blockCategory = async (record) => {
    try {
      dispatch(showLoading());
      const response = await blockCategoryAPI(record);
      const { success, message, data } = response.data;
      dispatch(hideLoading());
      if (success) {
        toast.success(message);
        setCategories(data);
      } else {
        toast.error(message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };


  return (
    <div>
        <Layout style={ {minHeight: '100vh'} }>
            <Sidebar/>    {/* component */}
            <Layout className="site-layout">
                <HeadNavbar/>     {/* component */}
                <Content style={ {margin: '16px'} }>
                   <div>
                   <button type="button" className="px-8 py-3 font-semibold rounded dark:bg-gray-100 dark:text-gray-800 add-category-button"><Link to='/admin/categories/add'>ADD</Link></button>
                      <Table
                         columns={columns}
                         dataSource={categories}
                         pagination={pagination}
                         onChange={(pagination) => setPagination(pagination)}
                      />
                   </div>
               </Content>
            </Layout>
        </Layout>
    </div>
  );
}

export default CategoryList;
