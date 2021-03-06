import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
  const { user } = useContext(AuthContext);
  const {
    loading,
    data: { getPosts: posts } = {}
  } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
    {user && (
                      <Grid.Column mobile={16} tablet={8} computer={5} widescreen={5} style={{ marginBottom: 40 }}>
                      <PostForm />
                      </Grid.Column>
                    )}
      </Grid.Row>
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
            <Transition.Group>
              {posts &&
                posts.map((post) => (
                  <Grid.Column mobile={16} tablet={8} computer={5} widescreen={5} key={post.id} style={{ marginBottom: 20 }}>
                    <PostCard post={post} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          )}
    </Grid>
  );
}

export default Home;
