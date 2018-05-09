import { Component, OnInit ,Input} from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})

export class DashboardComponent implements OnInit {

  // isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
  //   const isSubmitted = form && form.submitted;
  //   return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  // }

  // heroNameFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);

  
  heroes: Observable<Hero[]>;
  hero: Hero;
  heroCount: Observable<number>;
  constructor(public heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getHeroes();
    
    // console.log();
  }

  getHeroes(): void {
    // this.heroService.getHeroes()
    //   .subscribe(heroes => this.heroes = heroes);
    this.heroes = this.heroService.getHeroesFromFirebase()
    console.log(this.heroes);
    this.heroCount = this.heroService.getHeroCountFromFirebase()
    // this.heroes.subscribe(result => {console.log(result.length())});
    // .subscribe();
      
  }

  
  delete(hero: Hero): void {
    // this.heroes = this.heroes.filter(h => h !== hero);
    // this.heroService.deleteHeroFromFirebase(hero.name);
  }

  add(name: string, img: string, subtitle: string, content: string, count: number): void {
    
    let id = this.heroes[count-1].id+1
    let defaultImg = "https://material.angular.io/assets/img/examples/shiba2.jpg";
    if(img.length == 0){
      img = defaultImg;
    }

    let hero: Hero = {
      id : id,
      name : name,
      subtitle : subtitle,
      content : content,
      img: img
    };
    this.heroService.addHeroToFirebase(hero);
    // console.log(this.heroes.length);
    // this.heroes.push(hero);
    this.heroService.addHero(hero)
    .subscribe(data =>{
      console.log(data)
    });
    
  }

}

// console.log(this.heroes.length);
// console.log(id);
// this.heroes.push({name} as Hero);
// this.heroService.addHero(this.hero).subscribe();