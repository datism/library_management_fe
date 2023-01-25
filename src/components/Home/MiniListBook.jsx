import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

import './home.css'
import BookItem from './BookItem'
import BookDetail from './BookDetail';
import { SERVER_ADDR } from '../../api/serverAddr';

const typeList = [
  "Đang hot",
  "Mới ra mắt"
]

function MiniListBook(props) {
  const navigate = useNavigate();
  const [ bookID, setBookID ] = useState(0);
  const [ bookList, setBookList ] = useState(null)

  useEffect(() => {
    // console.log(`${SERVER_ADDR}/library_be/index.php?controller=booktitle&sortBy=trend&sortD=2&pageSize=12&page=1`);

    const fetchData = async () => {
      var data;

      if (props.type === 0) {
        data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=booktitle&sortBy=trend&sortD=2&pageSize=12&page=1`)
      } 
      else data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=booktitle&sortBy=booktitleid&sortD=2&pageSize=12&page=1`)

      const res = await data.json();
      setBookList(res.data);
      // console.log(res);
    }

    fetchData();
  }, [props.type])

  const handleMore = () => {
    navigate(`/type=${props.type}`);
  }

  const handleSeeDetail = (e) => {
    document.getElementById('detail').classList.remove('hidden');
    setBookID(e.currentTarget.attributes.bookid.nodeValue);
  }

  if (bookList) return (
    <div className="wrap-list">
      <div className='title-list'>
        <div className='name-list'>{typeList[props.type]}</div>
        <button className='button-list' onClick={handleMore}>Xem thêm</button>
      </div>
      <div className='content-list'>
        {bookList.map((e, index) => 
          <div 
            key={index} 
            className='wrap-item' 
            onClick={handleSeeDetail} 
            bookid={e.booktitleid}
          >
            <BookItem
              img={e.picture}
              name={e.bookname}
            />
          </div>
        )}
      </div>
      <div id='detail' className='wrap-book-detail hidden'>
        <BookDetail bookID={bookID} />
      </div>
    </div>
  )
  else return(<></>)
}

export default MiniListBook