import { Component, OnInit } from '@angular/core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-questionadduser',
  templateUrl: './questionadduser.component.html',
  styleUrls: ['./questionadduser.component.css']
})
export class QuestionadduserComponent implements OnInit {
  faQuestionCircle = faQuestionCircle;
  
  constructor() { }

  ngOnInit(): void {
  }

}
