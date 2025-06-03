import { Component } from '@angular/core';
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
export class ChatWindowComponent {
  userInput = '';
  messages: Message[] = [];
  token = ''; // Preencha com o token seguro vindo do backend

  constructor(private dialogflow: Dialogflow) {}

  sendMessage() {
    if (!this.userInput.trim()) return;
    // Adiciona mensagem do usuário ao histórico
    this.messages.push({ content: this.userInput, sender: 'user', timestamp: new Date() });
    const userMsg = this.userInput;
    this.userInput = '';

    this.dialogflow.sendMessage(userMsg, this.token).subscribe(msg => {
      this.messages.push(msg);
    });
  }

  sendChip(chip: string) {
    this.userInput = chip;
    this.sendMessage();
  }
}
