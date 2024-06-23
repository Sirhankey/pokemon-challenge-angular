import { ApiResponse, ApiTypesResponse } from '../../models/api-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://api.pokemontcg.io/v2';
  private allowedTypes = ['Grass', 'Fire', 'Water', 'Lightning', 'Psychic', 'Fighting'];

  constructor(
    private http: HttpClient
  ) { }

  searchCards(query: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/cards?q=${query}`);
  }

  getCardsTypes(): Observable<ApiTypesResponse> {
    return this.http.get<ApiTypesResponse>(`${this.apiUrl}/types`)
      .pipe(map(response => {
        return {
          data: response.data.filter(type => this.allowedTypes.includes(type))
        };
      }));
  }

}
