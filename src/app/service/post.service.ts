import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { POSTS } from "../mock/post";
import { Post } from "../data/post";
import { Observable, of } from "rxjs";

@Injectable()
export class PostService {
    constructor(private http:HttpClient) { }
    getPosts(): Observable<Post[]> {
        const posts = of(POSTS);
        return posts;
    }
}