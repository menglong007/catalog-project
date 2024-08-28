import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.startsWith('http') || req.url.startsWith('assets')) {
      return next.handle(req);
    }

    const authReq = req.clone({
      url: `${environment.apiUrl}/${req.url}`,
    });

    return next.handle(authReq);
  }
}
