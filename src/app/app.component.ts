import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {WebsocketService} from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string;
  public data;
  baseUrl: string;
  private http: HttpClient;
  private dataSubscription: Subscription;
  socketUrl: string;
  private webSocketService: WebsocketService;

  constructor(http: HttpClient, webSocketService: WebsocketService) {
    this.http = http;
    this.webSocketService = webSocketService;
    this.title = 'First piece of Pi';
  }


  private getData() {
    if (this.baseUrl) {
      return this.http.get(this.baseUrl);
    } else {
      alert('Input ip of the pi that you want to connect to');
    }
  }

  setData() {
    this.dataSubscription = this.getData().subscribe((data) => {
      this.data = data;
      this.dataSubscription.unsubscribe();
    });
  }

  subscribeToDataWithSocket() {
    if (this.socketUrl) {
      this.webSocketService.connect(this.socketUrl).asObservable().subscribe(message => {
        this.data = JSON.parse(message.data);
      });
      // Get the baseUrl
      const a = this.socketUrl.split('/');
      a[0] = 'http:';
      a[1] = '//';
      this.baseUrl = a.slice(0, 3).join('');
      console.log(this.baseUrl);
    }
  }


  public connect() {
    this.getData();
    this.setData();
  }

  public setLED(led: number) {
    const setting = !this.data.pi.actuators.leds[led.toString()].value;
    this.http.put(this.baseUrl + '/pi/actuators/leds/' + led, JSON.parse('{"value":' + setting + '}')).subscribe(msg => {
      const value = (msg as {name: string, value: string, gpio: number}).value;
      this.data.pi.actuators.leds[led.toString()].value = value; });


  }
}


