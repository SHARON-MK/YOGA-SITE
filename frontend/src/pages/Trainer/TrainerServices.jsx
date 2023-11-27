import React, { useState, useEffect } from 'react';
import TrainerNavbar from '../../components/trainer/TrainerNavbar';
import { listServicesAPI, deletecourseAPI } from '../../api/trainerAPI';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function TrainerServices() {
  const [courses, setCourses] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;
  const navigate = useNavigate('');

  useEffect(() => {
    listServicesAPI()
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching purchases:', error);
      });
  }, []);

  const handleEdit = (course) => {
    navigate('/trainer/profile/services/edit', { state: { course } });
  };

  const handleDelete = (courseId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this course?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCourse(courseId);
      }
    });
  };

  const deleteCourse = (courseId) => {
    deletecourseAPI(courseId)
      .then((response) => {
        if (response.data.success) {
          setCourses(response.data.data);
          Swal.fire('Deleted!', 'The course has been deleted.', 'success');
        } else {
          Swal.fire('Error!', 'Failed to delete the course.', 'error');
        }
      })
      .catch((error) => {
        console.error('Error deleting course:', error);
        Swal.fire('Error!', 'Failed to delete the course.', 'error');
      });
  };


  const handleViewReview = (course)=>{
   try {
       navigate('/trainer/profile/services/reviews',{state:{course}})
   } catch (error) {
       console.log('error while navigating to reviews page',error);
   }
  }

  const handleViewClasses = (course)=>{
    try {
        navigate('/trainer/profile/services/classes',{state:{course}})
    } catch (error) {
        console.log('error while navigating to reviews page',error);
    }
   }

  const pageCount = Math.ceil(courses.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayCourses = courses
    .slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage)
    .map((course, index) => (
      <tr key={course.courseId}>
        <th scope="row">{index + 1}</th>
        <td className='font-bold'>{course.course_name}</td>
        <td>{course.category}</td>
        <td>{course.duration} HR</td>
        <td>{course.amount}</td>
        <td>
          <img src={course.image} alt={'Course pic'} className="max-w-full h-auto max-h-16" />
        </td>
        <td>
          <button
            className="paginate hover:bg-blue-700 text-black py-2 px-4 rounded-full"
            onClick={() => handleEdit(course)}
          >
            Edit
          </button>
          <button
            className="paginate hover:bg-red-700 text-black py-2 px-4 rounded-full"
            onClick={() => handleDelete(course._id)}
          >
            Delete
          </button>
        </td>
        <td>
        <button
            className="paginate hover:bg-blue-700 text-black py-2 px-4 rounded-full"
            onClick={() => handleViewClasses(course)}
          >
            Classes
          </button>
        <button
            className="paginate hover:bg-blue-700 text-black py-2 px-4 rounded-full"
            onClick={() => handleViewReview(course)}
          >
            Reviews
          </button>
        </td>
      </tr>
    ));

  return (
    <>
    <TrainerNavbar />
    <div className=" purchasesPage">
      <div className="mt-4">
        <div className="table-wrapper">
          <table className="table table-striped table-light">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Course</th>
                <th scope="col">Category</th>
                <th scope="col">Duration</th>
                <th scope="col">Amount</th>
                <th scope="col">Image</th>
                <th scope="col">Action</th>
                <th scope="col">View</th>
              </tr>
            </thead>
            <tbody>{displayCourses}</tbody>
          </table>
        </div>
      </div>
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={'flex justify-center space-x-2 mt-11'}
          pageClassName={'inline-flex element-center text-sm'}
          pageLinkClassName={'page-link flex element-center justify-center w-8 h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}
          activeClassName={'active-page'}
          disabledClassName={'opacity-50 pointer-events-none'}
          previousClassName={'paginate inline-flex element-center justify-center px-3 h-8 ml-0 leading-tight text-white  border border-blue-600 rounded-l-lg hover:bg-green hover:text-blue-700 dark:bg-blue-500 dark:border-blue-500 dark:text-blue-600 dark:hover:bg-blue-700 dark:hover:text-white'}
          nextClassName={'paginate inline-flex element-center justify-center px-3 h-8 leading-tight text-white  border border-blue-600 rounded-r-lg hover:bg-green hover:text-blue-700 dark:bg-blue-800 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-white dark:hover:text-white'}
        />
      </div>
    </div>
    </>
  );
}

export default TrainerServices;
