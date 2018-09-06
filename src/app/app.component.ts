import { Component } from '@angular/core';
import { OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title;
  data;
  configUrl;
  http;

  constructor(http: HttpClient) {
    this.http = http;
    this.title = 'First piece of Pi';
    this.data = {};
    this.configUrl = 'http://86.52.111.117:20';
  }

  ngOnInit(): void {
    this.setData();
  }

  getData() {
    return this.data = this.http.get(this.configUrl);
  }

  setData() {
    this.getData().subscribe((data: GetDataConfig) => {
      this.data = data;
      console.log(this.data);
    });
  }
}

export interface GetDataConfig {
  let: number;
  hum: string;
  temp: string;
}
