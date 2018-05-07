import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { MatSnackBar } from '@angular/material';

// import { AuthService } from '@angular/core/auth.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFireAuthModule } from 'angularfire2/auth';

// interface Hero2{
//   id: string;
//   name: string;
//   img: string;
//   subtitle: string;
//   content: string;
// }

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HeroService {

  // private heroesCollection: AngularFirestoreCollection<Hero2>;
  // heroes: Observable<Hero2[]>;
 
  // heroes: AngularFireList<Hero>;
  private heroesUrl = 'api/heroes';  // URL to web api
  private heroes: any;

  constructor(
    public snackBar: MatSnackBar,
    private http: HttpClient,
    private messageService: MessageService,
    private firebase: AngularFireDatabase
    ) {
      // private af: AngularFireDatabase
      // this.heroesDoc = afs.doc<Hero>('heroes');
      // this.heroes = this.heroesDoc.collection<Hero>('O2DWC8U9yA49C2X7M1g1').valueChanges();
      this.heroes = this.firebase.list('heroes');
      console.log(this.heroes);
    }
  //  ngOnInit(){
  //   this.heroesCollection = this.afs.collection('heroes');
  //   this.heroes = this.heroesCollection.valueChanges();
  //         console.log("hi");
  //         console.log(this.heroes)
  //  }

  //firebase methods
  getHeroesFromFirebase(){

    return this.heroes;
  }

  addUserToFirebase(hero: Hero){
    this.heroes.push(hero);
  }

  // deleteUserFromFirebase(hero: Hero){
  //   this.heroes.push(hero);
  // }



  /** GET heroes from the server */
  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<Hero> {
    
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => {
        this.snackBar.open("ADDED", "Close", {
              duration: 2000,
            });
        this.log(`added hero w/ id=${hero.id}`)
      }),
      catchError(
        this.handleError<Hero>('addHero')
      )
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    this.snackBar.open("DELETED", "Close", {
      duration: 2000,
    });
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/