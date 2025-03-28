import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService, public router: Router) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cart = items;
      this.total = this.cartService.getTotal();
    });
  }

  changeQty(item: any, qty: number) {
    if (qty <= 0) {
      this.remove(item);
    } else {
      this.cartService.updateQty(item.id, qty);
    }
  }

  remove(item: any) {
    this.cartService.removeItem(item.id);
  }
}
