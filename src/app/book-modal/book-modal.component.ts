import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Hotel } from '../models/hotel.interface';

@Component({
  selector: 'lh-book-modal',
  templateUrl: './book-modal.component.html'
})
export class BookModalComponent implements OnInit {
  bookFormGroup: FormGroup;
  @Input() set active(val: boolean) {
    this._active = val;
  }
  get active() {
    return this._active;
  }

  _active: boolean = false;

  @Input() hotel: Hotel;
  @Output() changeActive: EventEmitter<boolean> = new EventEmitter<boolean>();

  // message to show on success
  message: string;

  constructor() { }

  ngOnInit(): void {
    this.bookFormGroup = this.initForm();
  }

  initForm(): FormGroup {
    return new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl(null, Validators.required),
      'start': new FormControl(null, Validators.required),
      'end': new FormControl(null, Validators.required),
      'peopleNum': new FormControl(),
      'comments': new FormControl()
    });
  }

  onSubmit() {
    this.bookFormGroup.markAllAsTouched();
    if (this.bookFormGroup.valid) {
      this.message = 'Book Confirmed';
    }
  }

  close(): void {
    this.hotel = null;
    this.message = null;
    this.bookFormGroup.reset();
    this.changeActive.emit(false);
  }

}
