import { ApiResponse } from './../models/api-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://api.pokemontcg.io/v2/cards';

  constructor(
    private http: HttpClient
  ) { }

  searchCards(query: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?q=${query}`);
  }


}
