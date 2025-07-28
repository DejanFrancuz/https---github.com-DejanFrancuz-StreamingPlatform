import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'stream-platform-ui-button',
  standalone: false,
  templateUrl: './ui-button.component.html',
  styleUrl: './ui-button.component.css'
})
export class UiButtonComponent {
  @Input() variant: 'primary' | 'danger' | 'success' = 'primary';
  @Input() disabled = false;

   @Output() click = new EventEmitter<Event>();

  handleClick(event: Event) {
    console.log("handle ui button");
    if (!this.disabled) {
      console.log("handle ui button prosooo");
      this.click.emit(event);
    }
  }
}
