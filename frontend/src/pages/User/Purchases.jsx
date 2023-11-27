import React, { useState, useEffect } from 'react';
import HomeNavbar from '../../components/user/HomeNavbar';
import { purchasesAPI, cancelPurchaseAPI } from '../../api/userAPI';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'


function Purchases() {
  const [orders, setOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 8;
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch purchases when the component mounts
    purchasesAPI()
      .then((response) => {
        setOrders(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching purchases:', error);
      });
  }, []);

  const handleCancelBooking = (orderId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to Cancel this Purchase?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        cancelPurchase(orderId)
      }
    });
  };

  const cancelPurchase = (orderId) => {
    cancelPurchaseAPI(orderId)
      .then((response) => {
        if (response.data.success) {
          setOrders(response.data.data);
          Swal.fire('Cancelled!', 'The purchase has been cancelled.', 'success');
        } else {
          Swal.fire('Error!', 'Failed to cancel the purchase.', 'error');
        }
      })
      .catch((error) => {
        console.error('Error cancelling purchase:', error);
        Swal.fire('Error!', 'Failed to cancel the purchase.', 'error');
      });
  };


  const handleRating = (courseId) => {
    try {
      navigate('/profile/purchases/rating', { state: { courseId } })
    } catch (error) {
      console.log('error whilel moving to rating page')
    }
  }

  const handleClass = (courseId) => {
    try {
      navigate('/profile/purchases/room')
    } catch (error) {
      console.log('error whilel moving to room page')
    }
  }

  const pageCount = Math.ceil(orders.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayOrders = orders
    .slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage)
    .map((order, index) => (
      <tr key={order.orderId}>
        <th scope="row">{index + 1}</th>
        <td className='font-bold'>{order.course_name}</td>
        <td>{order.category}</td>
        <td>
          <td>
            <button
              className="paginate hover:bg-red-700 text-black py-2 px-4 rounded-full"
              onClick={() => handleCancelBooking(order._id)}
            >
              Cancel Booking
            </button>
          </td>
          <td>
            <button
              className="paginate hover:bg-red-700 text-black py-2 px-4 rounded-full"
              onClick={() => handleRating(order.course_id)}
            >
              Rate the Course
            </button>
          </td>
        </td>
        <td>
        <button
              className="paginate hover:bg-red-700 text-black py-2 px-4 rounded-full"
              onClick={() => handleClass(order.course_id)}
            >
              Class
            </button>
        </td>

      </tr>
    ));

  return (
    <div className="p-6 purchasesPage">
      <HomeNavbar />
      <div className="mt-4">
        <table className="table table-striped table-light">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Course</th>
              <th scope="col">Category</th>
              <th scope="col">Action</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody>{displayOrders}</tbody>
        </table>
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
  );
}

export default Purchases;
