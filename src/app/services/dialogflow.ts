import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
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
   * Envia uma mensagem para o Dialogflow e retorna um objeto Message.
   * @param message Texto enviado pelo usuário.
   * @param token JWT de autenticação (deve ser obtido via backend seguro).
   */
  sendMessage(message: string, token: string): Observable<Message> {
    const body = {
      queryInput: {
        text: {
          text: message,
          languageCode: 'pt-BR'
        }
      }
    };
    token = "ya29.c.c0ASRK0Ga5Aibfsa4upg49P9BV_r8MFuEbUv0IVRF5fUI-DhGleuEha_KkmYYqkXws1dM8w5tIXeCQ_nnvuRWV9y4dQPRlHxPr46t6vnd-GGbsNmQuOq8mStMjVYxt63SwPn4F3chPcXZ2yGXWNzdHRmkYdW8d5_Sd29Y4IfMrh9pWQGXUgO6WFtdzPUbgKQUFygoqXBl_Fe9rh1JrnbJia3sDEQ8y6WrBK9roL26X1KXQH78JjCxLLEHczSJGxwcC2-Hbfty1ZcXPmN95XlLh4p426Xv05NQYTOo1FWLg3ODTYVVtWMIAREew_VWu0vF0Fy-9fDQ2KbX2MmSbQG9miqc-uhdNQcOCSmCvYlT5zSJl4GVrST8u8TnPrAG387AO1uj0sBqXU3w4aatRq_990s6vZVFxi3kqI0YziQW3UsJZxkvur1hJmBVav_lhomsnOuhfzxoqYyl1iXUz0vw6F3ZZac-J7Uo2tphxbizzhb3Vsogpijqomjg4xtcnpq8j_gkFV1dmdg2e_1roqIBbxU4Uok8J_eVur98mhxlu7W6uxr6himkawdnjee5OS--_spmvIpMSwFSWR_sml81lnM2d8QU1ydmjhWYnl0zz7yhsxdo3yv7Iu7haWOj_h9gnFc2WmcoiRR9IO-3svUFWcvdvX-Mtof6i9y7zQgQikZQ0won2pth-y3-gvvazkRh7Qn9Iwu_wzZcolSfkk3alfr4quOfRMueF0R59ySB0Mrsr9bfppsIy50clJUxd9cBVWqsoJ-S-Yd000a3M6vvpw18rvysy224WdhW-tUZdOfBW3htvtwVVbdRe3ZXBtmd87BvQcVtOZ-6SF77honx7749wwme2nxxSFfj-xQV71Su0S5-lB12ZhomFplOQl4tgM8OaRBo3fqoeIBRyXo42v1_SWr0BfqFgfOVRXX6S1t4d8ajdBOForZyQm0tYcZxn0n3c0IRJ6Wu4oewyysS61lSVZusm460fispI98R9ZigXzj99y-S7iiQ";
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      map(response => {
        const fulfillmentMessages = response.queryResult?.fulfillmentMessages || [];

        // Junta todos os textos das respostas
        const content = fulfillmentMessages
          .filter((msg: any) => msg.text && msg.text.text)
          .map((msg: any) => msg.text.text.join(' '))
          .join(' ')
          .trim();

        // Junta todos os quickReplies em um único array de sugestões
        const suggestions = fulfillmentMessages
          .filter((msg: any) => msg.quickReplies && msg.quickReplies.quickReplies)
          .flatMap((msg: any) => msg.quickReplies.quickReplies);

        return {
          content,
          sender: 'bot',
          suggestions,
          timestamp: new Date()
        } as Message;
      })
    );
  }
}
