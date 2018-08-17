import React, { Component } from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'

export default class MenuExampleVerticalDropdown extends Component {
  state = { activeItem: 'account' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu secondary vertical style={{marginTop:'10%', marginLeft:'5%'}}>
        <Dropdown item text='게시물관리'>
          <Dropdown.Menu>
            <Dropdown.Header>게시물 관리</Dropdown.Header>
            <Dropdown.Item>공지사항 관리</Dropdown.Item>
            <Dropdown.Item>취업정보 관리</Dropdown.Item>
            <Dropdown.Item>학과행사 관리</Dropdown.Item>
            
          </Dropdown.Menu>
        </Dropdown>
        

        <Menu.Item
          name='학사일정관리'
          active={activeItem === 'schedulemng'}
          onClick={this.handleItemClick}
        />

        <Menu.Item
          name='광고관리'
          active={activeItem === 'advermng'}
          onClick={this.handleItemClick}
        />

        <Menu.Item
          name='학식메뉴관리'
          active={activeItem === 'foodmenumng'}
          onClick={this.handleItemClick}
        />

      </Menu>
    )
  }
}