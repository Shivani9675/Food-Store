import { Component, OnInit } from '@angular/core';
import { TitleComponent } from '../../partials/title/title.component';
import { OrderItemsComponent } from '../../partials/order-items/order-items.component';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { PaypalButtonComponent } from '../../partials/paypal-button/paypal-button.component';
import { MapComponent } from '../../partials/map/map.component';

@Component({
  selector: 'app-payment-page',
  imports: [TitleComponent, OrderItemsComponent, PaypalButtonComponent, MapComponent],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent implements OnInit {

  order: Order = new Order();

  constructor(orderService: OrderService, router: Router) {
    orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order;
      },
      error: () => {
        router.navigateByUrl('/checkout');
      }
    })
  }

  ngOnInit(): void {
  }
}
