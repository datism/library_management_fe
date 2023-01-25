
import './readerComponent.css'

function BookBorrowItem(props) {
  return (
    <div className="borrow-item">
      <img
        src={props.img}
        alt={props.name}
      />
      <div className='borrow-item-info'>
        <div className='borrow-item-name'>{props.name}</div>
        <div className='borrow-item-quantity'>
          <div className='quantity'>Tống số cuốn: <i>{props.quantity}</i></div>
          <div>Số cuốn còn lại: <i>{props.quantityleft}</i></div>
        </div>
      </div>
    </div>
  )
}

export default BookBorrowItem;