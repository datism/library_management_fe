import NavBar from '../components/NavBar';
import './layout.css';

function PublicLayout(props) {
  return (
    <div className="public-layout">
        <div className="header">
          <NavBar subMenu={props.subMenu} />
        </div>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default PublicLayout;
