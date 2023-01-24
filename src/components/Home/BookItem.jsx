import './home.css';
import { Card } from 'antd';
import { arrayBufferToBase64 } from '../../helpers';

function BookItem(props) {
  const { onShowDetail, book } = props;
  return (
    <Card
      hoverable
      style={{
        width: '100%',
        background: 'white',
        cursor: 'pointer',
        padding: 0,
      }}
      cover={
        <img
          alt="example"
          style={{
            width: '100%',
            padding: '0px',
            height: 200,
          }}
          src={
            'data:image/jpeg;base64,' +
            arrayBufferToBase64(book.cover.image.data)
          }
          onClick={onShowDetail}
        />
      }
      bodyStyle={{
        padding: 0,
      }}
    >
      <div
        style={{
          padding: 10,
        }}
      >
        <p
          style={{
            fontSize: 18,
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          {book.title}
        </p>
        <p
          style={{
            fontSize: 13,
            fontWeight: 500,
            marginBottom: 8,
            fontStyle: 'italic',
          }}
        >
          {book.type}
        </p>
        <p
          style={{
            fontSize: 16,
            fontWeight: 500,
            marginBottom: 8,
          }}
        >
          {book.publisher}
        </p>
      </div>
    </Card>
  );
}

export default BookItem;
