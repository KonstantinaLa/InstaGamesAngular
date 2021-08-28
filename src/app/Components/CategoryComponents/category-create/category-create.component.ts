import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../category/category';
import { CategoryService } from '../category/category.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NamesFormControl } from '../../SharedComponents/input/custom-formControls';


@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})

export class CategoryCreateComponent implements OnInit {
  categoryForm = new FormGroup({
    type: new NamesFormControl('',
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
      ])
  });
  
  constructor(private router: Router, private CategoryService: CategoryService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  isCreated: boolean = true
  saveCategory(): void {
    let category = <Category>{}
    category.Type = this.categoryForm.controls.type.value;
    category.Description = this.categoryForm.controls.description.value;

    this.CategoryService.createCategory(category).subscribe(() => {

      this.router.navigate(["/Categories", this.isCreated]);
    });
  }

}

