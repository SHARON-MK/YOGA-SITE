import React, { useEffect, useState } from 'react';
import {
    MDBCol,MDBContainer,MDBRow,MDBCard,MDBCardText,MDBCardBody,MDBCardImage,MDBBtn,MDBTypography } from 'mdb-react-ui-kit';
import HomeNavbar from '../../components/user/HomeNavbar'
import { userDataAPI } from '../../api/userAPI';
import { useNavigate,Link } from "react-router-dom";



export default function Profile() {
    const [user, setUser] =useState(null)
    const navigate = useNavigate("");

    const fetchData = async ()=>{
        const response = await userDataAPI()
        const userData = response.data.data;
        setUser(userData);
    }

    useEffect(()=>{
        fetchData()
    },[])

    const handleEditProfile = () => {
        navigate("/profile/editprofile");
      };
    

    return (
        <div>
            <HomeNavbar/>
             <div className="gradient-custom-2 pt-20"  style={ {backgroundColor: '#8acbc1'} }>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="9" xl="7">
                        <MDBCard>
                            <div className="profile-banner rounded-top text-white d-flex flex-row" style={ {  height: '200px' } }>
                                <div className="ms-4 mt-5 d-flex flex-column" style={ {width: '150px'} }>
                                    <MDBCardImage src={user && user.image ? user.image : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"} alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={ { width: '150px', zIndex: '1'} }/>
                                </div>
                                <div className="ms-3" style={ {marginTop: '130px'} }>
                                    <MDBTypography tag="h5">{user?user.name:'loading'}</MDBTypography>
                                    <MDBCardText>{user && user.city ? user.city : '-'}</MDBCardText>
                                </div>
                            </div>
                            <div className="p-4 text-black"style={ {backgroundColor: '#f8f9fa'} }>
                                <button className="rounded-full ms-4 mt-3" onClick={() => {handleEditProfile()} }>EDIT PROFILE</button>
                                <div className="d-flex justify-content-end text-center py-1">
                                    <div>
                                        <MDBCardText className="mb-1 h5">{user && user.age ? user.age : '-'}</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Age</MDBCardText>
                                    </div>
                                    <div className="px-3">
                                        <MDBCardText className="mb-1 h5">{user && user.city ? user.city : '-'}</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">City</MDBCardText>
                                    </div>
                                    <div>
                                        <MDBCardText className="mb-1 h5">{user && user.country ? user.country : '-'}</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Country</MDBCardText>
                                    </div>
                                </div>
                            </div>
                            <MDBCardBody className="text-black p-4">

                                <div className="mb-5">
                                    <p className="fw-normal mb-1">DASHBOARD</p>
                                    <div className="p-4  d-flex justify-content-center" style={{backgroundColor: '#f8f9fa'} }>


                                        <button type="button" className="px-4 py-2 font-semibold rounded-full dark:bg-gray-100 dark:text-gray-800 transition-colors duration-300 hover:bg-blue-500 hover:text-white">
                                        <Link to="/profile/purchases">PURCHASES</Link>
                                        </button>

                                        <button type="button" className="px-4 py-2 font-semibold rounded-full dark:bg-gray-100 dark:text-gray-800 transition-colors duration-300 hover:bg-blue-500 hover:text-white">
                                            CLASSES
                                        </button>

                                        <button type="button" className="px-4 py-2 font-semibold rounded-full dark:bg-gray-100 dark:text-gray-800 transition-colors duration-300 hover:bg-blue-500 hover:text-white">
                                            ORDERS
                                        </button>


                                    </div>
                                </div>

                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
           </div>
        </div>
    );
}
