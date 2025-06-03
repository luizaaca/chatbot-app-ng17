import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class Dialogflow {
  // Defina estes valores via config/env
  private projectId = 'calendarapi-1564935738282';
  private sessionId = '123456789'; // Use um ID de sessão único por usuário ou conversa

  private get apiUrl(): string {
    return `https://dialogflow.googleapis.com/v2/projects/${this.projectId}/agent/sessions/${this.sessionId}:detectIntent`;
  }

  constructor(private http: HttpClient) {}

  /**
   * Busca o token de autenticação da API backend.
   * @returns Observable com o token JWT.
   */
  private getAuthToken(): Observable<string> {
    // Ajuste o endpoint '/api/get-dialogflow-token' conforme a URL da sua API Express
    // que fornece o token para o Dialogflow.
    return this.http.get<{ token: string }>('/api/dialogflow-token').pipe(
      map(response => response.token)
    );
  }

  /**
   * Envia uma mensagem para o Dialogflow e retorna um objeto Message.
   * @param message Texto enviado pelo usuário.
   */
  sendMessage(message: string): Observable<Message> {
    return this.getAuthToken().pipe(
      switchMap(token => {
        const body = {
          queryInput: {
            text: {
              text: message,
              languageCode: 'pt-BR'
            }
          }
        };
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });

        return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
          map(response => {
            const fulfillmentMessages = response.queryResult?.fulfillmentMessages || [];

            const content = fulfillmentMessages
              .filter((msg: any) => msg.text && msg.text.text)
              .map((msg: any) => msg.text.text.join(' '))
              .join(' ')
              .trim();

            const suggestions = fulfillmentMessages
              .filter((msg: any) => msg.quickReplies && msg.quickReplies.quickReplies)
              .flatMap((msg: any) => msg.quickReplies.quickReplies);

            return { content, sender: 'bot', suggestions, timestamp: new Date() } as Message;
          })
        );
      })
    );
  }
}
