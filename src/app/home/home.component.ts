import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import {environment} from '../../environments/environment' ;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['setup', 'release'];
  dataSource = new MatTableDataSource<any>();
  // dataSource : Array<any> = [{ENVIRONMENT : environment.setup , RELEASE : environment.release}] ;

  constructor() { }

  ngOnInit() {
    console.log(environment);
    this.dataSource.data =  [{ENVIRONMENT : environment.setup , RELEASE : environment.release}] ;
  }

}