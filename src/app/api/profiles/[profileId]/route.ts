import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../prisma/prisma';

// Replace the image URL function with this simpler version
function getSonnyAngelImageUrl(name: string, index: number): string {
    // A small set of guaranteed working images
    const workingImages = [
        "https://thumbs.coleka.com/media/item/202403/10/plush-collection-cuddly-rabbit-pink-rabbit_250x250.webp",
        "https://thumbs.coleka.com/media/item/202403/10/plush-collection-cuddly-rabbit-white-rabbit_250x250.webp",
        "https://thumbs.coleka.com/media/item/202312/10/sonny-angel-candy-store-grape-rabbit_250x250.webp",
        "https://thumbs.coleka.com/media/item/202312/10/sonny-angel-candy-store-lime-dog_250x250.webp",
        "https://thumbs.coleka.com/media/item/202305/28/sonny-angel-it-s-a-bananas-banana-monkey-green_250x250.webp",
        "https://cdn.shopify.com/s/files/1/0607/8015/1021/files/Rare_Sonny_Angel_gold_pig.jpg?v=1696069992",
        "https://i5.walmartimages.com/seo/Sonny-Angel-Cat-Life-Series-Single-Random-Blind-Box-Mini-Figure-Lovely-Anime-Toy-Sonny-Fashion-Play-Doll-Tabletop-Decoration-Handwork-Black-Chicken-L_033b8b22-2af7-4608-aa87-ae0125f0e907.71d96e7568c9e1e65cd4e5268727ee26.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
        "https://toysez.com/cdn/shop/files/47_8756ead4-c76e-4dd5-8549-fcebc031c60d.jpg?v=1699662094",
    ];

    // Use modulo to always get a valid index
    const safeIndex = index % workingImages.length;
    return workingImages[safeIndex];
}

// Generate dummy listing data
function generateDummyListings(profileId: string) {
    // Common Sonny Angel series
    const series = [
        "Fruit Series",
        "Animal Series",
        "Flower Series",
        "Ocean Series",
        "Valentine Series",
        "Halloween Series",
        "Christmas Series"
    ];

    // Common names
    const names = [
        "Strawberry Angel", "Peach Angel", "Banana Angel", "Cat Angel", "Rabbit Angel",
        "Panda Angel", "Whale Angel", "Octopus Angel", "Sunflower Angel", "Rose Angel",
        "Lily Angel", "Cherry Angel", "Tiger Angel", "Shark Angel", "Bear Angel",
        "Reindeer Angel", "Santa Angel", "Ghost Angel", "Pumpkin Angel", "Heart Angel"
    ];

    // Update your saleListings with proper images
    const saleListings = Array.from({ length: 5 }, (_, i) => ({
        id: `dummy-sale-${i}`,
        productId: `product-${i}`,
        listerId: profileId,
        colors: ["Pink", "Blue", "White", "Yellow"].slice(0, Math.floor(Math.random() * 3) + 1),
        description: `Brand new ${names[i]} figure in perfect condition!`,
        price: Math.floor(Math.random() * 30) + 10, // $10-$40
        status: "available",
        imageUrls: [getSonnyAngelImageUrl(names[i], i)],
        product: {
            id: `product-${i}`,
            name: names[i],
            series: series[Math.floor(Math.random() * series.length)],
        },
    }));

    // Update your tradeListings with proper images
    const tradeListings = Array.from({ length: 4 }, (_, i) => ({
        id: `dummy-trade-${i}`,
        productId: `product-${i + 10}`,
        listerId: profileId,
        colors: ["Purple", "Green", "Red"].slice(0, Math.floor(Math.random() * 2) + 1),
        description: `${names[i + 5]} figure - looking to trade for Ocean Series only!`,
        price: null,
        status: "available",
        imageUrls: [getSonnyAngelImageUrl(names[i + 5], i + 5)],
        product: {
            id: `product-${i + 10}`,
            name: names[i + 5],
            series: series[Math.floor(Math.random() * series.length)],
        },
    }));

    // Update your soldListings with proper images
    const soldListings = Array.from({ length: 3 }, (_, i) => ({
        id: `dummy-sold-${i}`,
        productId: `product-${i + 20}`,
        listerId: profileId,
        colors: ["Black", "Gold", "Silver"].slice(0, Math.floor(Math.random() * 2) + 1),
        description: `SOLD ${names[i + 10]} figure - Limited Edition!`,
        price: Math.floor(Math.random() * 50) + 20, // $20-$70
        status: "sold",
        imageUrls: [getSonnyAngelImageUrl(names[i + 10], i + 10)],
        product: {
            id: `product-${i + 20}`,
            name: names[i + 10],
            series: series[Math.floor(Math.random() * series.length)],
        },
    }));

    // Update your pendingListings with proper images
    const pendingListings = [
        {
            id: `dummy-pending-1`,
            productId: `product-30`,
            listerId: profileId,
            colors: ["Rainbow"],
            description: "Pending pickup - Valentine's Day Special Angel",
            price: 45,
            status: "pending",
            imageUrls: [getSonnyAngelImageUrl("Heart Angel", 15)],
            product: {
                id: `product-30`,
                name: "Heart Angel",
                series: "Valentine Series",
            },
        },
        {
            id: `dummy-reserved-1`,
            productId: `product-31`,
            listerId: profileId,
            colors: ["Orange", "Black"],
            description: "Reserved for @user123 - Halloween Special",
            price: 35,
            status: "reserved",
            imageUrls: [getSonnyAngelImageUrl("Pumpkin Angel", 16)],
            product: {
                id: `product-31`,
                name: "Pumpkin Angel",
                series: "Halloween Series",
            },
        }
    ];

    // Combine all listings
    return [...saleListings, ...tradeListings, ...soldListings, ...pendingListings];
}

export async function GET(
    request: NextRequest,
    { params }: { params: { profileId: string } }
) {
    const profileId = await params.profileId;

    if (!profileId) {
        return NextResponse.json({ error: 'Profile ID is required' }, { status: 400 });
    }

    try {
        // Fetch the profile with real listings
        const profile = await prisma.profile.findUnique({
            where: { id: profileId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        // image: true,
                    },
                },
                listings: {
                    include: {
                        product: true,
                    },
                    take: 5, // Get up to 5 real listings
                },
            },
        });

        if (!profile) {
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
        }

        // Process the real listings to ensure they have all required fields
        const processedRealListings = profile.listings.map(listing => ({
            ...listing,
            // For real listings that may not have images, provide fallbacks
            imageUrls: listing.imageUrls?.length > 0
                ? listing.imageUrls
                : [getSonnyAngelImageUrl(listing.product.name, parseInt(listing.id))],
            // Format price properly
            price: listing.price === null ? null : Number(listing.price),
        }));

        // Generate dummy listings
        const dummyListings = generateDummyListings(profileId);

        // Create an enhanced profile with both real and dummy listings
        const enhancedProfile = {
            ...profile,
            user: {
                ...profile.user,
                // Ensure we have a user image
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + profile.user.name,
            },
            // Combine real and dummy listings
            listings: [...processedRealListings, ...dummyListings],
        };

        return NextResponse.json(enhancedProfile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }
}