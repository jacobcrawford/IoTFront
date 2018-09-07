import { Component } from '@angular/core';
import { OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string;
  data: GetDataConfig;
  configUrl: string;
  http: HttpClient;
  dataSubscription: Subscription;

  constructor(http: HttpClient) {
    this.http = http;
    this.title = 'First piece of Pi';
    this.configUrl = 'http://86.52.111.117:4242';
  }

  ngOnInit(): void {
    this.setData();
  }

  getData() {
    return this.http.get(this.configUrl);
  }

  setData() {
    this.dataSubscription = this.getData().subscribe((data: GetDataConfig) => {
      this.data = data;
      this.dataSubscription.unsubscribe();
    });
  }
}

export interface GetDataConfig {
  let: number;
  hum: string;
  temp: string;
}
