import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    myForm: FormGroup;
    constructor(private fb: FormBuilder) { 
        this.myForm = fb.group({
            username: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    ngOnInit(): void {
    }

}
