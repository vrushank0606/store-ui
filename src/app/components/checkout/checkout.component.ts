import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  cart: any[] = [];
  total = 0;

  name = '';
  phone = '';
  address = '';

  constructor(private cartService: CartService, public router: Router){}
 

  ngOnInit(): void {
      this.cart = this.cartService.getCart();
      this.total = this.cartService.getTotal();
  }

  placeOrder() {
    if(!this.name || !this.phone || !this.address) {
      alert('! Please fill out all delivery details');
      return;
    }

    localStorage.setItem('checkout_user', JSON.stringify({
      name: this.name,
      phone: this.phone,
      address: this.address
    }));

    this.router.navigate(['/payment']);

  }
}
