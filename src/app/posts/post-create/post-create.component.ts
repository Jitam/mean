import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostsService } from '../posts.service';
import { Post } from '../post.model'

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  post: Post;
  private mode = "create";
  postId: string;
  // newPost = '';

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')) {
        this.mode = "edit";
        this.postId = paramMap.get('postId');
        this.post = this.postsService.editPost(this.postId)
      }
      else {
        this.mode = "create";
        this.postId = null;
      }
    })
  }

  onAddPost(form: NgForm) {
    if(form.invalid) {
      return
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
