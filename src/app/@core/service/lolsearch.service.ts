import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { LolsearchSumname } from '../models/lolsearch-sumname.model';
@Injectable()
export class LolsearchService {
  constructor(private http: HttpClient) {}
  apiBaseUrl1: string =
    'https://tr1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
  apiBaseUrl2: string =
    'https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/';
  apiBaseUrl3: string =
    'https://europe.api.riotgames.com/lol/match/v5/matches/';
    apiKey:string='api_key=RGAPI-7e17bbb2-67fe-448b-b6b8-e76e3c8d6013'

  getPuid(nickname: string | undefined) {
    return this.http
      .get(
        this.apiBaseUrl1 +
          nickname +"?"+
          this.apiKey
      )
      .pipe(
        map((res: LolsearchSumname) => {
          
          return res;
        }),
        catchError((err) => {
          throw new Error('Hata var. Detaylar:' + err);
        })
      );
  }
  getMatchList(puuid: string | undefined) {
    return this.http
      .get(
        this.apiBaseUrl2 +
          puuid +"/ids?startTime=1640192476&start=0&count=3&"+this.apiKey
      )
      .pipe(
        map((res: any) => {
          
          return res;
        }),
        catchError((err) => {
          throw new Error('Hata var. Detaylar:' + err);
        })
      );
  }

  getMatchDetails(match:string) {
    return this.http.get(
      this.apiBaseUrl3 +
        match +"?"+
        this.apiKey
    )
    .pipe(map((res:any)=>{
      
      return res;
    }),
    catchError((err)=>{
      throw new Error('Hata var. detaylar:'+err);
    })
    );
    
  }
  
}
