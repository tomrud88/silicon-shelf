import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let cart = await prisma.category.findUnique({
            where: { userId: session.user.id },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                brand: true,
                                category: true,
                            }
                        }
                    }
                }
            }
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId: session.user.id,
                },
                include: {
                    items: {
                        include: {
                            product: {
                                include: {
                                    brand: true,
                                    category: true,
                                }
                            }
                        }
                    }
                }
            })
        }

        return NextResponse.json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error);
        return NextResponse.json(
            { error: "Failed to fetch cart" },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { productId, quantity = 1 } = await request.json();

        if (!productId) {
            return NextResponse.json(
                { error: "Product ID is requeired" },
                { status: 400 }
            );
        }

        const product = await prisma.product.findUnique({
            where: { id: productId },
        })

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 })
        }

        //Sprawdz dostepnosc w magazynie
        if (product.stock < quantity) {
            return NextResponse.json(
                { error: "Insufficient stock" },
                { status: 400 }
            )
        }

        // Znajdź lub stwórz koszyk
        let cart = await prisma.cart.findUnique({
            where: { userId: session.user.id },
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId: session.user.id }
            })
        }

        // Sprawdź czy produkt już jest w koszyku
        const existingItem = await prisma.cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId: productId,
                },
            },
        });

        let cartItem;

        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;

            if (product.stock < newQuantity) {
                return NextResponse.json(
                    { error: "Insufficient stock for requested quantity" },
                    { status: 400 }
                );
            }

            cartItem = await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: newQuantity },
                include: {
                    product: {
                        include: {
                            brand: true,
                            category: true,
                        },
                    },
                },
            });
        } else {
            // dodaj nowy produkt do koszyka
            cartItem = await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId: productId,
                    quantity: quantity,
                },
                include: {
                    product: {
                        include: {
                            brand: true,
                            category: true,
                        },
                    },
                },
            });
        }

        return NextResponse.json(cartItem, { status: 201 });
    } catch (error) {
        console.error("Error adding to cart:", error);
        return NextResponse.json(
            { error: "Failed to add to cart" },
            { status: 500 }
        );
    }
}

// Delete

export async function DELETE() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const cart = await prisma.cart.findUnique({
            where: {
                userId: session.user.id
            }
        });

        if (!cart) {
            return NextResponse.json({ error: "Cart not found" }, { status: 404 });
        }

        await prisma.cartItem.deleteMany({
            where: { cartId: cart.id }
        })

        return NextResponse.json({ message: "Cart cleared successfully" });
    } catch (error) {
        console.error('Error clearing cart:', error);
        return NextResponse.json(
            { error: "Failed to clear cart" },
            { status: 500 }
        )
    }
}