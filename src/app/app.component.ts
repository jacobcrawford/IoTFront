import { Component } from '@angular/core';
import { OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string;
  public data: GetDataConfig;
  configUrl: string;
  private http: HttpClient;
  private dataSubscription: Subscription;

  constructor(http: HttpClient) {
    this.http = http;
    this.title = 'First piece of Pi';
  }

  private getData() {
    if (this.configUrl) {
      return this.http.get<GetDataConfig>(this.configUrl);
    } else {
      alert('Input ip of the pi that you want to connect to');
    }
    }

  setData() {
    this.dataSubscription = this.getData().subscribe((data: GetDataConfig) => {
      this.data = data;
      this.dataSubscription.unsubscribe();
    });
  }

  public connect() {
    this.getData();
    this.setData();
  }
}

export interface GetDataConfig {
  led: number;
  hum: string;
  temp: string;
}
