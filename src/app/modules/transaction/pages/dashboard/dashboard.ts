import {Component} from '@angular/core';
import {TranscationForm} from '../../components/transcation-form/transcation-form';

@Component({
  selector: 'app-dashboard',
  imports: [TranscationForm],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  submitForm() {
    console.log('submitForm()');
  }
}
