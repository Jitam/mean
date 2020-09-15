import { Component,  OnInit, OnDestroy } from '@angular/core';
import { from, Subscription } from 'rxjs'
import { Post } from '../post.model'
import { PostsService } from '../posts.service'

@Component ({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First Post', content: "This is first post's content"},
  //   {title: 'Second Post', content: "This is second post's content"},
  //   {title: 'Third Post', content: "This is third post's content"}
  // ];

 posts: Post[]=[];
 private postSub: Subscription

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts();
    this.postSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    })
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }


  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}
