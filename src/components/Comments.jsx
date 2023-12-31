import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../App";
import RestAPI from "../server/RestAPI";

function Comments() {
  const { postId } = useParams();
  const { username } = useContext(userContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await RestAPI.getCommentsByPostId(username, postId);
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId, username]);

  const handleAddComment = async () => {
    const newCommentName = window.prompt("Enter comment name:");
    const newCommentBody = window.prompt("Enter comment body:");
    const newCommentEmail = window.prompt("Enter comment email:");
    if (
      newCommentName &&
      newCommentBody &&
      newCommentEmail &&
      newCommentName.trim() !== "" &&
      newCommentBody.trim() !== "" &&
      newCommentEmail.trim() !== "" 
    ) {
      try {
        await RestAPI.addCommentToPost(username, postId, newCommentName, newCommentBody, newCommentEmail);
        // Clear the comment input field and update the comments list
        refreshComments();
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const refreshComments = async () => {
    const comments = await RestAPI.getCommentsByPostId(username, postId);
    setComments(comments);
  };

  const updateCommentContent = async (commentId, newContent) => {
    try {
      await RestAPI.updateCommentContent(
        username,
        postId,
        commentId,
        newContent
      );
      refreshComments();
    } catch (error) {
      console.error("Error updating comment content:", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await RestAPI.deleteComment(username, postId, commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <>
      <h2>Comments for Post {postId}</h2>
      <div>
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id}>
            <h4>{comment.name}</h4>
            <p>{comment.body}</p>
            <button
              onClick={() => {
                const newComment = window.prompt(
                  "Enter update comment:",
                  comment.title
                );
                if (newComment && newComment.trim() !== "") {
                  updateCommentContent(comment.id, newComment);
                }
              }}
            >
              Edit
            </button>
            <button onClick={() => deleteComment(comment.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No comments found for the post.</p>
      )}
    </>
  );
}

export default Comments;
