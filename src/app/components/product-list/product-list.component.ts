import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  selectedPriceFilter: string = 'all';
  selectedCategory: string = 'All';

  categories = ['All', 'Pizza', 'Burgers', 'Indian', 'Chinese', 'Drinks', 'Desserts'];

  constructor(public cartService: CartService, public router: Router) {}

  get filteredProducts() {
    let filtered = this.products;
  
    // Apply category filter
    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(p =>
        p.category?.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }
  
    // Apply price filter
    switch (this.selectedPriceFilter) {
      case 'under10':
        filtered = filtered.filter(p => p.price < 10);
        break;
      case 'under15':
        filtered = filtered.filter(p => p.price < 15);
        break;
      case 'under20':
        filtered = filtered.filter(p => p.price < 20);
        break;
    }
  
    return filtered;
  }
  



products = [
  { id: 1, name: 'Margherita Pizza', price: 12.99, image: '/assets/Margherita_Pizza.png', category: 'Pizza', quantity: 0, addedToCart: false },
  { id: 2, name: 'Veggie Burger', price: 10.99, image: '/assets/veggie-burgers-1-2.webp', category: 'Burgers', quantity: 0, addedToCart: false },
  { id: 3, name: 'Grilled Sandwich', price: 8.99, image: '/assets/grilled-sandwich-4.webp', category: 'Burgers', quantity: 0, addedToCart: false },
  { id: 4, name: 'Paneer Tikka', price: 11.99, image: '/assets/paneer-tikka.jpeg', category: 'Indian', quantity: 0, addedToCart: false },
  { id: 5, name: 'Masala Dosa', price: 9.49, image: '/assets/masala-dosa.jpg', category: 'Indian', quantity: 0, addedToCart: false },
  { id: 6, name: 'Idli Vada Combo', price: 7.99, image: '/assets/idli-vada.jpeg', category: 'Indian', quantity: 0, addedToCart: false },
  { id: 7, name: 'Chole Bhature', price: 10.49, image: '/assets/chole-bhature.jpg', category: 'Indian', quantity: 0, addedToCart: false },
  { id: 8, name: 'Chicken Biryani', price: 13.99, image: '/assets/chicken-biryani.jpeg', category: 'Indian', quantity: 0, addedToCart: false },
  { id: 9, name: 'Butter Naan', price: 2.99, image: '/assets/Butter-Naan-3.jpg', category: 'Indian', quantity: 0, addedToCart: false },
  { id: 10, name: 'Tandoori Chicken', price: 14.99, image: '/assets/tandoori_chicken.jpg', category: 'Indian', quantity: 0, addedToCart: false },
  { id: 11, name: 'Pav Bhaji', price: 9.99, image: '/assets/pav_bhaji.jpeg', category: 'Indian', quantity: 0, addedToCart: false },
  { id: 12, name: 'Samosa (2 pcs)', price: 3.99, image: '/assets/Samosa-square-FS.jpg', category: 'Indian', quantity: 0, addedToCart: false },
  { id: 13, name: 'Spring Rolls', price: 6.49, image: '/assets/spring-rolls.jpg', category: 'Chinese', quantity: 0, addedToCart: false },
  { id: 14, name: 'Manchurian', price: 10.99, image: '/assets/manchurian.jpeg', category: 'Chinese', quantity: 0, addedToCart: false },
  { id: 15, name: 'Fried Rice', price: 9.49, image: '/assets/Veg-Fried-Rice-4-500x500.jpg', category: 'Chinese', quantity: 0, addedToCart: false },
  { id: 16, name: 'Hakka Noodles', price: 9.99, image: '/assets/hakka-noodles-5.webp', category: 'Chinese', quantity: 0, addedToCart: false },
  { id: 17, name: 'Dal Makhani', price: 10.49, image: '/assets/dal-makhani7.webp', category: 'Indian', quantity: 0, addedToCart: false },
  { id: 18, name: 'Rajma Chawal', price: 9.99, image: '/assets/Rajma-Chawal-Indian-Curried-Kidney-Beans-Rice-IMG_1801-scaled.jpg', category: 'Indian', quantity: 0, addedToCart: false },
  { id: 19, name: 'Cold Coffee', price: 4.99, image: '/assets/cold-coffee-1.jpg', category: 'Drinks', quantity: 0, addedToCart: false },
  { id: 20, name: 'Masala Chai', price: 2.49, image: '/assets/masala-chai.webp', category: 'Drinks', quantity: 0, addedToCart: false },
  { id: 21, name: 'Fresh Lime Soda', price: 3.99, image: '/assets/fresh-lime-soda.jpg', category: 'Drinks', quantity: 0, addedToCart: false },
  { id: 22, name: 'Mango Lassi', price: 5.49, image: '/assets/mango-lassi.jpeg', category: 'Drinks', quantity: 0, addedToCart: false },
  { id: 23, name: 'Gulab Jamun', price: 4.49, image: '/assets/Gulab-Jamun.jpg', category: 'Desserts', quantity: 0, addedToCart: false },
  { id: 24, name: 'Rasgulla', price: 4.49, image: '/assets/rasgulla.jpeg', category: 'Desserts', quantity: 0, addedToCart: false },
  { id: 25, name: 'Brownie Sundae', price: 6.99, image: '/assets/brownie-sundae.webp', category: 'Desserts', quantity: 0, addedToCart: false },
  { id: 26, name: 'Chocolate Milkshake', price: 5.99, image: '/assets/Chocolate-Milkshake.jpg', category: 'Drinks', quantity: 0, addedToCart: false },
  { id: 27, name: 'Fruit Salad', price: 6.49, image: '/assets/fruit-salad.jpg', category: 'Desserts', quantity: 0, addedToCart: false },
  { id: 28, name: 'Ice Cream Scoop', price: 3.99, image: '/assets/icecream.webp', category: 'Desserts', quantity: 0, addedToCart: false },
  { id: 29, name: 'Falooda', price: 7.99, image: '/assets/falooda.jpg', category: 'Desserts', quantity: 0, addedToCart: false },
  { id: 30, name: 'Hot Chocolate', price: 4.99, image: '/assets/hot-chocloate.jpg', category: 'Drinks', quantity: 0, addedToCart: false },
];

  

  addToCart(product: any) {
    product.addedToCart = true;
    product.quantity = 1;
    this.cartService.addToCart(product);
  }

  increaseQty(product: any) {
    product.quantity++;
    this.cartService.updateQty(product.id, product.quantity);
  }

  decreaseQty(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
      this.cartService.updateQty(product.id, product.quantity);
    } else {
      product.quantity = 0;
      product.addedToCart = false;
      this.cartService.removeItem(product.id)
    }
  }
}
