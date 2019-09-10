export class ProductData {
    constructor(
        public ProductRowId:number,
        public ProductId:string,
        public ProductName:string,
        public Description: string,
        public Manufacturer:string,
        public CategoryName:string,
        public BasePrice:number
    ){}
}