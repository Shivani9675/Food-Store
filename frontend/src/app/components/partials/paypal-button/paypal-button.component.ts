import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../services/order.service';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

//window.paypal
declare var paypal: any;

@Component({
  selector: 'paypal-button',
  imports: [],
  templateUrl: './paypal-button.component.html',
  styleUrl: './paypal-button.component.css'
})
export class PaypalButtonComponent {
  @Input() order!: Order;

  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    const self = this;
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'CAD',
                  value: self.order.totalPrice,
                },
              },
            ],
          });
        },

        onApprove: async (data: any, actions: any) => {
          const payment = await actions.order.capture();
          this.order.paymentId = payment.id;
          self.orderService.pay(this.order).subscribe(
            {
              next: (orderId) => {
                this.cartService.clearCart();
                this.router.navigateByUrl('/track/' + orderId);
                this.toastrService.success('Order confirmed! We’re cooking up something special for you.');
              },
              error: (error) => {
                this.toastrService.error('Order Failed');
              }
            }
          );
        },

        onError: (err: any) => {
          this.toastrService.error('Payment Failed');
          console.log(err);
        },
      })
      .render(this.paypalElement.nativeElement);
  }
} 
