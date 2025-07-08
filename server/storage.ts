import { products, orders, promoCodes, siteContent, admins, type Product, type InsertProduct, type Order, type InsertOrder, type PromoCode, type InsertPromoCode, type SiteContent, type InsertSiteContent, type Admin, type InsertAdmin } from "@shared/schema";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Orders
  getOrders(): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  getOrderByOrderId(orderId: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: number, order: Partial<InsertOrder>): Promise<Order | undefined>;
  
  // Promo Codes
  getPromoCodes(): Promise<PromoCode[]>;
  getPromoCode(code: string): Promise<PromoCode | undefined>;
  createPromoCode(promoCode: InsertPromoCode): Promise<PromoCode>;
  updatePromoCode(id: number, promoCode: Partial<InsertPromoCode>): Promise<PromoCode | undefined>;
  deletePromoCode(id: number): Promise<boolean>;
  
  // Site Content
  getSiteContent(): Promise<SiteContent[]>;
  getSiteContentByKey(key: string): Promise<SiteContent | undefined>;
  updateSiteContent(key: string, value: string): Promise<SiteContent>;
  
  // Admins
  getAdmins(): Promise<Admin[]>;
  getAdminByEmail(email: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
  verifyAdminPassword(password: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product> = new Map();
  private orders: Map<number, Order> = new Map();
  private promoCodes: Map<number, PromoCode> = new Map();
  private siteContent: Map<string, SiteContent> = new Map();
  private admins: Map<number, Admin> = new Map();
  private currentProductId = 1;
  private currentOrderId = 1;
  private currentPromoId = 1;
  private currentAdminId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed initial products with exact pricing
    const initialProducts: InsertProduct[] = [
      {
        name: "Basic Cotton T-Shirt",
        description: "100% cotton, comfortable fit, customizable design",
        price: 40000, // ৪০০৳
        category: "t-shirts",
        images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3"],
        variants: { sizes: ["S", "M", "L", "XL", "XXL"], colors: ["Black", "White", "Blue", "Red"] },
        inStock: 50,
        featured: false,
      },
      {
        name: "Premium Cotton T-Shirt",
        description: "High-grade cotton, custom prints, premium quality",
        price: 55000, // ৫৫০৳
        originalPrice: 65000,
        category: "t-shirts",
        images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3"],
        variants: { sizes: ["S", "M", "L", "XL", "XXL"], colors: ["Black", "White", "Blue", "Red", "Gray"] },
        inStock: 30,
        featured: true,
      },
      {
        name: "Premium Drop Shoulder T-Shirt",
        description: "Trendy drop shoulder design, premium cotton",
        price: 60000, // ৬০০৳
        category: "t-shirts",
        images: ["https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3"],
        variants: { sizes: ["S", "M", "L", "XL"], colors: ["Black", "White", "Gray"] },
        inStock: 25,
        featured: true,
      },
      {
        name: "Regular Ceramic Mug",
        description: "11oz ceramic mug, perfect for daily use",
        price: 65000, // ৬৫০৳
        category: "mugs",
        images: ["https://pixabay.com/get/g2917ea8ef19354339ece6a4f0a61d517800f31959f10aa3d44a83cade2c35460c616e098cd24254ae46b2b86dbcd1b59496fa4c33543b6f42872b3b4c0757e1a_1280.jpg"],
        variants: { colors: ["White", "Black", "Blue"] },
        inStock: 40,
        featured: false,
      },
      {
        name: "Love Shape Mug",
        description: "Heart-shaped ceramic mug, perfect for couples",
        price: 68000, // ৬৮০৳
        category: "mugs",
        images: ["https://pixabay.com/get/g30b8ba8e9133e3812ca39b37747aa7503c765007a073bcb80dca6761689bd3886ba0d77f6431fe795cda71b605dfe1d25496ebf2bdfd1c66c1d442d4effd8bc1_1280.jpg"],
        variants: { colors: ["Red", "Pink", "White"] },
        inStock: 20,
        featured: true,
      },
      {
        name: "Magic Color-Change Mug",
        description: "Changes color with hot beverages, 11oz ceramic",
        price: 75000, // ৭৫০৳
        category: "mugs",
        images: ["https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3"],
        variants: { colors: ["Black to Color", "Blue to White"] },
        inStock: 15,
        featured: true,
      },
      {
        name: "2-Piece Mug Set with Box",
        description: "Two premium mugs with luxury gift packaging",
        price: 120000, // ১২০০৳
        category: "mugs",
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3"],
        variants: { options: ["Couple Set", "Family Set"] },
        inStock: 10,
        featured: true,
      },
      {
        name: "Custom Picture Frame (No Box)",
        description: "Wooden frame with custom design, no packaging",
        price: 110000, // ১১০০৳
        category: "picture-frames",
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3"],
        variants: { sizes: ["4x6", "5x7", "8x10"] },
        inStock: 35,
        featured: false,
      },
      {
        name: "Custom Picture Frame with Premium Box",
        description: "Wooden frame with custom design and luxury packaging",
        price: 130000, // ১৩০০৳
        category: "picture-frames",
        images: ["https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3"],
        variants: { sizes: ["4x6", "5x7", "8x10"] },
        inStock: 25,
        featured: true,
      },
      {
        name: "Custom Water Tumbler",
        description: "Stainless steel tumbler, customizable design",
        price: 78000, // ৭৮০৳
        category: "water-tumblers",
        images: ["https://pixabay.com/get/ga52b1b0ca946643b2e8e308d521d8738a8e5d8abdadc73cd26c1d5d4c8c6c3b0baf14a124c23bf81124f06ec65160d3bf27d76ed8bc07919b7547a8a3e04e055_1280.jpg"],
        variants: { colors: ["Silver", "Black", "Blue", "Red"], sizes: ["16oz", "20oz"] },
        inStock: 30,
        featured: true,
      },
    ];

    initialProducts.forEach((product) => {
      const id = this.currentProductId++;
      this.products.set(id, {
        ...product,
        id,
        featured: product.featured ?? false,
        originalPrice: product.originalPrice ?? null,
        variants: product.variants ? {
          sizes: Array.isArray(product.variants.sizes) ? product.variants.sizes : undefined,
          colors: Array.isArray(product.variants.colors) ? product.variants.colors : undefined,
          options: Array.isArray(product.variants.options) ? product.variants.options : undefined,
        } : null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    // Seed site content
    const siteContentData = [
      { key: "site_title", value: "TryNex Lifestyle" },
      { key: "hero_title", value: "Premium Gifts & Lifestyle Products" },
      { key: "hero_subtitle", value: "Personalized T-shirts, Mugs, Photo Frames & More | গুণমান ও সাশ্রয়ী দামে" },
      { key: "footer_text", value: "Premium gifts and lifestyle products with personalization services in Bangladesh." },
    ];

    siteContentData.forEach((content) => {
      this.siteContent.set(content.key, {
        id: Date.now(),
        key: content.key,
        value: content.value,
        updatedAt: new Date(),
      });
    });

    // Seed admin
    this.admins.set(1, {
      id: 1,
      email: "admin@trynex.com",
      password: "admin123",
      name: "Admin User",
      role: "admin",
      isActive: true,
      createdAt: new Date(),
    });
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.featured);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.category === category);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    );
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const newProduct: Product = {
      ...product,
      id,
      featured: product.featured ?? false,
      originalPrice: product.originalPrice ?? null,
      variants: product.variants ? {
        sizes: Array.isArray(product.variants.sizes) ? product.variants.sizes : undefined,
        colors: Array.isArray(product.variants.colors) ? product.variants.colors : undefined,
        options: Array.isArray(product.variants.options) ? product.variants.options : undefined,
      } : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.set(id, newProduct);
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const existing = this.products.get(id);
    if (!existing) return undefined;
    
    const updated: Product = { 
      ...existing, 
      ...product, 
      updatedAt: new Date(),
      featured: product.featured ?? existing.featured,
      originalPrice: product.originalPrice ?? existing.originalPrice,
      variants: product.variants ?? existing.variants,
    };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  // Orders
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrderByOrderId(orderId: string): Promise<Order | undefined> {
    return Array.from(this.orders.values()).find(o => o.orderId === orderId);
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const orderId = `TN${String(id).padStart(6, '0')}`;
    const newOrder: Order = {
      ...order,
      id,
      orderId,
      status: order.status ?? "pending",
      paymentStatus: order.paymentStatus ?? "advance",
      notes: order.notes ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.orders.set(id, newOrder);
    return newOrder;
  }

  async updateOrder(id: number, order: Partial<InsertOrder>): Promise<Order | undefined> {
    const existing = this.orders.get(id);
    if (!existing) return undefined;
    
    const updated: Order = { 
      ...existing, 
      ...order, 
      updatedAt: new Date(),
      status: order.status ?? existing.status,
      paymentStatus: order.paymentStatus ?? existing.paymentStatus,
      notes: order.notes ?? existing.notes,
    };
    this.orders.set(id, updated);
    return updated;
  }

  // Promo Codes
  async getPromoCodes(): Promise<PromoCode[]> {
    return Array.from(this.promoCodes.values());
  }

  async getPromoCode(code: string): Promise<PromoCode | undefined> {
    return Array.from(this.promoCodes.values()).find(p => p.code === code);
  }

  async createPromoCode(promoCode: InsertPromoCode): Promise<PromoCode> {
    const id = this.currentPromoId++;
    const newPromoCode: PromoCode = {
      ...promoCode,
      id,
      currentUses: 0,
      createdAt: new Date(),
    };
    this.promoCodes.set(id, newPromoCode);
    return newPromoCode;
  }

  async updatePromoCode(id: number, promoCode: Partial<InsertPromoCode>): Promise<PromoCode | undefined> {
    const existing = this.promoCodes.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...promoCode };
    this.promoCodes.set(id, updated);
    return updated;
  }

  async deletePromoCode(id: number): Promise<boolean> {
    return this.promoCodes.delete(id);
  }

  // Site Content
  async getSiteContent(): Promise<SiteContent[]> {
    return Array.from(this.siteContent.values());
  }

  async getSiteContentByKey(key: string): Promise<SiteContent | undefined> {
    return this.siteContent.get(key);
  }

  async updateSiteContent(key: string, value: string): Promise<SiteContent> {
    const existing = this.siteContent.get(key);
    const updated: SiteContent = {
      id: existing?.id || Date.now(),
      key,
      value,
      updatedAt: new Date(),
    };
    this.siteContent.set(key, updated);
    return updated;
  }

  // Admins
  async getAdmins(): Promise<Admin[]> {
    return Array.from(this.admins.values());
  }

  async getAdminByEmail(email: string): Promise<Admin | undefined> {
    return Array.from(this.admins.values()).find(a => a.email === email);
  }

  async createAdmin(admin: InsertAdmin): Promise<Admin> {
    const id = this.currentAdminId++;
    const newAdmin: Admin = {
      ...admin,
      id,
      createdAt: new Date(),
    };
    this.admins.set(id, newAdmin);
    return newAdmin;
  }

  async verifyAdminPassword(password: string): Promise<boolean> {
    return password === "Amits@12345";
  }
}

export const storage = new MemStorage();
