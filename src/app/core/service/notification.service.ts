import { Injectable } from '@angular/core';
import { ToastService } from 'src/app/shared/components/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public toastEvent: ToastService) { }

  notify(message: string) {
    this.toastEvent.toast({severity:'success', summary:'Sucesso', detail: message});
  }

  error(message: string) {
    this.toastEvent.toast({uid: 'toastCenter', delay: 1500});
  }
}

