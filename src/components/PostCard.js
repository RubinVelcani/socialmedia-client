import React, { useContext } from 'react'
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import InfoPopup from '../util/InfoPopup'
import Avatars from '../util/avatars.json'

function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) {

  const { user } = useContext(AuthContext)

  function getRandomAvatar(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src={Avatars.avatars[getRandomAvatar(0, 14)]}
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <InfoPopup
          content='Comment on post'
        >
          <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
            <Button color='blue' basic>
              <Icon name='comments' />
            </Button>
            <Label basic color='blue' pointing='left'>
              {commentCount}
            </Label>
          </Button>
        </InfoPopup>

        {user && user.username === username && <DeleteButton postID={id} />}
      </Card.Content>
    </Card>
  )
}

export default PostCard;