import { storage, generateId } from '../utils/storage'

export function usePosts() {
  function getAllPosts() {
    return storage.getPosts()
  }

  function getPublicPosts() {
    return storage
      .getPosts()
      .filter((p) => p.isPublic && !p.isDraft)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  function getPostsByUser(userId) {
    return storage
      .getPosts()
      .filter((p) => p.authorId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  function getPostById(postId) {
    return storage.getPosts().find((p) => p.id === postId) || null
  }

  function createPost({ authorId, description, image, isPublic, isDraft }) {
    const posts = storage.getPosts()
    const newPost = {
      id: generateId('post'),
      authorId,
      description,
      image: image || null,
      isPublic: !!isPublic,
      isDraft: !!isDraft,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    storage.setPosts([newPost, ...posts])
    return newPost
  }

  function updatePost(postId, updates) {
    const posts = storage.getPosts()
    const nextPosts = posts.map((p) =>
      p.id === postId ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    )
    storage.setPosts(nextPosts)
  }

  function deletePost(postId) {
    const posts = storage.getPosts().filter((p) => p.id !== postId)
    storage.setPosts(posts)
    storage.setComments(storage.getComments().filter((c) => c.postId !== postId))
    storage.setLikes(storage.getLikes().filter((l) => l.postId !== postId))
  }

  function getLikesForPost(postId) {
    return storage.getLikes().filter((l) => l.postId === postId)
  }

  function isPostLikedByUser(postId, userId) {
    if (!userId) return false
    return storage.getLikes().some((l) => l.postId === postId && l.userId === userId)
  }

  function toggleLike(postId, userId) {
    const likes = storage.getLikes()
    const existing = likes.find((l) => l.postId === postId && l.userId === userId)
    if (existing) {
      storage.setLikes(likes.filter((l) => l.id !== existing.id))
    } else {
      storage.setLikes([
        ...likes,
        { id: generateId('like'), postId, userId, createdAt: new Date().toISOString() },
      ])
    }
  }

  function getCommentsForPost(postId) {
    return storage
      .getComments()
      .filter((c) => c.postId === postId)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  }

  function addComment(postId, authorId, text) {
    const comments = storage.getComments()
    const newComment = {
      id: generateId('cmt'),
      postId,
      authorId,
      text,
      createdAt: new Date().toISOString(),
    }
    storage.setComments([...comments, newComment])
    return newComment
  }

  function deleteComment(commentId) {
    storage.setComments(storage.getComments().filter((c) => c.id !== commentId))
  }

  return {
    getAllPosts,
    getPublicPosts,
    getPostsByUser,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    getLikesForPost,
    isPostLikedByUser,
    toggleLike,
    getCommentsForPost,
    addComment,
    deleteComment,
  }
}
