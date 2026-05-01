import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Order } from "./Order.entity";
import {Refund} from "./Refund.entity"
export enum ReturnStatus {
  REQUESTED = "requested",
  APPROVED = "approved",
  REJECTED = "rejected",
  COMPLETED = "completed",
}

@Entity("returns")
export class Return {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  order_items_id: number;

  @Column({ type: "text" })
  reason: string;

  @Column({
    type: "enum",
    enum: ReturnStatus,
    default: ReturnStatus.REQUESTED,
  })
  status: ReturnStatus;

  
  @ManyToOne(() => Order, (order) => order.returns, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_items_id" })
  order: Order;

  @OneToOne(() => Refund, (refund) => refund.returnItem)
  refund: Refund;
}