import React, {Component} from 'react'
import {
  wrapper,
  logo,
  menu,
  menuItems,
  subMenu,
  subMenuItems,
  menuTitle,
  menuIcon,
  subMenuOn,
  subMenuOff } from './sidebar.scss'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Sidebar extends Component {
  constructor () {
    super()
    this.state = {
      subMenuMngOn: false,
      subMenuAcOn: false,
      subMenuSerOn: false,
      suMenuSetOn: false
    }
  }
  subMenuOnOff (subMenu) {
    this.setState({
      [subMenu]: !this.state[subMenu]
    })
  }
  render () {
    return (
      <div className={wrapper}>
        <div className={logo} onClick={() => this.props.push('/')}>
          <b>Aryes</b>
        </div>
        <ul className={menu}>
          <li>
            <div className={menuItems}>
              <b className={menuTitle} onClick={() => this.props.push('/dashboard')}>Dashboard </b>
              <i className={menuIcon} />
            </div>
          </li>
          <li>
            <div className={menuItems} onClick={() => this.subMenuOnOff('subMenuMngOn')}>
              <b className={menuTitle} onClick={() => this.props.push('/management')}>Management</b>
              <i className={`${menuIcon} fa ${this.state.subMenuMngOn ? 'fa-caret-up' : 'fa-caret-down'}`} />
            </div>
            <ul className={`${subMenu} ${this.state.subMenuMngOn ? subMenuOn : subMenuOff}`}>
              <li className={subMenuItems} onClick={() => this.props.push('/management/student')}>Student</li>
              <li className={subMenuItems} onClick={() => this.props.push('/management/session')}>Session</li>
              <li className={subMenuItems} onClick={() => this.props.push('/management/staff')}>Staff</li>
              <li className={subMenuItems} onClick={() => this.props.push('/management/inquiry')}>Inquiry</li>
              <li className={subMenuItems} onClick={() => this.props.push('/management/room')}>Room</li>
            </ul>
          </li>
          <li>
            <div className={menuItems} onClick={() => this.subMenuOnOff('subMenuAcOn')}>
              <b className={menuTitle} onClick={() => this.props.push('/accounting')}>Accounting</b>
              <i className={`${menuIcon} fa ${this.state.subMenuAcOn ? 'fa-caret-up' : 'fa-caret-down'}`} />
            </div>
            <ul className={`${subMenu} ${this.state.subMenuAcOn ? subMenuOn : subMenuOff}`}>
              <li className={subMenuItems} onClick={() => this.props.push('/accounting/income')}>Income</li>
              <li className={subMenuItems} onClick={() => this.props.push('/accounting/expenditure')}>Expenditure</li>
            </ul>
          </li>
          <li>
            <div className={menuItems} onClick={() => this.subMenuOnOff('subMenuSerOn')}>
              <b className={menuTitle} onClick={() => this.props.push('/service')}>Service</b>
              <i className={`${menuIcon} fa ${this.state.subMenuSerOn ? 'fa-caret-up' : 'fa-caret-down'}`} />
            </div>
            <ul className={`${subMenu} ${this.state.subMenuSerOn ? subMenuOn : subMenuOff}`}>
              <li className={subMenuItems} onClick={() => this.props.push('/service/product')}>Product</li>
              <li className={subMenuItems} onClick={() => this.props.push('/service/offer')}>Offer</li>
            </ul>
          </li>
          <li>
            <div className={menuItems} onClick={() => this.subMenuOnOff('subMenuSetOn')}>
              <b className={menuTitle} onClick={() => this.props.push('/setting')}>Setting</b>
              <i className={`${menuIcon} fa ${this.state.subMenuSetOn ? 'fa-caret-up' : 'fa-caret-down'}`} />
            </div>
            <ul className={`${subMenu} ${this.state.subMenuSetOn ? subMenuOn : subMenuOff}`}>
              <li className={subMenuItems} onClick={() => this.props.push('/setting/profile')}>Profile</li>
              <li className={subMenuItems} onClick={() => this.props.push('/setting/general')}>General</li>
              <li className={subMenuItems} onClick={() => this.props.push('/setting/customization')}>Customization</li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}

const mapDipatchToProps = (dispatch) => bindActionCreators(routerActions, dispatch)

export default connect(null, mapDipatchToProps)(Sidebar)

