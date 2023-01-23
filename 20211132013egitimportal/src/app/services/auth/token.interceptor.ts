import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class TokenInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.addAuthToken(req));
    }
    
    addAuthToken(req:  HttpRequest<any>){
        const { stsTokenManager} = JSON.parse(localStorage.getItem('user') || '{}');

        
        return req.clone({
            setHeaders: {Authorization: stsTokenManager.accessToken}})
    }
}