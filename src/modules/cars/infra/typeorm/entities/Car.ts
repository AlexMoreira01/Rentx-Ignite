import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity("cars")
class Car {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column()
    available: boolean;

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @Column()
    brand: string;

    // Muitos carros para uma categoria
    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;

    @Column()
    category_id: string;

    // Tabelas de relacionamentos sao manytomany
    @ManyToMany(() => Specification)
    @JoinTable({
        name: "specifications_cars", // Tabela de relacionamento
        joinColumns: [{ name: "car_id" }], // coluna em specifications_cars que pertence a cars
        inverseJoinColumns: [{ name: "specification_id" }],
    })
    specifications: Specification[];

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.available = true;
        }
    }
}

export { Car };
