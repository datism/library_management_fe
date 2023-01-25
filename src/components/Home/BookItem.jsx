

import './home.css'

function BookItem(props) {
  return (
    <div className="book-item">
      <img
        className='book-img'
        src={props.img}
        alt={props.name}
      />
      <div className='book-name'>
        {props.name}
      </div>
    </div>
  )
}

export default BookItem