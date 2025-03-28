import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cartItemsSubject.next(JSON.parse(savedCart));
      }
    }
  }

  getCart() {
    return this.cartItemsSubject.value;
  }

  private updateStorage(cart: any[]) {
    if (this.isBrowser) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  addToCart(product: any) {
    const cart = this.getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    this.cartItemsSubject.next([...cart]);
    this.updateStorage(cart);
  }

  updateQty(productId: number, qty: number) {
    const cart = this.getCart().map(item =>
      item.id === productId ? { ...item, quantity: qty } : item
    ).filter(i => i.quantity > 0);
    this.cartItemsSubject.next(cart);
    this.updateStorage(cart);
  }

  removeItem(productId: number) {
    const cart = this.getCart().filter(item => item.id !== productId);
    this.cartItemsSubject.next(cart);
    this.updateStorage(cart);
  }

  getTotal() {
    return this.getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  clearCart() {
    this.cartItemsSubject.next([]);
    if (this.isBrowser) {
      localStorage.removeItem('cart');
    }
  }
}
