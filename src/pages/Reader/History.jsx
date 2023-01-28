// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"

// import { SERVER_ADDR } from '../../api/serverAddr'
// import Borow from "./Borrow";
// import axios from 'axios';
// import { BE_URL } from '../../constant';

// function History() {
//   const navigate = useNavigate();
//   const [ pageNum, setPageNum ] = useState(1);
//   const [ borrows, setBorrow ] = useState(null);
//   const [ bookID, setBookID ] = useState(0);

//   useEffect(() => {
//     const role = localStorage.getItem('role');
//     if (role !== '2') {
//       navigate('/');
//     }

//     const getAllBorrows = async () => {
//       const data = await axios.get(`${BE_URL}/borrow`);

//       const res = await data.json();
//       setBorrow(await res);
//       console.log(res);
//     }

//     getAllBorrows();
//   }, [navigate, pageNum]);



//   const handleSeeDetail = (id) => {
//     document.getElementById('detail').classList.remove('hidden');
//     setBookID(id);
//   }

//   if (borrows) return (
//     <div className="history-page">
//       <div className="title-page">Lịch sử mượn</div>
//       <div className="history-box">
//         <div className="scrollbar-box">
//           <div className="history-info">
//             <div className="history-title">
//               <div className="bookname middle-vertical">Tên sách</div>
//               <div className="transactiondate middle-vertical">Ngày mượn</div>
//               <div className="returndate middle-vertical">Ngày trả dự kiến</div>
//               <div className="isreturn middle-vertical">Trạng thái</div>
//             </div>
//             {borrows.data.map((e, index) =>
//               <div
//                 key={index}
//                 className={index % 2 ? "history-title" : "history-title gray"}
//                 //onClick={() => handleSeeDetail(e.bookID)}
//               >
//                 <div className="bookname middle-vertical">{e.title}</div>
//                 <div className="transactiondate middle-vertical">{e.startDate}</div>
//                 <div className="returndate middle-vertical">{e.endDate}</div>
//                 <div className="isreturn middle-vertical">
//                   {e.status === 'returned' ? 'Đã trả' : 'Chưa trả'}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
//   else return (<></>)
// }

// export default History