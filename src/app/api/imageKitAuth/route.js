import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
    try {
        const { token, expire, signature } = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // Never expose this on client side
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY 
        })
    
        return Response.json({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY })
    } catch (error) {
        return Response.json(
            {error: "Failed To Fetch Imagekit Auth"},
            {status: 500}
        )
    }
}