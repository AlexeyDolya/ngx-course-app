import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adresses',
  templateUrl: './adresses.component.html',
  styleUrls: ['./adresses.component.scss']
})
export class AdressesComponent implements OnInit {
  public profileForm: FormGroup = new FormGroup({
    street: new FormControl('', [ Validators.required,
      Validators.minLength(4) ] ),
    city: new FormControl('', [ Validators.required,
      Validators.minLength(4) ]),
    state: new FormControl('', [ Validators.required,
      Validators.minLength(4) ]),
    zipCode: new FormControl('', [ Validators.required,
      Validators.minLength(4) ]),
  });

  public constructor() { }

  public ngOnInit(): void {
  }

  public saveOrUpdateAddress(): void {
  }
}
