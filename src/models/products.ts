import client from '../database'


//TYPES

export type Product ={

    id?: number;
    name: string;
    price: number;

}


//METHODS

export class ProductStore
{
    //get all products
    async index(): Promise<Product[]> {

       try {
        const conn =  await client.connect(); //open connection to db
        const sql = 'SELECT * FROM products'; //sql query
        const result = await conn.query(sql); //gets the result of the query which is either rows or error
        conn.release(); //close connection to db
        return result.rows;
       } catch (error) {
        throw new Error(`Can't get products ${error}`);
       }
    }

    //get specific product by id
    async show(id: string): Promise<Product>{

        try
        {
            const conn = await client.connect();
            const sql = `SELECT * FROM products WHERE id = $1`
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch(error)
        {
            throw new Error(`Can't find product ${error}`);
        }
    }

    //create new product
    async create(p:Product): Promise<Product>{
        try {
            const conn =  await client.connect(); //open connection to db
            const sql = `INSERT INTO PRODUCTS (name, price) VALUES ($1, $2) RETURNING *`; //sql query
            const result = await conn.query(sql, [p.name, p.price]); //gets the result of the query which is either rows or error
            conn.release(); //close connection to db
            return result.rows[0];
           } catch (error) {
            throw new Error(`Can't add product ${error}`);
           }

    }

    //delete a product by id
    async delete(id: string): Promise<Product> 
    { 
        try {
        const conn = await client.connect();
        const sql = 'DELETE FROM products WHERE id= $1 RETURNING *';
        const result = await conn.query(sql, [id])
        conn.release();
        return result.rows[0];
        }
        catch (error) {
        throw new Error(`Can't delete product ${error}`);
       }
    }

    //update a product by id and new product info
    async update(id: string, p: Product): Promise<Product>{

        try
        {
            const conn = await client.connect();
            const sql = `UPDATE products SET NAME = $1, PRICE = $2 WHERE ID = $3 RETURNING *`
            const result = await conn.query(sql, [p.name, p.price , id]);
            conn.release();
            return result.rows[0];
        }
        catch(error)
        {
            throw new Error(`Can't update product ${error}`);
        }
    }

}