import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastrService: ToastrService) { }

  notify(message: string) {
    this.toastrService.show(message);
  }

  error(message: string) {
    this.toastrService.error(message);
  }
}

