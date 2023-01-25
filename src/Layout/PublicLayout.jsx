import NavBar from '../components/NavBar'
import './layout.css'

function PublicLayout(props) {
  return (
    <div className='public-layout' >
      <div style={{ background: 'none', height: '100%' }}>
        <div className='header'>
          <NavBar subMenu={props.subMenu} />
        </div>
        <div style={{ height: '100%' }}>
          <div className='content'>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublicLayout