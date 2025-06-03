import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChatWindowComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'chatbot-app-ng17';
}
