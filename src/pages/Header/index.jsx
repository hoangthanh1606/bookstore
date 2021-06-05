import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LoginOutlined
} from "@ant-design/icons";
import "./styles.css";

import { Input, Avatar, Menu, Dropdown, Button } from "antd";

import history from "../../utils/history";
import { addSearchProductAction } from "../../redux/actions";


const { Search } = Input;

function Header(props) {
  const { userInfo, cartList, addSearchProduct, searchValue } = props;
  // const [searchValue, setSearchValue] = useState('');

  const onSearch = value => {
    addSearchProduct({ searchValue: value },
    history.push("/products"));
  }

  function onLogout() {
    localStorage.removeItem("userInfo");
    window.location.reload();
  }
  const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/profile" style={{color: 'black'}}>
        Thông tin cá nhân
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link onClick={onLogout} style={{color: 'black'}}>
        Đăng xuất
      </Link>
    </Menu.Item>
  </Menu>
  );

  return (
    <>
      <div className="header-container ">
        {/* <div className="header-icons">
          <FacebookOutlined className="header-container-icon" />
          <InstagramOutlined className="header-container-icon" />
        </div> */}
        <div className="heading ">
          <div className="header-logo">
            <Link to="/">
              {/* <h3>Fahasa.com</h3> */}
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png"
                alt=""
                style={{ width: "200px" }}
              />
            </Link>
          </div>
          <div className="header-nav">
            <Link className="header-nav-link" to="/">
              {" "}
              Home
            </Link>
            <Link className="header-nav-link" to="/products">
              Bookstore
            </Link>
            <div style={{ marginLeft: "60px", width: "300px" }}>
              <Search
                placeholder="Nhập để tìm kiếm"
                allowClear
                enterButton
                size="middle"
                onSearch={onSearch}
              />
            </div>
          </div>

          <div className="header-user">
            <div className="header-user-icon">
              {/* {userInfo.data && userInfo.data.id ? (
                <>
                  <p>
                    <Avatar size="small" icon={<UserOutlined />} />{" "}
                    {userInfo.data.name}
                  </p>
                </>
              ) : (
                <>
                  <Avatar size="small" icon={<UserOutlined />} />
                </>
              )} */}
              {/* <div className="header-user-acc">
                {userInfo.data && userInfo.data.id ? (
                  <>
                    <ul className="lits">
                      <li className="item" onClick={onLogout}>
                        Đăng xuất
                      </li>
                      <li className="item">Thông tin cá nhân </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <ul>
                      <li
                        className="item"
                        onClick={() => {
                          history.push("/login");
                        }}
                        >
                        Đăng nhập
                      </li>
                    </ul>
                  </>
                )}
              </div> */}

              {userInfo.data.id ? (
                <Dropdown overlay={menu} placement="bottomLeft" arrow>
                  <p>
                    <Avatar size="small" icon={<UserOutlined />} /> {""}
                    {userInfo.data.name}
                  </p>
                </Dropdown>
              ) : (
                <Button onClick={() => history.push("/login")}>
                  <LoginOutlined />
                  Đăng nhập
                </Button>
              )}
            </div>
              {userInfo.data.id ? (
                <Link className="header-user-link" to="/carts">
                  <ShoppingCartOutlined />
                  <small className="count d-flex">{cartList.data.length}</small>
                </Link>
              ) : (
                <Link className="header-user-link" to="/carts">
                  <ShoppingCartOutlined />
                  {/* <small className="count d-flex">{cartList.data.length}</small> */}
                </Link>
              )}
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  const { userInfo } = state.userReducer;
  const { cartList } = state.cartReducer;
  const { searchValue } = state.productReducer;
  return {
    userInfo,
    cartList,
    searchValue
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSearchProduct: (params) => dispatch(addSearchProductAction(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
