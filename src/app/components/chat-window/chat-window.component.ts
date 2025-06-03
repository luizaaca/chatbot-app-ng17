import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dialogflow } from '../../services/dialogflow';
import { Message } from '../../models/message.model';
import { SuggestionChipsComponent } from '../suggestion-chips/suggestion-chips.component';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule, SuggestionChipsComponent],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent implements AfterViewChecked {
  userInput = '';
  messages: Message[] = [];

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(private dialogflow: Dialogflow) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  sendMessage() {
    if (!this.userInput.trim()) return;
    // Adiciona mensagem do usuário ao histórico
    this.messages.push({ content: this.userInput, sender: 'user', timestamp: new Date() });
    const userMsg = this.userInput;
    this.userInput = '';

    this.dialogflow.sendMessage(userMsg).subscribe(msg => {
      this.messages.push(msg);
    });
  }

  sendChip(chip: string) {
    this.userInput = chip;
    this.sendMessage();
  }
}
