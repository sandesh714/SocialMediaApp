import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function PostCard({post: { content, createdAt, id, username, likeCount, commentCount, likes}}){

    function likePost(){
        console.log("Like Post!!");
    }


    function commentPost(){
        console.log("Comment Post!!");
    }


    return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{ username }</Card.Header>
        <Card.Meta as={ Link } to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>
          {content}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as='div' labelPosition='right' onClick = { likePost }>
        <Button color='teal' basic>
            <Icon name='heart' />
            Like
        </Button>
        <Label  basic color='teal' pointing='left'>
            { likeCount }
        </Label>
        </Button>

        <Button as='div' labelPosition='right' onClick = { commentPost }>
        <Button color='blue' basic>
            <Icon name='comments' />
            Comments
        </Button>
        <Label  basic color='blue' pointing='left'>
            { commentCount }
        </Label>
        </Button>



      </Card.Content>
    </Card>
    )

}


export default PostCard;