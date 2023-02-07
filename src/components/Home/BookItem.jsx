import './home.css';
import { Card } from 'antd';

function BookItem(props) {
  const { onShowDetail, book } = props
  return (
    <Card
      hoverable
      style={{
        width: '95%',
        background: 'white',
        cursor: 'pointer',
        borderRadius: 15,
        margin: 'auto',
        marginTop: 20,
        boxShadow: "0 1px 2px rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)",
      }}
      cover={
        <img
          alt="example"
          style={{
            borderRadius: '15px 15px 0px 0px',
            width: '100%',
            padding: '0px',
            height: 300,
            objectFit: 'fill'
          }}
          src={book.cover}
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
            width: 230,
            fontSize: 18,
            fontWeight: 600,
            marginBottom: 8,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
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
        {/*<p*/}
        {/*  style={{*/}
        {/*    fontSize: 16,*/}
        {/*    fontWeight: 500,*/}
        {/*    marginBottom: 8,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  {book.publisher}*/}
        {/*</p>*/}
      </div>
    </Card>
  );
}

export default BookItem;
