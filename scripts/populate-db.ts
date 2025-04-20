// scripts/populate-db.ts
import  prisma  from '../prisma/prisma'
import * as fs from 'fs'
import * as path from 'path' 

// Define interfaces for our data structure
interface SonnyAngelProduct {
    id: string;
    series: string;
    year: number;
    name: string;
}

interface JsonData {
    sonnyAngelProducts: SonnyAngelProduct[];
}

async function main() {
    try {
        // Read the JSON file with type assertion
        const jsonPath = path.join(process.cwd(), 'data', 'sonny_angel_products_clean.json')
        const rawData = fs.readFileSync(jsonPath, 'utf8')
        const data = JSON.parse(rawData) as JsonData
        
        console.log(`Starting to import ${data.sonnyAngelProducts.length} products...`)

        // Delete existing records if you want to start fresh
        await prisma.sonnyAngelProduct.deleteMany({})
        console.log('Cleared existing products')

        // Insert all products with proper typing
        const created = await prisma.sonnyAngelProduct.createMany({
            data: data.sonnyAngelProducts.map((product: SonnyAngelProduct) => ({
                id: product.id,
                series: product.series,
                year: product.year,
                name: product.name
            }))
        })

        console.log(`Successfully imported ${created.count} products`)

    } catch (error) {
        console.error('Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

main()