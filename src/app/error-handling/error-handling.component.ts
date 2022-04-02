import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error-handling',
  templateUrl: './error-handling.component.html',
  styleUrls: ['./error-handling.component.css'],
})
export class ErrorHandlingComponent implements OnInit {
  @Output() error = new EventEmitter<null>();

  constructor() {}

  ngOnInit(): void {}

  onHandlingError() {
    this.error.emit();
  }
}
