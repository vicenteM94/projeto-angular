import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { ApiService, Post } from '../services/api.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PoModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  paginatedPosts: Post[] = [];
  searchTitle: string = '';
  currentPage: number = 1;
  postsPerPage: number = 5;
  isLoading: boolean = false;
  noPostsFound: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.isLoading = true;
    this.apiService.getPosts().subscribe((data: Post[]) => {
      this.posts = data;
      this.noPostsFound = this.posts.length === 0;
      this.paginatePosts();
      this.isLoading = false;
    });
  }

  searchPosts(): void {
    if (this.searchTitle.trim() !== '') {
      this.isLoading = true;
      this.apiService.searchPostsByTitle(this.searchTitle).subscribe((results: Post[]) => {
        this.posts = results;
        this.noPostsFound = this.posts.length === 0;
        this.currentPage = 1;
        this.paginatePosts();
        this.isLoading = false;
      });
    } else {
      this.fetchPosts();
    }
  }

  paginatePosts(): void {
    const start = (this.currentPage - 1) * this.postsPerPage;
    const end = start + this.postsPerPage;
    this.paginatedPosts = this.posts.slice(start, end);
  }

  totalPages(): number {
    return Math.ceil(this.posts.length / this.postsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.paginatePosts();
    }
  }

  viewPost(post: Post): void {
    this.router.navigate(['/post', post.id]);
  }
}
