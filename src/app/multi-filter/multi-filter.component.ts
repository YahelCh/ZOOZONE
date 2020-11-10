import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-multi-filter',
  templateUrl: './multi-filter.component.html',
  styleUrls: ['./multi-filter.component.css']
})
export class MultiFilterComponent implements OnInit {

  public filtersForm: FormGroup;
  @Output() autoSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();
  searchText: string = '';
  public classes = [
    { id: 1, text: 'Mammals' },
    { id: 2, text: 'Amphibians' },
    { id: 3, text: 'Reptiles' },
    { id: 4, text: 'poultry' }];

  public subClasses = [{ id: 1, text: 'Mammals sub class 1', classId: 1 },
  { id: 2, text: 'Mammals sub class 2', classId: 1 },
  { id: 3, text: 'Mammals sub class 3', classId: 1 },
  { id: 4, text: 'Amphibians sub class 1', classId: 2 },
  { id: 5, text: 'Amphibians sub class 2', classId: 2 },
  { id: 6, text: 'Amphibians sub class 3', classId: 2 },
  { id: 7, text: 'Reptiles sub class 1', classId: 3 },
  { id: 8, text: 'Reptiles sub class 2', classId: 3 },
  { id: 9, text: 'Reptiles sub class 3', classId: 3 },
  { id: 10, text: 'poultry  sub class 1', classId: 4 }];

  public filteredSubClasses: any[];
  constructor() { }

  ngOnInit(): void {
    this.buildForm();
    // this.groupFilters.emit({});
  }
  buildForm(): void {
    this.filtersForm = new FormGroup({
      freeText: new FormControl(''),
      class: new FormControl(''),
      subClass: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl('')
    });
  }

  public classChanged(val) {
    this.filteredSubClasses = this.subClasses.filter(s => s.classId == val);
  }

  clearFilters() {
    this.filtersForm.reset();
    this.groupFilters.emit({});
  }

  public applyFilters(filters: any): void {
    Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
    this.groupFilters.emit(filters);


  }
}
