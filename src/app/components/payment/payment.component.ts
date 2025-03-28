import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {


  total =0;
  selectedMethod = 'Apple Pay'

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void{
    this.total = this.cartService.getTotal();
  }

  confirmPayment() {
    alert(`💳 Paid $${this.total.toFixed(2)} via ${this.selectedMethod}`);
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }
}
