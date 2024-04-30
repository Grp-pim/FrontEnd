import { ApiService } from './services/api.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Routes, Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestExistsGuard implements CanActivate {

  constructor(private apiService : ApiService,private router :Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const testId = route.paramMap.get('id') ??'';
    return this.apiService.getTestById(testId).pipe(
      map((test) => !!test), // Convert the result to a boolean (true if the test exists, false otherwise)
      catchError(() => {
        // If there's an error (test doesn't exist), navigate to the 'not-found' route
        return of(this.router.createUrlTree(['/not-found']));
      })
    );
  }
}
