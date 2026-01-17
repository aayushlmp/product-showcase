// src/app/core/services/api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  private baseUrl = 'http://192.168.31.55:8000';

  constructor() {}

  /**
   * GET request
   */
  get<T>(endpoint: string, params?: any): Observable<T> {
    const httpParams = this.buildParams(params);
    
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { 
      params: httpParams,
      headers: this.getHeaders()
    }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * POST request
   */
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(
      `${this.baseUrl}${endpoint}`, 
      data,
      { headers: this.getHeaders() }
    ).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * PUT request
   */
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(
      `${this.baseUrl}${endpoint}`, 
      data,
      { headers: this.getHeaders() }
    ).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * PATCH request
   */
  patch<T>(endpoint: string, data: any): Observable<T> {
    return this.http.patch<T>(
      `${this.baseUrl}${endpoint}`, 
      data,
      { headers: this.getHeaders() }
    ).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * DELETE request
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(
      `${this.baseUrl}${endpoint}`,
      { headers: this.getHeaders() }
    ).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Upload file
   */
  uploadFile<T>(endpoint: string, file: File, additionalData?: any): Observable<T> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    
    if (additionalData) {
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
      });
    }

    return this.http.post<T>(
      `${this.baseUrl}${endpoint}`,
      formData,
      { headers: this.getFileUploadHeaders() }
    ).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Build HTTP headers
   */
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    // Add authentication token if available
    const token = this.getAuthToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  /**
   * Get headers for file upload
   */
  private getFileUploadHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    
    const token = this.getAuthToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  /**
   * Build HTTP params
   */
  private buildParams(params?: any): HttpParams {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          if (Array.isArray(params[key])) {
            params[key].forEach((value: any) => {
              httpParams = httpParams.append(key, value.toString());
            });
          } else {
            httpParams = httpParams.set(key, params[key].toString());
          }
        }
      });
    }
    
    return httpParams;
  }

  /**
   * Get authentication token from storage
   */
  private getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      
      if (error.error && error.error.detail) {
        errorMessage = error.error.detail;
      } else if (error.error && typeof error.error === 'object') {
        errorMessage = JSON.stringify(error.error);
      }
    }

    console.error('API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}