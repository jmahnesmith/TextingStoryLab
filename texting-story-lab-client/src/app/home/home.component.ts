import { NgClass, NgForOf, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {UUID} from 'angular2-uuid';


interface Message {
  id: string;
  sender: string;
  text: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, FormsModule, NgForOf, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('chat') chat!: ElementRef;

  person1Message: string = '';
  person2Message: string = '';
  messages: Message[] = [];

  constructor() {}

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  addEmptyMessage(sender: string): void {
    const newMessage: Message = { id: UUID.UUID(), sender, text: '' };
    this.messages.push(newMessage);
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const chat = this.chat.nativeElement;
      chat.scrollTop = chat.scrollHeight - chat.clientHeight;
    }, 0);
  }

  onDragStart(event: DragEvent, sender: string): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', sender);
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const sender = event.dataTransfer?.getData('text/plain');
    if (sender) {
      this.addEmptyMessage(sender);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }
}
