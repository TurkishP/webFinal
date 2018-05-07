import { Component, OnInit ,Input} from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

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

  
  heroes: Hero[] = [];
  hero: Hero;
  id: number;
  constructor(public heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
    this.heroService.getHeroesFromFirebase();

  }

  
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  add(name: string, img: string, subtitle: string, content: string): void {
    let id = this.heroes[this.heroes.length-1].id+1;
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
    this.heroService.addUserToFirebase(hero);
    // console.log(this.heroes.length);
    this.heroes.push(hero);
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