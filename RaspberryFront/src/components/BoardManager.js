import React, { Component } from 'react'
import { Dropdown, Menu, Grid, List, Button } from 'semantic-ui-react'

class BoardManager extends Component {

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
     
  <List divided relaxed style={{marginTop:'5%', marginRight:'10%'}}>
    <List.Item>
      <List.Icon name='github' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
        <List.Description as='a'>조회수 : 123 | 2018.08.17 | 공학교육혁신센터 </List.Description>
      </List.Content>
    </List.Item>

    <List.Item>
      <List.Icon name='github' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
        <List.Description as='a'>조회수 : 123 | 2018.08.17 | 공학교육혁신센터 </List.Description>
      </List.Content>
    </List.Item>

    <List.Item>
      <List.Icon name='github' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
        <List.Description as='a'>조회수 : 123 | 2018.08.17 | 공학교육혁신센터 </List.Description>
      </List.Content>
    </List.Item>

    <List.Item>
      <List.Icon name='github' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
        <List.Description as='a'>조회수 : 123 | 2018.08.17 | 공학교육혁신센터 </List.Description>
      </List.Content>
    </List.Item>

    <List.Item>
      <List.Icon name='github' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
        <List.Description as='a'>조회수 : 123 | 2018.08.17 | 공학교육혁신센터 </List.Description>
      </List.Content>
    </List.Item>

    <List.Item>
      <List.Icon name='github' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
        <List.Description as='a'>조회수 : 123 | 2018.08.17 | 공학교육혁신센터 </List.Description>
      </List.Content>
    </List.Item>

    <List.Item>
      <List.Icon name='github' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
        <List.Description as='a'>조회수 : 123 | 2018.08.17 | 공학교육혁신센터 </List.Description>
      </List.Content>
    </List.Item>

    <List.Item>
      <List.Icon name='github' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
        <List.Description as='a'>조회수 : 123 | 2018.08.17 | 공학교육혁신센터 </List.Description>
      </List.Content>
    </List.Item>
    </List>
  
    <Grid divided='vertically'>
  <Grid.Row columns={3}>
            <Grid.Column>
                <div style={{marginLeft:50, marginTop:'10%'}}>
                    <Button.Group> 
                    <Button labelPosition='left' icon='left chevron' content='이전' />
                     </Button.Group>
               </div>
            </Grid.Column>
            
            <Grid.Column>
              <div style={{marginLeft:50, marginTop:'10%'}}>
                    <Button.Group> 
                    <Button color='blue'>글 쓰기</Button>
                   </Button.Group>
              </div>
            </Grid.Column>

            <Grid.Column>
                <div style={{marginLeft:50, marginTop:'10%'}}> 
                    <Button.Group>
                    <Button labelPosition='right' icon='right chevron' content='다음' />
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


export default BoardManager


