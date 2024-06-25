import { environment } from './../../environments/environments.prod';
import { ApiResponse, ApiTypesResponse } from '../../models/api-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { getAllAllowedPokemonTypes } from '../../utils/types';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private allowedTypes = getAllAllowedPokemonTypes();

  constructor(
    private http: HttpClient
  ) { }

  searchCards(query: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.apiTCG}/cards?q=${query}`);
  }

  getCardsTypes(): Observable<ApiTypesResponse> {
    return this.http.get<ApiTypesResponse>(`${environment.apiTCG}/types`)
      .pipe(map((response: ApiTypesResponse) => {
        return {
          data: response.data.filter(type => this.allowedTypes.includes(type))
        };
      }));
  }

}
