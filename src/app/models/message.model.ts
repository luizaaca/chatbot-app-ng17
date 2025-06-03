export interface Message {
  content: string;
  sender: 'user' | 'bot';
  suggestions?: string[]; // Para os chips/suggestions do Dialogflow
  timestamp?: Date;
}