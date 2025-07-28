import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@stream-platform/auth-data-access';
import { Person } from 'libs/auth/data-access/src/lib/models/Person';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  public personData: Observable<Person | null>;

  constructor(private authFacade: AuthFacade){
    this.personData = authFacade.selectedAuthPerson$;
  }
  ngOnInit(): void {
    this.personData.subscribe((person) => console.log("person je ", person));
  }

}
