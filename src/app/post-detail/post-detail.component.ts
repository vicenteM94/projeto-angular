import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { ApiService, Post } from '../services/api.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  imports: [CommonModule, PoModule],
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined;
  isLoading = true;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getPostById(Number(id)).subscribe((data: Post) => {
        this.post = data;
      });
    }
  }
}
