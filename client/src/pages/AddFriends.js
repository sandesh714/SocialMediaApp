import React, { useContext } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { Grid, Button } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { USER_FETCHING_QUERY, ADD_FRIEND_MUTATION } from '../util/graphql';

export default function AddFriends() {
    const { user } = useContext(AuthContext);
    const { loading, data } = useQuery(USER_FETCHING_QUERY);

    // Mutation for adding a friend
    const [addFriend] = useMutation(ADD_FRIEND_MUTATION, {
        onCompleted: () => {
            alert('Friend added successfully!');
        },
        onError: (err) => {
            console.error(err);
            alert('Error adding friend');
        }
    });

    const handleAddFriend = (friendId) => {
        addFriend({ variables: { friendId } });
    };

    let users = [];
    if (data) {
        users = data.getUsers;
    }

    return (
        <Grid columns={3}>
            <Grid.Row>
                <h1>Find Friends</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h1>Loading users...</h1>
                ) : (
                    users && users.map((friend) => (
                        friend.id !== user.id && ( // Exclude the current user from the list
                            <Grid.Column key={friend.id} style={{ marginBottom: 20 }}>
                                <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                                    <h3>{friend.username}</h3>
                                    <Button
                                        color="blue"
                                        onClick={() => handleAddFriend(friend.id)}
                                    >
                                        Add Friend
                                    </Button>
                                </div>
                            </Grid.Column>
                        )
                    ))
                )}
            </Grid.Row>
        </Grid>
    );
}
