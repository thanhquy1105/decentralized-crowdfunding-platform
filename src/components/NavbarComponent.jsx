import { useNavigate, Link } from "react-router-dom";

export default function NavbarComponent(props) {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <nav className="leftNavbarContainer">
        <div className="navItem" onClick={() => navigate("/")}>
          Trang chủ
        </div>
        <div className="navItem" onClick={() => navigate("discover")}>
          Khám phá
        </div>
        <div className="navItem" onClick={() => navigate("create_project")}>
          Tạo project mới
        </div>
      </nav>
      <div className="centerNavbarContainer">CROWFUNDING PROJECT</div>
      <div className="rightNavbarContainer">
        {props.address == null ? <>
                <button className='walletButton' onClick={props.connectMetamask}>
                    Kết nối Metamask
                </button>
        </>:
        <div className="navItem">
          <Link to="/profile" state={{ address: props.address }}>
            {props.address.slice(0,5) + "..." + props.address.slice(props.address.length - 4, props.address.length)}
          </Link>
        </div>
        }
      </div>
    </div>
  );
}
