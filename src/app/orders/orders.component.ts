import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { OrdersService } from './orders.service';
import { Order } from './order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['category', 'payment', 'description', 'amount', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>();

  selectedOrder: Order = new Order();
  loading = false;

  constructor(public orderService: OrdersService) {
  }

  ngOnInit() {
    this.refresh();
  }

  async refresh() {
    this.loading = true;
    const data = await this.orderService.getOrders();
    this.dataSource.data = data;
    this.loading = false;
  }

  async updateorder() {
    if (this.selectedOrder.id !== undefined) {
      await this.orderService.updateOrder(this.selectedOrder);
    } else {
      await this.orderService.createOrder(this.selectedOrder);
    }
    this.selectedOrder = new Order();
    await this.refresh();
  }

  editorder(order: Order) {
    this.selectedOrder = order;
  }

  clearorder() {
    this.selectedOrder = new Order();
  }

  async deleteorder(order: Order) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete the Order ${order.category}. This cannot be undone.`)) {
      await this.orderService.deleteOrder(order.id);
    }
    await this.refresh();
  }

}
