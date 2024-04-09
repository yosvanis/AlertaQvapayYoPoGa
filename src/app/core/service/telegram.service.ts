// telegram.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  private telegramApiUrl =
    'https://api.telegram.org/bot7000635968:AAGj_vRejCOqikhbtZYwC-pfbCiW5Ci_2Wg/sendMessage';

  constructor(private http: HttpClient) {}

  sendMessage(chatId: string, text: string): Observable<any> {
    const url = `${
      this.telegramApiUrl
    }?chat_id=${chatId}&text=${encodeURIComponent(text)}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post(url, {}, { headers: headers });
  }

  sendArrayToTelegram(chatId: string, array: any[]): Observable<any> {
    let message: string = '';

    // Iterar sobre el arreglo y agregar cada objeto como una fila en la tabla
    array.forEach((offer, index) => {
      // Agregar un separador entre ofertas, excepto antes de la primera oferta
      let tipo = offer.type === 'buy' ? ' de compra ' : ' de venta ';

      message += `\n--- Oferta ${tipo} # ${index + 1} ---\n`;

      message += `Fecha: ${new Date(offer.ultimaFecha).toLocaleDateString(
        'es-ES',
        {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }
      )}, `;

      if (offer.type === 'buy') {
        message += `Recibes: ${parseFloat(offer.receive).toFixed(2)} ${
          offer.coin
        }, Pagas: ${offer.amount} USD,`;
      } else {
        message += `Recibes: ${offer.amount} USD , Pagas: ${parseFloat(
          offer.receive
        ).toFixed(2)} ${offer.coin} ,`;
      }

      message += ` Ratio: ${offer.Ratio}\n`;
    });

    // Enviar el mensaje a Telegram
    return this.sendMessage(chatId, message);
  }
}
