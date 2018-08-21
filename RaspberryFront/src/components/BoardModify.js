import React, { Component } from 'react'
import { Dropdown, Menu, Grid, Form, TextArea, Button } from 'semantic-ui-react'

class BoardModify extends Component {

  state = { activeItem: 'account' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
  render() {
    const { activeItem } = this.state
    

    return (
    <Grid>
    
     <Grid.Column width={4}>
      <Menu secondary vertical style={{marginTop:'20%', marginLeft:'20%'}}>
        <Dropdown item text='게시물관리'>
          <Dropdown.Menu>
            <Dropdown.Header>게시물 관리</Dropdown.Header>
            <Dropdown.Item>공지사항 관리</Dropdown.Item>
            <Dropdown.Item>취업정보 관리</Dropdown.Item>
            <Dropdown.Item>학과행사 관리</Dropdown.Item>
            
          </Dropdown.Menu>
        </Dropdown>
        

        <Menu.Item
          style={{marginTop:'10%'}}
          name='학사일정관리'
          active={activeItem === 'schedulemng'}
          onClick={this.handleItemClick}
        />

        <Menu.Item
          style={{marginTop:'10%'}}
          name='광고관리'
          active={activeItem === 'advermng'}
          onClick={this.handleItemClick}
        />

        <Menu.Item
          style={{marginTop:'10%'}}
          name='학식메뉴관리'
          active={activeItem === 'foodmenumng'}
          onClick={this.handleItemClick}
        />
      </Menu>
      </Grid.Column>

      <Grid.Column stretched width={12}>
         <Form style={{marginTop:'5%', marginRight:'10%'}}>
            <Form.Field>
                <label style={{marginTop:20}}> <p><font size='3'> 제 목 </font></p></label>
                <input style={{marginTop:10}} placeholder='게시물 제목을 입력하는 곳입니다' />
            
            
                <label style={{marginTop:20}}><p><font size='3'> 내 용 </font></p></label>
                <TextArea placeholder='게시물 내용을 입력하는 곳입니다' style={{ minHeight: 300, marginTop:10 }} />
            </Form.Field>
        </Form>


      <Grid divided='vertically'>
            <Grid.Row columns={2} style={{ marginLeft:'15%' ,marginTop:'3%'}}>
            
            <Grid.Column>
              <div>
                    <Button.Group> 
                    <Button size='large' color='blue'>확인 </Button>
                   </Button.Group>
              </div>
            </Grid.Column>

            <Grid.Column>
              <div>
                    <Button.Group> 
                    <Button size ='large' color='red'> 취소 </Button>
                   </Button.Group>
              </div>
            </Grid.Column>

     </Grid.Row>
    </Grid>


        </Grid.Column>
      </Grid>
      
    );
  }
}


export default BoardModify
