import React, { useEffect, useState } from 'react';
import { filteredCoursesListAPI, categoryListAPI } from '../../api/userAPI';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import HomeNavbar from '../../components/user/HomeNavbar';
import FooterMain from '../../components/user/FooterMain';
import { setCourseDetail } from '../../helper/redux/courseDetailSlice';
import { hideLoading, showLoading } from '../../helper/redux/alertsSlice'


function Courses() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [category, setCategory] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

    const [currentPage, setCurrentPage] = useState(0);
    const coursesPerPage = 6;

    const getCourseData = async () => {
        dispatch(showLoading())
        filteredCoursesListAPI(selectedCategory,searchQuery,sortOrder)
            .then((response) => {
                if (response.data.success) {
                    // toast.success(response.data.message);
                    dispatch(hideLoading())
                    setCourses(response.data.data);
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(() => toast('Error in fetching courses'));
    };

    const getCategoryData = async () => {
        categoryListAPI(category)
            .then((response) => {
                if (response.data.success) {
                    toast.success(response.data.message);
                    setCategory(response.data.data);
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(() => toast('Error in fetching categories'));
    };

    useEffect(() => {
        getCourseData();
    }, [selectedCategory, searchQuery, sortOrder]);


    useEffect(() => {      // second useeffect bcoz i dont need getCategoryData() to be called on each state change renders
        getCategoryData();
    }, []);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(0);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(0);
    };

    const handleSortOrderChange = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setCurrentPage(0);
    };

    // DATA PASSED FOR RECEIVING THERE BY USEPARAMS METHOD
    // const handleCourseClick = (selectedCourse) => {
    //     const courseString = JSON.stringify(selectedCourse);
    //     navigate(`/courses/detailed/${encodeURIComponent(courseString)}`);
    //   };


     // DATA PASSED FOR RECEIVING THERE BY USELOCATION METHOD
      const handleCourseClick = (selectedCourse) => {
        navigate('/courses/detailed/',{ state: { selectedCourse } })};
      

    const indexOfLastCourse = (currentPage + 1) * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    return (
        <div>
            <HomeNavbar />

            <div className='' style={{ marginLeft: '120px', marginRight: '20px', marginTop: '130px', marginBottom: '30px', alignItems: 'center' }}>
                {/* Category dropdown */}
                <select
                    onChange={handleCategoryChange}
                    value={selectedCategory}
                    className='card-courses'
                    style={{ padding: '8px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc',}}
                >
                    <option value="">All Categories</option>
                    {category.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                </select>

                {/* Search bar */}
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleSearch}
                    className='card-courses'
                    value={searchQuery}
                    style={{ padding: '8px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc',}}
                />

                {/* Sort order button */}
                <button
                    onClick={handleSortOrderChange}
                    className='card-courses'
                    style={{
                        padding: '8px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        border: '1px solid #ccc',
                    }}
                >
                    {sortOrder === 'asc' ? 'Price: Low to High' : 'Price: High to Low'}
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                    {currentCourses.map((course, index) => (
                        <div
                            key={index}
                            className="max-w-xs p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-50 mb-4 card-courses" 
                            onClick={() => handleCourseClick(course)} >
                            <img src={course.image} alt="" className="object-cover object-center w-full rounded-md h-40 dark:bg-gray-500" />
                            <div className="mt-6 mb-2">
                            <span className="block text-xs font-medium tracki uppercase text-gray-400">{course.category}</span>

                                <h2 className="text-xl font-semibold tracki mb-2">{course.course_name}</h2>
                                <span className="block text-xs font-medium tracki uppercase dark:text-pink-400 mb-3 text-gray-400">{`BY ${course.trainer_name}`}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <h2 className="dark:text-gray-100 font-semibold">{`₹ ${course.amount}`}</h2>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md"><Link to='/courses/detailed'>PURCHASE</Link></button>
                            </div>
                        </div>
                    ))}
                </div>

                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(courses.length / coursesPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'flex justify-center space-x-2 mt-11'}
                    pageClassName={'inline-flex element-center text-sm'}
                    pageLinkClassName={'page-link flex element-center justify-center w-8 h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}
                    activeClassName={'active-page'}
                    disabledClassName={'opacity-50 pointer-events-none'}
                    previousClassName={'inline-flex element-center justify-center px-3 h-8 ml-0 leading-tight text-white bg-blue-600 border border-blue-600 rounded-l-lg hover:bg-white hover:text-blue-700 dark:bg-blue-500 dark:border-blue-500 dark:text-blue-600 dark:hover:bg-blue-700 dark:hover:text-white'}
                    nextClassName={'inline-flex element-center justify-center px-3 h-8 leading-tight text-white bg-blue-600 border border-blue-600 rounded-r-lg hover:bg-white hover:text-blue-700 dark:bg-blue-800 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-white dark:hover:text-white'}
                />
            </div>
            <FooterMain/>
        </div>
    );
}

export default Courses;