import './home.css';
import { Card } from 'antd';

function BookItem(props) {
  const { onShowDetail } = props;
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
          }}
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
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
          }}
        >
          Book
        </p>
        <p
          style={{
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          Nguyen Van Duc
        </p>
      </div>
    </Card>
  );
}

export default BookItem;
