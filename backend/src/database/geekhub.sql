-- Active: 1695933699071@@127.0.0.1@5432@geekhub
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    nickname TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    avatar TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT NOT NULL
);

SELECT * FROM users;
DROP TABLE users;

CREATE TABLE posts (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  creator_id TEXT NOT NULL,
  topic TEXT NOT NULL,
  content TEXT NOT NULL,
  upvote INTEGER NOT NULL,
  downvote INTEGER NOT NULL,
  comments INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES users(id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE 
);

SELECT * FROM posts;
DROP TABLE posts;

CREATE TABLE comments (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  creator_id TEXT NOT NULL,
  post_id TEXT NOT NULL,
  content TEXT NOT NULL,
  upvote INTEGER NOT NULL,
  downvote INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES users(id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE, 
  FOREIGN KEY (post_id) REFERENCES posts(id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE 
);

SELECT * FROM comments;
DROP TABLE comments;

CREATE TABLE post_upvote_downvote (
    post_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    vote INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE 
        ON UPDATE CASCADE, 
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON DELETE CASCADE 
        ON UPDATE CASCADE 
);

SELECT * FROM post_upvote_downvote;
DROP TABLE post_upvote_downvote;

CREATE TABLE comment_upvote_downvote (
    comment_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    vote INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE 
        ON UPDATE CASCADE, 
    FOREIGN KEY (comment_id) REFERENCES comments(id)
        ON DELETE CASCADE 
        ON UPDATE CASCADE 
);

SELECT * FROM comment_upvote_downvote;
DROP TABLE comment_upvote_downvote;
