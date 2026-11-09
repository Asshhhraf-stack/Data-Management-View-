import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Product {
  sku: string;
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
})
export class App {
  products: Product[] = [
    { sku: 'P001', name: 'Hand Sanitizer', quantity: 20 },
    { sku: 'P002', name: 'Face Mask', quantity: 10 },
    { sku: 'P003', name: 'Vitamin C', quantity: 5 },
  ];

  selectedSku = 'P001';
  adjustmentInput = '';
  message = '';
  isError = false;

  adjustStock(): void {
    this.message = '';
    this.isError = false;

    const raw = this.adjustmentInput.trim();
    if (!/^[+-]?\d+$/.test(raw)) {
      this.reject('Enter a whole number such as 5 or -3. Text is not allowed.');
      return;
    }

    const delta = Number(raw);
    if (delta === 0) {
      this.reject('Adjustment cannot be zero.');
      return;
    }

    const product = this.products.find((item) => item.sku === this.selectedSku);
    if (!product) {
      this.reject('Select a product.');
      return;
    }

    const nextQuantity = product.quantity + delta;
    if (nextQuantity < 0) {
      this.reject(
        `Not enough stock. ${product.name} stays at ${product.quantity}.`,
      );
      return;
    }

    product.quantity = nextQuantity;
    this.adjustmentInput = '';
    const sign = delta > 0 ? '+' : '';
    this.message = `${product.name} updated by ${sign}${delta}. New quantity is ${product.quantity}.`;
  }

  private reject(message: string): void {
    this.isError = true;
    this.message = message;
  }
}
