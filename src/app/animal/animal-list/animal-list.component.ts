import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

import { Router } from '@angular/router';
import { Animal } from 'src/app/interfaces/animal.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {

  @Input() groupFilters: Object;
  @Input() searchByKeyword: string;
  public animals: Animal[];
  public filteredAnimals: Animal[] = [];
  public errorMessage: string = '';
  public size = 8;
  public page = 0;
  public totalAnimalsCount: number;
  

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private ref: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
    this.getAllAnimals();

  }


  addNewAnimal() {
    const createUrl: string = `/animal/create`;
    this.router.navigate([createUrl]);
  }

  getAllAnimals() {
    // let apiAddress: string = "animal";
    //this.repository.getData(apiAddress)
    this.repository.getAnimals(this.page, this.size).subscribe(res => {
      this.animals = res as Animal[];
      this.filteredAnimals=this.animals;
    }, (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    }

    )
  }

  removeAnimal(id) {
    let apiAddress: string = `animal/${id}`;
    this.repository.delete(apiAddress)
      .subscribe(res => {
        alert('animal successfully removed');
        this.getAllAnimals();

      }, (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      }

      )
  }

  loadNextAnimals() {
    this.page += 8;
    this.getAllAnimals();
  }

  filterAnimalList(filters: any, users: any): void {
    this.filteredAnimals = this.animals;
    const keys = Object.keys(filters);
    const filterAnimal = animal => {
      let result = keys.map(key => {
        if (key == 'freeText') {
          return JSON.stringify(animal).toLowerCase().indexOf(String(filters['freeText']).toLocaleLowerCase()) > -1;
        }
        if (!~key.indexOf('date')) {
          if (animal[key]) {
            return String(animal[key]).toLowerCase().startsWith(String(filters[key]).toLowerCase())
          } else {
            return false;
          }
        }
      });
      result = result.filter(it => it !== undefined);
      if (filters['fromDate'] && filters['toDate']) {
        if (animal['dateAdded']) {
          let dateAdded = moment(animal['dateAdded']);
          if (dateAdded.isBetween(filters['fromDate'], filters['toDate'])) {
            result.push(true);
          } else {
            result.push(false);
          }
        } else {
          result.push(false);
        }
      }
      return result.reduce((acc, cur: any) => { return acc & cur }, 1)
    }

    this.filteredAnimals = this.animals.filter(filterAnimal);
  }

}
