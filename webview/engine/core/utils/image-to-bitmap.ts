export default async function imageToBitmap(base64: string, compressionRatio?: number, resolutionScale?: number): Promise<ImageBitmap> {
    const base64WithoutPrefix = base64.replace(/^data:image\/[a-z]+;base64,/, '');
    const binaryData = Uint8Array.from(atob(base64WithoutPrefix), (c) => c.charCodeAt(0));
    const blob = new Blob([binaryData], { type: 'image/png' });
    return await createImageBitmap(blob);
}
