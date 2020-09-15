import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/Operators'

@Injectable({providedIn: 'root'})

export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>()

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<{message: string, posts: any}>('http://localhost:4000/api/posts')
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    }))
    .subscribe((newPostData) => {
      this.posts = newPostData;
      this.postsUpdated.next([...this.posts])
    });
    // return [...this.posts]
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  editPost(id: string) {
    return {...this.posts.find(p => p.id === id)}
  }

  addPost(title: string, content:string) {
    const post: Post = {id: null, title:title, content:content}
    this.http.post<{message: string, postId: string}>('http://localhost:4000/api/posts', post)
      .subscribe((responseData) => {
        const newId= responseData.postId;
        post.id = newId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts])
      })

  }

  updatePost( id: string, title: string, content: string) {
    const post: Post = { id:id, title:title, content:content };
    // this.http.put('http://localhost:4000/api/posts' + postId, post)
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:4000/api/posts/' + postId)
    .subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }
}
