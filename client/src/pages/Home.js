import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks'

import { Grid } from 'semantic-ui-react';

import PostCard from '../components/PostCard';

import { AuthContext } from '../context/auth';

import PostForm from '../components/PostForm';
import { POST_FETCHING_QUERY } from '../util/graphql';

export default function Home(){
    const { user } = useContext(AuthContext);
    const { loading, data } = useQuery(POST_FETCHING_QUERY);
    // const { loading, data : { getPosts: posts} } = useQuery(POST_FETCHING_QUERY);

    let posts = null
    if (data){
        posts = data.getPosts;
    }

    return (
        <Grid columns={3}>
            <Grid.Row>
                <h1>Recent Posts</h1>
            </Grid.Row>
        <Grid.Row>
        {user && (
            <Grid.Column>
                <PostForm />
            </Grid.Column>
        )}
            {loading ? (
            <h1>Loading posts...</h1>
        )  : (
            posts && posts.map(post => (
                <Grid.Column key={post.id} style={{marginBottom : 20}}>
                    <PostCard post={post}/>
                </Grid.Column>
            ))
          )}
          </Grid.Row>
        </Grid>
    )
}



