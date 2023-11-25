import React from 'react'
import {Button, Layout} from 'antd';
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
const { Header } = Layout;

function HeadNavbar() {

    const navigate = useNavigate()
    const singOut = () => {
        try {
            localStorage.removeItem('adminKey')
            navigate('/admin/login')
        } catch (error) {
            toast('somthing went wrong')
        }
    }
    
  return (
    <div>
       <Header className="site-layout-background" style={ { display: 'flex',  justifyContent: 'space-between', alignItems: 'center', padding: '0 16px'  }   }>
                    <div>
                        <h2 style={ {color: 'white'} }>Admin Dashboard</h2>
                    </div>
                    <div>
                        <Button type="primary" onClick={singOut}>Logout</Button>
                    </div>
                </Header>
    </div>
  )
}

export default HeadNavbar
