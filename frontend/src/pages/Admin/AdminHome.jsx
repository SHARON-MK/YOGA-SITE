import axios from 'axios'
import React, {useEffect,} from 'react'
import {Layout} from 'antd';
import Sidebar from '../../components/admin/Sidebar';
import HeadNavbar from '../../components/admin/HeadNavbar';
const {Content} = Layout;

function AdminHome() {

    const getData = async (req, res) => {
        try {
            const response = await axios.post('/api/admin/get-admin-info-by-id', {}, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('adminKey')
                }
            })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <Layout style={ {minHeight: '100vh'} }>
            <Sidebar/>     {/* component */}
            <Layout className="site-layout">
                <HeadNavbar/>      {/* component */}
                <Content style={ {margin: '16px'} }>
                    
                        <div style={ {  padding: 24, background: '#fff', minHeight: 360 } }>
                            Dashboard Content
                        </div>

                   </Content>
            </Layout>
        </Layout>
    )


}

export default AdminHome
