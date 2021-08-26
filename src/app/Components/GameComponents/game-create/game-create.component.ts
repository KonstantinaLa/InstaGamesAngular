import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../CategoryComponents/category/category';
import { CategoryService } from '../../CategoryComponents/category/category.service';
import { Developer } from '../../DeveloperComponents/developer/developer';
import { DeveloperService } from '../../DeveloperComponents/developer/developer.service';
import { NamesFormControl } from '../../SharedComponents/input/custom-formControls';
import { Game, Pegi } from '../game/game';
import { GameService } from '../game/game.service';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class GameCreateComponent implements OnInit {

  gameForm = new FormGroup({
    title: new NamesFormControl('',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.pattern("[a-zA-Z ]*")
      ]),
    description!: new NamesFormControl('',
      [
        Validators.required, Validators.minLength(2),
        Validators.maxLength(10000),
      ]),
    trailer: new FormControl(''),
    photo: new FormControl('',
      [
        Validators.required
      ]),
    pegi: new FormControl('',
      [
        Validators.required
      ]),
    categories: new FormControl('',
      [
        Validators.required
      ]),
    tag: new FormControl('',
      [
        Validators.required
      ]),
    releaseDate: new FormControl('',
      [
        Validators.required
      ]),
    developers: new FormControl('',
      [
        Validators.required
      ]),
    gameUrl: new FormControl(''),
    isReleased: new FormControl(''),
    isEarlyAccess!: new FormControl('')
  });


  Categories!: Category[];
  Developers!: Developer[];
  Pegilist!: Pegi[];

  constructor(private GameService: GameService, 
    private CategoryService: CategoryService,
     private DeveloperService: DeveloperService, 
     private router: Router) 
     { }

  ngOnInit(): void {
    this.ReadCategories();
    this.ReadPegi();
    this.ReadDevelopers();
  }

  ReadCategories() {
    this.CategoryService.getCategories().subscribe((data) => this.Categories = data);
  }

  ReadDevelopers() {
    this.DeveloperService.getDevelopers().subscribe((data) => this.Developers = data);
  }

  ReadPegi() {
    this.GameService.getPegi().subscribe((data) => this.Pegilist = data);
  }

  isCreated:boolean=true
  saveGame() {

    let game = <Game>{};
    game.Title = this.gameForm.controls.title.value;
    game.Description = this.gameForm.controls.description.value;
    game.Photo = this.gameForm.controls.photo.value;
    game.ReleaseDate = this.gameForm.controls.releaseDate.value;
    game.Trailer = this.gameForm.controls.trailer.value;

    if(this.gameForm.controls.isEarlyAccess){
      game.IsEarlyAccess = this.gameForm.controls.isEarlyAccess.value;
    }else{
      game.IsEarlyAccess = false;
    }

    if(this.gameForm.controls.isReleased){
      game.IsReleased = this.gameForm.controls.isReleased.value;
    }else{
      game.IsReleased = false;
    }

    game.Tag =  this.gameForm.controls.tag.value;

    game.GameCategories = new Array;
    for (const cat of this.gameForm.controls.categories.value) {
      game.GameCategories.push(<Category>{CategoryId:cat})
    }

    game.GameDevelopers = new Array;
    for (const dev of this.gameForm.controls.developers.value) {
      game.GameDevelopers.push(<Developer>{DeveloperId:dev})
    }
  
    game.Pegi = <Pegi>{PegiId: this.gameForm.controls.pegi.value};
    game.GameUrl =  this.gameForm.controls.gameUrl.value;

    this.GameService.createGame(game).subscribe(() => {
      this.router.navigate(["/Game",this.isCreated]);
    });
  }

}
