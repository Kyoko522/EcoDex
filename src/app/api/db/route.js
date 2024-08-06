 import { NextResponse } from "next/server";
 import { DataAPIClient } from "@datastax/astra-db-ts";

// Initialize the client
const client = new DataAPIClient(process.env.db_token);
const db = client.db('https://af4d97d3-7253-428b-aa43-ef73fc8c40f4-us-east-2.apps.astra.datastax.com');

export async function GET(req){
    const colls = await db.listCollections();
    console.log('Connected to Astra database', colls);

    return new NextResponse(JSON.stringify({
        message: 'Success',
        success: true,
    }))
}