import React, {Component } from 'react'
import { Container, Header, Grid, Menu, Segment, Image, Card, Icon, Button } from 'semantic-ui-react'


class Home{}
  const home =()=>(
  <Grid divided='vertically'>

    <Grid.Row columns={2}>
      <Grid.Column>
      <div style={{marginLeft:'25%', marginTop: '10%'}}>
            <h1> Dogs Roles with Humans</h1>
      </div>
      </Grid.Column>

      <Grid.Column>
        <div style={{marginLeft:'35%', marginTop:30}}>
        <p>날씨</p> 
        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' wrapped />
        </div>

        
      </Grid.Column>
      
    </Grid.Row>
    
    <Grid.Row columns={2}>
    <Grid.Column>
      <div style={{marginLeft:50}}>
      <Container fluid>
      <p>
        Domestic dogs inherited complex behaviors, such as bite inhibition, from their wolf
        ancestors, which would have been pack hunters with complex body language. These
        sophisticated forms of social cognition and communication may account for their
        trainability, playfulness, and ability to fit into human households and social situations,
        and these attributes have given dogs a relationship with humans that has enabled them to
        become one of the most successful species on the planet today.
      </p>
      <p>
        The dogs' value to early human hunter-gatherers led to them quickly becoming ubiquitous
        across world cultures. Dogs perform many roles for people, such as hunting, herding, pulling
        loads, protection, assisting police and military, companionship, and, more recently, aiding
        handicapped individuals. This impact on human society has given them the nickname "man's
        best friend" in the Western world. In some cultures, however, dogs are also a source of
        meat.
      </p>
        </Container>
        </div>
      </Grid.Column>
     
      <Grid.Column>
      <div style={{marginLeft:'35%'}}>
             <p> 학식메뉴 이미지 </p>
            <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' wrapped />
      </div>
     </Grid.Column>

    </Grid.Row>

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
            
            <Button labelPosition='right' icon='right chevron' content='다음' />
        </Button.Group>
        </div>
      </Grid.Column>

      <Grid.Column>
            <p> 광고 </p>
        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' wrapped />
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default home