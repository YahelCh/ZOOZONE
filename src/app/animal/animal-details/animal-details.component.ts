import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Animal } from 'src/app/interfaces/animal.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { AnimalModule } from '../animal.module';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.css']
})
export class AnimalDetailsComponent implements OnInit {

  @Input() animal: Animal;
  @Output() removeAnimal = new EventEmitter<string>();

  public showMoreDesciption = true;
  public errorMessage: string = '';

  toggleDescriptionText() {
     this.showMoreDesciption = !this.showMoreDesciption
  }


  constructor(private repository: RepositoryService, private router: Router,
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
  }
  removeThisAnimal(): void {
    this.removeAnimal.next(this.animal.id);
  }

  editThisAnimal(): void {
    const editUrl: string = `/animal/edit`;
    this.router.navigate([editUrl]);
  }

}
