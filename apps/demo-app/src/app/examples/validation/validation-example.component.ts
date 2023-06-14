import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-validation-example',
  templateUrl: './validation-example.component.html',
  styleUrls: ['./validation-example.component.scss']
})
export class ValidationExampleComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['John'],
      lastName: ['Doe']
    });
  }

  submitForm() {
    if (this.form.valid) {
      const firstName = this.form.get('firstName').value;
      const lastName = this.form.get('lastName').value;

      this.form.reset();
    }
  }
}
