import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-assignment',
  imports: [
    MatExpansionModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './assignment.component.html',
  styleUrl: './assignment.component.scss'
})
export class AssignmentComponent {

}
