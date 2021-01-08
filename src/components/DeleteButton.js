import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Button, Confirm, Icon } from 'semantic-ui-react'

import { FETCH_POSTS_QUERY } from '../util/graphql'
import InfoPopup from '../util/InfoPopup'

function DeleteButton({ callback, commentID, postID }) {
	const [confirmOpen, setConfirmOpen] = useState(false)

	const mutation = commentID ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

	const [deletePostOrMutation] = useMutation(mutation, {
		update(proxy) {
			setConfirmOpen(false)
			if (!commentID) {
				const data = proxy.readQuery({
					query: FETCH_POSTS_QUERY
				})

				proxy.writeQuery({
					query: FETCH_POSTS_QUERY,
					data: {
						getPosts: data.getPosts.filter(p => p.id !== postID)
					}
				})
			}
			if (callback) callback()
		},
		variables: {
			postID,
			commentID
		}
	})
	return (
		<>
			<InfoPopup
				content={commentID ? 'Delete comment' : 'Delete Post'}
			>
				<Button
					as="div"
					color="red"
					floated="right"
					onClick={() => setConfirmOpen(true)}
				>
					<Icon name="trash" style={{ margin: 0 }} />
				</Button>
			</InfoPopup>
			<Confirm
				open={confirmOpen}
				onCancel={() => setConfirmOpen(false)}
				onConfirm={deletePostOrMutation}
			/>
		</>
	)
}

const DELETE_POST_MUTATION = gql`
	mutation deletePosts($postID: ID!){
		deletePost(postID: $postID)
	}
`
const DELETE_COMMENT_MUTATION = gql`
	mutation deleteComment($postID: ID!, $commentID: ID!){
		deleteComment(postID: $postID, commentID: $commentID){
			id
			comments{
				id
				username
				createdAt
				body
			}
			commentCount
		}
	}
`
export default DeleteButton;