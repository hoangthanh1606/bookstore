import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { UserOutlined, LoginOutlined, ShoppingCartOutlined } from '@ant-design/icons'


import { Input, Avatar, Menu, Dropdown, Button } from 'antd';


import history from '../../../utils/history'


const { Search } = Input;

function HeaderAdmin(props) {
  const { userInfo, cartList } = props


  const onSearch = value => {
    console.log(value);
  }

  function onLogout() {
    localStorage.removeItem("userInfo")
    window.location.reload()
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <Link onClick={onLogout} style={{ color: 'black' }}>
          Đăng xuất
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="header-container ">
        <div className="heading ">
          <div className="header-logo">
            <Link to="/">
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
              {/* <Search
                placeholder="Nhập để tìm kiếm"
                allowClear
                enterButton
                size="middle"
                onSearch={onSearch}
              /> */}
            </div>
          </div>

          <div className="header-user">
            <div className="header-user-icon">
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
                {/* <small className="count d-flex">{cartList.data.length}</small> */}
              </Link>
            ) : (
                <Link className="header-user-link" to="/carts">
                  <ShoppingCartOutlined />
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
  return {
    userInfo,
    cartList
  }
};


export default connect(mapStateToProps)(HeaderAdmin);