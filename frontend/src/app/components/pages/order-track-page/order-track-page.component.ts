import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { OrderItemsComponent } from '../../partials/order-items/order-items.component';
import { MapComponent } from '../../partials/map/map.component';
import { TitleComponent } from '../../partials/title/title.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-track-page',
  imports: [OrderItemsComponent, MapComponent, TitleComponent, CommonModule],
  templateUrl: './order-track-page.component.html',
  styleUrl: './order-track-page.component.css'
})
export class OrderTrackPageComponent implements OnInit {
  order!: Order;

  constructor(activatedRoute: ActivatedRoute, orderService: OrderService) {
    const params = activatedRoute.snapshot.params;
    if (!params.orderId) return;

    orderService.trackOrderById(params.orderId).subscribe(order => {
      this.order = order;
    })
  }

  ngOnInit(): void {
  }
}
