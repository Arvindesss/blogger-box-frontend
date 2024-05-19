import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Post, PostCreateInput } from "../data/post";
import { Observable} from "rxjs";
import { environement } from "../../environments/environment";

@Injectable()
export class PostService {
    private postsURL = `${environement.apiUrl}v1/posts`

    constructor(private http: HttpClient) { }

    getPosts(): Observable<Post[]> {
       return this.http.get<Post[]>(this.postsURL);
    }

    createPost(postRequestBody: PostCreateInput):  Observable<Post[]> {
        return this.http.post<Post[]>(this.postsURL, postRequestBody);
    }
}